import os
import json

class LLMCoach:
    def __init__(self):
        # Phase 4: Local Open-Source LLM (Disabled Temporarily)
        print("Initializing LLM Coach (Mock Mode - Download Bypassed)...")
        self.pipe = None

    def generate_coaching_advice(self, unified_profile: dict, user_profile: dict = None) -> str:
        """
        Returns a mock response to bypass the large model download and allow testing of core features.
        """
        user_name = user_profile.get("full_name", "Student") if user_profile else "Student"
        user_level = user_profile.get("level", "Unknown Level") if user_profile else "Unknown Level"

        # Mock advice logic based on user data
        return f"Great effort, {user_name}! You are reading at the {user_level} stage. Your core diagnostic metrics have been calculated successfully — try focusing on maintaining a steady rhythm as you read. (Local LLM Coach currently in mock mode)."
