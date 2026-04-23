from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import create_access_token
from app.database.mongo import mongo
import traceback

auth_bp = Blueprint("auth", __name__)

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

        hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")
        user_id = mongo.db.users.insert_one({
            "email": email,
            "password": hashed_password
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
