import type { AsyncOperator } from "../_types.ts";
export interface ChunkOptions {
  yieldPartial?: boolean;
}

export const chunk = <T>(
  size: number,
  { yieldPartial = false }: ChunkOptions = {},
): AsyncOperator<T, T[]> => {
  if (size < 1) {
    throw new TypeError("Cannot have a buffer size of less than 1");
  }

  return async function* (iterable) {
    let chunk: T[] = Array(size);
    let index = 0;
    for await (const item of iterable) {
      chunk[index] = item;
      if (++index === size) {
        yield chunk;
        chunk = Array(size);
        index = 0;
      }
    }
    if (yieldPartial && index > 1) yield chunk;
  };
};
