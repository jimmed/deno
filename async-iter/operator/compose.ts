import type { AsyncOperator, AsyncTransformer } from "../_types.ts";

interface Compose {
  <A, B>(ab: AsyncTransformer<A, B>): AsyncTransformer<A, B>;
  <A, B, C>(
    ab: AsyncOperator<A, B>,
    bc: AsyncTransformer<B, C>,
  ): AsyncTransformer<A, C>;
  <A, B, C, D>(
    ab: AsyncOperator<A, B>,
    bc: AsyncOperator<B, C>,
    cd: AsyncTransformer<C, D>,
  ): AsyncTransformer<A, D>;
  <A, B, C, D, E>(
    ab: AsyncOperator<A, B>,
    bc: AsyncOperator<B, C>,
    cd: AsyncOperator<C, D>,
    de: AsyncTransformer<D, E>,
  ): AsyncTransformer<A, E>;
  <A, B, C, D, E, F>(
    ab: AsyncOperator<A, B>,
    bc: AsyncOperator<B, C>,
    cd: AsyncOperator<C, D>,
    de: AsyncOperator<D, E>,
    ef: AsyncTransformer<E, F>,
  ): AsyncTransformer<A, F>;
  <A, B, C, D, E, F, G>(
    ab: AsyncOperator<A, B>,
    bc: AsyncOperator<B, C>,
    cd: AsyncOperator<C, D>,
    de: AsyncOperator<D, E>,
    ef: AsyncOperator<E, F>,
    fg: AsyncTransformer<F, G>,
  ): AsyncTransformer<A, G>;
  <A, B, C, D, E, F, G, H>(
    ab: AsyncOperator<A, B>,
    bc: AsyncOperator<B, C>,
    cd: AsyncOperator<C, D>,
    de: AsyncOperator<D, E>,
    ef: AsyncOperator<E, F>,
    fg: AsyncOperator<F, G>,
    gh: AsyncTransformer<G, H>,
  ): AsyncTransformer<A, H>;
  <A, B, C, D, E, F, G, H, I>(
    ab: AsyncOperator<A, B>,
    bc: AsyncOperator<B, C>,
    cd: AsyncOperator<C, D>,
    de: AsyncOperator<D, E>,
    ef: AsyncOperator<E, F>,
    fg: AsyncOperator<F, G>,
    gh: AsyncOperator<G, H>,
    hi: AsyncTransformer<H, I>,
  ): AsyncTransformer<A, I>;
  <A, B>(...args: AsyncTransformer<unknown, unknown>[]): AsyncTransformer<A, B>;
}

export const compose: Compose = <A, B>(
  ...args: AsyncTransformer<unknown, unknown>[]
) =>
  (iterable: AsyncIterable<A>) =>
    args.reduce(
      (it, t) => t(it) as AsyncIterable<unknown>,
      iterable as AsyncIterable<unknown>,
    ) as unknown as B;
