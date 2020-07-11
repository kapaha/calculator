const calculator = document.querySelector('.calculator');
const displayText = calculator.querySelector('.display-text');
const calculatorButtons = calculator.querySelectorAll('button');

let currentOperator = null;
let previousOperator = null;
let operatorJustPressed = false;
let number1 = null;
let number2 = null;

calculatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        const action = button.dataset.action;
        const buttonContent = button.textContent;
        const displayedNum = displayText.textContent;

        // number buttons
        if (!action) {
            if (displayedNum === '0' || operatorJustPressed) {
                updateDisplay(buttonContent);
                operatorJustPressed = false;
            } else {
                updateDisplay(displayedNum + buttonContent);
            }
        }

        // decimal button
        if (action === 'decimal') {
            if (!displayedNum.includes('.')) {
                updateDisplay(displayedNum + '.');
            } else if (displayedNum.includes('.') && operatorJustPressed) {
                updateDisplay('0.');
                operatorJustPressed = false;
            } 
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
            operatorJustPressed = true;
        }

        // clear button
        if (action === 'clear') {
            currentOperator = null;
            previousOperator = null;
            number1 = null;
            number2 = null;
            updateDisplay('0');
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
