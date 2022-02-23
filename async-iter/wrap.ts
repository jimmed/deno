import type {
  Async,
  AsyncCallback,
  AsyncOperator,
  AsyncPredicate,
  AsyncReducer,
} from "./_types.ts";
import * as operators from "./operator/mod.ts";
import * as transformers from "./transformer/mod.ts";

type OpName = keyof typeof operators;
type TfName = keyof typeof transformers;

export const asAsyncIterable = <T>(
  source: AsyncIterable<T> | (() => AsyncIterator<T>),
): AsyncIterable<T> =>
  typeof source === "function" ? { [Symbol.asyncIterator]: source } : source;

export const iterateAsync = <T>(source: AsyncIterable<T>) =>
  source[Symbol.asyncIterator]();

export const wrap = <T>(
  source: AsyncIterable<T> | (() => AsyncIterator<T>),
) => {
  const run = () => iterateAsync(asAsyncIterable(source));
  return new Proxy(
    (Symbol.asyncIterator in source
      ? source
      : { [Symbol.asyncIterator]: source }) as Wrapped<T>,
    {
      get: (t, p, r) => {
        if (p === "pipe") p = "compose";
        if (p in operators) {
          return (...args: unknown[]) =>
            wrap(() =>
              // deno-lint-ignore ban-types
              (operators[p as OpName] as Function)(...args)(run())
            );
        }
        if (p in transformers) {
          return (...args: unknown[]) =>
            // deno-lint-ignore ban-types
            (transformers[p as TfName] as Function)(...args)(run());
        }
        return Reflect.get(t, p, r);
      },
    },
  );
};

export interface Wrapped<T> extends AsyncIterable<T> {
  exhaust(): Wrapped<never>;
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
  find<U extends T = T>(
    match: AsyncPredicate<T, U>,
    throwOnEmpty?: false,
  ): Promise<U | void>;
  find<U extends T = T>(
    match: AsyncPredicate<T, U>,
    throwOnEmpty: true,
  ): Promise<U>;
  forEach(callback: AsyncCallback<T, unknown>): Promise<void>;
  groupBy<K>(getGroup: AsyncCallback<T, K>): Promise<Map<K, T[]>>;
  groupByKey<K extends keyof T>(key: K): Promise<Map<T[K], T[]>>;
  indexBy<K>(getIndex: AsyncCallback<T, K>): Promise<Map<K, T>>;
  indexByKey<K extends keyof T>(key: K): Promise<Map<T[K], T>>;
  first(throwOnEmpty?: false): Promise<T | void>;
  first(throwOnEmpty: true): Promise<T>;
  last(throwOnEmpty?: false): Promise<T | void>;
  last(throwOnEmpty: true): Promise<T>;
  reduce<U>(reducer: AsyncReducer<T, U>, initialValue: U): Promise<U>;
  some(predicate: AsyncPredicate<T, T>): Promise<boolean>;
  toArray(): Promise<T[]>;
  toSet(): Promise<Set<T>>;
  toMap: T extends [infer K, infer V] ? () => Promise<Map<K, V>> : never;
  pipe<B>(ab: AsyncOperator<T, B>): Wrapped<B>;
  pipe<B, C>(ab: AsyncOperator<T, B>, bc: AsyncOperator<B, C>): Wrapped<C>;
  pipe<B, C, D>(
    ab: AsyncOperator<T, B>,
    bc: AsyncOperator<B, C>,
    cd: AsyncOperator<C, D>,
  ): Wrapped<D>;
  pipe<B, C, D, E>(
    ab: AsyncOperator<T, B>,
    bc: AsyncOperator<B, C>,
    cd: AsyncOperator<C, D>,
    de: AsyncOperator<D, E>,
  ): Wrapped<E>;
  pipe<B, C, D, E, F>(
    ab: AsyncOperator<T, B>,
    bc: AsyncOperator<B, C>,
    cd: AsyncOperator<C, D>,
    de: AsyncOperator<D, E>,
    ef: AsyncOperator<E, F>,
  ): Wrapped<F>;
  pipe<B, C, D, E, F, G>(
    ab: AsyncOperator<T, B>,
    bc: AsyncOperator<B, C>,
    cd: AsyncOperator<C, D>,
    de: AsyncOperator<D, E>,
    ef: AsyncOperator<E, F>,
    fg: AsyncOperator<F, G>,
  ): Wrapped<G>;
  pipe<B, C, D, E, F, G, H>(
    ab: AsyncOperator<T, B>,
    bc: AsyncOperator<B, C>,
    cd: AsyncOperator<C, D>,
    de: AsyncOperator<D, E>,
    ef: AsyncOperator<E, F>,
    fg: AsyncOperator<F, G>,
    gh: AsyncOperator<G, H>,
  ): Wrapped<H>;
  pipe<B, C, D, E, F, G, H, I>(
    ab: AsyncOperator<T, B>,
    bc: AsyncOperator<B, C>,
    cd: AsyncOperator<C, D>,
    de: AsyncOperator<D, E>,
    ef: AsyncOperator<E, F>,
    fg: AsyncOperator<F, G>,
    gh: AsyncOperator<G, H>,
    hi: AsyncOperator<H, I>,
  ): Wrapped<I>;
}
