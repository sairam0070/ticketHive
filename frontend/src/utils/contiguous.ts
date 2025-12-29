// frontend/src/utils/contiguous.ts
export function isContiguous(columns: number[]): boolean {
  const sorted = [...columns].sort((a, b) => a - b);

  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i] !== sorted[i - 1] + 1) {
      return false;
    }
  }

  return true;
}
