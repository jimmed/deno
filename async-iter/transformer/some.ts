import { AsyncPredicate, AsyncTransformer } from "../_types.ts";

export function some<T>(
  predicate: AsyncPredicate<T, T>,
): AsyncTransformer<T, Promise<boolean>> {
  return async function (iterable) {
    for await (const item of iterable) if (await predicate(item)) return true;
    return false;
  };
}
