import { AsyncIter } from "./AsyncIter.ts";
import { streams } from "../deps.ts";

export class TextIter extends AsyncIter<string> {
  static fromReader(r: Deno.Reader, options?: { bufSize?: number }) {
    return new this(async function* () {
      const decoder = new TextDecoder();
      for await (const chunk of streams.iterateReader(r, options)) {
        yield decoder.decode(chunk);
      }
    });
  }

  toLines() {
    return this.pipe(async function* (chunks) {
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
      if (buffer) {
        yield buffer;
      }
    });
  }
}
