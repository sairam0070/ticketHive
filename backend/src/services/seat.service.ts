import { SeatModel } from "../models/Seat";
import mongoose from "mongoose";

const HOLD_DURATION = 60 * 1000; // 60 seconds

export async function generateSeats(rows: number, columns: number) {
  await SeatModel.deleteMany({});
  const seats = [];
  for (let r = 1; r <= rows; r++) {
    for (let c = 1; c <= columns; c++) {
      seats.push({ row: r, column: c, status: "AVAILABLE" });
    }
  }
  await SeatModel.insertMany(seats);
  return SeatModel.find();
}

export async function holdSeat(seatId: string, userId: string) {
  const now = new Date();
  const expiresAt = new Date(now.getTime() + HOLD_DURATION);

  const seat = await SeatModel.findOneAndUpdate(
    { _id: seatId, $or: [{ status: "AVAILABLE" }, { status: "HELD", holdExpiresAt: { $lt: now } }] },
    { status: "HELD", heldBy: userId, holdExpiresAt: expiresAt },
    { new: true }
  );

  if (!seat) throw new Error("Seat already locked");
  return seat;
}

export async function bookSeats(seatIds: string[], userId: string) {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const seats = await SeatModel.find({ _id: { $in: seatIds }, status: "HELD", heldBy: userId }).session(session);
    if (seats.length !== seatIds.length) throw new Error("Seat ownership mismatch");

    await SeatModel.updateMany({ _id: { $in: seatIds } }, { status: "BOOKED", heldBy: null, holdExpiresAt: null }, { session });
    await session.commitTransaction();
  } catch (err) {
    await session.abortTransaction();
    throw err;
  } finally {
    session.endSession();
  }
}
