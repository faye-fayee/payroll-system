from firebase_admin import auth
from fastapi import HTTPException
from app.firebase import db

def login_user(token: str):
    try:
        decoded_token = auth.verify_id_token(token)
        uid = decoded_token["uid"]
        email = decoded_token["email"]

        user_doc = db.collection("user").document(uid).get()

        if not user_doc.exists:
            raise HTTPException(status_code=404, detail="User not found")

        user_data = user_doc.to_dict()

        return {
            "message": "Login successful",
            "user": {
                "email": email,
                "role": user_data.get("role", "user")
            }
        }

    except auth.InvalidIdTokenError:
        raise HTTPException(status_code=401, detail="Invalid or expired token")