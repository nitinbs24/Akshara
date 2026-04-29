import torch

# Load Silero VAD locally
# Set force_reload=False to use local cache after first download
model, utils = torch.hub.load(repo_or_dir='snakers4/silero-vad', 
                                model='silero_vad', 
                                force_reload=False, 
                                onnx=True,
                                trust_repo=True)
get_speech_timestamps, save_audio, read_audio, VADIterator, collect_chunks = utils

class VADFilter:
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
        
        return speech_timestamps
