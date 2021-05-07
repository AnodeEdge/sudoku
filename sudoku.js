const serializeForm = () => {
  let board = [[], [], [], [], [], [], [], [], []];
  let row = 0;
  for (i = 0; i < 81; i++) {
    if (i % 9 === 0 && i > 8) {
      row++;
    }
    let value = form.elements[i].value;
    if (value === "") {
      board[row].push(0);
    } else {
      board[row].push(parseInt(form.elements[i].value));
    }
  }
  console.log(board);
  return board;
};

const applyStyles = (x, y, element) => {
  if (y === 0) {
    element.classList.add("left-edge");
  }
};

const drawPlayBoard = (board) => {
  let box;
  for (i = 0; i < 9; i++) {
    for (j = 0; j < 9; j++) {
      box = document.getElementById(`${i}${j}`);
      if (board[i][j] !== 0) {
        box.readOnly = true;
        box.value = `${board[i][j]}`;
        box.classList.add("prefilled");
      } else {
        box.readOnly = false;
        box.value = "";
        box.classList.remove("prefilled");
      }
      applyStyles(i, j, box);
    }
  }
};

const drawSolveBoard = (board) => {
  let box;
  for (i = 0; i < 9; i++) {
    for (j = 0; j < 9; j++) {
      box = document.getElementById(`${i}${j}`);
      if (box.readOnly == false){
        box.value = `${board[i][j]}`;
        box.readOnly = false;
        box.classList.remove("prefilled");
      }
    }
  }
}

const handleSubmit = (evt) => {
  evt.preventDefault();
  let board = serializeForm();
  console.log(board);
  if (isBoardSolved(board)) {
    alert("Sudoku is Correct");
  } else {
    alert("Wrong");
  }
};

const handleSolve = (evt) => {
  evt.preventDefault();
  let board = serializeForm();
  let solvedBoard = solve(board);
  if (solvedBoard) {
    drawSolveBoard(solvedBoard);
    return true;
  }
  alert("This cannot be solved");
};

const handleNew = (evt) => {
  evt.preventDefault();
  baseBoard = generateSudoku(document.getElementById("difficulty").value);
  drawPlayBoard(baseBoard);
};

let baseBoard = generateSudoku();
console.log(baseBoard);
drawPlayBoard(baseBoard);

let form = document.getElementById("board");
let settings = document.getElementById("settings");

form.addEventListener("submit", handleSubmit);
document.getElementById("solve").addEventListener("click", handleSolve);
settings.addEventListener("submit", handleNew);
