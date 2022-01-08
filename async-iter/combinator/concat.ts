import type { AI, ArrayValue } from "../_types.ts";

export function concat<Ts extends unknown[]>(
  ...iterables: { [K in keyof Ts]: AI<Ts[K]> }
): AsyncIterable<ArrayValue<Ts>> {
  return {
    async *[Symbol.asyncIterator]() {
      for (const iterable of iterables as AI<ArrayValue<Ts>>[]) {
        for await (const item of iterable) yield item;
      }
    },
  };
}
