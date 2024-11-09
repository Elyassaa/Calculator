// Select the screen and buttons
const screen = document.querySelector('.screen');
const buttons = document.querySelectorAll('.calc-button');

// Variable to hold the current input
let currentInput = '';

// Function to update the screen
function updateScreen() {
  screen.textContent = currentInput || '0';  // Default to '0' if no input
}

// Function to handle button clicks
buttons.forEach(button => {
  button.addEventListener('click', (e) => {
    const value = e.target.textContent;

    if (value === 'C') {
      // Clear the screen
      currentInput = '';
      updateScreen();
    } else if (value === '←') {
      // Backspace: remove last character
      currentInput = currentInput.slice(0, -1);
      updateScreen();
    } else if (value === '=') {
      // Evaluate the expression
      try {
        // If the input is empty, do nothing
        if (currentInput === '') {
          return;
        }

        // Replace the operation symbols with JavaScript equivalents
        currentInput = currentInput
          .replace('×', '*')
          .replace('÷', '/');

        // Use eval() to calculate the result
        currentInput = eval(currentInput).toString();  // Evaluate and convert to string
        updateScreen();
      } catch (error) {
        currentInput = 'Error';  // If invalid expression, show 'Error'
        updateScreen();
      }
    } else {
      // Append the number/operator to the current input
      currentInput += value;
      updateScreen();
    }
  });
});
