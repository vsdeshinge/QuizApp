// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Firebase config
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyAIHLtA_9r40n7X3IYd4pSI7-ELz6N3Z_I",
    authDomain: "vcequiz.firebaseapp.com",
    databaseURL: "https://vcequiz-default-rtdb.firebaseio.com",
    projectId: "vcequiz",
    storageBucket: "vcequiz.firebasestorage.app",
    messagingSenderId: "838646378494",
    appId: "1:838646378494:web:45c097b7715b733b271aaf",
    measurementId: "G-N6YSBQCNH3"
  };

  // Initialize Firebase

  const analytics = getAnalytics(app);
// Import Firebase


// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app);

// DOM elements
const question = document.getElementById("question");
const opt1 = document.getElementById("opt1");
const opt2 = document.getElementById("opt2");
const opt3 = document.getElementById("opt3");
const opt4 = document.getElementById("opt4");
const ans = document.getElementById("ans");
const pushBtn = document.getElementById("pushBtn");
const output = document.getElementById("output");

// Push quiz to Firestore
pushBtn.addEventListener("click", async () => {
    try {
        await addDoc(collection(db, "quiz"), {
            question: question.value,
            opt1: opt1.value,
            opt2: opt2.value,
            opt3: opt3.value,
            opt4: opt4.value,
            ans: ans.value
        });
        alert("✅ Quiz added successfully!");
        question.value = opt1.value = opt2.value = opt3.value = opt4.value = ans.value = "";

        // Fetch updated quizzes
        fetchQuizzes();

    } catch (error) {
        alert("❌ Error adding quiz: " + error.message);
    }
});

// Fetch quizzes from Firestore
async function fetchQuizzes() {
    output.innerHTML = "";
    const querySnapshot = await getDocs(collection(db, "quiz"));
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        output.innerHTML += `
          <div style="background:#f1f1f1; padding:10px; margin:5px;">
            <h4>${data.question}</h4>
            <p>1️⃣ ${data.opt1}</p>
            <p>2️⃣ ${data.opt2}</p>
            <p>3️⃣ ${data.opt3}</p>
            <p>4️⃣ ${data.opt4}</p>
            <strong>✅ Answer:</strong> ${data.ans}
          </div>
        `;
    });
}

// Load existing quizzes on page load
fetchQuizzes();
