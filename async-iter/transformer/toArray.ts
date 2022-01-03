import { reduce } from "./reduce.ts";

export const toArray = <T>(preallocatedSize = 0) =>
  reduce<T, T[]>(
    (array, item) => (array.push(item), array),
    Array(preallocatedSize),
  );
