# Sudoku Solver

## About This Project
This sudoku game and solver was built using javascript and HTML. The solver uses a recursive algorithm to build the solution incrementally by testing possible solutions in the empty spaces.  If a solution doesn't work, it backtracks to attempt another solution. 

## Journal
A log of what I've done every day until the project is completed.

### Day 1: 
Generated the checks neccessary to determine whether a possible solution is valid for a given square.  The following contraints determine whether a solution is valid:
- Each row must contain all digits (1 thru 9) so if the number is already present in the row then the solution is  not valid.
- Each column must contain all digits (1 thru 9) 
- Each 3x3 subgrid (total of 9 in a 9x9 board), must contain all numbers (1 thru 9)

So if a number is already present in the row, column, or subgrid then it is not a valid possible solution. The next step is to finish the recursive solving algorithm and test using mock data.

### Day 2:
Created the backtrack algorithm, however; it is not working as intended. During testing, noticed that the iteration variables for "for loops" were not declared. Also I forgot to reset the column value once the next row was being scanned to find the next empty position in the nextEmptyPosition function. Despite discovering these mistakes, the solve algorithm still does not work so getting it to work as intended is the priority.

### Day 3:
The solve algorithm was working and I believe I happened to typo a few test boards that were unsolvable.  Created a sudoku board generator which uses an array containing a set of numbers between 1 and 9 that is shuffled and inserted diagonally from top left to bottom right in the 9x9 board to maximize chance of a solvable board.  Originally I thought to randomly add a number to random spots on the board but realized that it would take many iterations to generate a solvable board, especially because there could be row/column conflicts.  A future feature idea is to allow for inserting the seed diagonally from the top right to the bottom left.  I did not implement this yet since the solver only scans per row and often resulted in generating a top row of incrementally increasing numbers ex: [1,2,3,5,6,7,8,9,4].  To fix this I would most likely need to allow the solve algorithm to scan by column for this case. Another feature idea is to consider determining # of possible solutions for a given puzzle. The next priority is to work on a function to prune the board so that it is playable; then to create a UI.  