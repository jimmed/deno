import { IS_OPTION } from "./_constants.ts";
import { None } from "./none.ts";
import { Some } from "./some.ts";

export class OptionIsNoneError extends Error {
  constructor(msg?: string | null) {
    super(msg ?? "Expected an Option to be Some, but got None");
  }
}

export type FlattenOption<T> = T extends Option<infer U> ? FlattenOption<U>
  : Option<T>;

export interface Option<Value> {
  readonly [IS_OPTION]: true;
  isSome(): this is Some<Value>;
  isNone(): this is None<Value>;
  map<U>(transform: (value: Value) => U): Option<U>;
  flatten(): FlattenOption<Value>;
  unwrap(): Value;
  expectSome(errorMessage: string): Value;
  eq(other: Option<Value>, compare?: (a: Value, b: Value) => boolean): boolean;
  and<Other>(other: Option<Other>): Option<Other>;
  or<Other>(other: Option<Other>): Option<Other> | Option<Value>;
  otherwise(value: Value): Value;
}

export function isOption<Value = unknown>(
  value: unknown,
): value is Option<Value> {
  return value != null && typeof value == "object" && IS_OPTION in value!;
}
