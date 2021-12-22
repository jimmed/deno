export type Async<T> = Promise<T> | T;

export type AI<T> = AsyncIterable<T>;

export type AsyncPredicate<T, U extends T> =
  | ((item: T) => item is U)
  | ((item: T) => Async<boolean>);

export type AsyncCallback<T, U> = (item: T) => Async<U>;

export type AsyncReducer<T, U> = (accumulator: U, item: T) => Async<U>;

export type AsyncIterInput<T> = Async<
  | Iterable<Async<T>>
  | AI<T>
>;

export type AsyncTransformer<T, U> = (source: AI<T>) => AI<U>;

export type ArrayValue<Ts extends unknown[]> = {
  [K in keyof Ts]: Ts[K];
}[keyof Ts & number];

export type OptionalArrayValue<Ts extends unknown[]> = {
  [K in keyof Ts]?: Ts[K];
}[keyof Ts & number];
