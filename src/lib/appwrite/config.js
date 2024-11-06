import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_nwKC5XjltWUotJe1VNg_kxMN9NCEE4g",
  authDomain: "igris-3632f.firebaseapp.com",
  projectId: "igris-3632f",
  storageBucket: "igris-3632f.appspot.com",
  messagingSenderId: "656052807599",
  appId: "1:656052807599:web:2ff6b6e155aa19b41e715a",
  measurementId: "G-FESXGQ1CGP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, signInWithPopup, db };
