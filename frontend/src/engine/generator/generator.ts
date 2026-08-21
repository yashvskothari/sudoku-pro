import type { Difficulty } from "../difficulty/difficulty";
import { CLUE_TARGETS } from "../difficulty/difficulty";

export type CellValue = number | null;
export type Grid = CellValue[][];

export interface GeneratedPuzzle {
  puzzle: Grid;
  solution: Grid;
  difficulty: Difficulty;
  clues: number;
}

function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function isSafe(
  grid: number[][],
  row: number,
  col: number,
  num: number
): boolean {
  for (let c = 0; c < 9; c++) {
    if (grid[row][c] === num) return false;
  }

  for (let r = 0; r < 9; r++) {
    if (grid[r][col] === num) return false;
  }

  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;

  for (let r = boxRow; r < boxRow + 3; r++) {
    for (let c = boxCol; c < boxCol + 3; c++) {
      if (grid[r][c] === num) return false;
    }
  }

  return true;
}

function findEmpty(grid: number[][]): [number, number] | null {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col] === 0) return [row, col];
    }
  }
  return null;
}

/**
 * Fills the grid in-place with a complete, randomized, valid
 * Sudoku solution using randomized backtracking.
 */
function fillGrid(grid: number[][]): boolean {
  const pos = findEmpty(grid);
  if (!pos) return true;

  const [row, col] = pos;

  for (const num of shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9])) {
    if (isSafe(grid, row, col, num)) {
      grid[row][col] = num;

      if (fillGrid(grid)) return true;

      grid[row][col] = 0;
    }
  }

  return false;
}

/**
 * Counts the number of solutions for a grid, stopping early
 * once `limit` solutions have been found (we only ever need to
 * know whether a puzzle has exactly one solution).
 */
function countSolutions(grid: number[][], limit: number): number {
  const pos = findEmpty(grid);
  if (!pos) return 1;

  const [row, col] = pos;
  let count = 0;

  for (let num = 1; num <= 9; num++) {
    if (isSafe(grid, row, col, num)) {
      grid[row][col] = num;
      count += countSolutions(grid, limit - count);
      grid[row][col] = 0;

      if (count >= limit) return count;
    }
  }

  return count;
}

/**
 * Generates a brand new, fully solved 9x9 Sudoku grid.
 */
export function generateFullSolution(): number[][] {
  const grid: number[][] = Array.from({ length: 9 }, () =>
    Array<number>(9).fill(0)
  );

  fillGrid(grid);

  return grid;
}

/**
 * Carves a playable puzzle out of a solved grid by removing
 * clues one at a time, only keeping a removal if the puzzle
 * still has exactly one solution.
 */
function carvePuzzle(solution: number[][], clueTarget: number) {
  const puzzle = solution.map((row) => [...row]);
  const cellOrder = shuffle(Array.from({ length: 81 }, (_, i) => i));

  let clues = 81;

  for (const index of cellOrder) {
    if (clues <= clueTarget) break;

    const row = Math.floor(index / 9);
    const col = index % 9;

    if (puzzle[row][col] === 0) continue;

    const backup = puzzle[row][col];
    puzzle[row][col] = 0;

    const attempt = puzzle.map((r) => [...r]);

    if (countSolutions(attempt, 2) === 1) {
      clues--;
    } else {
      puzzle[row][col] = backup;
    }
  }

  return { puzzle, clues };
}

function toCellValueGrid(grid: number[][]): Grid {
  return grid.map((row) => row.map((value) => (value === 0 ? null : value)));
}

/**
 * Generates a brand new puzzle + its solution for the given
 * difficulty level.
 */
export function generatePuzzle(difficulty: Difficulty): GeneratedPuzzle {
  const solution = generateFullSolution();
  const clueTarget = CLUE_TARGETS[difficulty];

  const { puzzle, clues } = carvePuzzle(solution, clueTarget);

  return {
    puzzle: toCellValueGrid(puzzle),
    solution: toCellValueGrid(solution),
    difficulty,
    clues,
  };
}
