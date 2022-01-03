import type { AsyncOperator, AsyncPredicate } from "../_types.ts";

export const filter = <T, U extends T = T>(
  keep: AsyncPredicate<T, U>,
): AsyncOperator<T, U> =>
  async function* (iterable) {
    for await (const item of iterable) {
      if (await keep(item)) {
        yield item as Awaited<U>;
      }
    }
  };
