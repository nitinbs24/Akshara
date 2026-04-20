import librosa
import numpy as np
from .features import AcousticFeatures
from .classifier import ArchetypeClassifier

class AcousticEngine:
    def __init__(self, model_path="reading_archetype_rf.pkl"):
        self.features = AcousticFeatures()
        self.classifier = ArchetypeClassifier(model_path)

    def process_acoustic(self, wav_path: str, vad_timestamps: list):
        """
        Extract features, classify, and format into JSON struct.
        """
        y, sr = librosa.load(wav_path, sr=16000)
        total_duration = librosa.get_duration(y=y, sr=sr)
        
        mfccs = self.features.extract_mfccs(wav_path)
        pitch = self.features.extract_pitch_contours(wav_path)
        articulation = self.features.calculate_articulation_rate(total_duration, vad_timestamps)

        archetype = self.classifier.predict(mfccs)

        return {
            "mfccs_mean": mfccs.tolist(),
            "pitch_contour_mean": float(pitch) if not np.isnan(pitch) else 0.0,
            "articulation_rate": float(articulation),
            "reading_archetype": archetype
        }
