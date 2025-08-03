// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAIHLtA_9r40n7X3IYd4pSI7-ELz6N3Z_I",
  authDomain: "vcequiz.firebaseapp.com",
  projectId: "vcequiz",
  databaseURL: "https://vcequiz-default-rtdb.firebaseio.com",
  storageBucket: "vcequiz.appspot.com",
  messagingSenderId: "838646378494",
  appId: "1:838646378494:web:d0e51b1b378cb67427",
  measurementId: "G-W9L1EMK00M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
