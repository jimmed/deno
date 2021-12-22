import { AsyncCallback, AsyncPredicate } from "../_types.ts";
import { AsyncIter } from "../AsyncIter.ts";

export interface ForLoopInput<T> {
  initial: AsyncCallback<void, T>;
  next: AsyncCallback<T, T>;
  hasMore?: AsyncPredicate<T, T>;
}

export function forLoop<T>(
  { initial, next, hasMore }: ForLoopInput<T>,
): AsyncIter<T> {
  return new AsyncIter(async function* () {
    let value = await initial();
    while (hasMore ? await hasMore(value) : true) {
      yield value;
      value = await next(value);
    }
  });
}
