let display = document.getElementById('display');
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
    
    history.push(currentInput + ' = ' + result);
    updateHistory();
    
    display.innerText = result;
    currentInput = result.toString();
  } catch (error) {
    display.innerText = 'Error';
    currentInput = '';
  }
}

function plusMinusFunc() {
  if (currentInput === '' || currentInput[0] === '-') {
    currentInput = currentInput.startsWith('-') ? currentInput.slice(1) : '-' + currentInput;
  } else {
    currentInput = '-' + currentInput;
  }
  display.innerText = currentInput;
}

function clearDisplay() {
  display.innerText = '0';
  currentInput = '';
}

function delFunc() {
  currentInput = currentInput.slice(0, -1);
  display.innerText = currentInput || '0';
}

/* History Panel Functions */
function toggleHistory() {
  const panel = document.getElementById('historyPanel');
  panel.style.display = (panel.style.display === 'none') ? 'flex' : 'none';
}

function updateHistory() {
  const historyList = document.getElementById('historyList');
  historyList.innerHTML = '';
  history.forEach((item) => {
    const div = document.createElement('div');
    div.className = 'history-item';
    div.innerText = item;
    historyList.appendChild(div);
  });
}

function clearHistory() {
  history = [];
  updateHistory();
}

/* Scientific Functions */
function squareRoot() { currentInput += 'sqrt('; display.innerText = currentInput; }
function sinFunc() { currentInput += 'sin('; display.innerText = currentInput; }
function cosFunc() { currentInput += 'cos('; display.innerText = currentInput; }
function tanFunc() { currentInput += 'tan('; display.innerText = currentInput; }
function asinFunc() { currentInput += 'asin('; display.innerText = currentInput; }
function acosFunc() { currentInput += 'acos('; display.innerText = currentInput; }
function atanFunc() { currentInput += 'atan('; display.innerText = currentInput; }
function lnFunc() { currentInput += 'log('; display.innerText = currentInput; }

function factorial(num) {
  if (num < 0) return "Error";
  return (num === 0 || num === 1) ? 1 : num * factorial(num - 1);
}

function factorialFunc() { currentInput += '!'; display.innerText = currentInput; }
function squareFunc() { currentInput += '^2'; display.innerText = currentInput; }
function cubeFunc() { currentInput += '^3'; display.innerText = currentInput; }

function combination(n, r) { return factorial(n) / (factorial(r) * factorial(n - r)); }
function permutation(n, r) { return factorial(n) / factorial(n - r); }
function combinationFunc() { currentInput += 'C'; display.innerText = currentInput; }
function permutationFunc() { currentInput += 'P'; display.innerText = currentInput; }

function piFunc() {
  currentInput += Math.PI.toFixed(4);
  display.innerText = currentInput;
}

function cubicRoot(num) { return Math.cbrt(num); }
function cubicRootFunc() { currentInput += '∛('; display.innerText = currentInput; }

/* Splash Screen Logic */
window.addEventListener('load', function () {
  const splashOverlay = document.getElementById('splashOverlay');
  const calculator = document.getElementById('calcContainer');

  setTimeout(function () {
      splashOverlay.style.display = 'none';
      calculator.style.display = 'grid'; 
  }, 5000); 
});