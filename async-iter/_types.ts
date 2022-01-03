export type Async<T> = Promise<T> | T;

/** Short-hand for the native `AsyncIterable` */
export type AI<T> = AsyncIterable<T>;

/**
 * A function that returns a boolean value for a given item.
 * This may optionally be asynchronous.
 */
export type AsyncPredicate<T, U extends T> =
  | ((item: T) => item is U)
  | ((item: T) => Async<boolean>);

/**
 * A function that compares two values of the same type and returns a boolean.
 */
export type AsyncComparator<T> = (a: T, b: T) => Async<boolean>;

export type AsyncCallback<T, U> = (item: T) => Async<U>;

export type AsyncReducer<T, U> = (accumulator: U, item: T) => Async<U>;

export type AsyncIterInput<T> = Async<
  | Iterable<Async<T>>
  | AI<T>
>;

export type AsyncTransformer<T, U> = (source: AI<T>) => U;

export type AsyncOperator<T, U = T> = AsyncTransformer<T, AI<U>>;

export type ArrayValue<Ts extends unknown[]> = {
  [K in keyof Ts]: Ts[K];
}[keyof Ts & number];

export type OptionalArrayValue<Ts extends unknown[]> = {
  [K in keyof Ts]?: Ts[K];
}[keyof Ts & number];
