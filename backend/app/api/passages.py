from flask import Blueprint, request, jsonify
from app.database.mongo import mongo

passages_bp = Blueprint("passages", __name__)

@passages_bp.route("/", methods=["GET"])
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
