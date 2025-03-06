const questionText = document.getElementById("question-text");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-button");

const restartButton = document.createElement("button");
restartButton.innerText = "Recomeçar";
restartButton.id = "restart-button";
restartButton.style.display = "none";
restartButton.addEventListener("click", startQuiz);
document.body.appendChild(restartButton);

const questions = [
    {
        question: "Qual linguagem é usada para estilizar páginas web?",
        answers: [
            { text: "HTML", correct: false },
            { text: "CSS", correct: true },
            { text: "JavaScript", correct: false },
            { text: "Python", correct: false }
        ]
    },
    {
        question: "O que significa HTML?",
        answers: [
            { text: "HyperText Markup Language", correct: true },
            { text: "HighText Machine Learning", correct: false },
            { text: "Hyper Transfer Markup Language", correct: false }
        ]
    },
    {
        question: "O JavaScript é uma linguagem de?",
        answers: [
            { text: "Estilização", correct: false },
            { text: "Programação", correct: true },
            { text: "Marcação", correct: false },
            { text: "Banco de dados", correct: false }
        ]
    },
    {
        question: "O CSS pode ser usado para alterar o layout de uma página? (V/F)",
        answers: [
            { text: "Verdadeiro", correct: true },
            { text: "Falso", correct: false }
        ]
    },
    {
        question: "O HTML é uma linguagem de programação? (V/F)",
        answers: [
            { text: "Verdadeiro", correct: false },
            { text: "Falso", correct: true }
        ]
    }
];

let shuffledQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let selectedButton = null;
let userAnswers = [];

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    selectedButton = null;
    userAnswers = [];
    nextButton.style.display = "none";
    restartButton.style.display = "none";

    shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);

    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = shuffledQuestions[currentQuestionIndex];
    questionText.innerText = currentQuestion.question;

    let shuffledAnswers = [...currentQuestion.answers].sort(() => Math.random() - 0.5);

    shuffledAnswers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        button.dataset.correct = answer.correct;

        button.addEventListener("click", () => selectAnswer(button));

        answerButtons.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = "none";
    answerButtons.innerHTML = "";
    selectedButton = null;
}

function selectAnswer(button) {
    if (selectedButton) {
        selectedButton.style.backgroundColor = "";
    }

    selectedButton = button;
    selectedButton.style.backgroundColor = "#87CEEB";

    nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
    if (!selectedButton) return;

    userAnswers.push(selectedButton.dataset.correct === "true");

    currentQuestionIndex++;
    if (currentQuestionIndex < 5) {
        showQuestion();
    } else {
        showResult();
    }
});

function showResult() {
    resetState();

    score = userAnswers.filter(answer => answer).length;
    questionText.innerText = `Você acertou ${score} de 5 perguntas!`;

    if (score >= 3) {
        let audio = new Audio("success.mp3");
        audio.play();
    } else {
        let audio = new Audio("fail.mp3");
        audio.play();
    }

    restartButton.style.display = "block";
}

document.addEventListener("DOMContentLoaded", () => {
    startQuiz();
});