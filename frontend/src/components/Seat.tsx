import type { Seat as SeatType } from "../types";
import { useSeatStore } from "../store";

interface Props {
  seat: SeatType;
  onClick(): void;
}

export function Seat({ seat, onClick }: Props) {
  const { userId } = useSeatStore();

  let color = "bg-green-500";

  if (seat.status === "HELD") {
    color = seat.heldBy === userId ? "bg-amber-500" : "bg-gray-400";
  } else if (seat.status === "BOOKED") {
    color = "bg-red-500";
  }

  const disabled = seat.status === "BOOKED" || (seat.status === "HELD" && seat.heldBy !== userId);

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`${color} w-10 h-10 rounded`}
    />
  );
}
