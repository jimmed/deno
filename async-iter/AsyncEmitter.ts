import { AI, Async } from "./_types.ts";
import { AsyncIter } from "./AsyncIter.ts";

export interface Config<T, R = unknown> {
  (
    visitor: {
      next(value: T): void;
      throw(error?: Error): void;
      return(value?: R): void;
    },
  ): void | (() => Async<void>);
}

/**
 * Provides a bridge between a push-based paradigm and a pull-based one.
 *
 * Avoid using, not sure if this is even useful yet.
 */
export class AsyncEmitter<T> extends AsyncIter<T> {
  constructor(config: Config<T>) {
    super((): AI<T> & AsyncIterator<T, void> => {
      const queueAhead: Promise<IteratorResult<T>>[] = [];
      const queueBehind: (Deferred<IteratorResult<T>>)[] = [];
      let thrown: Error;

      const cleanup = config({
        next(value) {
          if (thrown) throw thrown;
          const result = { done: false, value };
          if (queueBehind.length) queueBehind.shift()!.resolve(result);
          else queueAhead.push(Promise.resolve(result));
        },
        throw(error) {
          if (queueBehind.length) {
            queueBehind.forEach((deferred) => deferred.reject(error));
          } else {
            queueAhead.push(Promise.reject(error));
          }
        },
        return(value) {
          const result = { done: true, value } as IteratorResult<T>;
          if (queueBehind.length) {
            queueBehind.shift()!.resolve(result);
          } else {
            queueAhead.push(Promise.resolve(result));
          }
        },
      });

      return {
        next(): Promise<IteratorResult<T>> {
          if (queueAhead.length) return queueAhead.shift()!;
          const deferred = new Deferred<IteratorResult<T>>();
          queueBehind.push(deferred);
          return deferred;
        },
        async throw(error?: unknown): Promise<IteratorResult<T>> {
          thrown = error as Error;
          await cleanup?.();
          throw thrown;
        },
        async return(): Promise<IteratorResult<T>> {
          await cleanup?.();
          return { done: true, value: undefined };
        },
        [Symbol.asyncIterator]() {
          return this;
        },
      };
    });
  }
}

class Deferred<T, E extends Error = Error> extends Promise<T> {
  readonly resolve!: (value: T) => void;
  readonly reject!: (error?: E) => void;
  constructor() {
    super((resolve, reject) => Object.assign(this, { resolve, reject }));
  }
}
