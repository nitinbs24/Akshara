import os
from flask_pymongo import PyMongo
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

# Initialize PyMongo instance
mongo = PyMongo()

def init_db(app):
    load_dotenv()
    uri = os.environ.get("MONGO_URI")
    
    # Simple check: if the URI is for a cluster but doesn't specify a DB, append 'akshara'
    if uri and "mongodb.net/?" in uri:
        uri = uri.replace("mongodb.net/?", "mongodb.net/akshara?")
             
    app.config["MONGO_URI"] = uri
    mongo.init_app(app)
    return mongo
