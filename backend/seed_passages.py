import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

def seed_passages():
    client = MongoClient(os.getenv("MONGO_URI"))
    db = client.akshara
    passages_col = db.passages

    sample_passages = [
        {
            "title": "The Big Red Bus",
            "text": "The big red bus went up the hill. It was a sunny day. Many people were on the bus.",
            "cefr_level": "A1",
            "lexile_score": 200,
            "topic": "Transportation"
        },
        {
            "title": "A Day at the Park",
            "text": "The park was filled with the scent of blooming flowers. Children were playing on the swings while their parents sat on wooden benches, enjoying the warm breeze.",
            "cefr_level": "A2",
            "lexile_score": 450,
            "topic": "Nature"
        },
        {
            "title": "The Future of Artificial Intelligence",
            "text": "Artificial intelligence is rapidly transforming various industries, from healthcare to finance. While it offers immense potential for efficiency, it also raises significant ethical concerns regarding privacy and automation.",
            "cefr_level": "B2",
            "lexile_score": 1100,
            "topic": "Technology"
        }
    ]

    # Clear existing and insert new
    passages_col.delete_many({})
    passages_col.insert_many(sample_passages)
    print("Passages collection seeded successfully!")

if __name__ == "__main__":
    seed_passages()
