const calculator = document.querySelector('.calculator');
const displayText = calculator.querySelector('.display-text');
const calculatorButtons = calculator.querySelectorAll('button');

let currentOperator = null;
let previousOperator = null;
let number1 = null;
let number2 = null;

calculatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        const action = button.dataset.action;
        const buttonContent = button.textContent;
        const displayedNum = displayText.textContent;
        const previousKeyType = calculator.dataset.previousKeyType;

        // number buttons
        if (!action) {
            if (
                displayedNum === '0' ||
                previousKeyType === 'operator' ||
                previousKeyType === 'calculate'
            ) {
                updateDisplay(buttonContent);
            } else {
                updateDisplay(displayedNum + buttonContent);
            }
            calculator.dataset.previousKeyType = 'number';
        }

        // decimal button
        if (action === 'decimal') {
            if (!displayedNum.includes('.')) {
                updateDisplay(displayedNum + '.');
            } else if (
                previousKeyType === 'operator' ||
                previousKeyType === 'calculate'
            ) {
                updateDisplay('0.');
            }
            calculator.dataset.previousKeyType = 'decimal'
        }

        // operator buttons
        if (
            action === 'add' ||
            action === 'subtract' ||
            action === 'multiply' ||
            action === 'divide'
        ) {
            number1 = Number(displayedNum);
            currentOperator = buttonContent;
            calculator.dataset.previousKeyType = 'operator';
        }

        // clear button
        if (action === 'clear') {
            currentOperator = null;
            previousOperator = null;
            number1 = null;
            number2 = null;
            updateDisplay('0');
            calculator.dataset.previousKeyType = 'clear';
        }

        // equals button
        if (action == 'calculate') {
            if (currentOperator) {
                number2 = Number(displayedNum);
                updateDisplay(operate(currentOperator, number1, number2));
                previousOperator = currentOperator;
                currentOperator = null;
            } else if (previousOperator) {
                number1 = Number(displayedNum);
                updateDisplay(operate(previousOperator, number1, number2));
            } else {
                console.log('No current or previous operator');
            }
            calculator.dataset.previousKeyType = 'calculate';
        }

    })
});

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
