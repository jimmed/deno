import { Async } from "../_types.ts";
import { AsyncIter } from "../AsyncIter.ts";

export function repeat<T = void>(value?: Async<T>): AsyncIter<T> {
  return new AsyncIter<T>(async function* () {
    while (true) yield value!;
  });
}
