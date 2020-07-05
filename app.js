const numberButtons = document.querySelectorAll('.number');
const displayValue = document.getElementById('display-value');

// add number button input to display
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (displayValue.textContent === '0') {
            if (button.textContent === '.') {
                displayValue.textContent += button.textContent;
            } else {
                displayValue.textContent = '';
            }
        }

        if (button.textContent === '.' && displayValue.textContent.includes('.')) {
            return;
        }

        displayValue.textContent += button.textContent;
    });
});

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
        case '-':
            return subtract(number1, number2);
        case '*':
            return multiply(number1, number2);
        case '/':
            return divide(number1, number2);
        default:
            return 'Invalid operator';
    }
}
