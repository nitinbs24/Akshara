import librosa
import numpy as np

class AcousticFeatures:
    @staticmethod
    def extract_mfccs(wav_path: str):
        """
        Extract MFCCs from standard 16kHz audio.
        """
        y, sr = librosa.load(wav_path, sr=16000)
        mfccs = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=13)
        return np.mean(mfccs.T, axis=0) # Shape: (13,)

    @staticmethod
    def extract_pitch_contours(wav_path: str):
        """
        Extract basic pitch metadata to detect flat (monotone) voice.
        """
        y, sr = librosa.load(wav_path, sr=16000)
        pitches, magnitudes = librosa.piptrack(y=y, sr=sr)
        
        # very simplified pitch extraction average
        mask = magnitudes > np.median(magnitudes)
        if np.any(mask):
            pitch_mean = np.mean(pitches[mask])
        else:
            pitch_mean = 0.0
        return pitch_mean

    @staticmethod
    def calculate_articulation_rate(total_duration: float, vad_timestamps: list):
        """
        Calculate speech syllables per second by stripping exact silence.
        """
        if not vad_timestamps:
            return 0.0
            
        speech_time_ms = sum([ts['end'] - ts['start'] for ts in vad_timestamps])
        speech_time_sec = speech_time_ms / 16000.0  # Assumes 16000 sample rate
        
        return total_duration / speech_time_sec if speech_time_sec > 0 else 0.0
