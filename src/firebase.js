// Import Firebase
import { initializeApp } from "firebase/app";

// Auth
import { getAuth } from "firebase/auth";

// Firestore Database
import { getFirestore } from "firebase/firestore";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBMTbpMXF4a0QO0OpoykaN179pChEVvWhw",
  authDomain: "nn-creation-59d96.firebaseapp.com",
  projectId: "nn-creation-59d96",
  storageBucket: "nn-creation-59d96.firebasestorage.app",
  messagingSenderId: "870807936488",
  appId: "1:870807936488:web:affff06123fffaf785c585d",
  measurementId: "G-RGGWC9HJXV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Auth
export const auth = getAuth(app);

// Export Firestore
export const db = getFirestore(app);