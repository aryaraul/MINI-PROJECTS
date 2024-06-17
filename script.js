// Get elements from the DOM
const stackButton = document.getElementById('stack-button');
const changeColorButton = document.getElementById('change-color-button');
const stackElement = document.getElementById('stack');
const blockElement = document.getElementById('block');
const gameOverModal = document.getElementById('game-over-modal');
const restartButton = document.getElementById('restart-button');
const modalClose = document.querySelector('.close');

let previousBlockColor = ''; // Store the previous block color

// Function to stack a block
function stackBlock() {
    // Get the current block's color
    const currentBlockColor = blockElement.style.backgroundColor;

    // If the current color is different from the previous color, show the "Game Over" modal
    if (currentBlockColor !== previousBlockColor) {
        gameOverModal.style.display = 'block';
        return;
    }

    // Create a new block element
    const newBlock = document.createElement('div');
    newBlock.classList.add('block');
    newBlock.style.backgroundColor = currentBlockColor;

    // Append the block to the stack container
    stackElement.appendChild(newBlock);

    // Update the previous color
    previousBlockColor = currentBlockColor;

    // Generate a new random block color
    const colors = ['red', 'green', 'blue', 'yellow', 'purple'];
    let randomColor;
    do {
        randomColor = colors[Math.floor(Math.random() * colors.length)];
    } while (randomColor === currentBlockColor);

    blockElement.style.backgroundColor = randomColor;
}

// Function to change the block color
function changeBlockColor() {
    const colors = ['red', 'green', 'blue', 'yellow', 'purple'];
    let randomColor;
    do {
        randomColor = colors[Math.floor(Math.random() * colors.length)];
    } while (randomColor === blockElement.style.backgroundColor);

    blockElement.style.backgroundColor = randomColor;
}

// Function to restart the game
function restartGame() {
    gameOverModal.style.display = 'none';
    stackElement.innerHTML = '';
    initializeGame();
}

// Add click event listeners to the buttons and modal close button
stackButton.addEventListener('click', stackBlock);
changeColorButton.addEventListener('click', changeBlockColor);
restartButton.addEventListener('click', restartGame);
modalClose.addEventListener('click', () => {
    gameOverModal.style.display = 'none';
});

// Initialize the game with a random block color
function initializeGame() {
    const colors = ['red', 'green', 'blue', 'yellow', 'purple'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    blockElement.style.backgroundColor = randomColor;
    previousBlockColor = randomColor;
}

initializeGame(); // Initialize the game when the page loads
