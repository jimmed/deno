import type { AsyncPredicate, AsyncTransformer } from "../_types.ts";
import { compose } from "../operator/compose.ts";
import { filter } from "../operator/filter.ts";
import { first } from "./first.ts";

export interface Find {
  <T, U extends T = T>(
    match: AsyncPredicate<T, U>,
    throwOnEmpty?: false,
  ): AsyncTransformer<T, Promise<U | void>>;
  <T, U extends T = T>(
    match: AsyncPredicate<T, U>,
    throwOnEmpty: true,
  ): AsyncTransformer<T, Promise<U>>;
}

export const find: Find = (match, throwOnEmpty = false) =>
  compose(filter(match), first(throwOnEmpty as false));
