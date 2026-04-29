import os
import pickle
import numpy as np

class ArchetypeClassifier:
    def __init__(self, model_path=None):
        if model_path is None:
            # Default to the local_models directory within the pipeline
            base_dir = os.path.dirname(os.path.dirname(__file__))
            self.model_path = os.path.join(base_dir, "local_models", "rf_classifier.pkl")
        else:
            self.model_path = model_path
        self.classifier = self._load_or_mock_classifier()

    def _load_or_mock_classifier(self):
        """
        4.10 Scikit-Learn (Random Forest)
        """
        if os.path.exists(self.model_path):
            with open(self.model_path, "rb") as f:
                return pickle.load(f)
        else:
            print(f"Pre-trained Archetype Classifier not found at {self.model_path}. Using Mock.")
            return None

    def predict(self, mfccs):
        if self.classifier:
            return self.classifier.predict([mfccs])[0]
        else:
            return np.random.choice(["The Careful Decoder", "The Fluent Reader", "The Monotone Reciter"])
