import Card from "../common/Card";
import { useGameStore } from "../../store/gameStore";

function getRemaining(board: (number | null)[][], number: number) {
  let count = 0;

  board.forEach((row) =>
    row.forEach((cell) => {
      if (cell === number) count++;
    }),
  );

  return 9 - count;
}

function RemainingNumbers() {
  const board = useGameStore((state) => state.board);

  const initialBoard = useGameStore((state) => state.initialBoard);

  const selectedCell = useGameStore((state) => state.selectedCell);

  const makeMove = useGameStore((state) => state.makeMove);

  return (
    <Card title="Remaining Numbers">
      <div className="grid grid-cols-3 gap-3">
        {Array.from({ length: 9 }, (_, i) => {
          const number = i + 1;

          const remaining = getRemaining(board, number);

          return (
            <button
              key={number}
              disabled={remaining === 0}
              onClick={() => {
                if (!selectedCell) return;

                const { row, col } = selectedCell;

                // Don't edit original clues
                if (initialBoard[row][col] !== null) return;

                makeMove(row, col, number);
              }}
              className={`
                aspect-square

                rounded-2xl

                border

                transition-all
                duration-300

                ${
                  remaining === 0
                    ? "cursor-not-allowed border-emerald-500/40 bg-emerald-500/10 opacity-40"
                    : "border-white/20 bg-white/10 hover:scale-105 hover:border-indigo-400/40 hover:bg-indigo-500/10"
                }

                ${selectedCell ? "" : "opacity-60"}
              `}
            >
              <div className="mt-2 text-3xl font-bold text-indigo-300">
                {number}
              </div>

              <div className="mt-1 text-xs text-zinc-400">
                {remaining === 0 ? "Done ✓" : `${remaining} left`}
              </div>
            </button>
          );
        })}
      </div>
    </Card>
  );
}

export default RemainingNumbers;
