import { AsyncIter } from "../AsyncIter.ts";
import type { AI } from "../_types.ts";

/**
 * 'Zips' together multiple AsyncIterables, yielding an array of values
 * from each source iterable on every iteration, completing as soon as any
 * of the source iterables complete.
 *
 * ```
 * zip([
 *   of(1, 4, 7),
 *   of(2, 5),
 *   of(3, 6),
 * ])
 * // => [1, 2, 3]
 * // => [4, 5, 6]
 * // => (does not yield [7]!)
 * ```
 */
export function zip<Ts extends unknown[]>(
  ...iterables: { [K in keyof Ts]: AI<Ts[K]> }
) {
  return _zip<Ts, "some">(iterables, "some");
}

/**
 * 'Zips' together multiple AsyncIterables, yielding an array of values
 * from each source iterable on every iteration, completing when all of
 * the source iterables have completed.
 *
 * ```
 * zip([
 *   of(1, 4),
 *   of(2, 5, 8),
 *   of(3, 6),
 * ])
 * // => [1, 2, 3]
 * // => [4, 5, 6]
 * // => [undefined, 8, undefined])
 * ```
 */
export function zipExhaustive<Ts extends unknown[]>(
  ...iterables: { [K in keyof Ts]: AI<Ts[K]> }
) {
  return _zip<Ts, "every">(iterables, "every");
}

function _zip<Ts extends unknown[], S extends "some" | "every">(
  iterables: { [K in keyof Ts]: AI<Ts[K]> },
  doneOn: S = "some" as S,
): AsyncIter<S extends "some" ? Ts : Partial<Ts>> {
  return new AsyncIter(async function* () {
    if (!iterables.length) return;

    const iterators = iterables.map((i) => i[Symbol.asyncIterator]()) as {
      [K in keyof Ts]: AsyncIterator<Ts[K]>;
    };
    const done = new Set<AsyncIterator<Ts[keyof Ts]>>();

    while (true) {
      const next = await combineNext(iterators, doneOn, done);
      if (next.done) return;
      yield next.value as Ts;
    }
  });
}

async function combineNext<Ts extends unknown[]>(
  iterators: { [K in keyof Ts]: AsyncIterator<Ts[K]> },
  doneOn: "some" | "every" = "some",
  done: Set<AsyncIterator<Ts[keyof Ts]>>,
): Promise<IteratorResult<Partial<Ts>>> {
  const nextResults = await Promise.all(
    (iterators as AsyncIterator<Ts[keyof Ts]>[]).map(async (iter) => {
      if (done.has(iter)) return DONE;

      const result = await iter.next();
      if (result.done) done.add(iter);

      return result as IteratorResult<Ts[keyof Ts]>;
    }),
  );

  if (nextResults[doneOn]((r) => r.done)) return DONE;
  return { done: false, value: nextResults.map((r) => r.value) as Ts };
}

const DONE = { done: true, value: undefined } as IteratorReturnResult<void>;
