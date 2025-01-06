const cells = document.querySelectorAll('.cell');
    const resetButton = document.getElementById('reset');
    const playFirstButton = document.getElementById('play-first');
    const playSecondButton = document.getElementById('play-second');
    let currentPlayer = 'X';
    let board = Array(9).fill(null);
    let userSymbol = 'X';
    let botSymbol = 'O';

    playFirstButton.addEventListener('click', () => startGame('X'));
    playSecondButton.addEventListener('click', () => startGame('O'));
    resetButton.addEventListener('click', resetGame);

    function startGame(userChoice) {
      userSymbol = userChoice;
      botSymbol = userChoice === 'X' ? 'O' : 'X';
      currentPlayer = 'X';
      board.fill(null);
      cells.forEach(cell => {
        cell.textContent = '';
        cell.addEventListener('click', handleCellClick);
      });
      if (userSymbol === 'O') {
        botMove();
      }
    }

    function handleCellClick(event) {
      const index = event.target.dataset.index;
      if (board[index] || checkWinner()) return;

      board[index] = currentPlayer;
      event.target.textContent = currentPlayer;

      if (checkWinner()) {
        alert(`${currentPlayer} wins!`);
      } else if (board.every(cell => cell)) {
        alert('Draw!');
      } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        if (currentPlayer === botSymbol) {
          botMove();
        }
      }
    }

    function botMove() {
      const bestMove = getBestMove();
      board[bestMove] = botSymbol;
      cells[bestMove].textContent = botSymbol;
      currentPlayer = userSymbol;
      if (checkWinner()) {
        alert(`${botSymbol} wins!`);
      } else if (board.every(cell => cell)) {
        alert('Draw!');
      }
    }

    function getBestMove() {
      let bestScore = -Infinity;
      let move;
      for (let i = 0; i < board.length; i++) {
        if (!board[i]) {
          board[i] = botSymbol;
          let score = minimax(board, 0, false);
          board[i] = null;
          if (score > bestScore) {
            bestScore = score;
            move = i;
          }
        }
      }
      return move;
    }

    function minimax(board, depth, isMaximizing) {
      const winner = checkWinner();
      if (winner === botSymbol) return 10 - depth;
      if (winner === userSymbol) return depth - 10;
      if (board.every(cell => cell)) return 0;

      if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < board.length; i++) {
          if (!board[i]) {
            board[i] = botSymbol;
            let score = minimax(board, depth + 1, false);
            board[i] = null;
            bestScore = Math.max(score, bestScore);
          }
        }
        return bestScore;
      } else {
        let bestScore = Infinity;
        for (let i = 0; i < board.length; i++) {
          if (!board[i]) {
            board[i] = userSymbol;
            let score = minimax(board, depth + 1, true);
            board[i] = null;
            bestScore = Math.min(score, bestScore);
          }
        }
        return bestScore;
      }
    }

    function checkWinner() {
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

      for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
          return board[a];
        }
      }
      return null;
    }

    function resetGame() {
      board.fill(null);
      cells.forEach(cell => (cell.textContent = ''));
      currentPlayer = 'X';
    }
