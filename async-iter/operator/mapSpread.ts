import type { Async } from "../_types.ts";
import { map } from "./map.ts";

export const mapSpread = <T extends unknown[], U>(
  callback: (...args: T) => Async<U>,
) => map<T, U>((args) => callback(...args));
