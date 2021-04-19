# Sudoku Solver

## About This Project
This sudoku game and solver was built using javascript and HTML. The solver uses a recursive algorithm to build the solution incrementally by testing possible solutions in the empty spaces.  If a solution doesn't work, it backtracks to attempt another solution. 

## Journal
### Day 1: 
Generated the checks neccessary to determine whether a possible solution is valid for a given square.  The following contraints determine whether a solution is valid:
- Each row must contain all digits (1 thru 9) so if the number is already present in the row then the solution is  not valid.
- Each column must contain all digits (1 thru 9) 
- Each 3x3 subgrid (total of 9 in a 9x9 board), must contain all numbers (1 thru 9)

So if a number is already present in the row, column, or subgrid then it is not a valid possible solution. The next step is to finish the recursive solving algorithm and test using mock data.