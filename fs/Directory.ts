import { Node } from "./Node.ts";
import { from } from "../async-iter/mod.ts";
import { fs } from "../deps.ts";

export class Directory extends Node implements AsyncIterable<fs.WalkEntry> {
  async ensureExists(): Promise<this> {
    await fs.ensureDir(this.path.toString());
    return this;
  }

  async ensureEmpty(): Promise<this> {
    await fs.emptyDir(this.path.toString());
    return this;
  }

  walk(options?: fs.WalkOptions) {
    return from(fs.walk(this.path.toString(), options));
  }

  files(
    options?: Omit<fs.WalkOptions, "includeFiles" | "includeDirs">,
  ) {
    return this.walk({
      maxDepth: 0,
      includeFiles: true,
      includeDirs: false,
      ...options,
    });
  }

  directories(
    options?: Omit<fs.WalkOptions, "includeFiles" | "includeDirs">,
  ) {
    return this.walk({
      maxDepth: 0,
      includeFiles: false,
      includeDirs: true,
      ...options,
    });
  }

  [Symbol.asyncIterator]() {
    return this.walk({ maxDepth: 0 })[Symbol.asyncIterator]();
  }

  async realPath(): Promise<Node> {
    return new Directory(await this.path.realPath());
  }
}
