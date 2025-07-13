
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "kikqrcard.firebaseapp.com",
  projectId: "kikqrcard",
  storageBucket: "kikqrcard.appspot.com",
  messagingSenderId: "968254969606",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID, 
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
