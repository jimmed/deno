import type {
  Async,
  AsyncCallback,
  AsyncPredicate,
  AsyncReducer,
} from "./_types.ts";
import * as operators from "./operator/mod.ts";

type Ops = typeof operators;
type OpName = keyof Ops;
type Op<K extends OpName> = Ops[K];

export const wrap = <T>(source: () => AsyncIterator<T>) =>
  new Proxy({ [Symbol.asyncIterator]: source } as Wrapped<T>, {
    get: (t, p, r) => {
      if (p in operators && p !== "compose") {
        return (...args: unknown[]) =>
          wrap(() =>
            // deno-lint-ignore ban-types
            (operators[p as OpName] as Function)(
              ...(args as Parameters<Op<OpName>>)
            )(source())
          );
      }
      return Reflect.get(t, p, r);
    },
  });

export interface Wrapped<T> extends AsyncIterable<T> {
  buffer(size: number, opts?: operators.BufferOptions): Wrapped<T[]>;
  chunk(size: number, opts?: operators.ChunkOptions): Wrapped<T[]>;
  filter<U extends T = T>(keep: AsyncPredicate<T, U>): Wrapped<U>;
  map<U>(cb: AsyncCallback<T, U>): Wrapped<U>;
  mapSpread: T extends unknown[]
    ? <U>(cb: (...args: T) => Async<U>) => Wrapped<U>
    : never;
  scan<U>(reducer: AsyncReducer<T, U>, initialValue: U): Wrapped<U>;
  skip(toSkip: number): Wrapped<T>;
  skipWhile<U extends T>(shouldSkip: AsyncPredicate<T, U>): Wrapped<T>;
  take(toTake: number): Wrapped<T>;
  takeWhile<U extends T>(shouldTake: AsyncPredicate<T, U>): Wrapped<U>;
  tap(callback: AsyncCallback<T, unknown>): Wrapped<T>;
  decodeText: T extends BufferSource | undefined
    ? (decoder?: TextDecoder) => Wrapped<string>
    : never;
  textToLines: T extends string ? () => Wrapped<string> : never;
  whenChanged(compare?: AsyncPredicate<T, T>): Wrapped<T>;
  get: T extends Record<never, never>
    ? <K extends keyof T>(key: K) => Wrapped<T[K]>
    : never;
  where: T extends Record<never, never>
    ? <U extends T>(partialMatch: Partial<U>) => Wrapped<U>
    : never;
}
