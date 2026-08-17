import { BookOpen } from "lucide-react";
import Card from "../common/Card";

function GameRules() {
  return (
    <Card title="How to Play">
      <div className="space-y-3 text-sm leading-6 text-zinc-300">

          <div className="flex items-start gap-3">
          <p>
            The goal of Sudoku is to fill in a 9×9 grid with digits so that each column, row, and 3×3 section contain the numbers between 1 to 9. At the beginning of the game, the 9×9 grid will have some of the squares filled in. Your job is to use logic to fill in the missing digits and complete the grid.
          </p>
        </div>
        
        <br>
        </br>

        <div className="flex items-start gap-3">
          <BookOpen className="mt-1 h-4 w-4 shrink-0 text-cyan-400" />
          <p>
            Fill every empty cell using the numbers <strong>1–9</strong>.
          </p>
        </div>

        <div className="flex items-start gap-3">
          <BookOpen className="mt-1 h-4 w-4 shrink-0 text-cyan-400" />
          <p>
            Each <strong>row</strong> must contain every number from 1 to 9 exactly once.
          </p>
        </div>

        <div className="flex items-start gap-3">
          <BookOpen className="mt-1 h-4 w-4 shrink-0 text-cyan-400" />
          <p>
            Each <strong>column</strong> must contain every number from 1 to 9 exactly once.
          </p>
        </div>

        <div className="flex items-start gap-3">
          <BookOpen className="mt-1 h-4 w-4 shrink-0 text-cyan-400" />
          <p>
            Every <strong>3 × 3</strong> box must also contain the numbers 1–9 exactly once.
          </p>
        </div>

        <div className="flex items-start gap-3">
          <BookOpen className="mt-1 h-4 w-4 shrink-0 text-cyan-400" />
          <p>
            Complete the entire board correctly to win the game.
          </p>
        </div>

      </div>
    </Card>
  );
}

export default GameRules;
