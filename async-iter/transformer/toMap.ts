import { reduce } from "./reduce.ts";

export const toMap = <K, V>() =>
  reduce<[key: K, value: V], Map<K, V>>(
    (map, args) => (map.set(...args), map),
    new Map(),
  );
