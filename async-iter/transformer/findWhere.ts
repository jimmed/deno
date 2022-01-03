import type { AsyncTransformer } from "../_types.ts";
import { find } from "./find.ts";

export interface FindWhere {
  <T, U extends T = T>(
    partialValue: Partial<U>,
    throwOnNotFound?: false,
  ): AsyncTransformer<T, Promise<U | void>>;
  <T, U extends T = T>(
    partialValue: Partial<U>,
    throwOnNotFound: true,
  ): AsyncTransformer<T, Promise<U>>;
}

export const findWhere: FindWhere = <T, U extends T = T>(
  partialValue: Partial<U>,
  throwOnNotFound = false,
): AsyncTransformer<T, Promise<U | void>> => {
  const entries = Object.entries(partialValue) as [keyof T, T[keyof T]][];
  return find(
    (item) => entries.every(([k, v]) => item[k] === v),
    throwOnNotFound as false,
  );
};
