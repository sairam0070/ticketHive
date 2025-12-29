import { Server } from "socket.io";
import { holdSeat } from "./services/seat.service";

export function initSocket(server: any) {
  const io = new Server(server, {
    cors: { origin: "*" },
  });

  io.on("connection", (socket) => {
    console.log("Client connected");

    socket.on("hold-seat", async ({ seatId, userId }) => {
      try {
        const seat = await holdSeat(seatId, userId);

        // ✅ Broadcast updated seat to ALL clients
        io.emit("seat:update", seat);
      } catch (err) {
        socket.emit("hold-failed", { seatId });
      }
    });
  });
}
