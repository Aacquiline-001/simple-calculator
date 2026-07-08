let buttons = document.querySelectorAll('button');
const result = document.getElementById('result');

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function () {
        let value = buttons[i].textContent;
        handleClick(value);
    })
}

function handleClick(value) {
    switch (value) {
        case 'AC':
            clearAll();
            break;
        case 'DEL':
            deleteLast();
            break;
        case '+/-':
            toggleSign();
            break;
        case '=':
            calculate();
            break;
        case '+':
        case '-':
        case 'x':
        case '÷':
            setOperator(value);
            break;
        default:
            appendNumber(value);
    }
    updateDisplay();
}

let currentInput = '0';
let previousInput = '';
let operator = '';

function appendNumber(num) {
    if (currentInput === '0') {
        currentInput = num;
    } else {
        currentInput += num;
    }
}

function clearAll() {
    currentInput = '0';
    previousInput = '';
    operator = '';
}

function deleteLast() {
    currentInput = currentInput.slice(0, -1);
    if (currentInput === '') currentInput = '0';
}

function setOperator(op) {
    previousInput = currentInput;
    operator = op;
    currentInput = '0';
}

function calculate() {
    let prev = parseFloat(previousInput);
    let curr = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(curr)) return;

    if (operator === '+') currentInput = (prev + curr).toString();
    if (operator === '-') currentInput = (prev - curr).toString();
    if (operator === 'x') currentInput = (prev * curr).toString();
    if (operator === '÷') currentInput = (prev / curr).toString();

    operator = '';
    previousInput = '';
}

function toggleSign() {
    currentInput = (parseFloat(currentInput) * -1).toString();
}

function updateDisplay() {
    result.textContent = currentInput;
}

