import {
  Play,
  PartyPopper,
  SkullIcon,
  RotateCcw,
  Sparkles,
  Lightbulb,
} from "lucide-react";
import { useGameStore } from "../../store/gameStore";
import { MAX_HINTS } from "../../engine/difficulty/difficulty";

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function StatusOverlay() {
  const isPaused = useGameStore((state) => state.isPaused);
  const isComplete = useGameStore((state) => state.isComplete);
  const isGameOver = useGameStore((state) => state.isGameOver);
  const hintLimitReached = useGameStore((state) => state.hintLimitReached);
  const togglePause = useGameStore((state) => state.togglePause);
  const restartGame = useGameStore((state) => state.restartGame);
  const newGame = useGameStore((state) => state.newGame);
  const dismissHintPrompt = useGameStore((state) => state.dismissHintPrompt);
  const elapsedTime = useGameStore((state) => state.elapsedTime);
  const moves = useGameStore((state) => state.moves);
  const mistakes = useGameStore((state) => state.mistakes);

  if (!isPaused && !isComplete && !isGameOver && !hintLimitReached)
    return null;

  return (
    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 rounded-[28px] bg-zinc-950/80 text-center backdrop-blur-md">
      {isComplete && (
        <>
          <Sparkles className="h-10 w-10 text-cyan-300" />
          <h3 className="text-2xl font-bold text-white">Puzzle Solved!</h3>
          <p className="text-sm text-zinc-300">
            Time {formatTime(elapsedTime)} &middot; {moves} moves &middot;{" "}
            {mistakes} mistakes
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => newGame()}
              className="flex items-center gap-2 rounded-xl bg-cyan-500/90 px-4 py-2 text-sm font-semibold text-zinc-950 transition hover:bg-cyan-400"
            >
              <PartyPopper size={16} /> New Game
            </button>
          </div>
        </>
      )}

      {isGameOver && (
        <>
          <SkullIcon className="h-10 w-10 text-red-400" />
          <h3 className="text-2xl font-bold text-white">Game Over</h3>
          <p className="text-sm text-zinc-300">Too many mistakes — try again.</p>
          <div className="flex gap-3">
            <button
              onClick={restartGame}
              className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
            >
              <RotateCcw size={16} /> Restart
            </button>
            <button
              onClick={() => newGame()}
              className="flex items-center gap-2 rounded-xl bg-cyan-500/90 px-4 py-2 text-sm font-semibold text-zinc-950 transition hover:bg-cyan-400"
            >
              New Game
            </button>
          </div>
        </>
      )}

      {hintLimitReached && !isComplete && !isGameOver && (
        <>
          <Lightbulb className="h-10 w-10 text-amber-300" />
          <h3 className="text-2xl font-bold text-white">Out of Hints</h3>
          <p className="text-sm text-zinc-300">
            You've used all {MAX_HINTS} hints for this game. Start a new
            puzzle, or keep going without any more hints.
          </p>
          <div className="flex gap-3">
            <button
              onClick={dismissHintPrompt}
              className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
            >
              <Play size={16} /> Resume Game
            </button>
            <button
              onClick={() => newGame()}
              className="flex items-center gap-2 rounded-xl bg-cyan-500/90 px-4 py-2 text-sm font-semibold text-zinc-950 transition hover:bg-cyan-400"
            >
              <PartyPopper size={16} /> New Game
            </button>
          </div>
        </>
      )}

      {isPaused && !isComplete && !isGameOver && !hintLimitReached && (
        <>
          <h3 className="text-2xl font-bold text-white">Paused</h3>
          <button
            onClick={togglePause}
            className="flex items-center gap-2 rounded-xl bg-cyan-500/90 px-4 py-2 text-sm font-semibold text-zinc-950 transition hover:bg-cyan-400"
          >
            <Play size={16} /> Resume
          </button>
        </>
      )}
    </div>
  );
}

export default StatusOverlay;
