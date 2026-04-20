import os
import json
from anthropic import Anthropic

class LLMCoach:
    def __init__(self):
        # 12. LLM Coaching Layer (Claude API - claude-haiku)
        self.client = Anthropic(api_key=os.environ.get("ANTHROPIC_API_KEY", "mock-key"))

    def generate_coaching_advice(self, unified_profile: dict) -> str:
        """
        Takes the unified JSON metrics and sends to Claude-haiku for 2-3 sentences of advice.
        """
        system_prompt = "You are an expert AI reading coach. Review the following JSON reading diagnostic profile and provide 2-3 sentences of encouraging, personalized coaching advice based on the acoustic and linguistic features."
        user_content = f"JSON Profile Data: {json.dumps(unified_profile, indent=2)}"
        
        # If no valid API key is set, mock the coaching response.
        if self.client.api_key == "mock-key":
            return "(Mock) You read at a strong pace but your pitch stayed flat throughout — try varying your tone on question sentences."

        try:
            response = self.client.messages.create(
                model="claude-3-haiku-20240307",
                max_tokens=200,
                system=system_prompt,
                messages=[
                    {"role": "user", "content": user_content}
                ]
            )
            return response.content[0].text
        except Exception as e:
            return f"Failed to generate coaching advice. Error: {str(e)}"
