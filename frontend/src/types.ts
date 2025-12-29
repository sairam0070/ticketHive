export type SeatStatus = "AVAILABLE" | "HELD" | "BOOKED";

export interface Seat {
  _id: string;
  row: number;
  column: number;
  status: SeatStatus;
  heldBy?: string;
  holdExpiresAt?: string;
}
