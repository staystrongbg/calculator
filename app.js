const calculator = {
  displayValue: '0',
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null,
};
//(2)
function inputDigit(digit) {
  const { displayValue, waitingForSecondOperand } = calculator;
  if (waitingForSecondOperand === true) {
    calculator.displayValue = digit;
    calculator.waitingForSecondOperand = false;
  } else {
    calculator.displayValue =
      displayValue === '0' ? digit : displayValue + digit;
  }
  console.log(calculator);
}
//input decimal(4)
//test da li objeklat kalkulator ima vrednost propsa vec nema '.' pa dodajemo tacku ako je true
function inputDecimal(dot) {
  if (calculator.waitingForSecondOperand === true) {
    calculator.displayValue = '0';
    calculator.waitingForSecondOperand = false;
  }
  if (!calculator.displayValue.includes(dot)) {
    calculator.displayValue += dot;
  }
}
//initialDisplayValue(1)
function updateDisplay() {
  const display = document.querySelector('.calculator-screen');
  display.value = calculator.displayValue;
}
updateDisplay();

//get operators working
function handleOperator(nextOperator) {
  const { firstOperand, operator, displayValue } = calculator;
  const inputValue = parseFloat(displayValue);
  if (operator && calculator.waitingForSecondOperand) {
    calculator.operator = nextOperator;
    console.log(calculator);
    return;
  }
  if (firstOperand === null && !isNaN(inputValue)) {
    calculator.firstOperand = inputValue;
  } else if (operator) {
    const result = calculate(firstOperand, inputValue, operator);
    calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
    calculator.firstOperand = result;
  }
  calculator.waitingForSecondOperand = true;
  calculator.operator = nextOperator;
  console.log(calculator);
}
//5 calculate
function calculate(firstOperand, secondOperand, operator) {
  if (operator === '+') {
    return firstOperand + secondOperand;
  } else if (operator === '-') {
    return firstOperand - secondOperand;
  } else if (operator === '*') {
    return firstOperand * secondOperand;
  } else if (operator === '/') {
    return firstOperand / secondOperand;
  }
  return secondOperand; //defo opcija ako pritinem jednako
}
function resetCalculator() {
  calculator.displayValue = '0';
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
  console.log(calculator);
}

const keys = document.querySelector('.calculator-keys');
//mouseupdown
const btns = keys.querySelectorAll('.btn');
btns.forEach((btn) => {
  btn.addEventListener(
    'mousedown',
    (mouseDown = () => {
      btn.style.backgroundColor = '#4e9ed4';
    })
  );
  btn.addEventListener(
    'mouseup',
    (mouseUp = () => {
      btn.style.backgroundColor = '';
    })
  );
});
//(3)
//event delegation
//listening for events on parent element of many children
keys.addEventListener('click', (e) => {
  const { target } = e;
  const { value } = target;
  //check if clicked ele is button if not exit func
  if (!target.matches('button')) {
    return;
  }
  switch (value) {
    case '+':
    case '-':
    case '*':
    case '/':
    case '=':
      handleOperator(value);
      break;
    case '.':
      inputDecimal(value);
      break;
    case 'all-clear':
      resetCalculator();
      break;
    default:
      // check if the key is an integer
      if (Number.isInteger(parseFloat(value))) {
        inputDigit(value);
      }
  }

  updateDisplay();
});
