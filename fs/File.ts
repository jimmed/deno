import { Node } from "./Node.ts";
import { Directory } from "./Directory.ts";
import { AsyncIter } from "../async-iter/AsyncIter.ts";
import { fromReader } from "../async-iter/combinator/fromReader.ts";
import { NodeInput } from "./_types.ts";

export interface ReadAsBinaryOptions
  extends Omit<Deno.OpenOptions, "read" | "write"> {
  bufSize?: number;
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
    const getReader = async () =>
      fromReader(await this.open({ ...options, read: true }), {
        bufSize,
      });

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
}
