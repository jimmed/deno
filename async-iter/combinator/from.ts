import { AsyncIterInput } from "../_types.ts";
import { AsyncIter } from "../AsyncIter.ts";

/**
 * Constructs a new `AsyncIter` from any `AsyncIterable` or `Iterable`.
 */
export function from<T>(values: AsyncIterInput<T>) {
  return new AsyncIter(async function* () {
    yield* await values;
  });
}
