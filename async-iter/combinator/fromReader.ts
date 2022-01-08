import { streams } from "../../deps.ts";

export const fromReader = (
  ...args: Parameters<typeof streams["iterateReader"]>
): AsyncIterable<Uint8Array> => ({
  [Symbol.asyncIterator]: () => streams.iterateReader(...args),
});
