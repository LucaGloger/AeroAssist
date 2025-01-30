import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDHlLzeuICZLZ-QE6KiUgPDC32SFzlH1tk",
  authDomain: "aeroassist-cef60.firebaseapp.com",
  projectId: "aeroassist-cef60",
  storageBucket: "aeroassist-cef60.firebasestorage.com",
  messagingSenderId: "G-5KXTKELP8M",
  appId: "1:954504470831:web:620ce786ae8253e4b941da",
  measurementId: "G-5KXTKELP8M",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
