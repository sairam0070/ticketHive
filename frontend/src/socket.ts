import { io } from "socket.io-client";
import { useSeatStore } from "./store";
import type { Seat } from "./types";

export const socket = io("http://localhost:4000");

socket.on("seat:update", (updatedSeat: Seat) => {
  const { seats, setSeats } = useSeatStore.getState();
  setSeats(seats.map((s) => (s._id === updatedSeat._id ? updatedSeat : s)));
});
