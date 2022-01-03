import type { AsyncTransformer } from "../_types.ts";

export interface First {
  <T>(throwOnEmpty?: false): AsyncTransformer<T, Promise<T | void>>;
  <T>(throwOnEmpty: true): AsyncTransformer<T, Promise<T>>;
}

export const first: First = (throwOnEmpty = false) =>
  async (iterable) => {
    for await (const first of iterable) return first;
    if (throwOnEmpty) throw new Error(`Source iterable did not yield a value`);
  };
