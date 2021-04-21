let emptyBoard = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
];

let testBoard = [
  [0, 0, 0, 5, 7, 0, 8, 0, 9],
  [9, 0, 0, 0, 0, 0, 0, 4, 3],
  [3, 0, 7, 0, 0, 9, 2, 5, 1],
  [2, 0, 0, 0, 5, 8, 0, 1, 6],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [6, 7, 0, 9, 3, 0, 0, 0, 4],
  [1, 3, 9, 6, 0, 0, 4, 0, 5],
  [7, 2, 0, 0, 0, 0, 0, 0, 8],
  [8, 0, 4, 0, 2, 1, 0, 0, 0],
];

let no_solve = [
  [5, 1, 6, 8, 4, 9, 7, 3, 2],
  [3, 0, 7, 6, 5, 0, 0, 0, 0],
  [8, 0, 9, 7, 0, 0, 0, 6, 5],
  [1, 3, 5, 0, 6, 0, 9, 0, 7],
  [4, 7, 2, 5, 9, 1, 0, 0, 6],
  [9, 6, 8, 3, 7, 0, 0, 5, 0],
  [2, 5, 3, 1, 8, 6, 0, 7, 4],
  [6, 8, 4, 2, 0, 7, 5, 0, 0],
  [7, 9, 1, 0, 5, 0, 6, 0, 8],
];

var boardSize = 9;

const isInRow = (board, row, num) => {
  // Check whether a number is in a row
  for (let i = 0; i < boardSize; i++) {
    if (board[row][i] === num) {
      return true;
    }
  }
  return false;
};

const isInColumn = (board, column, num) => {
  // Check whether a number is in a column
  for (let i = 0; i < boardSize; i++) {
    if (board[i][column] === num) {
      return true;
    }
  }
  return false;
};

const isInSubGrid = (board, row, column, num) => {
  // Check whether a number is in a box.
  // SubGrid start position is upper left corner
  row = row - (row % 3);
  column = column - (column % 3);
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i + row][j + column] === num) {
        return true;
      }
    }
  }
  return false;
};

const isValidPosition = (board, row, column, num) => {
  return (
    !isInRow(board, row, num) &&
    !isInColumn(board, column, num) &&
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
  let seedLineType = 0
  console.log(seedLineType)
  // Array of numbers 1 thru 9 shuffled
  let seedArray = [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => Math.random() - 0.5);
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

const generateSudoku = () => {
  let board = generateBlankBoard();
  board = insertBoardSeed(board);
  board = solve(board)
  console.log(board);
};

generateSudoku();

// let finalBoard;
// finalBoard = solve(testBoard, 0, 0);
