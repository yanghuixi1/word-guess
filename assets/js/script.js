let startButton = document.querySelector(".start-button");
let wordBlanks = document.querySelector(".word-blanks");
let win = document.querySelector(".win");
let lose = document.querySelector(".lose");
let timerElement = document.querySelector(".timer-count");

let chosenWord = "";
let numBlanks = 0;
let winCounter = 0;
let loseCounter = 0;
let isWin = false;
let timer;
let timerCount;

// Array used to create blanks and letter on screen
let lettersInChosenWord = [];
let blanksLetters = [];

// Array of words the user will guess
let words = ["JavaScript", "happy", "tomorrow", "yesterday"];

// The init function is called when the page loads
function init() {
  getWins();
  getLosses();
}

// The startGame function is called when the start button is clicked
function startGame() {
  isWin = false;
  timerCount = 10;
  startButton.disabled = true;
  renderBlanks();
  startTimer();
}

function winGame() {
  wordBlanks.textContent = "YOU WON!!!";
  winCounter++;
  startButton.disabled = false;
  setWins();
}

function loseGame() {
  wordBlanks.textContent = "GAME OVER!";
  loseCounter--;
  startButton.disabled = false;
  setLosses();
}

function startTimer() {
  timer = setInterval(function () {
    timerCount--;
    timerElement.textContent = timerCount;
    if (timerCount >= 0) {
      if (isWin && timerCount > 0) {
        clearInterval(timer);
        winGame();
      }
    }

    if (timerCount === 0) {
      clearInterval(timer);
      loseGame();
    }
  }, 1000);
}

// Create blanks on screen
function renderBlanks() {
  chosenWord = words[Math.floor(Math.random() * words.length)];
  lettersInChosenWord = chosenWord.split("");
  numBlanks = lettersInChosenWord.length;
  blanksLetters = [];
  // Use loop to push blanks to blankLetters array
  for (let i = 0; i < numBlanks.length; i++) {
    blanksLetters.push("_");
  }
  wordBlanks.textContent = blanksLetters.join(" ");
}

function setWins() {
  win.textContent = winCounter;
  localStorage.setItem("winCount", winCounter);
}

function setLosses() {
  lose.textContent = loseCounter;
  localStorage.setItem("loseCount", loseCounter);
}

function getWins() {
  let storedWins = localStorage.getItem("winCount");
  if (storedWins === null) {
    winCounter = 0;
  } else {
    winCounter = storedWins;
  }
  win.textContent = winCounter;
}

function getLosses() {
  let storedLosses = localStorage.getItem("loseCount");
  if (storedLosses === null) {
    loseCounter === 0;
  } else {
    loseCounter === storedLosses;
  }
  lose.textContent = loseCounter;
}

function checkWin() {
  if (chosenWord === blankLetters.join("")) {
    isWin = true;
  }
}

function checkLetters(letter) {
  let letterInWord = false;
  for (let i = 0; i < numBlanks.length; i++) {
    if (chosenWord[i] === letter) {
      letterInWord = true;
    }
  }
  if (letterInWord) {
    for (let j = 0; j < numBlanks.length; j++) {
      if (chosenWord[j] === letter) {
        blankLetters[j] = letter;
      }
    }
    wordBlanks.textContent = blanksLetters.join(" ");
  }
}

// Attach event listen to document to listen for key event
document.addEventListener("keydown", function (event) {
  if (timerCount === 0) {
    return;
  }
  let key = event.key.toLowerCase();
  let alphabetNumericCharacters = "abcdefghijklmnopqrstuvwxyz0123456789 ";
  if (alphabetNumericCharacters.includes(key)) {
    let letterGuessed = event.key;
    checkLetters(letterGuessed);
    checkWin();
  }
});

// Attach event listener to start button to call startGame function on click

startButton.addEventListener("click", startGame);
init();

let resetButton = document.querySelector(".reset-button");

function resetGame() {
  winCounter = 0;
  loseCounter = 0;
  setWins();
  setLosses();
}

// Attached event listener to button
resetButton.addEventListener("click", resetGame);
