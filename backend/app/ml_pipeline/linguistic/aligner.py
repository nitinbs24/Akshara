import torch
import torchaudio
from dataclasses import dataclass
from typing import List

@dataclass
class Point:
    token_index: int
    time_index: int
    score: float

@dataclass
class Segment:
    label: str
    start: int
    end: int
    score: float

    def __repr__(self):
        return f"{self.label} ({self.score:.2f}): [{self.start}, {self.end})"

    @property
    def length(self):
        return self.end - self.start

class Aligner:
    def __init__(self):
        try:
            bundle = torchaudio.pipelines.WAV2VEC2_ASR_BASE_960H
            self.alignment_model = bundle.get_model()
            self.labels = bundle.get_labels()
            self.dictionary = {c: i for i, c in enumerate(self.labels)}
            self.sample_rate = bundle.sample_rate
        except Exception as e:
            self.alignment_model = None
            self.labels = None
            print(f"Failed to load alignment model: {e}")

    def run_forced_alignment(self, wav_path: str, transcript: str):
        """
        Runs Wav2Vec2 Forced Alignment.
        Returns word-level alignment mapping with timestamps.
        """
        if not self.alignment_model:
            return {"error": "Alignment model not loaded"}
            
        try:
            waveform, sr = torchaudio.load(wav_path)
            if sr != self.sample_rate:
                waveform = torchaudio.transforms.Resample(sr, self.sample_rate)(waveform)

            # Pre-process transcript: uppercase, replace spaces with |
            normalized_transcript = transcript.upper().replace(" ", "|")
            tokens = [self.dictionary.get(c, self.dictionary['<unk>']) for c in normalized_transcript]

            with torch.inference_mode():
                emissions, _ = self.alignment_model(waveform)
                emissions = torch.log_softmax(emissions, dim=-1)

            emission = emissions[0].cpu().detach()
            
            # CTC alignment logic
            trellis = self._get_trellis(emission, tokens)
            path = self._backtrack(trellis, emission, tokens)
            segments = self._merge_repeats(path, normalized_transcript)
            
            # Convert frame indices to seconds
            # Wav2Vec2 downsamples by 320x
            ratio = waveform.size(1) / emission.size(0) / self.sample_rate

            word_alignments = []
            current_word = []
            
            for seg in segments:
                if seg.label == "|":
                    if current_word:
                        word_alignments.append(self._format_word(current_word, ratio))
                        current_word = []
                else:
                    current_word.append(seg)
            
            if current_word:
                word_alignments.append(self._format_word(current_word, ratio))

            return {"word_alignments": word_alignments}
            
        except Exception as e:
            import traceback
            traceback.print_exc()
            return {"error": f"Alignment failed: {str(e)}"}

    def _get_trellis(self, emission, tokens, blank_id=0):
        num_frame = emission.size(0)
        num_tokens = len(tokens)

        trellis = torch.full((num_frame + 1, num_tokens + 1), -float("inf"))
        trellis[0, 0] = 0
        for j in range(num_tokens):
            for i in range(num_frame):
                stay = trellis[i, j + 1] + emission[i, blank_id]
                move = trellis[i, j] + emission[i, tokens[j]]
                trellis[i + 1, j + 1] = torch.logsumexp(torch.stack([stay, move]), dim=0)

        return trellis

    def _backtrack(self, trellis, emission, tokens, blank_id=0):
        j = trellis.size(1) - 1
        t_start = torch.argmax(trellis[:, j]).item()

        path = []
        for t in range(t_start, 0, -1):
            stay = trellis[t - 1, j] + emission[t - 1, blank_id]
            move = trellis[t - 1, j - 1] + emission[t - 1, tokens[j - 1]] if j > 0 else -float("inf")

            if move > stay:
                j -= 1
                path.append(Point(j, t - 1, emission[t - 1, tokens[j]].item()))
            else:
                path.append(Point(j, t - 1, emission[t - 1, blank_id].item()))
        
        return path[::-1]

    def _merge_repeats(self, path, transcript):
        i1, i2 = 0, 0
        segments = []
        while i1 < len(path):
            while i2 < len(path) and path[i1].token_index == path[i2].token_index:
                i2 += 1
            score = sum(p.score for p in path[i1:i2]) / (i2 - i1)
            segments.append(Segment(transcript[path[i1].token_index], path[i1].time_index, path[i2 - 1].time_index + 1, score))
            i1 = i2
        return segments

    def _format_word(self, word_segments, ratio):
        label = "".join([s.label for s in word_segments])
        start = word_segments[0].start * ratio
        end = word_segments[-1].end * ratio
        score = sum(s.score for s in word_segments) / len(word_segments)
        return {"word": label, "start": round(start, 3), "end": round(end, 3), "score": round(score, 4)}
