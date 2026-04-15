import os
from flask import Flask, request, jsonify
from flask_jwt_extended import JWTManager, jwt_required, get_jwt_identity
import traceback

from audio_processor import AudioProcessor
from linguistic_engine import LinguisticEngine
from acoustic_engine import AcousticEngine
from aggregator import SynthesisAggregator

app = Flask(__name__)

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

@app.route("/process-audio", methods=["POST"])
# @jwt_required()  # TODO: Enable once auth is actually attached from Phase 0
def process_audio():
    # current_user = get_jwt_identity()
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
        
        return jsonify({
            "status": "success",
            "message": "Audio processed successfully.",
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
