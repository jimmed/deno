import { None } from "./none.ts";
import { Some } from "./some.ts";

export class OptionIsNoneError extends Error {
  constructor(msg?: string | null) {
    super(msg ?? "Expected an Option to be Some, but got None");
  }
}

export type FlattenOption<T> = T extends Option<infer U>
  ? FlattenOption<U>
  : Option<T>;

/**
 * Represents a value that may or may not be present.
 */
export abstract class Option<Value> {
  public abstract isSome(): this is Some<Value>;
  public abstract isNone(): this is None<Value>;
  public abstract map<U>(transform: (value: Value) => U): Option<U>;
  public abstract flatten(): FlattenOption<Value>;
  public abstract unwrap(): Value;
  public abstract expectSome(errorMessage: string): Value;
  public abstract eq(
    other: Option<Value>,
    compare?: (a: Value, b: Value) => boolean
  ): boolean;
  public neq(other: Option<Value>, compare?: (a: Value, b: Value) => boolean) {
    return !this.eq(other, compare);
  }
  public abstract and<Other>(other: Option<Other>): Option<Other>;
  public abstract or<Other>(
    other: Option<Other>
  ): Option<Other> | Option<Value>;
  public abstract otherwise(value: Value): Value;
}
