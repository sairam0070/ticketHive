// import { io } from "socket.io-client";
// import { useSeatStore } from "./store";
// import type { Seat } from "./types";

// export const socket = io("http://localhost:4000");

// socket.on("seat:update", (updatedSeat: Seat) => {
//   const { seats, setSeats } = useSeatStore.getState();
//   setSeats(seats.map((s) => (s._id === updatedSeat._id ? updatedSeat : s)));
// });



import { io } from "socket.io-client";
import { useSeatStore } from "./store";
import type { Seat } from "./types";

// Use environment variable for backend URL
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

export const socket = io(BACKEND_URL, {
  transports: ["websocket", "polling"], // ensures both WS and fallback
});

// Listen for seat updates
socket.on("seat:update", (updatedSeat: Seat) => {
  const { seats, setSeats } = useSeatStore.getState();
  setSeats(seats.map((s) => (s._id === updatedSeat._id ? updatedSeat : s)));
});
