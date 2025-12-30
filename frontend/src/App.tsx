import { GridGenerator } from "./components/GridGenerator";
import { SeatGrid } from "./components/SeatGrid";
import { Toaster } from "react-hot-toast";
import { useSeatStore } from "./store";

/* ✅ ADD THIS LINE */
const API = import.meta.env.VITE_API_URL;

export default function App() {
  const { setSeats } = useSeatStore();

  async function generate(rows: number, cols: number) {
    const res = await fetch(`${API}/seats/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rows, columns: cols }),
    });

    if (!res.ok) {
      throw new Error("Failed to generate seats");
    }

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
