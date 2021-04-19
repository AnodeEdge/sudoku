var test_board = [
  [9, 0, 0, 1, 0, 0, 0, 0, 5],
  [0, 0, 5, 0, 9, 0, 2, 0, 1],
  [8, 0, 0, 0, 4, 0, 0, 0, 0],
  [0, 0, 0, 0, 8, 0, 0, 0, 0],
  [0, 0, 0, 7, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 2, 6, 0, 0, 9],
  [2, 0, 0, 3, 0, 0, 0, 0, 6],
  [0, 0, 0, 2, 0, 0, 9, 0, 0],
  [0, 0, 1, 9, 0, 4, 5, 7, 0],
];

var boardSize = 9;

const isInRow = (board, row, num) => {
  // Check whether a number is in a row
  for (i = 0; i < boardSize; i++) {
    if (board[row][i] === num) {
      return true;
    }
  }
  return false;
};

const isInColumn = (board, column, num) => {
  // Check whether a number is in a column
  for (i = 0; i < boardSize; i++) {
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
  for (i = startRow; i < startRow + 3; i++) {
    for (j = startCol; j < startCol + 3; j++) {
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
  for (i = currentRow; i < boardSize; i++) {
    for (j = currentCol; j < boardSize; j++) {
      if (board[i][j] === 0) {
        // console.log(`Next Row: ${i},${j}`)
        return [i, j];
      }
    }
    currentCol = 0
  }
  return [];
};

function solve(board, currentRow, currentCol) {
  let row, column;
  // Determine position where sudoku board is empty
  emptyPosition = nextEmptyPosition(board, currentRow, currentCol);
  row = emptyPosition[0];
  column = emptyPosition[1];

  console.log(`Current Position: ${row}, ${column}`)
  console.log(`Position Length: ${emptyPosition.length}`)

  if (!emptyPosition.length) {
    return board;
  }

  // Iterate through possible sudoku numbers (1-9)
  for (num = 1; num < 10; num++) {
    // console.log(`Number: ${num}`)
    // console.log(`isValidPosition: ${isValidPosition(board, row, column, num)}`)
    if (isValidPosition(board, row, column, num)) {
      board[row][column] = num;

      boardTemp = solve(board, row, column)
      if (boardTemp) {
        return boardTemp;
      }
      // Reset to zero if bad solution
      board[row][column] = 0;
    }
  }
  return false;
}

finalBoard = solve(test_board, 0, 0)
console.log(finalBoard)