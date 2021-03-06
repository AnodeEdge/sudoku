# Sudoku Solver

[View the website here](https://www.sudoku.scott-curtis.com)

## About This Project
This sudoku game and solver was built using javascript and HTML. The solver uses a recursive algorithm to build the solution incrementally by testing possible solutions in the empty spaces.  If a solution doesn't work, it backtracks to attempt another solution. 

![Sudoku](https://raw.githubusercontent.com/AnodeEdge/sudoku/main/Sudoku.gif)

## Future List of Wants
- Method to generate sudoku board that only has one unique solution
- Other methods to generate more unique sudoku boards
- Add modal to display messages instead of relying on alerts.
- CI/CD Pipeline to quickly deploy on a webserver.

## Journal
A log of what I've done until the project is completed.

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

### Day 4:
Worked on a prune function that takes a min and max and randomly prunes numbers out until the remaining number of values is within the minimum and maximum range.  This will be used later to generate sudokus of different difficulties.  Didn't manage to finish this so hoping to finish it the next day.

### Day 5:
Decided to work on the HTML for the application instead of working on generating sudokus of different difficulties.  Using grid instead of table just to get more practice using grid.  Not much to report; decided to go the route of using a form and using an id to identify each sudoku input.  Created CSS to start styling.  

### Day 6:
Felt like I was overcomplicating my pruning solution and decided to just create a prune function that takes the board and removes n number of values from the board using randomly generated positions instead of parsing each row and randomly removing numbers from each row.  If there is time, I may go back and compare the two to see what different patterns or boards I might see just for fun.

### Day 7:
Haven't been keeping up to date with the journal since my schedule has been erratic; revised the pruning algorithm and created the HTML board. Added styling as well.  Revised the solve algorithm so that it can be used to solve partially completed boards.  Whats left on the docket is basically to style the board itself.

### Day 8:
Added borders to the sudoku board.  Learned about CSS wildcards, not sure if its best practice to use it but it was interesting to learn about them.  I am going to stop working on this project now but I have thought of a new "wants" that I'm going to list above.
