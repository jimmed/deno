import type {
  Async,
  AsyncCallback,
  AsyncPredicate,
  AsyncReducer,
} from "./_types.ts";
import * as operators from "./operator/mod.ts";
import * as transformers from "./transformer/mod.ts";

type OpName = keyof typeof operators;
type TfName = keyof typeof transformers;

export const wrap = <T>(source: () => AsyncIterator<T>) =>
  new Proxy({ [Symbol.asyncIterator]: source } as Wrapped<T>, {
    get: (t, p, r) => {
      if (p in operators && p !== "compose") {
        return (...args: unknown[]) =>
          wrap(() =>
            // deno-lint-ignore ban-types
            (operators[p as OpName] as Function)(...args)(source())
          );
      }
      if (p in transformers) {
        return (...args: unknown[]) =>
          // deno-lint-ignore ban-types
          (transformers[p as TfName] as Function)(...args)(source());
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
  get<K extends keyof T>(key: K): Wrapped<T[K]>;
  where<U extends T>(partialMatch: Partial<U>): Wrapped<U>;
  every(predicate: AsyncPredicate<T, T>): Promise<boolean>;
  find<T, U extends T = T>(
    match: AsyncPredicate<T, U>,
    throwOnEmpty?: false,
  ): Promise<U | void>;
  find<T, U extends T = T>(
    match: AsyncPredicate<T, U>,
    throwOnEmpty: true,
  ): Promise<U>;
  forEach(callback: AsyncCallback<T, unknown>): Promise<void>;
  groupBy<K>(getGroup: AsyncCallback<T, K>): Promise<Map<K, T[]>>;
  groupByKey<K extends keyof T>(key: K): Promise<Map<K, T[]>>;
  indexBy<K>(getIndex: AsyncCallback<T, K>): Promise<Map<K, T>>;
  indexByKey<K extends keyof T>(key: K): Promise<Map<K, T>>;
  first(throwOnEmpty?: false): Promise<T | void>;
  first(throwOnEmpty: true): Promise<T>;
  last(throwOnEmpty?: false): Promise<T | void>;
  last(throwOnEmpty: true): Promise<T>;
  reduce<U>(reducer: AsyncReducer<T, U>, initialValue: U): Promise<U>;
  some(predicate: AsyncPredicate<T, T>): Promise<boolean>;
  toArray(): Promise<T[]>;
  toSet(): Promise<Set<T>>;
  toMap: T extends [infer K, infer V] ? () => Promise<Map<K, V>> : never;
}
