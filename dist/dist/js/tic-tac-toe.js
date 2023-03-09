const gameState = {
    currentPlayer: 'X',
    board: [null, null, null, null, null, null, null, null, null]
  };
  
  // Get all the cells on the game board
  const cells = document.querySelectorAll('.cell');
  
  // Add a click event listener to each cell
  cells.forEach(cell => {
    cell.addEventListener('click', () => {
      // Check if the cell is already occupied
      if (gameState.board[cell.dataset.index] !== null) {
        return; // Cell is already occupied, do nothing
      }
  
      // Set the value of the cell to the current player's symbol
      cell.textContent = gameState.currentPlayer;
  
      // Update the game state with the new board configuration
      gameState.board[cell.dataset.index] = gameState.currentPlayer;
  
      // Check for a winner
      const winner = checkForWinner();
      if (winner) {
        if (winner === 'X') {
          alert('Congratulations, you won!');
        } else {
          alert('Sorry, my bot that randomly picks won');
        }
        reset();
        return;
      }
  
      // Check for a tie game
      if (checkForTie()) {
        alert('Tie game!');
        reset();
        return;
      }
  
      // Switch the current player to the other symbol
      gameState.currentPlayer = gameState.currentPlayer === 'X' ? 'O' : 'X';
  
      // If it's the bot's turn, make a move
      if (gameState.currentPlayer === 'O') {
        botMove();
      }
    });
  });
  
  function checkForWinner() {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
  
    for (let i = 0; i < winningCombinations.length; i++) {
      const [a, b, c] = winningCombinations[i];
      if (gameState.board[a] && gameState.board[a] === gameState.board[b] && gameState.board[b] === gameState.board[c]) {
        return gameState.board[a];
      }
    }
    return null;
  }
  
  function checkForTie() {
    return gameState.board.every(cell => cell !== null);
  }
  
  function getRandomMove() {
    const emptyCells = gameState.board.reduce((acc, currentValue, index) => {
      if (currentValue === null) {
        acc.push(index);
      }
      return acc;
    }, []);
  
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    return emptyCells[randomIndex];
  }
  
  function botMove() {
    // Get a list of unoccupied cells
    const unoccupiedCells = gameState.board.reduce((acc, value, index) => {
      if (value === null) {
        acc.push(index);
      }
      return acc;
    }, []);
  
    // If there are no unoccupied cells, return
    if (unoccupiedCells.length === 0) {
      return;
    }
  
    // Select a random unoccupied cell
    const randomIndex = Math.floor(Math.random() * unoccupiedCells.length);
    const cellIndex = unoccupiedCells[randomIndex];
  
    // Make a move on the selected cell
    const cell = cells[cellIndex];
    cell.click();
  }
  function reset() {
    // Reset the game state to its initial values
    gameState.currentPlayer = 'X';
    gameState.board = [null, null, null, null, null, null, null, null, null];
  
    // Clear the game board by setting the text content of each cell to an empty string
    cells.forEach(cell => {
      cell.textContent = '';
    });
  }