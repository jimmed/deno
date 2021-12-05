import { IS_OPTION } from "./_constants.ts";
import { FlattenOption, Option } from "./option.ts";
import { isOption } from "./util.ts";

export class Some<Value> implements Option<Value> {
  readonly [IS_OPTION] = true;

  #value: Value;
  constructor(value: Value) {
    this.#value = value;
  }

  map<U>(transform: (value: Value) => U): Option<U> {
    return new Some(transform(this.#value));
  }

  isNone(): false {
    return false;
  }

  isSome(): true {
    return true;
  }

  unwrap() {
    return this.#value;
  }

  expectSome(_errorMsg: string) {
    return this.#value;
  }

  flatten(): FlattenOption<Value> {
    if (isOption(this.#value)) {
      return this.#value.flatten() as FlattenOption<Value>;
    }
    return this as unknown as FlattenOption<Value>;
  }

  eq(
    other: Option<Value>,
    compare: (a: Value, b: Value) => boolean = Object.is,
  ): boolean {
    return other.isSome() && compare(this.unwrap(), other.unwrap());
  }

  neq(
    other: Option<Value>,
    compare: (a: Value, b: Value) => boolean = Object.is,
  ): boolean {
    return other.isNone() || !compare(this.unwrap(), other.unwrap());
  }

  and<Other>(other: Option<Other>) {
    return other;
  }

  or<Other>(_other: Option<Other>) {
    return this;
  }

  otherwise(_fallback: Value) {
    return this.unwrap();
  }

  [Symbol.toStringTag]() {
    return `Some { ${this.#value} }`;
  }
}

export const some = <Value>(value: Value) => new Some(value);
