import os
from flask import Flask
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt
from dotenv import load_dotenv

from app.database.mongo import mongo

bcrypt = Bcrypt()
jwt = JWTManager()

def create_app():
    load_dotenv()
    
    app = Flask(__name__)
    
    # Config
    uri = os.environ.get("MONGO_URI")
    if uri and "mongodb.net/?" in uri:
        uri = uri.replace("mongodb.net/?", "mongodb.net/akshara?")
    
    app.config["MONGO_URI"] = uri
    app.config["JWT_SECRET_KEY"] = os.environ.get("JWT_SECRET_KEY", "super-secret-key")
    
    # Initialize Extensions
    from app.database.mongo import init_db
    init_db(app)
    bcrypt.init_app(app)
    jwt.init_app(app)
    
    # Register Blueprints
    from app.api.auth import auth_bp
    from app.api.passages import passages_bp
    from app.api.evaluate import evaluate_bp
    
    app.register_blueprint(auth_bp, url_prefix="/auth")
    app.register_blueprint(passages_bp, url_prefix="/passages")
    app.register_blueprint(evaluate_bp, url_prefix="/evaluate")
    
    return app
