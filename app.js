const clearButton = document.getElementById('clear-btn');
const equalsButton = document.getElementById('equals-btn');
const operatorButtons = document.querySelectorAll('.operator-btn');
const numberButtons = document.querySelectorAll('.num-btn');
const displayText = document.querySelector('.display-text');

let currentOperator = null;
let previousOperator = null;
let operatorJustPressed = false;
let number1 = null;
let number2 = null;

clearButton.addEventListener('click', () => {
    currentOperator = null;
    previousOperator = null;
    number1 = null;
    number2 = null;
    updateDisplay('0');

    console.groupCollapsed('Clear Button');
    console.log(`Values: ${currentOperator} ${previousOperator} ${number1} ${number2}`)
    console.log(`Display Value: ${getDisplayValue()}`)
    console.log('Values cleared and display reset.');
    console.groupEnd('Clear Button');
});

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        number1 = Number(getDisplayValue());
        currentOperator = button.textContent;
        operatorJustPressed = true;

        console.groupCollapsed(`Operator ${button.textContent} Button`);
        console.log(`Number1: ${number1}`);
        console.log(`Current Operator: ${currentOperator}`);
        console.log('Number1 and operator set.')
        console.groupEnd();
    });
});

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (getDisplayValue().includes('.') && button.textContent === '.') return;
        if ((getDisplayValue() === '0' || operatorJustPressed) && button.textContent !== '.') {
            updateDisplay(button.textContent);
            operatorJustPressed = false;
        } else {
            updateDisplay(getDisplayValue() + button.textContent);
        }
    });
});

equalsButton.addEventListener('click', () => {
    if (currentOperator) {
        number2 = Number(getDisplayValue());
        updateDisplay(operate(currentOperator, number1, number2));

        console.groupCollapsed('Equal Button /w currentOperator')
        console.log(`Number2: ${number2}`);
        console.log(`Calculation: ${number1} ${currentOperator} ${number2} = ${getDisplayValue()}`);
        console.log(`Display Value: ${getDisplayValue()}`);
        console.log('Number2 set and display updated with calculation result');

        previousOperator = currentOperator;
        currentOperator = null;

        console.log(`Current Operator: ${currentOperator}`);
        console.log(`Previous Operator: ${previousOperator}`);
        console.groupEnd('Equal Button');
    } else if (previousOperator) {
        number1 = Number(getDisplayValue());
        updateDisplay(operate(previousOperator, number1, number2));

        console.groupCollapsed('Equal Button /w previous operator')
        console.log(`Number1: ${number1}`);
        console.log(`Calculation: ${number1} ${previousOperator} ${number2} = ${getDisplayValue()}`);
        console.log(`Display Value: ${getDisplayValue()}`);
        console.log('Number1 set and display updated with calculation result');
        console.groupEnd();

    } else {
        console.log('No current or previous operator');
    }
});

function getDisplayValue() {
    return displayText.textContent;
}

function updateDisplay(value) {
    displayText.textContent = value;
}

function operate(operator, number1, number2) {
    number1 = parseFloat(number1);
    number2 = parseFloat(number2);
    switch(operator) {
        case '+':
            return number1 + number2;
        case '−':
            return number1 - number2;
        case '×':
            return number1 * number2;
        case '÷':
            return number1 / number2;
        default:
            return 'Invalid operator';
    }
}
