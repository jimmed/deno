import type { AI, AsyncOperator } from "./_types.ts";
import { compose } from "./operator/compose.ts";

/**
 * A wrapper around a function that returns an AsyncIterable.
 *
 * It allows you to perform array-like operations on infinite, async series.
 */
export class AsyncIter<T> implements AI<T> {
  #self: () => AI<T>;

  /**
   * @param self A function that returns the underlying AsyncIterable
   */
  constructor(self: () => AI<T>) {
    this.#self = self;
  }

  public [Symbol.asyncIterator]() {
    return this.#self()[Symbol.asyncIterator]();
  }

  public lift<U>(transform: (iter: AI<T>) => U): U {
    return transform(this.#self());
  }

  public pipe<B>(ab: AsyncOperator<T, B>): AsyncIter<B>;
  public pipe<B, C>(
    ab: AsyncOperator<T, B>,
    bc: AsyncOperator<B, C>,
  ): AsyncIter<C>;
  public pipe<B, C, D>(
    ab: AsyncOperator<T, B>,
    bc: AsyncOperator<B, C>,
    cd: AsyncOperator<C, D>,
  ): AsyncIter<D>;
  public pipe<B, C, D, E>(
    ab: AsyncOperator<T, B>,
    bc: AsyncOperator<B, C>,
    cd: AsyncOperator<C, D>,
    de: AsyncOperator<D, E>,
  ): AsyncIter<E>;
  public pipe<B, C, D, E, F>(
    ab: AsyncOperator<T, B>,
    bc: AsyncOperator<B, C>,
    cd: AsyncOperator<C, D>,
    de: AsyncOperator<D, E>,
    ef: AsyncOperator<E, F>,
  ): AsyncIter<F>;
  public pipe<B, C, D, E, F, G>(
    ab: AsyncOperator<T, B>,
    bc: AsyncOperator<B, C>,
    cd: AsyncOperator<C, D>,
    de: AsyncOperator<D, E>,
    ef: AsyncOperator<E, F>,
    fg: AsyncOperator<F, G>,
  ): AsyncIter<G>;
  public pipe<B, C, D, E, F, G, H>(
    ab: AsyncOperator<T, B>,
    bc: AsyncOperator<B, C>,
    cd: AsyncOperator<C, D>,
    de: AsyncOperator<D, E>,
    ef: AsyncOperator<E, F>,
    fg: AsyncOperator<F, G>,
    gh: AsyncOperator<G, H>,
  ): AsyncIter<H>;
  public pipe<B, C, D, E, F, G, H, I>(
    ab: AsyncOperator<T, B>,
    bc: AsyncOperator<B, C>,
    cd: AsyncOperator<C, D>,
    de: AsyncOperator<D, E>,
    ef: AsyncOperator<E, F>,
    fg: AsyncOperator<F, G>,
    gh: AsyncOperator<G, H>,
    hi: AsyncOperator<H, I>,
  ): AsyncIter<I>;
  public pipe<B>(
    ...args: [AsyncOperator<T, unknown>, ...AsyncOperator<unknown>[]]
  ): AsyncIter<B> {
    const transform = compose<T, AsyncIterable<B>>(
      ...args as AsyncOperator<unknown>[],
    );
    return new AsyncIter(() => transform(this.#self()));
  }
}
