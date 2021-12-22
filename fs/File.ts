import { Node } from "./Node.ts";
import { Directory } from "./Directory.ts";
import { AsyncIter } from "../async-iter/AsyncIter.ts";
import { from } from "../async-iter/mod.ts";
import { NodeInput } from "./_types.ts";
import { streams } from "../deps.ts";

export interface ReadAsBinaryOptions
  extends Omit<Deno.OpenOptions, "read" | "write"> {
  bufSize?: number;
}

export interface ReadAsTextOptions extends ReadAsBinaryOptions {
  decoder?: TextDecoder;
}

export interface WriteAsTextOptions extends Deno.OpenOptions {
  encoder?: TextEncoder;
}

export class File extends Node {
  remove(): Promise<this> {
    return super.remove(false);
  }

  createOrTruncate() {
    return Deno.create(this.path.toString());
  }

  open(options?: Deno.OpenOptions) {
    return Deno.open(this.path.toString(), options);
  }

  async copy(destination: NodeInput) {
    const dest = new File(
      destination instanceof Directory
        ? destination.path.join(this.path.base)
        : destination,
    );
    await Deno.copyFile(this.path.toString(), dest.path.toString());
    return dest;
  }

  readAsBinary({ bufSize, ...options }: ReadAsBinaryOptions = {}) {
    const getReader = async () => {
      const file = await this.open({ ...options, read: true });
      return streams.iterateReader(file, { bufSize });
    };
    return new AsyncIter(async function* () {
      yield* await getReader();
    });
  }

  async writeAsBinary(
    content: AsyncIterable<Uint8Array> | Iterable<Uint8Array>,
    options?: Omit<Deno.OpenOptions, "write" | "read">,
  ) {
    const file = await this.open({ ...options, write: true });
    for await (const chunk of content) {
      let written = 0;
      do {
        written += await file.write(chunk.slice(written));
      } while (written < chunk.byteLength);
    }
    return this;
  }

  readAsText(
    { decoder = new TextDecoder(), ...options }: ReadAsTextOptions = {},
  ) {
    return this.readAsBinary(options).map(decoder.decode);
  }

  readAllAsText(options?: ReadAsTextOptions) {
    return this.readAsText(options).reduce((acc, chunk) => acc + chunk, "");
  }

  writeAsText(
    content: AsyncIterable<string> | Iterable<string>,
    { encoder = new TextEncoder(), ...options }: WriteAsTextOptions = {},
  ) {
    return this.writeAsBinary(from(content).map(encoder.encode), options);
  }

  readAsLines(options?: ReadAsTextOptions) {
    return this.readAsText(options).pipe(async function* (chunks) {
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
    });
  }

  writeAsLines(
    content: AsyncIterable<string> | Iterable<string>,
    options?: WriteAsTextOptions,
  ) {
    return this.writeAsText(from(content).map((line) => `${line}\n`), options);
  }
}
