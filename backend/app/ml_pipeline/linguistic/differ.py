import jiwer
import difflib

class Differ:
    @staticmethod
    def compute_wer_metrics(whisper_transcript: str, ground_truth_text: str):
        """
        Phase 1:jiwer implementation for Word Error Rate and categorization.
        """
        # Normalize both strings
        gt = ground_truth_text.strip().lower()
        hyp = whisper_transcript.strip().lower()

        if not gt:
            return {
                "accuracy_percentage": 0.0,
                "wer": 1.0,
                "insertions": len(hyp.split()),
                "deletions": 0,
                "substitutions": 0,
                "hits": 0,
                "opcodes": []
            }

        # Compute WER and other metrics
        out = jiwer.process_words(gt, hyp)
        
        # Accuracy can be defined as (1 - WER) capped at 0
        accuracy = max(0, 1 - out.wer) * 100

        # Calculate opcodes for frontend heatmap using difflib
        s = difflib.SequenceMatcher(None, gt.split(), hyp.split())
        opcodes = s.get_opcodes()

        return {
            "accuracy_percentage": round(accuracy, 2),
            "wer": round(out.wer, 4),
            "mer": round(out.mer, 4),
            "wil": round(out.wil, 4),
            "insertions": out.insertions,
            "deletions": out.deletions,
            "substitutions": out.substitutions,
            "hits": out.hits,
            "opcodes": opcodes
        }

    @staticmethod
    def compute_accuracy_difflib(whisper_transcript: str, ground_truth_text: str):
        """
        Legacy compatibility wrapper.
        """
        return Differ.compute_wer_metrics(whisper_transcript, ground_truth_text)
