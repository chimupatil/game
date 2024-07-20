const quizData = [
  {
    question: 'What is the father of HTML?',
    options: ['Tim Berners-Lee', 'Guido van Rossum', 'James Gosling', 'Larry Wall'],
    answer: 'Tim Berners-Lee',
  },
  {
    question: 'Who is the main father of computer?',
    options: ['Charles Babbage', 'Dennis Ritchie ', ' Federico Faggin', 'Alan Turing '],
    answer: 'Charles Babbage',
  },
  {
    question: 'Who is the first founder of navy?',
    options: ['Chhatrapati Shivaji Maharaj', 'Baji Prabhu Deshpande', 'Tanaji Malusare', 'Baji Pasalkar'],
    answer: 'Chhatrapati Shivaji Maharaj',
  },
  {
    question: 'What is the tallest mountain in the world?',
    options: ['Mount Everest', 'K2', 'Kangchenjunga', 'Makalu'],
    answer: 'Mount Everest',
  },
  {
    question: 'which is the largest country in the world?',
    options: [
      'Russia',
      'Japan',
      'France',
      'America',
    ],
    answer: 'Russia',
  },
  {
    question: 'what is the element symbol of sodium?',
    options: ['o', 'Na', 'K', 'c'],
    answer: 'Na',
  },
  {
    question: 'Who was the founder of India?',
    options: [
      'Keshav Baliram Hedgewar',
      ' Mohan Singh',
      'Chhatrapati Shivaji Maharaj',
      'Vasco da Gama',
    ],
    answer: 'Vasco da Gama',
  },
  {
    question: 'Which state is known as the IT hub of India?',
    options: ['Maharashtra', 'Karnataka', 'Tamil', 'Hyderabad'],
    answer: 'Karnataka',
  },
  {
    question: 'who is developed python?',
    options: [
      'Dennis Ritchie',
      'Larry Wall ',
      'Guido van Rossum',
      'Rasmus Lerdorf',
    ],
    answer: 'Guido van Rossum',
  },
  {
    question: 'Who is the No 1 education state in India?',
    options: ['Maharashtra', 'Karnataka', 'Tamil', 'Kerala'],
    answer: 'Kerala',
  },
];

const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const submitButton = document.getElementById('submit');
const retryButton = document.getElementById('retry');
const showAnswerButton = document.getElementById('showAnswer');

let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function displayQuestion() {
  const questionData = quizData[currentQuestion];

  const questionElement = document.createElement('div');
  questionElement.className = 'question';
  questionElement.innerHTML = questionData.question;

  const optionsElement = document.createElement('div');
  optionsElement.className = 'options';

  const shuffledOptions = [...questionData.options];
  shuffleArray(shuffledOptions);

  for (let i = 0; i < shuffledOptions.length; i++) {
    const option = document.createElement('label');
    option.className = 'option';

    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'quiz';
    radio.value = shuffledOptions[i];

    const optionText = document.createTextNode(shuffledOptions[i]);

    option.appendChild(radio);
    option.appendChild(optionText);
    optionsElement.appendChild(option);
  }

  quizContainer.innerHTML = '';
  quizContainer.appendChild(questionElement);
  quizContainer.appendChild(optionsElement);
}

function checkAnswer() {
  const selectedOption = document.querySelector('input[name="quiz"]:checked');
  if (selectedOption) {
    const answer = selectedOption.value;
    if (answer === quizData[currentQuestion].answer) {
      score++;
    } else {
      incorrectAnswers.push({
        question: quizData[currentQuestion].question,
        incorrectAnswer: answer,
        correctAnswer: quizData[currentQuestion].answer,
      });
    }
    currentQuestion++;
    selectedOption.checked = false;
    if (currentQuestion < quizData.length) {
      displayQuestion();
    } else {
      displayResult();
    }
  }
}

function displayResult() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'inline-block';
  resultContainer.innerHTML = `Your score is ${score} out of ${quizData.length}!`;
}

function retryQuiz() {
  currentQuestion = 0;
  score = 0;
  incorrectAnswers = [];
  quizContainer.style.display = 'block';
  submitButton.style.display = 'inline-block';
  retryButton.style.display = 'none';
  showAnswerButton.style.display = 'none';
  resultContainer.innerHTML = '';
  displayQuestion();
}

function showAnswer() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'none';

  let incorrectAnswersHtml = '';
  for (let i = 0; i < incorrectAnswers.length; i++) {
    incorrectAnswersHtml += `
      <p>
        <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
        <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
        <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
      </p>
    `;
  }

  resultContainer.innerHTML = `
    <p>You scored ${score} out of ${quizData.length}!</p>
    <p>Incorrect Answers:</p>
    ${incorrectAnswersHtml}
  `;
}

submitButton.addEventListener('click', checkAnswer);
retryButton.addEventListener('click', retryQuiz);
showAnswerButton.addEventListener('click', showAnswer);

displayQuestion();