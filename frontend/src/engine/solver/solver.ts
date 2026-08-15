import type { Board } from "../types/sudoku";

import { cloneBoard, findEmptyCell } from "../utils/board";
import { isMoveValid } from "../validator/validator";

/**
 * Solves the Sudoku board using Backtracking.
 *
 * Returns:
 * true  -> solved
 * false -> impossible
 */
export function solveBoard(board: Board): boolean {
  const emptyCell = findEmptyCell(board);

  // No empty cells means the puzzle is solved
  if (!emptyCell) {
    return true;
  }

  const { row, col } = emptyCell;

  // Try every number
  for (let number = 1; number <= 9; number++) {
    if (isMoveValid(board, row, col, number)) {
      board[row][col].value = number;

      if (solveBoard(board)) {
        return true;
      }

      // Backtrack
      board[row][col].value = null;
    }
  }

  return false;
}

/**
 * Returns a solved COPY of the board.
 * Original board remains unchanged.
 */
export function getSolvedBoard(board: Board): Board {
  const solvedBoard = cloneBoard(board);

  solveBoard(solvedBoard);

  return solvedBoard;
}