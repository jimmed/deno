import type { AsyncCallback } from "../_types.ts";
import { map } from "./map.ts";

export const tap = <T>(cb: AsyncCallback<T, unknown>) =>
  map<T, T>(async (item) => {
    await cb(item);
    return item;
  });
