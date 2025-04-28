const ADD_NAME = document.querySelector("#add-name");
const VALUE = document.querySelector("#name");
const USER_NAME = document.querySelector("#username");

const ADD_GOAL = document.querySelector("#add-goal");
const VALUE_GOAL = document.querySelector("#goal-name");
const GOAL = document.querySelector("#goal");

const FORM_NAME = document.querySelector("#form-name");
const FORM_GOAL = document.querySelector("#form-goal");

const getUserName = () => {
  ADD_NAME.addEventListener("click", () => {
    const newValue = VALUE.value;
    localStorage.setItem("name", newValue);
  });

  const storedName = localStorage.getItem("name");

  if (storedName === null || storedName === "") {
    USER_NAME.textContent = "Visiteur";
    FORM_NAME.style.display = "block";
  } else {
    USER_NAME.textContent = storedName;
    FORM_NAME.style.display = "none";
  }
};
getUserName();

const removeSpecificKey = () => {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  const timeToMidnight = tomorrow - now;

  setTimeout(() => {
    localStorage.removeItem("goal-name");
    addedGoal();
  }, timeToMidnight);
};

const addedGoal = () => {
  ADD_GOAL.addEventListener("click", () => {
    const newValue = VALUE_GOAL.value;
    localStorage.setItem("goal-name", newValue);
  });

  const goalName = localStorage.getItem("goal-name");

  if (goalName === null || goalName === "") {
    GOAL.textContent = "Aucun objectif aujourd'hui :'(";
    FORM_GOAL.style.display = "block";
  } else {
    GOAL.textContent = goalName;
    FORM_GOAL.style.display = "none";
  }
  removeSpecificKey();
};
addedGoal();

/*Timer*/

let timer = document.querySelector('.timer')

document.getElementById('timer').addEventListener("click", () => {
    if(getComputedStyle(timer).display != "none"){
        timer.style.display = "none";
      } else {
        timer.style.display = "block";
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
    if(getComputedStyle(calculator).display != "none"){
        calculator.style.display = "none";
      } else {
        calculator.style.display = "block";
      }
})


/*calculette*/
const afficher = document.getElementById('afficher'); // => on récupère l'écran de la calculette
let currentInput = '';
let operator = '';
let firstOperand = null;

// Ajouter les chiffres
document.querySelectorAll('[data-number]').forEach(button => { //Les attributs data- sont faits spécialement pour stocker des infos personnalisées dans un élément HTML.
  button.addEventListener('click', () => {
    currentInput += button.dataset.number; // pour récuperer la valeur du bouton
    updateAfficher();
  });
});

// Ajouter les opérateurs
document.querySelectorAll('[data-operator]').forEach(button => {
  button.addEventListener('click', () => {
    if (currentInput === '') return; // qd aucun chiffre n'a été sélectionné = pas d'opération

    if (firstOperand === null) {
      firstOperand = parseFloat(currentInput); // début de l'opération on entre un chiffre qui devient "firstOperand" au moment où on tape sur un opérateur
    } else {
      firstOperand = operate(firstOperand, parseFloat(currentInput), operator); //on poursuit une opération avec plusieurs nb
    }

    operator = button.dataset.operator;
    currentInput = ''; //on vide l'ecran
    updateAfficher(); //maj de l'affichage 
  });
});

// Bouton =
document.getElementById('equals').addEventListener('click', () => {
  if (operator && currentInput !== '') {
    const result = operate(firstOperand, parseFloat(currentInput), operator);
    currentInput = result.toString();
    operator = '';
    firstOperand = null;
    updateAfficher();
  }
});

// Bouton Clear
document.getElementById('clear').addEventListener('click', () => {
  currentInput = '';
  operator = '';
  firstOperand = null;
  updateAfficher();
});

// Fonctions utilitaires
function updateAfficher() {
  afficher.value = currentInput || '0';
}

function operate(a, b, op) { //permet de faire fonctionner la calculette
    switch (op) {
      case '+':
        return a + b;
      case '-':
        return a - b;
      case '*':
        return a * b;
      case '/':
        return b !== 0 ? a / b : 'Erreur'; // évite la division par zéro
      default:
        return b;
    }
  }


function getDate () {
    const now = new Date();

    const options1 = { weekday: 'short', day: 'numeric' , month: 'long'};
    const dateFormat = new Intl.DateTimeFormat('fr-FR', options1).format(now);

    return dateFormat
}

function getTime() {
    const now = new Date();

    const options = { hour: '2-digit', minute: '2-digit'};
    const timeFormat = new Intl.DateTimeFormat('fr-FR', options).format(now);

    console.log(timeFormat)

    return timeFormat
}

function updateDateTime() {
    const dateDisplay = document.querySelector("#dateDisplay");
    const timeDisplay = document.querySelector("#timeDisplay");

    dateDisplay.innerHTML = getDate()
    timeDisplay.innerHTML = getTime()
}

updateDateTime();
const dateTimeInterval = setInterval(updateDateTime, 1000);


/*Affichage du fond*/

async function getNewImage() {
    const response = await fetch('https://api.unsplash.com/search/photos/?query=landscape&client_id=0M7ImkuqWArg3q_NCzt1N1N5SJMi6rTi6bzd982Jx1Y'
)
    let randomNumber = Math.floor(Math.random()*10)
    const data = await response.json()
    
    const imageUrl = data.results[randomNumber].urls.full;
    document.body.style.backgroundImage = `url(${imageUrl})`;
}

getNewImage()

