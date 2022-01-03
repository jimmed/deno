import type { AsyncOperator } from "../_types.ts";

export const take = <T>(toTake: number): AsyncOperator<T> => {
  if (toTake < 0) throw new TypeError(`Cannot take a negative number of items`);

  return async function* (iterable) {
    if (!toTake) return;
    let taken = 0;
    for await (const item of iterable) {
      yield item;
      if (++taken >= toTake) return;
    }
  };
};
