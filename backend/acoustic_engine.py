import librosa
import numpy as np
import pickle
import os
from sklearn.ensemble import RandomForestClassifier

class AcousticEngine:
    def __init__(self, model_path="reading_archetype_rf.pkl"):
        self.model_path = model_path
        self.classifier = self._load_or_mock_classifier()

    def _load_or_mock_classifier(self):
        """
        4.10 Scikit-Learn (Random Forest)
        Loads a pre-trained Random Forest model or creates a dummy model for initial development.
        """
        if os.path.exists(self.model_path):
            with open(self.model_path, "rb") as f:
                return pickle.load(f)
        else:
            print("Pre-trained Archetype Classifier not found. Using Mock.")
            # Dummy mock logic
            return None

    def _extract_mfccs(self, wav_path: str):
        """
        Extract MFCCs from standard 16kHz audio.
        """
        y, sr = librosa.load(wav_path, sr=16000)
        mfccs = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=13)
        return np.mean(mfccs.T, axis=0) # Shape: (13,)

    def _extract_pitch_contours(self, wav_path: str):
        """
        Extract basic pitch metadata to detect flat (monotone) voice.
        """
        y, sr = librosa.load(wav_path, sr=16000)
        pitches, magnitudes = librosa.piptrack(y=y, sr=sr)
        
        # very simplified pitch extraction average
        pitch_mean = np.mean(pitches[magnitudes > np.median(magnitudes)])
        return pitch_mean

    def _calculate_articulation_rate(self, total_duration: float, vad_timestamps: list):
        """
        Calculate speech syllables per second by stripping exact silence.
        """
        if not vad_timestamps:
            return 0.0
            
        speech_time_ms = sum([ts['end'] - ts['start'] for ts in vad_timestamps])
        speech_time_sec = speech_time_ms / 16000.0  # Assumes 16000 sample rate
        
        return total_duration / speech_time_sec if speech_time_sec > 0 else 0.0

    def process_acoustic(self, wav_path: str, vad_timestamps: list):
        """
        Extract features, classify, and format into JSON struct.
        """
        y, sr = librosa.load(wav_path, sr=16000)
        total_duration = librosa.get_duration(y=y, sr=sr)
        
        mfccs = self._extract_mfccs(wav_path)
        pitch = self._extract_pitch_contours(wav_path)
        articulation = self._calculate_articulation_rate(total_duration, vad_timestamps)

        # Classify Archetype
        if self.classifier:
            # Assumes MFCC array matches training feature shape 
            archetype = self.classifier.predict([mfccs])[0]
        else:
            archetype = np.random.choice(["The Careful Decoder", "The Fluent Reader", "The Monotone Reciter"])

        return {
            "mfccs_mean": mfccs.tolist(),
            "pitch_contour_mean": pitch if not np.isnan(pitch) else 0.0,
            "articulation_rate": articulation,
            "reading_archetype": archetype
        }
