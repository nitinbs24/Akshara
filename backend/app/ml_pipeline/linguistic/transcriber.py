from transformers import pipeline

class Transcriber:
    def __init__(self):
        try:
            self.whisper_pipe = pipeline(
                "automatic-speech-recognition", 
                model="openai/whisper-tiny"
            )
        except Exception as e:
            self.whisper_pipe = None
            print(f"Failed to load whisper model: {e}")

    def run_whisper(self, wav_path: str, ground_truth_text: str):
        """
        Runs Whisper with the ground_truth_text as prompt.
        """
        if not self.whisper_pipe:
            return "", []
            
        result = self.whisper_pipe(
            wav_path, 
            return_timestamps="word"
        )
        transcript = result.get("text", "")
        chunks = result.get("chunks", [])
        return transcript, chunks
