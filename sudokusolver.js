let testBoard = [
  [0, 6, 0, 0, 0, 0, 4, 0, 0],
  [0, 0, 7, 0, 2, 4, 0, 0, 8],
  [8, 0, 0, 0, 6, 9, 5, 3, 0],
  [6, 2, 0, 5, 9, 0, 0, 0, 4],
  [0, 8, 3, 0, 1, 0, 9, 2, 0],
  [9, 0, 0, 0, 8, 2, 0, 6, 1],
  [0, 3, 2, 6, 5, 0, 0, 0, 0],
  [7, 0, 0, 9, 4, 0, 2, 0, 0],
  [0, 0, 4, 0, 0, 0, 0, 7, 0],
];

let testBoard2 = [
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

let testBoard3 = [
  [2, 0, 5, 3, 0, 9, 4, 0, 0],
  [0, 0, 0, 0, 0, 5, 0, 6, 0],
  [6, 9, 0, 0, 8, 0, 7, 0, 0],
  [9, 6, 2, 0, 4, 0, 0, 0, 7],
  [0, 0, 0, 5, 1, 2, 0, 0, 0],
  [1, 0, 0, 0, 7, 0, 2, 8, 5],
  [0, 0, 9, 0, 3, 0, 0, 4, 6],
  [0, 3, 0, 4, 0, 0, 0, 0, 0],
  [0, 0, 6, 8, 0, 1, 9, 0, 3],
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
  let startRow = row - (row % 3);
  let startCol = column - (column % 3);
  for (let i = startRow; i < startRow + 3; i++) {
    for (let j = startCol; j < startCol + 3; j++) {
      if (board[i][j] === num) {
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

const nextEmptyPosition = (board, currentRow, currentCol) => {
  // console.log(`Evaluate Row: ${currentRow}, ${currentCol}`)
  for (let i = currentRow; i < boardSize; i++) {
    for (let j = currentCol; j < boardSize; j++) {
      if (board[i][j] === 0) {
        // console.log(`Next Row: ${i},${j}`)
        return [i, j];
      }
    }
    currentCol = 0;
  }
  return [];
};

function solve(board) {
  // Determine position where sudoku board is empty
  emptyPosition = nextEmptyPosition(board, 0, 0);
  let row = emptyPosition[0];
  let column = emptyPosition[1];

  // console.log(`Current Position: ${row}, ${column}`);

  if (!emptyPosition.length) {
    return board;
  }

  // Iterate through possible sudoku numbers (1-9)
  for (let num = 1; num < 10; num++) {
    // console.log(`Number: ${num}`)
    // console.log(`isValidPosition: ${isValidPosition(board, row, column, num)}`)
    if (isValidPosition(board, row, column, num)) {
      board[row][column] = num;

      boardTemp = solve(board);
      if (boardTemp) {
        return boardTemp;
      }
      // Reset to zero if bad solution
      board[row][column] = 0;
    }
    // console.log(num)
    // console.log(board)
  }
  return false;
}


let finalBoard
finalBoard = solve(testBoard, 0, 0);
console.log(finalBoard);
finalBoard = solve(testBoard2, 0, 0);
console.log(finalBoard);
finalBoard = solve(testBoard3, 0, 0);
console.log(finalBoard);
