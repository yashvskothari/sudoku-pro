import Card from "../common/Card";
import ProgressRing from "../common/ProgressRing";
import { useGameStore } from "../../store/gameStore";
import { MAX_MISTAKES } from "../../engine/difficulty/difficulty";

function Statistics() {
  const moves = useGameStore((state) => state.moves);
  const mistakes = useGameStore((state) => state.mistakes);
  const hintsUsed = useGameStore((state) => state.hintsUsed);
  const difficulty = useGameStore((state) => state.difficulty);
  const board = useGameStore((state) => state.board);
  const solution = useGameStore((state) => state.solution);

  // Progress should reflect how much of the board is *correctly* filled,
  // not just how many cells have something typed in them. Counting raw
  // fill count let the bar hit 100% even when the grid contained
  // duplicate/incorrect digits (e.g. an extra 5 in place of a missing 1),
  // which misleadingly showed the puzzle as "done" when it wasn't.
  const hasSolution = solution.some((row) => row.some((cell) => cell !== null));

  const correctCells = board.reduce(
    (total, row, r) =>
      total +
      row.filter(
        (cell, c) => cell !== null && (!hasSolution || cell === solution[r][c])
      ).length,
    0
  );
  const progress = Math.round((correctCells / 81) * 100);

  return (
    <Card title="Statistics">
      <div className="space-y-4">
        <div>
          <div className="mb-2 flex justify-between text-sm text-zinc-300">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <ProgressRing value={progress} />
        </div>

        <div className="flex justify-between">
          <span>Moves</span>
          <span>{moves}</span>
        </div>

        <div className="flex justify-between">
          <span>Mistakes</span>
          <span className={mistakes > 0 ? "text-red-400" : ""}>
            {mistakes} / {MAX_MISTAKES}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Hints Used</span>
          <span>{hintsUsed}</span>
        </div>

        <div className="flex justify-between">
          <span>Difficulty</span>
          <span>{difficulty}</span>
        </div>
      </div>
    </Card>
  );
}

export default Statistics;
