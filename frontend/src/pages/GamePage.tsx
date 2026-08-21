import GameContainer from "../components/layout/GameContainer";
import Header from "../components/layout/Header";
import { useEffect } from "react";
import { useGameStore } from "../store/gameStore";
import GameRules from "../components/rules/GameRules";
import useKeyboardInput from "../hooks/useKeyboardInput";

function GamePage() {
  const newGame = useGameStore((state) => state.newGame);
  const tick = useGameStore((state) => state.tick);
  const initialBoard = useGameStore((state) => state.initialBoard);

  useKeyboardInput();

  // Start a fresh puzzle the first time the app loads
  useEffect(() => {
    const hasPuzzle = initialBoard.some((row) =>
      row.some((cell) => cell !== null)
    );

    if (!hasPuzzle) {
      newGame();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Global game timer
  useEffect(() => {
    const interval = setInterval(() => {
      tick();
    }, 1000);

    return () => clearInterval(interval);
  }, [tick]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-zinc-950 text-white">
      {/* Background */}
      <div className="absolute -left-48 top-0 h-125 w-125 rounded-full bg-indigo-500/20 blur-[180px]" />

      <div className="absolute right-0 top-72 h-100 w-100 rounded-full bg-violet-500/20 blur-[180px]" />

      <div className="absolute bottom-0 left-1/2 h-87.5 w-87.5 -translate-x-1/2 rounded-full bg-cyan-400/10 blur-[170px]" />

      <div className="relative z-10">
        <Header />

        <GameContainer />
        <div className="mt-5 mb-5 w-full max-w-250 mx-auto">
          <GameRules />
        </div>
      </div>
    </div>
  );
}

export default GamePage;
