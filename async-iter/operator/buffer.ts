import type { AsyncOperator } from "../_types.ts";

export const buffer = <T>(bufferSize: number): AsyncOperator<T, T[]> => {
  if (bufferSize < 1) {
    throw new TypeError("Cannot have a buffer size of less than 1");
  }

  return async function* (iterable) {
    const buffer: T[] = [];
    for await (const item of iterable) {
      buffer.push(item);
      if (buffer.length > bufferSize) buffer.shift();
      if (buffer.length < bufferSize) continue;
      yield buffer;
    }
    if (buffer.length < bufferSize) yield buffer;
  };
};
