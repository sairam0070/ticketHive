import { z } from "zod";

export const generateSeatsSchema = z.object({
  rows: z.number().min(3).max(20),
  columns: z.number().min(3).max(20),
});

export const holdSeatSchema = z.object({
  seatId: z.string(),
  userId: z.string(),
});

export const bookSeatsSchema = z.object({
  seatIds: z.array(z.string()).min(1),
  userId: z.string(),
});
