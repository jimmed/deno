import type { AsyncOperator, AsyncPredicate } from "../_types.ts";

/**
 * Yields items from the underlying AsyncIterable until `keep` returns (or
 * resolves) a falsy value.
 *
 * @param keep
 * A function that will be called with each item yielded by the iterable.
 * If it returns a truthy value, then the item will be yielded. If it
 * returns a falsy value, then the item will be discarded, and iteration
 * will stop.
 */
export const takeWhile = <T, U extends T = T>(
  keep: AsyncPredicate<T, U>,
): AsyncOperator<T, U> =>
  async function* (iterable) {
    for await (const item of iterable) {
      if (!await keep(item)) return;
      yield item as Awaited<U>;
    }
  };
