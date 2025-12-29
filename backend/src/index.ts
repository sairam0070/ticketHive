import express from "express";
import cors from "cors";
import http from "http";
import { connectDB } from "./db";
import { seatRouter } from "./routes/seat.routes";
import { initSocket } from "./socket";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/seats", seatRouter);

const server = http.createServer(app);
initSocket(server);

connectDB().then(() => {
  server.listen(4000, () => console.log("Backend running on http://localhost:4000"));
});
