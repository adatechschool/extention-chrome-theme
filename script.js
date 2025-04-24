
/*Timer*/

let timer = document.querySelector('.timer')

document.getElementById('timer').addEventListener("click", () => {
    if(getComputedStyle(timer).visibility != "hidden"){
        timer.style.visibility = "hidden";
      } else {
        timer.style.visibility = "visible";
      }
})

const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");
const display = document.getElementById("display");

let timerValue = 0;
let initialValue = 0;
let intervalId = null;
let isPaused = false;

function updateDisplay() {
  const minutes = Math.floor(timerValue / 60);
  const seconds = timerValue % 60;
  const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
  const formattedSeconds = seconds < 10 ? "0" + seconds : seconds;
  display.innerText = `${formattedMinutes}:${formattedSeconds}`;
}

startBtn.addEventListener("click", () => {
  // Récupère la valeur entrée au moment du clic
  initialValue = parseInt(document.getElementById("time").value, 10) * 60;

  if (isNaN(initialValue) || initialValue <= 0) {
    display.innerText = "Temps invalide";
    return;
  }

  timerValue = initialValue;
  updateDisplay();

  if (intervalId !== null) return;

  intervalId = setInterval(() => {
    if (!isPaused && timerValue > 0) {
      timerValue--;
      updateDisplay();
    }

    if (timerValue <= 0) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }, 1000);
});

pauseBtn.addEventListener("click", () => {
  if (intervalId === null) return;
  isPaused = !isPaused;
  pauseBtn.innerText = isPaused ? "Reprendre" : "Pause";
});

resetBtn.addEventListener("click", () => {
  clearInterval(intervalId);
  intervalId = null;
  timerValue = initialValue;
  updateDisplay();
  isPaused = false;
  pauseBtn.innerText = "Pause";
});


let calculator = document.querySelector('.calculator')

document.getElementById('calculator').addEventListener("click", () => {
    if(getComputedStyle(calculator).visibility != "hidden"){
        calculator.style.visibility = "hidden";
      } else {
        calculator.style.visibility = "visible";
      }
})


/*calculette*/
/* Variables to store current input, previous input, and operator */
let currentInput = '';
let operator = '';
let previousInput = '';

/* Function to append numbers to the current input */
function appendNumber(number) {
  currentInput += number; // Append the clicked number to current input
  document.getElementById('display').value = currentInput; // Update the display
}

/* Function to set the operator and prepare for the next input */
function setOperator(op) {
  operator = op; // Store the chosen operator
  previousInput = currentInput; // Store the current input as previous
  currentInput = ''; // Clear the current input for the next number
}

/* Function to perform the calculation based on the operator */
function calculate() {
  let result;
  // Perform the appropriate operation based on the operator
  if (operator === '+') {
    result = parseFloat(previousInput) + parseFloat(currentInput);
  } else if (operator === '-') {
    result = parseFloat(previousInput) - parseFloat(currentInput);
  } else if (operator === '*') {
    result = parseFloat(previousInput) * parseFloat(currentInput);
  } else if (operator === '/') {
    result = parseFloat(previousInput) / parseFloat(currentInput);
  }
  document.getElementById('display').value = result; // Display the result
  currentInput = result.toString(); // Store the result as the new current input
  operator = ''; // Reset the operator
}

/* Function to clear the display and reset the calculator */
function clearDisplay() {
  currentInput = '';
  previousInput = '';
  operator = '';
  document.getElementById('display').value = ''; // Clear the display
}


function getDate () {
    const now = new Date();

    const options = { weekday: 'short', day: 'numeric' , month: 'long'};
    const dateFormat = new Intl.DateTimeFormat('fr-FR', options).format(now);

    return dateFormat
}

function getTime() {
    const now = new Date();
    const options = { hour: '2-digit', minute: '2-digit'};
    const timeFormat = new Intl.DateTimeFormat('fr-FR', options).format(now);

    return timeFormat
}

function updateDateTime() {
    const dateDisplay = document.querySelector("#date");
    const timeDisplay = document.querySelector("#time");

    dateDisplay.innerHTML = getDate()
    timeDisplay.innerHTML = getTime()
}

updateDateTime();
const dateTimeInterval = setInterval(updateDateTime, 1000);

