import os
import traceback
from datetime import datetime
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from bson import ObjectId

from app.database.mongo import mongo
from app.ml_pipeline.pre_processing.audio_converter import AudioConverter
from app.ml_pipeline.pre_processing.vad_filter import VADFilter
from app.ml_pipeline.linguistic import LinguisticEngine
from app.ml_pipeline.acoustic import AcousticEngine
from app.ml_pipeline.synthesis.aggregator import SynthesisAggregator
from app.utils.memory_manager import MemoryManager

evaluate_bp = Blueprint("evaluate", __name__)

# Initialize Engines
linguistic_engine = LinguisticEngine()
acoustic_engine = AcousticEngine()
aggregator = SynthesisAggregator()

TEMP_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "app", "temp_audio")

@evaluate_bp.route("/process-audio", methods=["POST"])
@jwt_required()
def process_audio():
    current_user_id = get_jwt_identity()
    webm_path, wav_path = None, None
    try:
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

        # 1. Pre-Processing
        AudioConverter.process_webm_to_wav(webm_path, wav_path)
        try:
            vad_timestamps = VADFilter.run_vad_on_wav(wav_path)
        except ValueError as ve:
            return jsonify({"error": "No human speech detected", "details": str(ve)}), 400
        
        # 2. Linguistic Engine (Branch A)
        linguistic_data = linguistic_engine.process_linguistic(wav_path, ground_truth_text)
        
        # 3. Acoustic Engine (Branch B)
        acoustic_data = acoustic_engine.process_acoustic(wav_path, vad_timestamps)
        
        # 4. Synthesis & Coaching
        user_profile = mongo.db.users.find_one({"_id": ObjectId(current_user_id)})
        final_report = aggregator.build_final_report(linguistic_data, acoustic_data, user_profile)
        
        # 4.5 Automated Level Advancement
        accuracy = linguistic_data.get("metrics", {}).get("accuracy_percentage", 0)
        current_level_str = user_profile.get("level", "Level 1 Reader")
        current_streak = user_profile.get("success_streak", 0)
        
        new_level_str = current_level_str
        new_streak = current_streak

        if accuracy >= 90:
            new_streak += 1
            if new_streak >= 3:
                # Level Up Logic
                levels = ["Level 1 Reader", "Level 2 Reader", "Level 3 Reader", "Level 4 Reader", "Level 5 Reader"]
                try:
                    idx = levels.index(current_level_str)
                    if idx < len(levels) - 1:
                        new_level_str = levels[idx + 1]
                        new_streak = 0 # Reset streak after level up
                except ValueError:
                    new_level_str = "Level 1 Reader"
        else:
            new_streak = 0 # Reset streak on poor performance

        if new_level_str != current_level_str or new_streak != current_streak:
            mongo.db.users.update_one(
                {"_id": ObjectId(current_user_id)},
                {"$set": {"level": new_level_str, "success_streak": new_streak}}
            )
        
        # 5. Persistence
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
        return jsonify({"error": "Internal server error occurred", "details": str(e), "trace": traceback.format_exc()}), 500

    finally:
        MemoryManager.cleanup_files([webm_path, wav_path])

@evaluate_bp.route("/history", methods=["GET"])
@jwt_required()
def get_history():
    current_user_id = get_jwt_identity()
    try:
        reports = list(mongo.db.reports.find({"user_id": current_user_id}).sort("timestamp", -1))
        for report in reports:
            report["_id"] = str(report["_id"])
        return jsonify(reports), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
