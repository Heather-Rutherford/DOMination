// Step 3 – Plan the Data (The Questions)
// In JavaScript, we’ll store our questions in an array of objects.
// Each object will have:

// question: The text of the question.
// options: An array of possible answers.
// answer: The index of the correct option.

// Why this matters: This makes our quiz flexible —
// if you want to add 10 more questions, you just add more objects to the array.

const quizData = [
  {
    question: "Which array method adds an element to the end of an array?",
    options: ["push()", "pop()", "shift()", "unshift()"],
    answer: 0,
  },
  {
    question:
      "Which is the correct syntax to declare a variable in JavaScript?",
    options: [
      "set myVariable;",
      "let = myVariable;",
      "let myVariable;",
      "myVariable let;",
    ],
    answer: 2,
  },
  {
    question: "How do you write a conditional statement in JavaScript?",
    options: [
      "if condition {}",
      "if condition then {}",
      "if {condition}",
      "if (condition) {}",
    ],
    answer: 3,
  },
  {
    question:
      "Which loop will execute at least once even if the condition is false?",
    options: ["for loop", "while loop", "do...while loop", "foreach loop"],
    answer: 2,
  },
  {
    question: "How do you create an array in JavaScript?",
    options: [
      "var arr = [];",
      "var arr = {};",
      "var arr = ();",
      "var arr = <>;",
    ],
    answer: 0,
  },
];

let currentQuestionIndex = 0;
let score = 0;

// Select buttons and containers
const nextQuestionButton = document.getElementById("next-button");
const restartButton = document.getElementById("restart-button");
const questionContainer = document.getElementById("question-container");
const optionsContainer = document.getElementById("options-container");

// Step 4 – Show a Question on the Page
// We’ll need a function, e.g. loadQuestion(), that:

// Gets the current question from quizData.
// Updates #question-container with the question text.
// Loops over the options and creates a button for each.

function loadQuestion() {
  const index = currentQuestionIndex;
  const quizQuestion = quizData[index];
  if (nextQuestionButton.disabled === false) {
    // If next-button is enabled, disable it.
    nextQuestionButton.disabled = true;
  }
  // Get the current question object.
  const currentQuestion = quizData[currentQuestionIndex];

  // Clear out the old question before adding the new one.
  questionContainer.innerHTML = "";

  // Load the new question into the questionContainer.
  questionContainer.innerHTML = currentQuestion.question;

  // Guard clause: check if quizQuestion exists and has an options array
  if (!quizQuestion || !Array.isArray(quizQuestion.options)) {
    console.error("Invalid quiz question or options missing at index:", index);
    return;
  }

  // Clear out any old options before adding new ones
  optionsContainer.innerHTML = "";

  // Loop through options safely
  quizQuestion.options.forEach((option, i) => {
    const optionButton = document.createElement("button");
    optionButton.textContent = option;
    optionButton.id = `option-btn-${i}`;
    optionButton.addEventListener("click", () => selectOption(i));
    optionsContainer.appendChild(optionButton);
  });
}

// Step 5 – Handle the User’s Choice
function selectOption(option) {
  // Get the current question object
  const currentQuestion = quizData[currentQuestionIndex];
  const elementUserAnswer = document.getElementById(`option-btn-${option}`);
  const elementCorrectAnswer = document.getElementById(
    `option-btn-${currentQuestion.answer}`
  );
  if (option === currentQuestion.answer) {
    elementUserAnswer.style.backgroundColor = "#008000"; // Changes the text color to green
    score++;
  } else {
    elementUserAnswer.style.backgroundColor = "#ff0000"; // Changes the text color to red
    elementCorrectAnswer.style.backgroundColor = "#008000"; // Changes the correct answer text color to green
  }
  const buttons = optionsContainer.getElementsByTagName("button");
  // Loop through the buttons and set their disabled property to true
  for (let button of buttons) {
    button.disabled = true;
  }
  // Enable the Next button
  nextQuestionButton.disabled = false;
}

// Function to move to the next question
nextQuestionButton.onclick = () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < quizData.length) {
    loadQuestion();
    nextQuestionButton.disabled = true; // Hide the Next button
  } else {
    questionContainer.textContent = `Quiz Over! Your score is ${score}/${quizData.length}`;
    optionsContainer.innerHTML = ""; // Clear options
    nextQuestionButton.style.display = "none"; // Hide the Next button
    restartButton.style.display = "inline"; // Show the Restart button
  }
};

// Function to move to the next question
restartButton.onclick = () => {
  currentQuestionIndex = 0; // Reset question index
  score = 0; // Reset score
  if (currentQuestionIndex < quizData.length) {
    loadQuestion();
    nextQuestionButton.style.display = "inline"; // Show the Next button
    nextQuestionButton.disabled = true; // Hide the Next button
    restartButton.style.display = "none"; // Hide the Restart button
  }
};

// Initialize the quiz when the page loads
window.onload = function () {
  loadQuestion();
};
