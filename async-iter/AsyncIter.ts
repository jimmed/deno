import {
  AI,
  Async,
  AsyncCallback,
  AsyncPredicate,
  AsyncReducer,
  AsyncTransformer,
} from "./_types.ts";

export class AsyncIter<T> implements AI<T> {
  #self: () => AI<T>;

  constructor(self: () => AI<T>) {
    this.#self = self;
  }

  public [Symbol.asyncIterator]() {
    return this.#self()[Symbol.asyncIterator]();
  }

  lift<U>(transform: (iter: AI<T>) => U): U {
    return transform(this.#self());
  }

  pipe<U>(transform: AsyncTransformer<T, U>): AsyncIter<U> {
    return this.lift((self) => new AsyncIter(() => transform(self)));
  }

  first(): Promise<T | void> {
    return this.lift(async (self) => {
      for await (const first of self) return first;
    });
  }

  last(): Promise<T | void> {
    return this.lift(async (self) => {
      let last: T | void;
      for await (last of self) continue;
      return last;
    });
  }

  take(toTake: number) {
    return this.pipe(async function* (self) {
      let taken = 0;
      for await (const item of self) {
        if (++taken > toTake) return;
        yield item;
      }
    });
  }

  skip(toSkip: number) {
    return this.pipe(async function* (self) {
      let skipped = 0;
      for await (const item of self) {
        if (++skipped < toSkip) continue;
        yield item;
      }
    });
  }

  takeWhile<U extends T>(keep: AsyncPredicate<T, U>) {
    return this.pipe(async function* (self) {
      for await (const item of self) {
        if (!await keep(item)) return;
        yield item;
      }
    });
  }

  skipWhile<U extends T>(skip: AsyncPredicate<T, U>) {
    return this.pipe(async function* (self) {
      let skipping = true;
      for await (const item of self) {
        // deno-lint-ignore no-cond-assign
        if (skipping &&= await skip(item)) continue;
        yield item;
      }
    });
  }

  slice(skip: number, take: number) {
    return this.skip(skip).take(take);
  }

  map<U>(transform: AsyncCallback<T, U>) {
    return this.pipe(async function* (self) {
      for await (const item of self) yield await transform(item);
    });
  }

  filter<U extends T = T>(keep: AsyncPredicate<T, U>) {
    return this.pipe(async function* (self) {
      for await (const item of self) {
        if (await keep(item)) yield item as Awaited<U>;
      }
    });
  }

  reduce<U>(reducer: AsyncReducer<T, U>, initialValue: U): Promise<U> {
    return this.scan(reducer, initialValue).last() as Promise<U>;
  }

  get<K extends keyof T>(key: K) {
    return this.map((item) => item[key]);
  }

  find<U extends T = T>(keep: AsyncPredicate<T, U>) {
    return this.filter<U>(keep).first();
  }

  scan<U>(reducer: AsyncReducer<T, U>, initial: Async<U>): AsyncIter<U> {
    return this.pipe(async function* (self) {
      let acc = await initial;
      for await (const item of self) yield (acc = await reducer(acc, item));
    });
  }

  toArray(preallocateSize = 0) {
    return this.reduce(
      (items, item) => (items.push(item), items),
      Array(preallocateSize),
    );
  }

  buffer(size: number): AsyncIter<T[]> {
    return this.pipe(async function* (self) {
      const buffer: T[] = [];
      for await (const item of self) {
        buffer.push(item);
        if (buffer.length > size) buffer.shift();
        if (buffer.length < size) continue;
        yield buffer;
      }
      if (buffer.length < size) yield buffer;
    });
  }

  chunk(size: number): AsyncIter<T[]> {
    return this.pipe(async function* (self) {
      let chunk: T[] = [];
      for await (const item of self) {
        chunk.push(item);
        if (chunk.length === size) {
          yield chunk;
          chunk = [];
        }
      }
      if (chunk.length) yield chunk;
    });
  }
}
