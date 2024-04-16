let display = document.getElementById('display');
let historyDisplay = document.getElementById('history');
let currentInput = '';
let history = [];

function appendToDisplay(value) {
  currentInput += value;
  display.innerText = currentInput;
}

function calculate() {
    try {
      let result;
      if (currentInput.includes('C')) {
        // Extract n and r from the current input
        const [n, r] = currentInput.split('C');
        result = combination(parseInt(n), parseInt(r));
      } else if (currentInput.includes('P')) {
        // Extract n and r from the current input
        const [n, r] = currentInput.split('P');
        result = permutation(parseInt(n), parseInt(r));
      } else if (currentInput.includes('∛')) {
        // Extract the number inside the cubic root
        const num = currentInput.slice(currentInput.indexOf('(') + 1, currentInput.indexOf(')'));
        result = cubicRoot(parseFloat(num));
      } else {
        result = math.evaluate(currentInput);
      }
      display.innerText = result;
      history.push(currentInput + ' = ' + result); // Store calculation in history
      updateHistory(); // Update history display
      currentInput = '';
    } catch (error) {
      display.innerText = 'Error';
      currentInput = '';
    }
  }
  // Function to toggle between positive and negative sign
function plusMinusFunc() {
    // Check if the current input is empty or already has a negative sign
    if (currentInput === '' || currentInput[0] === '-') {
      // If empty or already negative, remove the negative sign or append it
      currentInput = currentInput.slice(1);
    } else {
      // If positive, add a negative sign to the beginning
      currentInput = '-' + currentInput;
    }
    // Update the display with the new input
    display.innerText = currentInput;
  }
  
function clearDisplay() {
  display.innerText = '0';
  currentInput = '';
}

function squareRoot() {
  currentInput += 'sqrt(';
  display.innerText = currentInput;
}

// Trigonometric functions
function sinFunc() {
  currentInput += 'sin(';
  display.innerText = currentInput;
}

function cosFunc() {
  currentInput += 'cos(';
  display.innerText = currentInput;
}

function tanFunc() {
  currentInput += 'tan(';
  display.innerText = currentInput;
}
// Add these functions to your script.js file

// Inverse trigonometric functions
function asinFunc() {
    currentInput += 'asin(';
    display.innerText = currentInput;
  }
  
  function acosFunc() {
    currentInput += 'acos(';
    display.innerText = currentInput;
  }
  
  function atanFunc() {
    currentInput += 'atan(';
    display.innerText = currentInput;
  }
  
function lnFunc() {
  currentInput += 'log(';
  display.innerText = currentInput;
}

function delFunc() {
  currentInput = currentInput.slice(0, -1); // Remove the last character
  display.innerText = currentInput;
}

// Factorial function
function factorial(num) {
  if (num === 0 || num === 1) {
    return 1;
  } else {
    return num * factorial(num - 1);
  }
}

// Function to append factorial symbol to the display
function factorialFunc() {
  currentInput += '!';
  display.innerText = currentInput;
}

// Function to calculate square
function square(num) {
  return num * num;
}

// Function to calculate cube
function cube(num) {
  return num * num * num;
}

// Function to append square symbol to the display
function squareFunc() {
  currentInput += '^2';
  display.innerText = currentInput;
}

// Function to append cube symbol to the display
function cubeFunc() {
  currentInput += '^3';
  display.innerText = currentInput;
}


// Combination (nCr) function
function combination(n, r) {
  return factorial(n) / (factorial(r) * factorial(n - r));
}

// Permutation (nPr) function
function permutation(n, r) {
  return factorial(n) / factorial(n - r);
}

// Function to append nCr symbol to the display
function combinationFunc() {
  currentInput += 'C';
  display.innerText = currentInput;
}

// Function to append nPr symbol to the display
function permutationFunc() {
  currentInput += 'P';
  display.innerText = currentInput;
}
function piFunc() {
    currentInput += 'pi';
    display.innerText = currentInput.replace('pi', Math.PI);
  }
  // Function to calculate cubic root
function cubicRoot(num) {
    return Math.cbrt(num);
  }
  
  // Function to append cubic root symbol to the display
  function cubicRootFunc() {
    currentInput += '∛(';
    display.innerText = currentInput;
  }
 // JavaScript to hide splash screen after a delay
 window.addEventListener('load', function () {
  var splashOverlay = document.getElementById('splashOverlay');
  var calculator = document.querySelector('.calculator');

  // Hide the splash screen after 2 seconds
  setTimeout(function () {
      splashOverlay.style.display = 'none';
      calculator.style.display = 'grid'; // Show the calculator
  }, 5000); // Adjust the delay as needed
});
function updateHistory() {
  historyDisplay.innerHTML = '';
  history.forEach((calculation, index) => {
    historyDisplay.innerHTML += `<div>${index + 1}. ${calculation}</div>`;
  });
}
