let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let selectedTopic = new URLSearchParams(window.location.search).get("topic");

document.addEventListener("DOMContentLoaded", () => {
  fetch("questions.json")
    .then(response => response.json())
    .then(data => {
      questions = data[selectedTopic.charAt(0).toUpperCase() + selectedTopic.slice(1)];
      document.getElementById("topic-title").textContent = selectedTopic.toUpperCase() + " QUIZ";
      showQuestion();
    });
});

function showQuestion() {
  let questionBox = document.getElementById("question-box");
  let optionsBox = document.getElementById("options");
  document.getElementById("next-btn").classList.add("hidden");

  let q = questions[currentQuestionIndex];
  questionBox.innerHTML = `<h2>${q.question}</h2>`;
  optionsBox.innerHTML = "";

  q.options.forEach(option => {
    let btn = document.createElement("button");
    btn.textContent = option;
    btn.classList.add("option-btn");
    btn.onclick = () => selectAnswer(btn, q.answer);
    optionsBox.appendChild(btn);
  });
}

function selectAnswer(button, correctAnswer) {
  let allButtons = document.querySelectorAll(".option-btn");
  allButtons.forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === correctAnswer) btn.classList.add("correct");
    else if (btn !== button) btn.classList.add("wrong");
  });

  if (button.textContent === correctAnswer) {
    button.classList.add("correct");
    score++;
  } else {
    button.classList.add("wrong");
  }

  document.getElementById("next-btn").classList.remove("hidden");
}

document.getElementById("next-btn").addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    // Redirect to scoreboard with score data
    window.location.href = `score.html?score=${score}&total=${questions.length}`;
  }
});
