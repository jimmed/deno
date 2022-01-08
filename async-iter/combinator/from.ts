import type { AsyncIterInput } from "../_types.ts";

/**
 * Creates an AsyncIterable that iterates over `values`
 */
export function from<T>(values: AsyncIterInput<T>): AsyncIterable<T> {
  return {
    async *[Symbol.asyncIterator]() {
      yield* await values;
    },
  };
}
