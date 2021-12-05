import { IS_RESULT } from "./_constants.ts";
import { Result } from "./_types.ts";

export class Ok<T> implements Result<T, Error> {
  readonly [IS_RESULT] = true;
  #value: T;

  constructor(value: T) {
    this.#value = value!;
  }

  isOk(): true {
    return true;
  }

  isErr(): false {
    return false;
  }

  unwrap(): T {
    return this.#value;
  }
}

export function ok(): Ok<void>;
export function ok<T>(value: T): Ok<T>;
export function ok<T>(value?: T) {
  return new Ok(value);
}
