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
        case '%':
            percentage();
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

let currentInput = '0';//current operand
let previousInput = '';//prev operand
let operator = '';
let display = '0';   //prev op current

function appendNumber(num) {
    if (currentInput === '0') {
        currentInput = num;
    } else {
        currentInput += num;
    }
    display = previousInput + operator + currentInput;
}

function clearAll() {
    currentInput = '0';
    previousInput = '';
    operator = '';
    display = '0';
}

function deleteLast() {
    currentInput = currentInput.slice(0, -1);
    if (currentInput === '') currentInput = '0';
    display = previousInput + operator + currentInput;
}

function setOperator(op) {
    previousInput = currentInput;
    operator = ' ' + op + ' ';
    currentInput = '';
    display = previousInput + operator;
}

function calculate() {
    let prev = parseFloat(previousInput);
    let curr = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(curr)) return;

    let answer;
    if (operator.includes('+')) answer = prev + curr;
    if (operator.includes('-')) answer = prev - curr;
    if (operator.includes('x')) answer = prev * curr;
    if (operator.includes('÷')) answer = prev / curr;

    display = previousInput + operator + currentInput + ' = ' + answer;

    currentInput = answer.toString();
    previousInput = '';
    operator = '';
}

function toggleSign() {
    currentInput = (parseFloat(currentInput) * -1).toString();
    display = previousInput + operator + currentInput;
}

function percentage() {
    currentInput = (parseFloat(currentInput) / 100).toString();
    display = previousInput + operator + currentInput;
}

function updateDisplay() {
    result.textContent = display;
    fitText();
}

function fitText() {
    const length = display.length;

    if (length > 12) {
        result.style.fontSize = '40px';
    } else if (length > 8) {
        result.style.fontSize = '60px';
    } else {
        result.style.fontSize = '100px';
    }
}


