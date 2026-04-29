import os
import json
import torch
from transformers import pipeline

class LLMCoach:
    def __init__(self):
        # Phase 4: Local Open-Source LLM (Phi-3 Mini)
        print("Initializing local LLM Coach (Phi-3-mini)...")
        try:
            self.pipe = pipeline(
                "text-generation",
                model="microsoft/Phi-3-mini-4k-instruct",
                model_kwargs={"torch_dtype": torch.float16, "trust_remote_code": True},
                device_map="auto",
            )
        except Exception as e:
            print(f"Failed to load local LLM: {e}")
            self.pipe = None

    def generate_coaching_advice(self, unified_profile: dict, user_profile: dict = None) -> str:
        """
        Takes the unified JSON metrics and uses local Phi-3 to generate advice.
        """
        user_name = user_profile.get("full_name", "Student") if user_profile else "Student"
        user_level = user_profile.get("level", "Unknown Level") if user_profile else "Unknown Level"

        system_prompt = (
            f"You are an expert AI reading coach. You are coaching {user_name}, who is at the '{user_level}' reading stage. "
            "Review the following JSON reading diagnostic profile and provide 2-3 sentences of encouraging, personalized coaching advice. "
            f"Address the student by their name, {user_name}. Be concise."
        )
        
        user_content = f"JSON Profile Data: {json.dumps(unified_profile, indent=2)}"

        if not self.pipe:
            return f"Great effort, {user_name}! You read at a strong pace for a {user_level}, but try to focus on your tone variations."

        # Phi-3 Prompt Format
        messages = [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_content},
        ]

        try:
            # We use the prompt template for Phi-3
            prompt = f"<|system|>\n{system_prompt}<|end|>\n<|user|>\n{user_content}<|end|>\n<|assistant|>\n"
            
            outputs = self.pipe(
                prompt, 
                max_new_tokens=150, 
                do_sample=True, 
                temperature=0.7,
                top_k=50,
                top_p=0.95
            )
            
            generated_text = outputs[0]['generated_text']
            # Extract only the assistant's part
            if "<|assistant|>\n" in generated_text:
                advice = generated_text.split("<|assistant|>\n")[-1].strip()
            else:
                advice = generated_text
                
            return advice
        except Exception as e:
            return f"Great effort, {user_name}! Keep practicing to improve your fluency. (Coach offline: {str(e)})"
