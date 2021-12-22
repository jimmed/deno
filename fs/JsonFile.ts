import { ReadAsTextOptions, TextFile, WriteAsTextOptions } from "./TextFile.ts";

export class JsonFile<T> extends TextFile {
  async readAsJSON(options?: ReadAsTextOptions) {
    return JSON.parse(
      await this.readAsText(options).reduce((acc, chunk) => acc + chunk, ""),
    );
  }

  async writeAsJSON(value: T, options?: WriteAsTextOptions) {
    await this.writeAsText([JSON.stringify(value)], options);
  }
}
