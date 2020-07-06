const clearButton = document.getElementById('clear-btn');
const equalsButton = document.getElementById('equals');
const operatorButtons = document.querySelectorAll('.operator');
const displayText = document.querySelector('.display-text');

let currentOperator = null;
let previousOperator = null;
let number1 = null;
let number2 = null;
let answer = null;

displayText.textContent = 5;

clearButton.addEventListener('click', () => {
    currentOperator = null;
    previousOperator = null;
    number1 = null;
    number2 = null;
    updateDisplay('0');
    console.log('Values cleared and display reset.');
});

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        number1 = Number(getDisplayValue());
        currentOperator = button.textContent;
    });
});

equalsButton.addEventListener('click', () => {
    if (currentOperator) {
        number2 = Number(getDisplayValue());
        updateDisplay(operate(currentOperator, number1, number2));
        console.log(`${number1} ${currentOperator} ${number2} = ${getDisplayValue()}`);
        previousOperator = currentOperator;
        currentOperator = null;
    } else if (previousOperator) {
        number1 = Number(getDisplayValue());
        updateDisplay(operate(previousOperator, number1, number2));
        console.log(`${number1} ${previousOperator} ${number2} = ${getDisplayValue()}`);
    }
});

function getDisplayValue() {
    return displayText.textContent;
}

function updateDisplay(value) {
    displayText.textContent = value;
}

function add(number1, number2) {
    return number1 + number2;
}

function subtract(number1, number2) {
    return number1 - number2;
}

function multiply(number1, number2) {
    return number1 * number2;
}

function divide(number1, number2) {
    return number1 / number2;
}

function operate(operator, number1, number2) {
    switch(operator) {
        case '+':
            return add(number1, number2);
        case '−':
            return subtract(number1, number2);
        case '×':
            return multiply(number1, number2);
        case '÷':
            return divide(number1, number2);
        default:
            return 'Invalid operator';
    }
}
