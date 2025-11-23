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

// Step 4 – Show a Question on the Page
// We’ll need a function, e.g. loadQuestion(), that:

// Gets the current question from quizData.
// Updates #question-container with the question text.
// Loops over the options and creates a button for each.

function loadQuestion(index) {
  // Get the current question object
  const quizQuestion = quizData[index];
  console.log(quizQuestion); // should be an array
  console.log(index); // should be within range
  console.log(quizQuestion.question); // should be a question

  // Select buttons and containers
  const nextQuestionButton = document.getElementById("next-question");
  const questionContainer = document.getElementById("question-container");
  const optionsContainer = document.getElementById("options-container");

  // Clear out any old options before adding new ones
  questionContainer.innerHTML = "";

  // Load question into the questionContainer.
  questionContainer.innerHTML = quizQuestion.question;

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
    optionButton.addEventListener("click", () => selectOption(i));
    optionsContainer.appendChild(optionButton);
  });
}

// Step 5 – Handle the User’s Choice

// Wait for the DOM to load
// document.addEventListener("DOMContentLoaded", () => {
//   // Select buttons and containers
//   const nextQuestionButton = document.getElementById("next-question");
//   const questionContainer = document.getElementById("question-container");
//   const optionsContainer = document.getElementById("answers-container");

//   // Function to fetch and display a single random dog image
//   async function getQuestion() {
//     // Fetch data from the Dog API
//     const response = await fetch("https://dog.ceo/api/breeds/image/random");
//     const data = await response.json();

//     // Clear previous image
//     singleDogContainer.innerHTML = "";

//     // Create an image element and set its source
//     const img = document.createElement("img");
//     img.src = data.message;

//     // Append the image to the container
//     singleDogContainer.appendChild(img);
//   }

//   // Function to fetch and display multiple random dog images
//   async function getMultipleDogImages() {
//     // Fetch data from the Dog API (fetching 3 random images)
//     const response = await fetch("https://dog.ceo/api/breeds/image/random/3");
//     const data = await response.json();

//     // Clear previous images
//     multipleDogContainer.innerHTML = "";

//     // Iterate over the array of image URLs
//     data.message.forEach((imageUrl) => {
//       // Create an image element for each URL
//       const img = document.createElement("img");
//       img.src = imageUrl;

//       // Append each image to the container
//       multipleDogContainer.appendChild(img);
//     });
//   }

//   // Add event listeners to buttons
//   singleDogButton.addEventListener("click", getSingleDogImage);
//   multipleDogButton.addEventListener("click", getMultipleDogImages);
// });
