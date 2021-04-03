const number = document.querySelectorAll('.number');
const output = document.querySelector('.output');
const operation = document.querySelectorAll('.operation');
const cl = document.querySelectorAll('.cl');
const equal = document.querySelector('.equal');
let memory = 0;
let newInput = true;

//event listeners
window.addEventListener('load', defultOutput);

number.forEach((num) => {
  num.addEventListener('click', selectNumber);
  num.addEventListener('mousedown', mouseDown);
  num.addEventListener('mouseup', mouseUp);
});

operation.forEach((operator) => {
  operator.addEventListener('click', selectOperation);
});

cl.forEach((item) => {
  item.addEventListener('click', selectOption);
});

//functions
function selectOption(e) {
  if (e.currentTarget.dataset.option === 'clear') {
    defultOutput();
    memory = 0;
  }
  if (e.currentTarget.dataset.option === 'delete') {
    let textOutput = output.textContent;
    let newOutput = textOutput.slice(0, textOutput.length - 1);
    output.textContent = newOutput;
  }
}

function defultOutput() {
  output.textContent = 0;
}
function mouseDown(e) {
  e.currentTarget.style.backgroundColor = 'blue';
}
function mouseUp(e) {
  e.currentTarget.style.backgroundColor = '';
}
function selectNumber(e) {
  let num = e.currentTarget.id;
  if (newInput) {
    output.textContent = num;
  } else if (output.textContent === '0') {
    output.textContent = num;
  } else {
    output.textContent += num;
  }
  newInput = false;
}

function selectOperation(e) {
  newInput = true;
  let operatorFn = e.currentTarget.dataset.operator;
  let newNum = parseInt(output.textContent.trim());

  if (operatorFn === 'add') {
    memory += newNum;
  } else if (operatorFn === 'subtract') {
    memory -= newNum;
  }
  output.textContent = memory;
}
