import os
from datetime import datetime
from flask import Flask, request, jsonify
from flask_jwt_extended import JWTManager, jwt_required, get_jwt_identity, create_access_token
from flask_bcrypt import Bcrypt
from bson.objectid import ObjectId
import traceback
from dotenv import load_dotenv

from db import init_db, mongo
from audio_processor import AudioProcessor
from linguistic_engine import LinguisticEngine
from acoustic_engine import AcousticEngine
from aggregator import SynthesisAggregator

load_dotenv()

app = Flask(__name__)
bcrypt = Bcrypt(app)

# Initialize DB
init_db(app)

# Initialize ML Components
app.logger.info("Loading ML Models...")
linguistic_engine = LinguisticEngine()
acoustic_engine = AcousticEngine()
aggregator = SynthesisAggregator()
app.logger.info("ML Models Loaded Successfully.")

# Basic Configs
app.config["JWT_SECRET_KEY"] = os.environ.get("JWT_SECRET_KEY", "super-secret-key-change-me")
jwt = JWTManager(app)

# Ephemeral storage
TEMP_DIR = os.path.join(os.path.dirname(__file__), "tmp")
if not os.path.exists(TEMP_DIR):
    os.makedirs(TEMP_DIR)

@app.route("/register", methods=["POST"])
def register():
    try:
        data = request.get_json()
        email = data.get("email")
        password = data.get("password")

        if not email or not password:
            return jsonify({"error": "Email and password are required"}), 400

        if mongo.db.users.find_one({"email": email}):
            return jsonify({"error": "User already exists"}), 409

        hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")
        user_id = mongo.db.users.insert_one({
            "email": email,
            "password": hashed_password
        }).inserted_id

        access_token = create_access_token(identity=str(user_id))
        return jsonify({"message": "User registered successfully", "access_token": access_token}), 201

    except Exception as e:
        return jsonify({"error": "Internal server error", "details": str(e)}), 500

@app.route("/login", methods=["POST"])
def login():
    try:
        data = request.get_json()
        email = data.get("email")
        password = data.get("password")

        user = mongo.db.users.find_one({"email": email})
        if user and bcrypt.check_password_hash(user["password"], password):
            access_token = create_access_token(identity=str(user["_id"]))
            return jsonify({"access_token": access_token}), 200
        else:
            return jsonify({"error": "Invalid email or password"}), 401

    except Exception as e:
        return jsonify({"error": "Internal server error", "details": str(e)}), 500

@app.route("/passages", methods=["GET"])
def get_passages():
    try:
        difficulty = request.args.get("difficulty")
        query = {}
        if difficulty:
            query["cefr_level"] = difficulty
        
        passages = list(mongo.db.passages.find(query))
        for p in passages:
            p["_id"] = str(p["_id"])
            
        return jsonify(passages), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/passages/<passage_id>", methods=["GET"])
def get_passage(passage_id):
    try:
        passage = mongo.db.passages.find_one({"_id": ObjectId(passage_id)})
        if not passage:
            return jsonify({"error": "Passage not found"}), 404
            
        passage["_id"] = str(passage["_id"])
        return jsonify(passage), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/process-audio", methods=["POST"])
@jwt_required()
def process_audio():
    current_user_id = get_jwt_identity()
    webm_path, wav_path = None, None
    try:
        # 1. Validate inputs
        if "audio" not in request.files:
            return jsonify({"error": "No audio file provided"}), 400
        
        audio_file = request.files["audio"]
        ground_truth_text = request.form.get("ground_truth_text", "")
        
        if not audio_file.filename.endswith(".webm"):
            return jsonify({"error": "Only .webm files are accepted"}), 400

        # Save ephemeral .webm file
        webm_path = os.path.join(TEMP_DIR, f"temp_{os.urandom(8).hex()}.webm")
        wav_path = webm_path.replace(".webm", ".wav")
        audio_file.save(webm_path)

        # 2. Audio Pre-Processing (Phase 2)
        AudioProcessor.process_webm_to_wav(webm_path, wav_path)
        vad_timestamps = AudioProcessor.run_vad_on_wav(wav_path)
        
        # 3. Linguistic Engine (Branch A)
        linguistic_data = linguistic_engine.process_linguistic(wav_path, ground_truth_text)
        
        # 4. Acoustic Engine (Branch B)
        acoustic_data = acoustic_engine.process_acoustic(wav_path, vad_timestamps)
        
        # 5. Synthesis & Coaching
        final_report = aggregator.build_final_report(linguistic_data, acoustic_data)
        
        # Phase 4.13: MongoDB (NoSQL Database) Persistence
        report_to_save = {
            "user_id": current_user_id,
            "timestamp": datetime.utcnow(),
            "data": final_report
        }
        mongo.db.reports.insert_one(report_to_save)
        
        return jsonify({
            "status": "success",
            "message": "Audio processed successfully and report saved.",
            "data": final_report
        }), 200

    except Exception as e:
        app.logger.error(f"Error processing audio: {str(e)}\n{traceback.format_exc()}")
        return jsonify({"error": "Internal server error occurred", "details": str(e)}), 500

    finally:
        # Phase 4.14: Ephemeral Memory Manager
        for path in [webm_path, wav_path]:
            if path and os.path.exists(path):
                try:
                    os.remove(path)
                    app.logger.info(f"Deleted ephemeral file: {path}")
                except Exception as del_err:
                    app.logger.warning(f"Failed to delete ephemeral file {path}: {str(del_err)}")

if __name__ == "__main__":
    app.run(debug=True, port=5000)
