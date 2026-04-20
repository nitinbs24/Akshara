import difflib

class Differ:
    @staticmethod
    def compute_accuracy_difflib(whisper_transcript: str, ground_truth_text: str):
        """
        3.8 Python difflib (SequenceMatcher) execution
        """
        s = difflib.SequenceMatcher(None, ground_truth_text.split(), whisper_transcript.split())
        opcodes = s.get_opcodes()

        # Calculate Accuracy % and WCPM loosely
        accuracy = s.ratio() * 100
        words_correct = sum(1 for tag, _, _, _, _ in opcodes if tag == 'equal')
        
        return {
            "accuracy_percentage": round(accuracy, 2),
            "words_correct": words_correct,
            "opcodes": opcodes
        }
