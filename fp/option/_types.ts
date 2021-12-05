import { IS_OPTION } from "./_constants.ts";
import { None } from "./none.ts";
import { Some } from "./some.ts";

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
  expectNone(errorMessage: string): void;
  eq(other: Option<Value>, compare?: (a: Value, b: Value) => boolean): boolean;
  and<Other>(other: Option<Other>): Option<Other>;
  or<Other>(other: Option<Other>): Option<Other> | Option<Value>;
  otherwise(value: Value): Value;
}
