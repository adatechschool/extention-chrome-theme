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