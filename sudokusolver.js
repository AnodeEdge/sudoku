var boardSize = 9;

const randomInt = (min, max) => {
  // min and max are the inclusive range
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

const isInRow = (board, row, column, num) => {
  // Check whether a number is in a row
  for (let i = 0; i < boardSize; i++) {
    if (board[row][i] === num && column !== i) {
      return true;
    }
  }
  return false;
};

const isInColumn = (board, row, column, num) => {
  // Check whether a number is in a column
  for (let i = 0; i < boardSize; i++) {
    if (board[i][column] === num && row !== i) {
      return true;
    }
  }
  return false;
};

const isInSubGrid = (board, row, column, num) => {
  // Check whether a number is in a box.
  // SubGrid start position is upper left corner
  let x = row - (row % 3);
  let y = column - (column % 3);
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i + x][j + y] === board[row][column]) {
        continue;
      }
      if (board[i + x][j + y] === num) {
        return true;
      }
    }
  }
  return false;
};

const isValidPosition = (board, row, column, num) => {
  return (
    !isInRow(board, row, column, num) &&
    !isInColumn(board, row, column, num) &&
    !isInSubGrid(board, row, column, num)
  );
};

const nextEmptyPosition = (board) => {
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      if (board[i][j] === 0) {
        return [i, j];
      }
    }
  }
  return [];
};

function solve(board) {
  // Determine position where sudoku board is empty
  emptyPosition = nextEmptyPosition(board);
  let row = emptyPosition[0];
  let column = emptyPosition[1];

  if (!emptyPosition.length) {
    return board;
  }

  // Iterate through possible sudoku numbers (1-9)
  for (let num = 1; num < 10; num++) {
    if (isValidPosition(board, row, column, num)) {
      board[row][column] = num;

      boardTemp = solve(board);
      if (boardTemp) {
        return boardTemp;
      }
      // Reset to zero if bad solution
      board[row][column] = 0;
    }
  }
  return false;
}

const generateBlankBoard = () => {
  let emptyBoard = [];
  for (let i = 0; i < 9; i++) {
    emptyBoard[i] = new Array(9).fill(0);
  }
  return emptyBoard;
};

const insertBoardSeed = (board) => {
  // When fillLine is 0, fill the puzzle as a diagonal from top left to bottom right (\)
  // When fill line is 1, fill the puzzle as a diagonal from top right to bottom left (/)
  // let seedLineType = Math.round(Math.random());
  let seedLineType = 0;
  // Array of numbers 1 thru 9 shuffled
  let seedArray = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  let j = 8;
  if (seedLineType === 0) {
    for (let i = 0; i < 9; i++) {
      board[i][i] = seedArray[i];
    }
  }
  if (seedLineType === 1) {
    for (let i = 0; i < 9; i++) {
      board[i][j] = seedArray[i];
      j--;
    }
  }
  return board;
};

const pruneBoard = (board, removals) => {
  let x = randomInt(0, 8);
  let y = randomInt(0, 8);
  for (i = 0; i < removals; i++) {
    while (board[x][y] == 0) {
      x = randomInt(0, 8);
      y = randomInt(0, 8);
    }
    board[x][y] = 0;
  }
  return board;
};

const generateSudoku = (difficulty = "easy") => {
  let board = generateBlankBoard();
  let removals = (difficulty == "easy") ? 55 
  : (difficulty == "medium" ) ? 60 
  : (difficulty == "hard") ? 65
  : (difficulty == "experimental") ? 70 
  : 55

  board = pruneBoard(solve(insertBoardSeed(board)), removals);
  // board = solve(board);
  // board = pruneBoard(board, 60);
  return board;
};

const isBoardSolved = (board) => {
  for (i = 0; i < 9; i++){
      for(j = 0; j < 9; j++) {
          if (!isValidPosition(board, i, j, board[i][j])){
            console.log(`false here: ${i},${j} with a value of ${board[i][j]}`)
            return false
          }
      }
  }
  console.log(true)
  return true
};

