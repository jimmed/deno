import type { AsyncCallback, AsyncPredicate } from "../_types.ts";

export interface LoopInput<T> {
  initial: AsyncCallback<void, T>;
  next: AsyncCallback<T, T>;
  hasMore?: AsyncPredicate<T, T>;
}

export function loop<T>({
  initial,
  next,
  hasMore,
}: LoopInput<T>): AsyncIterable<T> {
  return {
    async *[Symbol.asyncIterator]() {
      let value = await initial();
      while (hasMore ? await hasMore(value) : true) {
        yield value;
        value = await next(value);
      }
    },
  };
}
