import firebase_admin
from firebase_admin import credentials, firestore
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
cred = credentials.Certificate(os.path.join(BASE_DIR, "serviceAccountKey.json"))

firebase_admin.initialize_app(cred)

db = firestore.client(database_id="(default)")

try:
    collections = db.collections()
    col_list = [col.id for col in collections]
    print("All collections:", col_list)
except Exception as e:
    print("Error:", e)