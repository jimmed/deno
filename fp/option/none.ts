import { IS_OPTION } from "./_constants.ts";
import { OptionIsNone } from "./_errors.ts";
import { FlattenOption, Option } from "./_types.ts";

export class None<Value = unknown> implements Option<Value> {
  readonly [IS_OPTION] = true;

  map<U>(): Option<U> {
    return this as unknown as Option<U>;
  }

  isSome(): false {
    return false;
  }

  isNone(): true {
    return true;
  }

  flatten(): FlattenOption<Value> {
    return this as unknown as FlattenOption<Value>;
  }

  expectSome(errorMessage?: string): Value {
    throw new OptionIsNone(errorMessage);
  }

  expectNone(_errorMessage?: string) {}

  unwrap(): Value {
    throw new OptionIsNone();
  }

  eq(other: Option<Value>, _compare?: (a: Value, b: Value) => boolean) {
    return other.isNone();
  }

  neq(
    other: Option<Value>,
    _compare: (a: Value, b: Value) => boolean = Object.is,
  ): boolean {
    return !other.isNone();
  }

  and<Other>(_other: Option<Other>) {
    return this as unknown as Option<Other>;
  }

  or<Other>(other: Option<Other>) {
    return other;
  }

  otherwise(value: Value) {
    return value;
  }

  [Symbol.toStringTag]() {
    return "None";
  }
}

const SHARED_NONE = new None();
export function none<Value>(): None<Value> {
  return SHARED_NONE as None<Value>;
}
