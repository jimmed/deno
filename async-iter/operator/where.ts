import type { AsyncOperator } from "../_types.ts";
import { filter } from "./filter.ts";

export const where = <T, U extends T = T>(
  partialValue: Partial<U>,
): AsyncOperator<T, U> => {
  const entries = Object.entries(partialValue) as [keyof T, T[keyof T]][];
  return filter((item) => entries.every(([k, v]) => item[k] === v));
};
