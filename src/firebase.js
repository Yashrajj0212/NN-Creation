import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: "notes-sharing-app-f5d59",
  storageBucket: "notes-sharing-app-f5d59.firebasestorage.app",
  messagingSenderId: "329462346831",
  appId: "1:329462346831:web:a421a8bedeea40f007263a"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);