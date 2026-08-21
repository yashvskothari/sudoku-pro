import Card from "../common/Card";

import { useGameStore } from "../../store/gameStore";

function getRemaining(board: (number | null)[][], number: number) {
  let count = 0;

  board.forEach((row) =>
    row.forEach((cell) => {
      if (cell === number) count++;
    }),
  );

  // A number can never legitimately appear more than 9 times on the
  // board. If it somehow does (a corrupted/invalid board state), don't
  // let the remaining count go negative — clamp at 0 instead of showing
  // impossible values like "-1".
  return Math.max(0, 9 - count);
}

function RemainingNumbers() {
  const board = useGameStore((state) => state.board);

  const initialBoard = useGameStore((state) => state.initialBoard);

  const selectedCell = useGameStore((state) => state.selectedCell);

  const inputDigit = useGameStore((state) => state.inputDigit);
  const isInteractive = useGameStore(
    (state) =>
      !state.isPaused &&
      !state.isComplete &&
      !state.isGameOver &&
      !state.hintLimitReached
  );
  const selectedValue = selectedCell
  ? board[selectedCell.row][selectedCell.col]
  : null;

  return (
    <Card title="Remaining Numbers">
      <div className="grid grid-cols-3 gap-3">
        {Array.from({ length: 9 }, (_, i) => {
          const number = i + 1;

          const remaining = getRemaining(board, number);

          return (
            <button
              key={number}
              disabled={remaining === 0 || !isInteractive}
              onClick={() => {
                if (!selectedCell) return;

                const { row, col } = selectedCell;

                // Don't edit original clues
                if (initialBoard[row][col] !== null) return;

                inputDigit(row, col, number);
              }}
              className={`
                aspect-auto
                group
                rounded-2xl

                border

                transition-all
                duration-300
                group-hover:scale-110

                ${
                  remaining === 0
                    ? "cursor-not-allowed border-emerald-500/40 bg-emerald-500/10 opacity-50 grayscale"
                    : "border-white/20 bg-white/10 hover:-translate-y-1 hover:scale-105 hover:border-indigo-400/40 hover:bg-indigo-500/10"
                }
                ${
  selectedValue === number
    ? "ring-2 ring-cyan-400 shadow-[0_0_30px_rgba(34,211,238,.35)]"
    : ""
}

                
              `}
            >
<div
  className={`
    mx-auto
    mt-5
    border
    rounded-full
    flex
    h-14
    w-14
    items-center
    justify-center
    text-2xl
    font-bold
    transition-all
    duration-300
    group-hover:scale-110

    ${
      remaining === 0
        ? "border-emerald-400 bg-emerald-500/20 text-emerald-300"
        : "border-indigo-400/30 bg-indigo-500/10 text-indigo-300"
    }
  `}
>
  {number}
  </div>


              <div className="mt-2 text-[11px] tracking-wide uppercase font-medium">
                {remaining === 0 ? (
                  <span className="text-emerald-400">✓ DONE</span>
                ) : (
                  <span className="text-zinc-400">{remaining} left</span>
                )}
              </div>
            </button>
          );
        
        })}
      </div>
    </Card>
  );
}

export default RemainingNumbers;
