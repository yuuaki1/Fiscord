import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC368Tnctq6toaoPeGReKZA-IgA46zvHWk",
  authDomain: "disclone-1.firebaseapp.com",
  projectId: "disclone-1",
  storageBucket: "disclone-1.appspot.com",
  messagingSenderId: "193730019353",
  appId: "1:193730019353:web:65e0646c6bc85e48d42a88"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)