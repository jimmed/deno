import type { AsyncOperator, AsyncPredicate } from "../_types.ts";

/**
 * Skips items from the underlying AsyncIterable until `skip` returns (or
 * resolves) a falsy value, and then yields the rest.
 *
 * @param skip A function which returns (or resolves with) a boolean
 */
export const skipWhile = <T, U extends T = T>(
  skip: AsyncPredicate<T, U>,
): AsyncOperator<T, T> =>
  async function* (iterable) {
    let skipping = true;
    for await (const item of iterable) {
      if ((skipping &&= await skip(item))) continue;
      yield item;
    }
  };
