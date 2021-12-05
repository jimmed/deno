import { IS_RESULT } from "./_constants.ts";
import { Result } from "./_types.ts";

export class Err<E extends Error> implements Result<unknown, E> {
  readonly [IS_RESULT] = true;
  #error: E;

  constructor(error: E) {
    this.#error = error;
  }

  isOk() {
    return false;
  }

  isErr() {
    return true;
  }

  unwrap(): unknown {
    throw this.#error;
  }
}

export function err<E extends Error>(error: E): Err<E> {
  return new Err(error);
}
