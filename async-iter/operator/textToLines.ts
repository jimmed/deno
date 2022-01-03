import type { AsyncOperator } from "../_types.ts";

export const textToLines = (): AsyncOperator<string> =>
  async function* (chunks) {
    let buffer = "";
    for await (let chunk of chunks) {
      let index: number;
      while ((index = chunk.indexOf("\n")) >= 0) {
        buffer += chunk.slice(0, index);
        chunk = chunk.slice(index + 1);
        yield buffer;
        buffer = "";
      }
      buffer = chunk;
    }
    if (buffer) yield buffer;
  };
