import { Schema, model } from "mongoose";

export type SeatStatus = "AVAILABLE" | "HELD" | "BOOKED";

export interface SeatDoc {
  row: number;
  column: number;
  status: SeatStatus;
  heldBy?: string;
  holdExpiresAt?: Date;
}

const seatSchema = new Schema<SeatDoc>({
  row: { type: Number, required: true },
  column: { type: Number, required: true },
  status: { type: String, enum: ["AVAILABLE","HELD","BOOKED"], default: "AVAILABLE" },
  heldBy: { type: String },
  holdExpiresAt: { type: Date }
}, { timestamps: true });

seatSchema.index({ row: 1, column: 1 }, { unique: true });

export const SeatModel = model<SeatDoc>("Seat", seatSchema);
