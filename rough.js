<script type="module">
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
    appId: "1:838646378494:web:d0e51b1b378cb674271aaf",
    measurementId: "G-W9L1EMK00M"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
</script>


<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Quiz Questions</title>
  <link rel="stylesheet" href="style.css">
  <style>
    body {
      margin: 0;
      font-family: 'Montserrat', sans-serif;
      background: #f9f9f9;
      color: #1a1a1a;
    }

    header {
      display: flex;
      align-items: center;
      padding: 10px 15px;
      background: #fff;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    }

    header img {
      height: 36px;
      max-width: 100%;
    }

    /* Quiz Box */
    .quiz-box {
      max-width: 600px;
      margin: 20px auto;
      background: #fff;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
      display: flex;
      flex-direction: column;
      height: 70vh;
      justify-content: space-between;
      width: 90%;
    }

    /* Progress Bar */
    .progress-bar {
      width: 100%;
      background: #eee;
      border-radius: 6px;
      overflow: hidden;
      margin-bottom: 15px;
      height: 10px;
    }

    .progress-fill {
      width: 0%;
      height: 100%;
      background: linear-gradient(90deg, #0061ff, #363795);
      transition: width 0.3s ease;
    }

    /* Timer */
    .timer {
      font-weight: bold;
      margin-bottom: 15px;
      color: #363795;
      font-size: 1rem;
    }

    /* Question */
    #question {
      font-size: 1.3rem;
      word-wrap: break-word;
      font-weight: 600;
      text-align: left;
      flex-grow: 1;
      margin-bottom: 15px;
    }

    /* Options at bottom */
    .options {
      margin-top: auto;
      display: flex;
      flex-direction: column;
    }

    .options button {
      display: block;
      width: 100%;
      background: #f5f5f5;
      padding: 14px;
      margin: 6px 0;
      border-radius: 6px;
      cursor: pointer;
      text-align: left;
      font-size: 1rem;
      border: 2px solid transparent;
      transition: background 0.3s ease, border 0.3s ease;
    }

    .options button:hover {
      background: #e0e7ff;
    }

    .options button.selected {
      background: linear-gradient(90deg, #0061ff, #363795);
      color: #fff;
      border: 2px solid #363795;
    }

    /* Next Button */
    button.next-btn {
      background: linear-gradient(90deg, #0061ff, #363795);
      color: #fff;
      padding: 14px;
      font-size: 1rem;
      font-weight: 600;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      margin-top: 10px;
      width: 100%;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    button.next-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0,0,0,0.15);
    }

    /* Responsive */
    @media (max-width: 480px) {
      .quiz-box {
        padding: 12px;
        height: 80vh;
      }
      #question {
        font-size: 1.1rem;
      }
      .options button {
        font-size: 0.95rem;
        padding: 12px;
      }
      button.next-btn {
        font-size: 0.9rem;
        padding: 12px;
      }
    }
  </style>
</head>
<body>
  <header>
    <img src="assets/logo.png" alt="VCE Logo">
  </header>

  <div class="quiz-box">
    <div>
      <div class="progress-bar">
        <div id="progress" class="progress-fill"></div>
      </div>
      <div class="timer">Time Left: <span id="time">20</span>s</div>
      <h2 id="question"></h2>
    </div>

    <div class="options" id="options"></div>
    <button class="next-btn" onclick="nextQuestion()">Next</button>
  </div>

  <script>
    let questions = [];
    let currentQuestion = 0;
    let score = 0;
    let timer;
    let selectedOption = null;
    const urlParams = new URLSearchParams(window.location.search);
    const topic = urlParams.get('topic');

    fetch("questions.json")
      .then(response => response.json())
      .then(data => {
        questions = data[topic.charAt(0).toUpperCase() + topic.slice(1)];
        showQuestion();
      });

    function startTimer() {
      let timeLeft = 20;
      document.getElementById("time").textContent = timeLeft;
      timer = setInterval(() => {
        timeLeft--;
        document.getElementById("time").textContent = timeLeft;
        if (timeLeft <= 0) {
          clearInterval(timer);
          nextQuestion();
        }
      }, 1000);
    }

    function showQuestion() {
      clearInterval(timer);
      startTimer();
      selectedOption = null;
      let q = questions[currentQuestion];
      document.getElementById("question").textContent = q.question;
      let optionsHtml = "";
      q.options.forEach((option) => {
        optionsHtml += `<button onclick="selectOption(this,'${option}')">${option}</button>`;
      });
      document.getElementById("options").innerHTML = optionsHtml;
      document.getElementById("progress").style.width = 
        ((currentQuestion+1)/questions.length)*100 + "%";
    }

    function selectOption(button, value) {
      document.querySelectorAll(".options button").forEach(btn => btn.classList.remove("selected"));
      button.classList.add("selected");
      selectedOption = value;
    }

    function nextQuestion() {
      if (selectedOption && selectedOption === questions[currentQuestion].answer) {
        score++;
      }
      currentQuestion++;
      if (currentQuestion < questions.length) {
        showQuestion();
      } else {
        window.location.href = `score.html?score=${score}&total=${questions.length}&topic=${topic}`;
      }
    }
  </script>
</body>
</html>
