import type { AsyncCallback } from "../_types.ts";
import { compose } from "../operator/compose.ts";
import { map } from "../operator/map.ts";
import { toMap } from "./toMap.ts";

export const indexBy = <T, K>(getIndexOf: AsyncCallback<T, K>) =>
  compose(
    map<T, [K, T]>(async (item) => [await getIndexOf(item), item]),
    toMap(),
  );
