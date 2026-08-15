import type { Board, Cell } from "../types/sudoku";
import { getBlockCells, getBlockIndex } from "../utils/board";

/**
 * Checks whether a number already exists in the row.
 */
export function isRowValid(
  board: Board,
  row: number,
  value: number
): boolean {
  return !board[row].some((cell: Cell) => cell.value === value);
}

/**
 * Checks whether a number already exists in the column.
 */
export function isColumnValid(
  board: Board,
  col: number,
  value: number
): boolean {
  for (let row = 0; row < 9; row++) {
    if (board[row][col].value === value) {
      return false;
    }
  }

  return true;
}

/**
 * Checks whether a number already exists
 * inside the corresponding 3×3 block.
 */
export function isBlockValid(
  board: Board,
  row: number,
  col: number,
  value: number
): boolean {
  const blockIndex = getBlockIndex(row, col);

  return !getBlockCells(board, blockIndex).some(
    (cell: Cell) => cell.value === value
  );
}

/**
 * Can this number be placed here?
 */
export function isMoveValid(
  board: Board,
  row: number,
  col: number,
  value: number
): boolean {
  return (
    isRowValid(board, row, value) &&
    isColumnValid(board, col, value) &&
    isBlockValid(board, row, col, value)
  );
}

/**
 * Checks if the completed board
 * is a valid Sudoku.
 */
export function isBoardValid(board: Board): boolean {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const value = board[row][col].value;

      if (value === null) continue;

      board[row][col].value = null;

      const valid = isMoveValid(board, row, col, value);

      board[row][col].value = value;

      if (!valid) {
        return false;
      }
    }
  }

  return true;
}