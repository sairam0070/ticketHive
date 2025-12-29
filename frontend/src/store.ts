import { create } from "zustand";
import type { Seat } from "./types";

interface SeatState {
  seats: Seat[];
  selectedSeatIds: string[];
  userId: string;
  holdRemainingMs: number;

  setSeats: (seats: Seat[] | ((prevSeats: Seat[]) => Seat[])) => void;
  selectSeat(seatId: string): void;
  deselectSeat(seatId: string): void;
  setHoldRemaining(ms: number): void;
}

const storedId = localStorage.getItem("userId") || crypto.randomUUID();
localStorage.setItem("userId", storedId);

export const useSeatStore = create<SeatState>((set) => ({
  seats: [],
  selectedSeatIds: [],
  userId: storedId,
  holdRemainingMs: 0,

  setSeats: (seatsOrFn) =>
    set((state) => ({
      seats: typeof seatsOrFn === "function" ? seatsOrFn(state.seats) : seatsOrFn,
    })),

  selectSeat: (seatId) =>
    set((state) => ({ selectedSeatIds: [...state.selectedSeatIds, seatId] })),

  deselectSeat: (seatId) =>
    set((state) => ({
      selectedSeatIds: state.selectedSeatIds.filter((id) => id !== seatId),
    })),

  setHoldRemaining: (ms) => set({ holdRemainingMs: ms }),
}));
