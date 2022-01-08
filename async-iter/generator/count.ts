import { loop } from "./loop.ts";

export interface CountInput {
  min?: number;
  max?: number;
  step?: number;
}

export function count({ min = 0, max = Infinity, step = 1 }: CountInput = {}) {
  return loop({
    initial: () => min,
    next: (i) => i + step,
    hasMore: (i) => i <= max,
  });
}
