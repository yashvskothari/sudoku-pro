export type Difficulty = "Easy" | "Medium" | "Hard" | "Expert";

export const DIFFICULTIES: Difficulty[] = ["Easy", "Medium", "Hard", "Expert"];

/**
 * Approximate number of filled clues left on the board
 * once generation is complete. Lower clue count = harder puzzle.
 *
 * These are target values -- the generator will get as close
 * as it can while still guaranteeing a unique solution.
 */
export const CLUE_TARGETS: Record<Difficulty, number> = {
  Easy: 42,
  Medium: 34,
  Hard: 28,
  Expert: 24,
};

/**
 * Maximum mistakes allowed before the game is over.
 */
export const MAX_MISTAKES = 3;

/**
 * Maximum hints allowed per game. Once used up, the player is
 * prompted to either start a new game or keep playing without
 * any more hints.
 */
export const MAX_HINTS = 2;
