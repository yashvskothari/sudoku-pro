export function isSameRow(selectedRow: number, row: number) {
  return selectedRow === row;
}

export function isSameColumn(selectedCol: number, col: number) {
  return selectedCol === col;
}

export function isSameBox(
  selectedRow: number,
  selectedCol: number,
  row: number,
  col: number
) {
  return (
    Math.floor(selectedRow / 3) === Math.floor(row / 3) &&
    Math.floor(selectedCol / 3) === Math.floor(col / 3)
  );
}