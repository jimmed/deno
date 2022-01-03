import type { AsyncOperator } from "../_types.ts";
import { map } from "./map.ts";

export const get = <T, K extends keyof T>(key: K): AsyncOperator<T, T[K]> =>
  map((item) => item[key]);
