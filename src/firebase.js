// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAHf7XYtMWLqhpNplUjysdY0q4-eBS5n0Q",
  authDomain: "lulusin-c7f27.firebaseapp.com",
  projectId: "lulusin-c7f27",
  storageBucket: "lulusin-c7f27.firebasestorage.app",
  messagingSenderId: "378840974208",
  appId: "1:378840974208:web:3f6e62ecfe6cf52053b765",
  measurementId: "G-YWT3CD0GTJ",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);

export default app;
