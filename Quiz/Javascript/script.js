const Questions = [
    {
        question: "What does HTML stand for?",
        options: ["Hyper Text Markup Language", "Hyperlinks and Text Markup Language", "Home Tool Markup Language", "Hyper Text Makeup Language"],
        answer: 0,
    },
    {
        question: "What does CSS stand for?",
        options: ["Computer Style Sheets", "Creative Style Sheets", "Cascading Style Sheets", "Colorful Style Sheets"],
        answer: 2,
    },
    {
        question: "Which selector targets classes?",
        options: ["#", "*", ".", "@"],
        answer: 2,
    },
    {
        question: "When an operator’s value is NULL, the typeof returned by the unary operator is:",
        options: ["Object", "Undefined", "Boolean", "Integer"],
        answer: 0,
    },
    {
        question: "Which of the following are closures in Javascript?",
        options: ["Variable", "Functions", "Objects", "All of the above"],
        answer: 3,
    },
];

const bgColors = [
    "#1e3a8a", "#1d4ed8", "#2563eb", "#3b82f6", "#60a5fa"];

let currentQuestion = 0, score = 0, timeRemaining = 300, timerInterval, startTime, selectedAnswer;

const startQuiz = () => {
    document.getElementById("welcomeContainer").classList.add("d-none");
    document.getElementById("resultsContainer").classList.add("d-none");
    document.getElementById("quizContainer").classList.remove("d-none");

    currentQuestion = 0; score = 0; timeRemaining = 300;
    startTime = Date.now();
    startTimer();
    loadQuestion();
};

const startTimer = () => {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeRemaining--;
        let min = Math.floor(timeRemaining / 60), sec = timeRemaining % 60;
        document.getElementById("timer").textContent = `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;

        if (timeRemaining <= 30) {
            document.getElementById("timer").classList.replace("text-dark", "text-danger");
        }

        if (timeRemaining <= 0) showResult();
    }, 1000);
};

const loadQuestion = () => {
    selectedAnswer = null;
    document.getElementById("nextBtn").disabled = true;
    const q = Questions[currentQuestion];

    // Background rotation uses the new blue colors
    document.body.style.backgroundColor = bgColors[currentQuestion % bgColors.length];

    document.getElementById("questionCounter").textContent = `Question ${currentQuestion + 1} of ${Questions.length}`;

    const progress = (currentQuestion / Questions.length) * 100;
    document.getElementById("progressBar").style.width = `${progress}%`;

    document.getElementById("questionText").textContent = q.question;

    let html = "";
    q.options.forEach((opt, i) => {
        html += `<button type="button" class="list-group-item list-group-item-action option-btn py-3 fs-5 rounded-3 mb-2 border shadow-sm" onclick="selectOption(${i})">${opt}</button>`;
    });
    document.getElementById("quizBody").innerHTML = html;
};

window.selectOption = (i) => {
    selectedAnswer = i;
    const options = document.querySelectorAll(".option-btn");
    options.forEach((o, idx) => {
        o.classList.toggle("selected", idx === i);
    });
    document.getElementById("nextBtn").disabled = false;
};

const handleNext = () => {
    const correct = Questions[currentQuestion].answer;
    const options = document.querySelectorAll(".option-btn");

    options.forEach(o => o.style.pointerEvents = "none");

    if (selectedAnswer === correct) {
        score++;
        options[selectedAnswer].classList.remove("selected");
        options[selectedAnswer].classList.add("bg-primary", "text-white", "fw-bold", "border-primary");
    } else {
        options[selectedAnswer].classList.remove("selected");
        options[selectedAnswer].classList.add("bg-danger", "text-white", "fw-bold", "border-danger");
        options[correct].classList.add("bg-primary", "text-white", "fw-bold", "border-primary");
    }

    setTimeout(() => {
        currentQuestion++;
        currentQuestion < Questions.length ? loadQuestion() : showResult();
    }, 1000);
};

const showResult = () => {
    clearInterval(timerInterval);
    document.body.style.backgroundColor = "#0f172a";

    document.getElementById("quizContainer").classList.add("d-none");
    document.getElementById("resultsContainer").classList.remove("d-none");

    document.getElementById("timer").classList.replace("text-danger", "text-dark");

    const percentage = Math.floor((score / Questions.length) * 100);

    const scoreElement = document.getElementById("finalScore");
    scoreElement.textContent = percentage + "%";

    scoreElement.className = `display-1 fw-bolder my-3 ${percentage >= 50 ? 'text-primary' : 'text-danger'}`;

    document.getElementById("correctCount").textContent = score;

    let taken = Math.floor((Date.now() - startTime) / 1000);
    document.getElementById("timeTaken").textContent = `${Math.floor(taken / 60)}m ${taken % 60}s`;

    const messageElement = document.getElementById("resultsMessage");
    messageElement.textContent = percentage >= 50 ? "Excellent Progress! 🎉" : "Keep Studying! 📚";
    messageElement.className = `mb-4 fw-bold ${percentage >= 50 ? 'text-primary' : 'text-danger'}`;
};

document.getElementById("startQuizBtn").onclick = startQuiz;
document.getElementById("nextBtn").onclick = handleNext;
document.getElementById("restartBtn").onclick = () => {
document.getElementById("resultsContainer").classList.add("d-none");
document.getElementById("welcomeContainer").classList.remove("d-none");
document.body.style.backgroundColor = bgColors[0];
document.getElementById("progressBar").style.width = `0%`;
};