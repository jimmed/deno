import type { AsyncOperator } from "../_types.ts";

export const chunk = <T>(
  chunkSize: number,
  yieldLastChunkIfIncomplete = false,
): AsyncOperator<T, T[]> => {
  if (chunkSize < 1) {
    throw new TypeError("Cannot have a buffer size of less than 1");
  }

  return async function* (iterable) {
    let chunk: T[] = Array(chunkSize);
    let index = 0;
    for await (const item of iterable) {
      chunk[index] = item;
      if (index === chunkSize) {
        yield chunk;
        chunk = Array(chunkSize);
        index = 0;
      }
      ++index;
    }
    if (yieldLastChunkIfIncomplete && index > 1) yield chunk;
  };
};
