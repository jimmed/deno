# `AsyncIter`

This is a TypeScript module for the Deno runtime, which provides helper
functions and classes for working with `Iterable` and `AsyncIterable` objects.

## Importing this module

As this is a Deno module, any file in this repository can be referenced directly
via its 'raw' URL on GitHub.

For example, you can import the whole module within a Deno TypeScript file like
this:

```ts
import * as AsyncIter from "https://github.com/jimmed/deno/raw/main/async-iter/mod.ts";
// or
import { AsyncIter } from "https://github.com/jimmed/deno/raw/main/mod.ts";
```

## Basic usage

The `AsyncIter` class provides array-like methods to perform asynchronous
operations on `AsyncIterable` objects.

This (bizarre and heavily contrived) example should be fairly intuitive if
you're familiar with the `Array` methods available in Deno (based on ES5
JavaScript).

```ts
const values = [1, 2, 3, 4, 5];

const aggregate = await AsyncIter.from(values)
  .map(async (value) => value * 2)
  .filter(async (value) => value % 3)
  .reduce(async (a, b) => a + b, 0);

console.log(aggregate);
// => 24
```

> **Note:** In the above example, the callback methods don't actually need to be
> asynchronous; it's just to demonstrate what is possible.

Instances of `AsyncIter` implement the `AsyncIterable` interface, so they can
still be consumed using `for await .. of` loops like normal.

```ts
const squares = AsyncIter.of(1, 2, 3).map((n) => n ** 2);
for await (const item of squares) {
  console.log(item);
}
// logs:
// => 1
// => 4
// => 9
```

## Constructing `AsyncIter`s

### From one or more values, using `AsyncIter.of`

The `of` helper constructs an `AsyncIter` over one or more values (or promises
of values).

Each value will be yielded in the order provided, regardless of the order in
which any provided promises resolve.

If a provided promise rejects, any attempts to consume the returned `AsyncIter`
will also reject.

```ts
const iter = AsyncIter.of(1, 2, Promise.resolve(3), 4, 5);
```

### From another (async) iterable, using `AsyncIter.from`

The `from` helper constructs an `AsyncIter` that wraps an existing `Iterable` or
`AsyncIterable`.

You can pass it anything that implements the `AsyncIterable` or `Iterable`
interface, or a promise thereof.

```ts
const iter = AsyncIter.from(Promise.resolve(new Set([1, 2, 3])));
```

## Combining `AsyncIterable`s

There are a few different ways to combine existing `AsyncIterable` objects:

### In source order, using `AsyncIter.concat`

The `concat` helper behaves like `Array.concat` for `AsyncIterable` objects:

```ts
const iter = AsyncIter.concat(
  AsyncIter.of(1, 2, 3),
  AsyncIter.of(4, 5, 6),
);
// yields: 1, 2, 3, 4, 5, 6
```

### In no particular order, using `AsyncIter.merge`

The `merge` helper merges together `AsyncIterable` objects in whatever order
they yield values.

```ts
const delay = (ms: number) =>
  <T>(value: T) => new Promise((r) => setTimeout(r, ms, value));

const iter = AsyncIter.merge(
  AsyncIter.of(1, 2, 3).map(delay(10)),
  AsyncIter.of(4, 5, 6),
);
// yields: 4, 5, 6, 1, 2, 3
```

### Iterated in lockstep together, using `AsyncIter.zip`

The `zip` helper merges together `AsyncIterable` objects, yielding an array of
the next value from each on every iteration.

```ts
const iter = AsyncIter.zip(
  AsyncIter.of(1, 2, 3),
  AsyncIter.of(4, 5, 6, 7),
);
// yields: [1, 4], [2, 5], [3, 6]
```

> **Note:** In the above example, the `7` is never yielded. If any of the source
> iterables completes, then no further values will be yielded from any of the
> sources.

If you want to catch any trailing values from uncompleted source observables,
you can use `zipExhaustive` instead:

```ts
const iter = AsyncIter.zipExhaustive(
  AsyncIter.of(1, 2, 3),
  AsyncIter.of(4, 5, 6, 7),
);
// yields: [1, 4], [2, 5], [3, 6], [undefined, 7]
```
