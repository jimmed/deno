import { path } from "../deps.ts";
import { PathInput } from "./_types.ts";

export class Path implements path.ParsedPath {
  #asString: string | null = null;
  #asObject: path.ParsedPath | null = null;

  static from(pathInput: PathInput) {
    if (pathInput instanceof this) return pathInput;
    return new this(pathInput);
  }

  static fromFileURL(fileUrl: URL | string) {
    return new this(path.fromFileUrl(fileUrl));
  }

  static join(basePath: PathInput, ...pathParts: PathInput[]) {
    return this.from(basePath).join(...pathParts);
  }

  static resolve(basePath: PathInput, ...pathParts: PathInput[]) {
    return this.from(basePath).resolve(...pathParts);
  }

  static equals(a: PathInput, b: PathInput) {
    return this.from(a).toString() === this.from(b).toString();
  }

  constructor(source: PathInput) {
    if (!source) {
      throw new TypeError(
        `Path expects a value, but instead got ${Deno.inspect(source)}`,
      );
    }

    if (source instanceof Path) {
      this.#asString = source.#asString;
      this.#asObject = source.#asObject;
    } else if (source instanceof URL) {
      this.#asString = path.fromFileUrl(source);
    } else if (typeof source === "string") {
      this.#asString = source;
    } else {
      this.#asObject = source;
    }
  }

  toFileURL() {
    return path.toFileUrl(this.toString());
  }

  toJSON() {
    return this.#asObject ??= path.parse(this.#asString!);
  }

  toString() {
    return this.#asString ??= path.format(this.#asObject!);
  }

  get base() {
    return this.toJSON().base;
  }

  get dir() {
    return this.toJSON().dir;
  }

  get ext() {
    return this.toJSON().ext;
  }

  get isAbsolute() {
    return path.isAbsolute(this.toString());
  }

  get isRelative() {
    return !this.isAbsolute;
  }

  get name() {
    return this.toJSON().name;
  }

  get root() {
    return this.toJSON().root;
  }

  get dirIsRoot() {
    return this.root === this.dir;
  }

  namespaced() {
    return new Path(path.toNamespacedPath(this.toString()));
  }

  normalize() {
    return new Path(path.normalize(this.toString()));
  }

  join(...parts: PathInput[]) {
    return new Path(path.join(
      this.toString(),
      ...parts.map((p) => new Path(p).toString()),
    ));
  }

  resolve(...parts: PathInput[]) {
    return new Path(path.resolve(
      this.toString(),
      ...parts.map((p) => new Path(p).toString()),
    ));
  }

  relative(otherPath: PathInput) {
    return new Path(
      path.relative(this.toString(), new Path(otherPath).toString()),
    );
  }

  async realPath() {
    return new Path(await Deno.realPath(this.toString()));
  }
}
