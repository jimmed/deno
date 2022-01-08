import type { AsyncCallback } from "../_types.ts";
import { compose } from "../operator/compose.ts";
import { map } from "../operator/map.ts";
import { reduce } from "./reduce.ts";

export const groupBy = <T, K>(getGroup: AsyncCallback<T, K>) =>
  compose(
    map<T, [K, T]>(async (item) => [await getGroup(item), item]),
    reduce((acc, [key, value]) => {
      if (acc.has(key)) acc.get(key)!.push(value);
      else acc.set(key, [value]);
      return acc;
    }, new Map<K, T[]>()),
  );
