import type { Board, Cell, Position } from "../types/sudoku";

/**
 * Creates a single empty cell.
 */
function createCell(row: number, col: number): Cell {
  return {
    row,
    col,
    value: null,
    fixed: false,
    notes: [],
    selected: false,
    highlighted: false,
    sameValue: false,
    error: false,
  };
}

/**
 * Creates a fresh 9×9 empty Sudoku board.
 */
export function createEmptyBoard(): Board {
  return Array.from({ length: 9 }, (_, row) =>
    Array.from({ length: 9 }, (_, col) => createCell(row, col))
  );
}

/**
 * Creates a deep copy of the board.
 */
export function cloneBoard(board: Board): Board {
  return board.map((row) =>
    row.map((cell) => ({
      ...cell,
      notes: [...cell.notes],
    }))
  );
}

/**
 * Returns the 3×3 block index (0–8)
 *
 * 0 1 2
 * 3 4 5
 * 6 7 8
 */
export function getBlockIndex(row: number, col: number): number {
  return Math.floor(row / 3) * 3 + Math.floor(col / 3);
}

/**
 * Returns all cells inside a 3×3 block.
 */
export function getBlockCells(
  board: Board,
  blockIndex: number
): Cell[] {
  const startRow = Math.floor(blockIndex / 3) * 3;
  const startCol = (blockIndex % 3) * 3;

  const cells: Cell[] = [];

  for (let r = startRow; r < startRow + 3; r++) {
    for (let c = startCol; c < startCol + 3; c++) {
      cells.push(board[r][c]);
    }
  }

  return cells;
}

/**
 * Checks whether every cell has a value.
 * (Does NOT validate correctness.)
 */
export function isBoardFilled(board: Board): boolean {
  return board.every((row) =>
    row.every((cell) => cell.value !== null)
  );
}

/**
 * Returns the first empty cell on the board.
 * If the board is full, returns null.
 */

export function findEmptyCell(board: Board): Position | null {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col].value === null) {
        return { row, col };
      }
    }
  }

  return null;
}