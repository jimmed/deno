import type { Async, AsyncOperator, AsyncReducer } from "../_types.ts";

export const scan = <T, U>(
  reducer: AsyncReducer<T, U>,
  initialValue: Async<U>,
): AsyncOperator<T, U> =>
  async function* (iterable) {
    let acc = await initialValue;
    yield acc;
    for await (const item of iterable) yield (acc = await reducer(acc, item));
  };
