from .llm_coach import LLMCoach

class SynthesisAggregator:
    def __init__(self):
        self.coach = LLMCoach()

    def compile_json_profile(self, linguistic_data, acoustic_data):
        """
        4.11 JSON Aggregator: Merges Branch A and Branch B outputs.
        """
        profile = {
            "linguistic": linguistic_data,
            "acoustic": acoustic_data
        }
        return profile

    def build_final_report(self, linguistic_data, acoustic_data, user_profile=None):
        profile = self.compile_json_profile(linguistic_data, acoustic_data)
        coaching_text = self.coach.generate_coaching_advice(profile, user_profile)
        
        return {
            "diagnostic_profile": profile,
            "coaching_advice": coaching_text
        }
