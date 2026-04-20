from .transcriber import Transcriber
from .aligner import Aligner
from .differ import Differ

class LinguisticEngine:
    def __init__(self):
        self.transcriber = Transcriber()
        self.aligner = Aligner()
        self.differ = Differ()

    def process_linguistic(self, wav_path: str, ground_truth_text: str):
        transcript, word_chunks = self.transcriber.run_whisper(wav_path, ground_truth_text)
        alignment_data = self.aligner.run_forced_alignment(wav_path, transcript)
        difflib_metrics = self.differ.compute_accuracy_difflib(transcript, ground_truth_text)

        return {
            "transcript": transcript,
            "chunks": word_chunks,
            "alignment": alignment_data,
            "metrics": difflib_metrics
        }
