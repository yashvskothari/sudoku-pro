import { Clock3, Pause, Play, RotateCcw, Sparkles } from "lucide-react";
import { useGameStore } from "../../store/gameStore";
import { DIFFICULTIES } from "../../engine/difficulty/difficulty";

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function Header() {
  const elapsedTime = useGameStore((state) => state.elapsedTime);
  const isPaused = useGameStore((state) => state.isPaused);
  const isComplete = useGameStore((state) => state.isComplete);
  const isGameOver = useGameStore((state) => state.isGameOver);
  const hasStarted = useGameStore((state) => state.hasStarted);
  const togglePause = useGameStore((state) => state.togglePause);
  const difficulty = useGameStore((state) => state.difficulty);
  const newGame = useGameStore((state) => state.newGame);
  const restartGame = useGameStore((state) => state.restartGame);
  const selectDifficulty = useGameStore((state) => state.selectDifficulty);

  const canPause = hasStarted && !isComplete && !isGameOver;

  return (
    <header className="w-full border-b border-zinc-800 bg-zinc-900/70 backdrop-blur-xl">
      <div className="mx-auto flex h-auto max-w-7xl flex-wrap items-center justify-between gap-3 px-6 py-3">
        <div>
          <h1 className="text-2xl font-bold leading-none">🧩 Sudoku Yokozuna</h1>
        </div>

        <div className="flex items-center gap-1 rounded-xl bg-white/5 p-1">
          {DIFFICULTIES.map((level) => (
            <button
              key={level}
              onClick={() => selectDifficulty(level)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold tracking-wide transition ${
                difficulty === level
                  ? "bg-cyan-500/90 text-zinc-950"
                  : "text-zinc-300 hover:bg-white/10"
              }`}
            >
              {level}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4 text-zinc-300">
          <button
            onClick={() => newGame(difficulty)}
            title={hasStarted ? "Start a new game" : "Start the game"}
            className="flex items-center gap-2 rounded-lg bg-cyan-500/90 px-3 py-1.5 text-xs font-semibold text-zinc-950 transition hover:bg-cyan-400"
          >
            <Play size={16} />
            {hasStarted ? "Start New Game" : "Start Game"}
          </button>

          <div className="flex items-center gap-2">
            <Clock3 size={18} />
            <span className="tabular-nums">{formatTime(elapsedTime)}</span>
          </div>

          <button
            onClick={togglePause}
            disabled={!canPause}
            title={isPaused ? "Resume" : "Pause"}
            className="rounded-lg p-2 transition hover:bg-zinc-800 disabled:opacity-40"
          >
            {isPaused ? <Play size={20} /> : <Pause size={20} />}
          </button>

          <button
            onClick={restartGame}
            disabled={!hasStarted}
            title="Restart puzzle"
            className="rounded-lg p-2 transition hover:bg-zinc-800 disabled:opacity-40"
          >
            <RotateCcw size={20} />
          </button>

          <button
            onClick={() => newGame()}
            disabled={!hasStarted}
            title="New game"
            className="rounded-lg p-2 transition hover:bg-zinc-800 disabled:opacity-40"
          >
            <Sparkles size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
