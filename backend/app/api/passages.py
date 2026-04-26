from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity, verify_jwt_in_request
from app.database.mongo import mongo
from bson import ObjectId

passages_bp = Blueprint("passages", __name__)

LEVEL_MAP = {
    "Level 1 Reader": "A1",
    "Level 2 Reader": "A2",
    "Level 3 Reader": "B1",
    "Level 4 Reader": "B2",
    "Level 5 Reader": "C1"
}

@passages_bp.route("/", methods=["GET"])
def get_passages():
    try:
        # Optional JWT verification to support both guest and logged-in users
        user_id = None
        try:
            verify_jwt_in_request(optional=True)
            user_id = get_jwt_identity()
        except Exception:
            pass

        difficulty = request.args.get("difficulty")
        query = {}

        if difficulty:
            query["cefr_level"] = difficulty
        elif user_id:
            # Auto-select difficulty based on user level
            user = mongo.db.users.find_one({"_id": ObjectId(user_id)})
            if user and "level" in user:
                mapped_level = LEVEL_MAP.get(user["level"])
                if mapped_level:
                    query["cefr_level"] = mapped_level
        
        passages = list(mongo.db.passages.find(query))
        for p in passages:
            p["_id"] = str(p["_id"])
            
        return jsonify(passages), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@passages_bp.route("/<passage_id>", methods=["GET"])
def get_passage(passage_id):
    try:
        from bson.objectid import ObjectId
        passage = mongo.db.passages.find_one({"_id": ObjectId(passage_id)})
        if not passage:
            return jsonify({"error": "Passage not found"}), 404
            
        passage["_id"] = str(passage["_id"])
        return jsonify(passage), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
