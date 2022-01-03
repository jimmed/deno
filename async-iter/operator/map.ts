import type { AsyncCallback, AsyncOperator } from "../_types.ts";

export const map = <T, U>(
  transform: AsyncCallback<T, U>,
): AsyncOperator<T, U> =>
  async function* (iterable) {
    for await (const item of iterable) yield await transform(item);
  };
