import { Option, FlattenOption } from "./option.ts";

export class Some<Value> extends Option<Value> {
  #value: Value;
  constructor(value: Value) {
    super();
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
    if (this.#value instanceof Option) {
      return this.#value.flatten() as FlattenOption<Value>;
    }
    return this as unknown as FlattenOption<Value>;
  }

  eq(
    other: Option<Value>,
    compare: (a: Value, b: Value) => boolean = Object.is
  ): boolean {
    return other.isSome() && compare(this.unwrap(), other.unwrap());
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
