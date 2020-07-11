const calculator = document.querySelector('.calculator');
const displayText = calculator.querySelector('.display-text');
const calculatorButtons = calculator.querySelectorAll('button');

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
            calculator.dataset.firstNumber = displayedNum;
            calculator.dataset.operator = buttonContent;
            calculator.dataset.previousKeyType = 'operator';
        }

        // clear button
        if (action === 'clear') {
            if (buttonContent === 'AC') {
                calculator.dataset.firstNumber = '';
                calculator.dataset.secondNumber = '';
                calculator.dataset.operator = '';
                calculator.dataset.previousOperator = '';
            } else {
                button.textContent = 'AC';
            }
            updateDisplay('0');
            calculator.dataset.previousKeyType = 'clear';
        }

        if (action !== 'clear') {
            const clearButton = calculator.querySelector('[data-action=clear]');
            clearButton.textContent = 'CE';
        }

        // equals button
        if (action == 'calculate') {
            if (calculator.dataset.operator) {
                calculator.dataset.secondNumber = Number(displayedNum);
                updateDisplay(operate(calculator.dataset.operator, calculator.dataset.firstNumber, calculator.dataset.secondNumber));
                calculator.dataset.previousOperator = calculator.dataset.operator;
                calculator.dataset.operator = '';
            } else if (calculator.dataset.previousOperator) {
                calculator.dataset.firstNumber = Number(displayedNum);
                updateDisplay(operate(calculator.dataset.previousOperator, calculator.dataset.firstNumber, calculator.dataset.secondNumber));
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
