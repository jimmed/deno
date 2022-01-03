import type { AsyncComparator, AsyncOperator } from "../_types.ts";

export const whenChanged = <T>(
  isSame: AsyncComparator<T> = Object.is,
): AsyncOperator<T> =>
  async function* (iterable) {
    let prev: T;
    let first = true;
    for await (const next of iterable) {
      if (first || !await isSame(prev!, next)) {
        first = false;
        yield next;
      }
      prev = next;
    }
  };
