import { reduce } from "./reduce.ts";

export const toSet = <T>() =>
  reduce<T, Set<T>>((set, item) => set.add(item), new Set());
