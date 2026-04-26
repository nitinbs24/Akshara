from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from app.database.mongo import mongo
from bson import ObjectId
import traceback

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/profile", methods=["GET"])
@jwt_required()
def get_profile():
    try:
        user_id = get_jwt_identity()
        user = mongo.db.users.find_one({"_id": ObjectId(user_id)})
        if not user:
            return jsonify({"error": "User not found"}), 404
        
        return jsonify({
            "email": user.get("email"),
            "full_name": user.get("full_name", "New Student"),
            "level": user.get("level", "Level 1 Reader"),
            "dob": user.get("dob", "Not set")
        }), 200
    except Exception as e:
        print("--- PROFILE ERROR ---")
        traceback.print_exc()
        return jsonify({"error": "Internal server error"}), 500

@auth_bp.route("/register", methods=["POST"])
def register():
    # Access bcrypt from the app instance to avoid circular imports
    from app import bcrypt
    try:
        data = request.get_json()
        email = data.get("email")
        password = data.get("password")

        if not email or not password:
            return jsonify({"error": "Email and password are required"}), 400

        # Check if DB is connected
        if mongo.db is None:
            print("ERROR: MongoDB connection is None. Check your MONGO_URI.")
            return jsonify({"error": "Database connection error"}), 500

        if mongo.db.users.find_one({"email": email}):
            return jsonify({"error": "User already exists"}), 409

        full_name = data.get("full_name", "New Student")
        dob = data.get("dob", "Not set")

        hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")
        user_id = mongo.db.users.insert_one({
            "email": email,
            "password": hashed_password,
            "full_name": full_name,
            "dob": dob,
            "level": "Level 1 Reader"
        }).inserted_id

        access_token = create_access_token(identity=str(user_id))
        return jsonify({"message": "User registered successfully", "access_token": access_token}), 201

    except Exception as e:
        print("--- REGISTRATION ERROR ---")
        traceback.print_exc()
        return jsonify({"error": "Internal server error", "details": str(e)}), 500

@auth_bp.route("/login", methods=["POST"])
def login():
    from app import bcrypt
    try:
        data = request.get_json()
        email = data.get("email")
        password = data.get("password")

        if mongo.db is None:
            print("ERROR: MongoDB connection is None.")
            return jsonify({"error": "Database connection error"}), 500

        user = mongo.db.users.find_one({"email": email})
        if user and bcrypt.check_password_hash(user["password"], password):
            access_token = create_access_token(identity=str(user["_id"]))
            return jsonify({"access_token": access_token}), 200
        else:
            return jsonify({"error": "Invalid email or password"}), 401

    except Exception as e:
        print("--- LOGIN ERROR ---")
        traceback.print_exc()
        return jsonify({"error": "Internal server error", "details": str(e)}), 500
