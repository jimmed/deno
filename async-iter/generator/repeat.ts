import { Async } from "../_types.ts";

export function repeat<T = void>(value?: Async<T>): AsyncIterable<T> {
  return {
    async *[Symbol.asyncIterator]() {
      while (true) yield value!;
    },
  };
}
