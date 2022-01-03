import { ReadAsTextOptions, TextFile, WriteAsTextOptions } from "./TextFile.ts";
import { reduce } from "../async-iter/transformer/reduce.ts";

export class JsonFile<T> extends TextFile {
  async readAsJSON(options?: ReadAsTextOptions) {
    return JSON.parse(
      await this.readAsText(options).lift(
        reduce((acc, chunk) => acc + chunk, ""),
      ),
    );
  }

  async writeAsJSON(value: T, options?: WriteAsTextOptions) {
    await this.writeAsText([JSON.stringify(value)], options);
  }
}
