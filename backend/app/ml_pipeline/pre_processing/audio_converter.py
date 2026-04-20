from pydub import AudioSegment

class AudioConverter:
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
