import { useState } from "react";

interface Props {
  onGenerate(rows: number, cols: number): void;
}

export function GridGenerator({ onGenerate }: Props) {
  const [rows, setRows] = useState(5);
  const [cols, setCols] = useState(5);

  return (
    <div className="flex gap-4 mb-4">
      <input type="number" min={3} max={20} value={rows} onChange={(e) => setRows(Number(e.target.value))} className="border p-2"/>
      <input type="number" min={3} max={20} value={cols} onChange={(e) => setCols(Number(e.target.value))} className="border p-2"/>
      <button onClick={() => onGenerate(rows, cols)} className="bg-blue-500 text-white px-4 py-2">Generate</button>
    </div>
  );
}
