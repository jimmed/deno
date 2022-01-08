import { from, wrap } from "../async-iter/mod.ts";
import { decodeText } from "../async-iter/operator/decodeText.ts";
import { textToLines } from "../async-iter/operator/textToLines.ts";
import { reduce } from "../async-iter/transformer/reduce.ts";
import { File, ReadAsBinaryOptions } from "./File.ts";

export interface ReadAsTextOptions extends ReadAsBinaryOptions {
  decoder?: TextDecoder;
}

export interface WriteAsTextOptions extends Deno.OpenOptions {
  encoder?: TextEncoder;
}

export class TextFile extends File {
  readAsText({
    decoder = new TextDecoder(),
    ...options
  }: ReadAsTextOptions = {}) {
    return this.readAsBinary(options).pipe(decodeText(decoder));
  }

  readAllAsText(options?: ReadAsTextOptions) {
    return this.readAsText(options).lift(
      reduce((acc, chunk) => acc + chunk, ""),
    );
  }

  writeAsText(
    content: AsyncIterable<string> | Iterable<string>,
    { encoder = new TextEncoder(), ...options }: WriteAsTextOptions = {},
  ) {
    return this.writeAsBinary(
      wrap(from(content)[Symbol.asyncIterator]).map((chunk) =>
        encoder.encode(chunk)
      ),
      options,
    );
  }

  readAsLines(options?: ReadAsTextOptions) {
    return this.readAsText(options).pipe(textToLines());
  }

  writeAsLines(
    content: AsyncIterable<string> | Iterable<string>,
    options?: WriteAsTextOptions,
  ) {
    return this.writeAsText(
      wrap(from(content)[Symbol.asyncIterator]).map((line) => `${line}\n`),
      options,
    );
  }
}
