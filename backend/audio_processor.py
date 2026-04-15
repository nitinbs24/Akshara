import os
import subprocess
from pydub import AudioSegment
import torch

# Load Silero VAD locally
model, utils = torch.hub.load(repo_or_dir='snakers4/silero-vad', model='silero_vad', force_reload=True, onnx=True)
get_speech_timestamps, save_audio, read_audio, VADIterator, collect_chunks = utils

class AudioProcessor:
    @staticmethod
    def process_webm_to_wav(webm_path: str, wav_path: str):
        """
        Phase 2.4: FFmpeg & pydub conversion to 16kHz, 16-bit Mono .wav
        """
        try:
            audio = AudioSegment.from_file(webm_path, format="webm")
            # Set to 1 channel (mono)
            audio = audio.set_channels(1)
            # Set frame rate to 16kHz
            audio = audio.set_frame_rate(16000)
            # Set to 16-bit per sample
            audio = audio.set_sample_width(2)

            audio.export(wav_path, format="wav")
            return wav_path
        except Exception as e:
            raise RuntimeError(f"Failed to process Audio file: {str(e)}")

    @staticmethod
    def run_vad_on_wav(wav_path: str):
        """
        Phase 2.5: Voice Activity Detection (Silero VAD)
        Eliminates dead air and detects exact timestamps of human speech.
        Returns timestamps [{'start': 1024, 'end': 3048}, ...]
        """
        wav_arr = read_audio(wav_path, sampling_rate=16000)
        
        # Returns list of dicts: {'start': <sample index>, 'end': <sample index>}
        speech_timestamps = get_speech_timestamps(wav_arr, model, sampling_rate=16000)
        
        if not speech_timestamps:
            raise ValueError("No human speech detected in the recording.")
        
        # Save filtered logic (optional if passing pure chunk to Whisper directly)
        return speech_timestamps
