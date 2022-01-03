import type { AsyncTransformer } from "../_types.ts";

export interface Last {
  <T>(throwOnEmpty?: false): AsyncTransformer<T, Promise<T | void>>;
  <T>(throwOnEmpty: true): AsyncTransformer<T, Promise<T>>;
}

export const last: Last = <T>(throwOnEmpty = false) =>
  async (iterable: AsyncIterable<T>) => {
    let last: T | void;
    let yielded = false;
    for await (last of iterable) yielded = true;
    if (throwOnEmpty && !yielded) {
      throw new Error(`Source iterable did not yield a value`);
    }
    return last;
  };
