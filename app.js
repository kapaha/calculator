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
            const firstNumber = calculator.dataset.firstNumber;
            const operator = calculator.dataset.operator;
            const secondNumber = displayedNum;
            
            if (
                firstNumber &&
                operator &&
                previousKeyType !== 'operator' &&
                previousKeyType !== 'calculate'
            ) {
                const calculatedValue = 
                    calculate(firstNumber, operator, secondNumber);
                updateDisplay(calculatedValue);

                calculator.dataset.firstNumber = calculatedValue;
            } else {
                calculator.dataset.firstNumber = displayedNum;
            }

            calculator.dataset.operator = action;
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
            let firstNumber = calculator.dataset.firstNumber;
            const operator = calculator.dataset.operator;
            let secondNumber = displayedNum;

            if (firstNumber) {
                if (previousKeyType === 'calculate') {
                    firstNumber = displayedNum;
                    secondNumber = calculator.dataset.modValue;
                }
                updateDisplay(calculate(firstNumber, operator, secondNumber));
            }

            calculator.dataset.modValue = secondNumber;
            calculator.dataset.previousKeyType = 'calculate'
        }

    })
});

function updateDisplay(value) {
    displayText.textContent = value;
}

function calculate(number1, operator, number2) {
    number1 = parseFloat(number1);
    number2 = parseFloat(number2);
    switch(operator) {
        case 'add':
            return number1 + number2;
        case 'subtract':
            return number1 - number2;
        case 'multiply':
            return number1 * number2;
        case 'divide':
            return number1 / number2;
        default:
            return 'Invalid operator';
    }
}
