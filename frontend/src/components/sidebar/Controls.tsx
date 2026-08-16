import Card from "../common/Card";
import { Undo2, Redo2, Pencil, Lightbulb, Eraser } from "lucide-react";

function Controls() {
  const buttons = [
    Undo2,
    Redo2,
    Pencil,
    Lightbulb,
    Eraser,
  ];

  return (
    <Card title="Controls">

      <div className="grid grid-cols-5 gap-3">

        {buttons.map((Icon, index) => (

          <button
            key={index}
            className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-xl
            bg-white/5
            transition

            hover:bg-indigo-500/20
            hover:scale-105
            "
          >

            <Icon size={20} />

          </button>

        ))}

      </div>

    </Card>
  );
}

export default Controls;