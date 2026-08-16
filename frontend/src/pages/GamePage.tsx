import GameContainer from "../components/layout/GameContainer";
import Header from "../components/layout/Header";
import { useEffect } from "react";
import { useGameStore } from "../store/gameStore";
import { samplePuzzle } from "../data/samplePuzzle";
import useKeyboardInput from "../hooks/useKeyboardInput";
// import GameShell from "../components/layout/GameShell";

function GamePage() {
  const setBoard = useGameStore((state) => state.setBoard);

  useKeyboardInput();
  useEffect(() => {
    setBoard(samplePuzzle);
  }, [setBoard]);
  return (
    <div className="relative min-h-screen overflow-hidden bg-zinc-950 text-white">
      {/* Background */}
      <div className="absolute -left-48 top-0 h-125 w-125 rounded-full bg-indigo-500/20 blur-[180px]" />

      <div className="absolute right-0 top-72 h-100 w-100 rounded-full bg-violet-500/20 blur-[180px]" />

      <div className="absolute bottom-0 left-1/2 h-87.5 w-87.5 -translate-x-1/2 rounded-full bg-cyan-400/10 blur-[170px]" />

      <div className="relative z-10">
        <Header />

        <GameContainer />
      </div>
    </div>
  );
}

export default GamePage;
