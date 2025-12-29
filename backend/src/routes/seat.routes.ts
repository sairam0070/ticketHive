import { Router } from "express";
import { generateSeats, holdSeat, bookSeats } from "../services/seat.service";

const router = Router();

router.get("/", async (_req, res) => {
  const seats = await (await import("../models/Seat")).SeatModel.find();
  res.json(seats);
});

router.post("/generate", async (req, res) => {
  const { rows, columns } = req.body;
  const seats = await generateSeats(rows, columns);
  res.json(seats);
});

router.post("/hold", async (req, res) => {
  const { seatId, userId } = req.body;
  try {
    const seat = await holdSeat(seatId, userId);
    res.json(seat);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/book", async (req, res) => {
  const { seatIds, userId } = req.body;
  try {
    await bookSeats(seatIds, userId);
    res.json({ success: true });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

export { router as seatRouter };
