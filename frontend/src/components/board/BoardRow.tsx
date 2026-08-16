import Cell from "./Cell";

interface BoardRowProps {
  row: number;
}

function BoardRow({ row }: BoardRowProps) {
  return (
    <>
      {Array.from({ length: 9 }).map((_, col) => (
        <Cell
          key={`${row}-${col}`}
          row={row}
          col={col}
        />
      ))}
    </>
  );
}

export default BoardRow;