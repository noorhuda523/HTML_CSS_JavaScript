const categoryIDs = [9, 17, 18, 19, 23];
const quizContainer = document.getElementById("quiz-container");
const dropdowns = document.getElementById("dropdowns");
const questionBox = document.getElementById("question-box");
const startButton = document.getElementById("start-button");
const theme = document.getElementById("theme");

const selects = {};
["Category", "Type", "Difficulty"].forEach(label => {
  const id = label.toLowerCase();
  const wrapper = document.createElement("div");
  wrapper.className = "select-group";
  const select = document.createElement("select");
  select.id = id;
  const labelEl = document.createElement("label");
  labelEl.textContent = label;
  labelEl.setAttribute("for", id);

  wrapper.appendChild(labelEl);
  wrapper.appendChild(select);
  dropdowns.appendChild(wrapper);
  selects[id] = select;
});
function addOption(select, value, text) {
  if (![...select.options].some(opt => opt.value === value)) {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = text;
    select.appendChild(option);
  }
}
categoryIDs.forEach(id => {
  fetch(`https://opentdb.com/api.php?amount=20&category=${id}`)
    .then(res => res.json())
    .then(data => {
      const q = data.results[0];
      if (q) {
        addOption(selects.category, id, q.category);
        addOption(selects.type, q.type, q.type);
        addOption(selects.difficulty, q.difficulty, q.difficulty);
      }
    });
});
startButton.addEventListener("click", () => {
  const category = selects.category.value;
  const type = selects.type.value;
  const difficulty = selects.difficulty.value;

  startButton.style.display = "none";
  dropdowns.style.display = "none";
  const apiURL = `https://opentdb.com/api.php?amount=20&category=${category}&type=${type}&difficulty=${difficulty}`;
  fetch(apiURL)
    .then(res => res.json())
    .then(data => {
      if (data.results.length) {
        startQuiz(data.results);
      } else {
        questionBox.innerHTML = "<h2>No questions found.</h2>";
      }
    });
});
function startQuiz(questions) {
  let index = 0;
  let score = 0;
  let timer;

  function showQuestion() {
    clearInterval(timer);
    const q = questions[index];

    questionBox.innerHTML = `<div class="quiz-header">
      <div class="timer-box">Time left: <span id="timer">10</span></div>
    </div>
    <h3>${index + 1}. ${q.question}</h3>
    <ul class="option-list"></ul>
    <div class="quiz-bottom">
      <p>${index + 1} of ${questions.length} Questions</p>
      <button id="next-btn">Next</button>
    </div>`;
    const options = [...q.incorrect_answers, q.correct_answer];
    shuffle(options);
    const list = questionBox.querySelector(".option-list");

    options.forEach(opt => {
      const li = document.createElement("li");
      li.textContent = opt;
      li.addEventListener("click", () => handleAnswer(li, opt, q.correct_answer));
      list.appendChild(li);
    });

    document.getElementById("next-btn").addEventListener("click", nextQuestion);
    startTimer(10);
  }
  function handleAnswer(li, selected, correct) {
    clearInterval(timer);
    const allOptions = document.querySelectorAll(".option-list li");
    allOptions.forEach(opt => opt.style.pointerEvents = "none");

    if (selected === correct) {
      li.style.backgroundColor = "green";
      li.style.color = "white";
      score++;
    } else {
      li.style.backgroundColor = "red";
      li.style.color = "white";
      [...allOptions].find(o => o.textContent === correct).style.backgroundColor = "green";
    }
  }

  function startTimer(sec) {
    let time = sec;
    const timerEl = document.getElementById("timer");
    timerEl.textContent = time;

    timer = setInterval(() => {
      time--;
      timerEl.textContent = time;
      if (time <= 0) {
        clearInterval(timer);
        nextQuestion();
      }
    }, 1000);
  }

  function nextQuestion() {
    index++;
    if (index < questions.length) {
      showQuestion();
    } else {
      const highScore = localStorage.getItem("highScore") || 0;
      if (score > highScore) {
        localStorage.setItem("highScore", score);
      }
      questionBox.innerHTML = `<h2>Quiz Completed!</h2>
      <p>Score: ${score}/${questions.length}</p>
      <p>High Score: ${localStorage.getItem("highScore")}</p>
      <button id="restart-btn">Restart Quiz</button>`;

      document.getElementById("restart-btn").addEventListener("click", () => {
        location.reload();
      });
    }
  }
  showQuestion();
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

theme.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const currentTheme = document.body.classList.contains("dark-mode") ? "dark" : "light";
  localStorage.setItem("theme", currentTheme);
});
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  document.body.classList.add("dark-mode");
}
