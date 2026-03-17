import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// from .env file
const firebaseConfig = {
  apiKey: "AIzaSyDh3_mnKObOCzdWvmK8LtugPfJtupzPt4c",
  authDomain: "university-system-9c6a3.firebaseapp.com",
  projectId: "university-system-9c6a3",
  storageBucket: "university-system-9c6a3.firebasestorage.app",
  messagingSenderId: "955653929381",
  appId: "1:955653929381:web:48b3866303ba4f1030904c",
  measurementId: "G-7LX91N602N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export instances
export const auth = getAuth(app);
export const db = getFirestore(app);
