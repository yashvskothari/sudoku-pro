import Card from "../common/Card";
import { Undo2, Redo2, Pencil, Lightbulb, Eraser } from "lucide-react";
import { useGameStore } from "../../store/gameStore";

function Controls() {
  const undo = useGameStore((state) => state.undo);
  const redo = useGameStore((state) => state.redo);
  const eraseCell = useGameStore((state) => state.eraseCell);
  const useHint = useGameStore((state) => state.useHint);
  const toggleNotesMode = useGameStore((state) => state.toggleNotesMode);
  const isNotesMode = useGameStore((state) => state.isNotesMode);
  const history = useGameStore((state) => state.history);
  const future = useGameStore((state) => state.future);
  const selectedCell = useGameStore((state) => state.selectedCell);
  const isInteractive = useGameStore(
    (state) =>
      state.hasStarted &&
      !state.isPaused &&
      !state.isComplete &&
      !state.isGameOver &&
      !state.hintLimitReached
  );

  const buttons = [
    {
      Icon: Undo2,
      label: "Undo",
      onClick: undo,
      disabled: history.length === 0 || !isInteractive,
      active: false,
    },
    {
      Icon: Redo2,
      label: "Redo",
      onClick: redo,
      disabled: future.length === 0 || !isInteractive,
      active: false,
    },
    {
      Icon: Pencil,
      label: "Notes",
      onClick: toggleNotesMode,
      disabled: !isInteractive,
      active: isNotesMode,
    },
    {
      Icon: Lightbulb,
      label: "Hint",
      onClick: useHint,
      disabled: !selectedCell || !isInteractive,
      active: false,
    },
    {
      Icon: Eraser,
      label: "Erase",
      onClick: eraseCell,
      disabled: !selectedCell || !isInteractive,
      active: false,
    },
  ];

  return (
    <Card title="Controls">
      <div className="grid grid-cols-5 gap-3">
        {buttons.map(({ Icon, label, onClick, disabled, active }) => (
          <button
            key={label}
            title={label}
            onClick={onClick}
            disabled={disabled}
            className={`
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-xl
            transition

            hover:scale-105
            disabled:cursor-not-allowed
            disabled:opacity-30
            disabled:hover:scale-100
            ${
              active
                ? "bg-cyan-500/30 text-cyan-300 ring-2 ring-cyan-400/60"
                : "bg-white/5 hover:bg-indigo-500/20"
            }
            `}
          >
            <Icon size={20} />
          </button>
        ))}
      </div>
    </Card>
  );
}

export default Controls;
