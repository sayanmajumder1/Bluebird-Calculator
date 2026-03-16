let display = document.getElementById('display');
let historyList = document.getElementById('history-list');
let currentInput = '';
let history = [];

// NEW: Arrays to track our history states
let undoStack = [];
let redoStack = [];

// NEW: Core engine for Undo/Redo tracking
function updateState(newValue) {
  if (currentInput !== newValue) {
    undoStack.push(currentInput);
    redoStack = []; // Clears redo path if user makes a new choice
    currentInput = newValue;
    display.innerText = currentInput || '0';
  }
}

// NEW: Undo Logic
function undoFunc() {
  if (undoStack.length > 0) {
    redoStack.push(currentInput);
    currentInput = undoStack.pop();
    display.innerText = currentInput || '0';
  }
}

// NEW: Redo Logic
function redoFunc() {
  if (redoStack.length > 0) {
    undoStack.push(currentInput);
    currentInput = redoStack.pop();
    display.innerText = currentInput || '0';
  }
}

function toggleHistory() {
  const historyPanel = document.getElementById('history');
  historyPanel.classList.toggle('active');
}

function appendToDisplay(value) {
  updateState(currentInput + value);
}

function calculate() {
  try {
    let result;
    if (currentInput.includes('C')) {
      const [n, r] = currentInput.split('C');
      result = combination(parseInt(n), parseInt(r));
    } else if (currentInput.includes('P')) {
      const [n, r] = currentInput.split('P');
      result = permutation(parseInt(n), parseInt(r));
    } else if (currentInput.includes('∛')) {
      const num = currentInput.slice(currentInput.indexOf('(') + 1, currentInput.indexOf(')'));
      result = cubicRoot(parseFloat(num));
    } else {
      result = math.evaluate(currentInput);
    }
    
    let stringResult = result.toString();
    history.push(currentInput + ' = ' + stringResult); 
    updateHistory(); 
    
    // Save state after calculating
    updateState(stringResult);
  } catch (error) {
    display.innerText = 'Error';
    currentInput = '';
  }
}

function plusMinusFunc() {
  let tempInput;
  if (currentInput === '' || currentInput[0] === '-') {
    tempInput = currentInput.slice(1);
  } else {
    tempInput = '-' + currentInput;
  }
  updateState(tempInput);
}
  
function clearDisplay() {
  updateState('');
  document.getElementById('history').classList.remove('active');
}

function delFunc() {
  updateState(currentInput.slice(0, -1));
  document.getElementById('history').classList.remove('active');
}

function updateHistory() {
  historyList.innerHTML = ''; 
  history.forEach((calculation, index) => {
    historyList.innerHTML += `<div>${index + 1}. ${calculation}</div>`;
  });
}

function squareRoot() { updateState(currentInput + 'sqrt('); }
function sinFunc() { updateState(currentInput + 'sin('); }
function cosFunc() { updateState(currentInput + 'cos('); }
function tanFunc() { updateState(currentInput + 'tan('); }
function asinFunc() { updateState(currentInput + 'asin('); }
function acosFunc() { updateState(currentInput + 'acos('); }
function atanFunc() { updateState(currentInput + 'atan('); }
function lnFunc() { updateState(currentInput + 'log('); }

function factorial(num) {
  if (num === 0 || num === 1) { return 1; } 
  else { return num * factorial(num - 1); }
}

function factorialFunc() { updateState(currentInput + '!'); }
function square(num) { return num * num; }
function cube(num) { return num * num * num; }
function squareFunc() { updateState(currentInput + '^2'); }
function cubeFunc() { updateState(currentInput + '^3'); }
function combination(n, r) { return factorial(n) / (factorial(r) * factorial(n - r)); }
function permutation(n, r) { return factorial(n) / factorial(n - r); }
function combinationFunc() { updateState(currentInput + 'C'); }
function permutationFunc() { updateState(currentInput + 'P'); }

function piFunc() { updateState(currentInput + Math.PI.toFixed(8)); }
function eFunc() { updateState(currentInput + Math.E.toFixed(8)); } // The new e button logic

function cubicRoot(num) { return Math.cbrt(num); }
function cubicRootFunc() { updateState(currentInput + '∛('); }

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


  // Function to append exponential symbol to the display
function exponentialFunc() {
    currentInput += 'e';
    display.innerText = currentInput.replace('e', Math.E);
  }
 // JavaScript to hide splash screen after a delay

window.addEventListener('load', function () {
  var splashOverlay = document.getElementById('splashOverlay');
  var calculator = document.querySelector('.calculator');
  setTimeout(function () {
      splashOverlay.style.display = 'none';
      calculator.style.display = 'grid'; 
  }, 5000); 
});