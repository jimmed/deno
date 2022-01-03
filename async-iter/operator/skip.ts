import type { AsyncOperator } from "../_types.ts";

export const skip = <T>(toSkip: number): AsyncOperator<T> => {
  if (toSkip < 0) throw new TypeError("Cannot skip a negative number of items");
  if (!toSkip) return (iterable) => iterable;
  return async function* (iterable) {
    let skipped = 0;
    for await (const item of iterable) {
      if (++skipped <= toSkip) continue;
      yield item;
    }
  };
};
