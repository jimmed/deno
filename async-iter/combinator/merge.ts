import { AsyncIter } from "../AsyncIter.ts";
import { AI, ArrayValue } from "../_types.ts";

export function merge<Ts extends unknown[]>(
  ...iterables: { [K in keyof Ts]: AI<Ts[K]> }
): AsyncIter<ArrayValue<Ts>> {
  return new AsyncIter(async function* () {
    const pushQueue: (ArrayValue<Ts>)[] = [];
    const pullQueue: ((value: ArrayValue<Ts>) => void)[] = [];

    function push(value: ArrayValue<Ts>) {
      if (pullQueue.length) {
        pullQueue.pop()!(value);
      } else {
        pushQueue.unshift(value);
      }
    }

    let stop: () => void;
    const allStopped = new Promise<void>((resolve) => (stop = resolve));

    let finished = false;
    const allFinished = Promise.all(
      Array.from(iterables).map(async (iterable) => {
        const iter = iterable[Symbol.asyncIterator]();
        try {
          while (true) {
            const result = await Promise.race([allStopped, iter.next()]);
            if (!result || result.done) {
              return;
            }
            push(result.value);
          }
        } finally {
          await iter.return?.();
        }
      }),
    ).then(() => {}).finally(() => (finished = true));

    try {
      while (!finished) {
        if (pushQueue.length) {
          yield pushQueue.pop()!;
        } else {
          const value = await Promise.race([
            new Promise<ArrayValue<Ts>>((resolve) =>
              pullQueue.unshift(resolve)
            ),
            allFinished,
          ]);
          if (!finished) yield value as ArrayValue<Ts>;
        }
      }

      await allFinished;
    } finally {
      stop!();
    }
  });
}
