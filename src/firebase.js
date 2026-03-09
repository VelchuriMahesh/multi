// Firebase core
import { initializeApp } from "firebase/app";

// Firebase services you will use
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCKVHobqX6CslR5g7lEpe5VoYVWrQyHm7Q",
  authDomain: "real-estate-site-9ae67.firebaseapp.com",
  projectId: "real-estate-site-9ae67",
  storageBucket: "real-estate-site-9ae67.firebasestorage.app",
  messagingSenderId: "641663124688",
  appId: "1:641663124688:web:af810be750afd96e0c4ad5",
  measurementId: "G-4Q5SDD88XC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firestore Database
export const db = getFirestore(app);

// Authentication
export const auth = getAuth(app);

// Storage (for property images)
export const storage = getStorage(app);