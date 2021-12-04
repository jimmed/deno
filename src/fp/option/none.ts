import { Option, FlattenOption, OptionIsNoneError } from "./option.ts";

export class None<Value = unknown> extends Option<Value> {
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
    throw new OptionIsNoneError(errorMessage);
  }

  unwrap(): Value {
    throw new OptionIsNoneError();
  }

  eq(other: Option<Value>, _compare?: (a: Value, b: Value) => boolean) {
    return other.isNone();
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
