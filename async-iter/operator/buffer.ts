import type { AsyncOperator } from "../_types.ts";

export interface BufferOptions {
  yieldPartial?: boolean;
}

export const buffer = <T>(
  size: number,
  { yieldPartial = false }: BufferOptions = {},
): AsyncOperator<T, T[]> => {
  if (size < 1) throw new TypeError("Cannot have a buffer size of less than 1");

  return async function* (iterable) {
    const buffer: T[] = [];
    for await (const item of iterable) {
      buffer.push(item);
      if (buffer.length > size) buffer.shift();
      if (buffer.length === size) yield [...buffer];
    }
    if (yieldPartial && buffer.length < size) yield buffer;
  };
};
