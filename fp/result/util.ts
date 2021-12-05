import { Result } from "./_types.ts";
import { err } from "./err.ts";
import { ok } from "./ok.ts";

export function maybeThrows<T, E extends Error = Error>(
  fn: () => T,
): Result<T, E> {
  try {
    return ok(fn());
  } catch (error) {
    return err(error as E) as Result<T, E>;
  }
}

export function maybeRejects<T, E extends Error = Error>(
  promise: Promise<T>,
): Promise<Result<T, E>> {
  return promise.then((v) => ok(v), (e) => err(e as Error) as Result<T, E>);
}
