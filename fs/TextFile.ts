import { from } from "../async-iter/mod.ts";
import { TextIter } from "../async-iter/TextIter.ts";
import { File, ReadAsBinaryOptions } from "./File.ts";

export interface ReadAsTextOptions extends ReadAsBinaryOptions {
  decoder?: TextDecoder;
}

export interface WriteAsTextOptions extends Deno.OpenOptions {
  encoder?: TextEncoder;
}

export class TextFile extends File {
  readAsText(
    { decoder = new TextDecoder(), ...options }: ReadAsTextOptions = {},
  ) {
    return new TextIter(() =>
      this.readAsBinary(options).map((chunk) => decoder.decode(chunk))
    );
  }

  readAllAsText(options?: ReadAsTextOptions) {
    return this.readAsText(options).reduce((acc, chunk) => acc + chunk, "");
  }

  writeAsText(
    content: AsyncIterable<string> | Iterable<string>,
    { encoder = new TextEncoder(), ...options }: WriteAsTextOptions = {},
  ) {
    return this.writeAsBinary(
      from(content).map((chunk) => encoder.encode(chunk)),
      options,
    );
  }

  readAsLines(options?: ReadAsTextOptions) {
    return this.readAsText(options).toLines();
  }

  writeAsLines(
    content: AsyncIterable<string> | Iterable<string>,
    options?: WriteAsTextOptions,
  ) {
    return this.writeAsText(from(content).map((line) => `${line}\n`), options);
  }
}
