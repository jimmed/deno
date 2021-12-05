import { IS_RESULT } from "./_constants.ts";
import { Ok } from "./ok.ts";
import { Err } from "./err.ts";

export interface Result<T, E extends Error = Error> {
  readonly [IS_RESULT]: true;
  isOk(): this is Ok<T>;
  isErr(): this is Err<E>;
  unwrap(): T;
}
