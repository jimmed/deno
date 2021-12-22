import { File, WriteAsTextOptions } from "./File.ts";

export class JsonFile<T> extends File {
  async readAsJSON() {
    return JSON.parse(
      await this.readAsText().reduce((acc, chunk) => acc + chunk, ""),
    );
  }

  async writeAsJSON(value: T, options?: WriteAsTextOptions) {
    await this.writeAsText([JSON.stringify(value)], options);
  }
}
