import { AsyncIter } from "../AsyncIter.ts";
import { AI, ArrayValue } from "../_types.ts";

export function concat<Ts extends unknown[]>(
  ...iterables: { [K in keyof Ts]: AI<Ts[K]> }
): AsyncIter<ArrayValue<Ts>> {
  return new AsyncIter(async function* () {
    for (const iterable of iterables as AI<ArrayValue<Ts>>[]) {
      for await (const item of iterable) yield item;
    }
  });
}
