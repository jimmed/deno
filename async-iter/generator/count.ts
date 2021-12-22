import { forLoop } from "./for-loop.ts";

export interface CountInput {
  min?: number;
  max?: number;
  step?: number;
}

export function count({ min = 0, max = Infinity, step = 1 }: CountInput = {}) {
  return forLoop({
    initial: () => min,
    next: (i) => i + step,
    hasMore: (i) => i <= max,
  });
}
