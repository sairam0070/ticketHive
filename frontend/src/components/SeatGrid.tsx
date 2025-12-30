import { useEffect } from "react";
import { Seat } from "./Seat";
import { useSeatStore } from "../store";
import toast from "react-hot-toast";
import { socket } from "../socket";
import type { Seat as SeatType } from "../types";

export function SeatGrid() {
  const { seats, setSeats, selectedSeatIds, userId } = useSeatStore();

  // Load seats initially
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/seats`)

      .then((res) => res.json())
      .then((data: SeatType[]) => setSeats(data))
      .catch(() => toast.error("Failed to load seats"));
  }, [setSeats]);

  // Listen for real-time updates
 useEffect(() => {
  const handleUpdate = (updatedSeat: SeatType) => {
    setSeats((prevSeats) =>
      prevSeats.map((s) => (s._id === updatedSeat._id ? updatedSeat : s))
    );
  };

  socket.on("seat:update", handleUpdate);

  // Cleanup
  return () => {
    socket.off("seat:update", handleUpdate);
  };
}, [setSeats]);
   

  function handleSelect(seatId: string) {
    if (selectedSeatIds.includes(seatId)) return;

    socket.emit("hold-seat", { seatId, userId });
  }

  if (!Array.isArray(seats) || seats.length === 0) {
    return <p className="text-gray-500">No seats available</p>;
  }

  const columnCount = Math.max(...seats.map((s) => s.column));

  return (
    <div
      className="grid gap-2"
      style={{ gridTemplateColumns: `repeat(${columnCount}, 40px)` }}
    >
      {seats.map((seat) => (
        <Seat key={seat._id} seat={seat} onClick={() => handleSelect(seat._id)} />
      ))}
    </div>
  );
}
