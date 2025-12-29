import { GridGenerator } from "./components/GridGenerator";
import { SeatGrid } from "./components/SeatGrid";
import { Toaster } from "react-hot-toast";
import { useSeatStore } from "./store";

export default function App() {
  const { setSeats } = useSeatStore();

  async function generate(rows: number, cols: number) {
    const res = await fetch("http://localhost:4000/seats/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rows, columns: cols }),
    });

    const seats = await res.json();
    setSeats(seats);
  }

  return (
    <div className="p-4">
      <GridGenerator onGenerate={generate} />
      <SeatGrid />
      <Toaster />
    </div>
  );
}
