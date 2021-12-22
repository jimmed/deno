import { Path, PathInput } from "../path/mod.ts";
import { NodeInput, NodeType } from "./_types.ts";

export class Node {
  readonly path: Path;

  constructor(path: NodeInput) {
    this.path = Path.from(
      path instanceof Node ? path.path : (path as PathInput),
    );
  }

  async setPermissions(mode: number): Promise<this> {
    await Deno.chmod(this.path.toString(), mode);
    return this;
  }

  async setOwner(userId: number | null, groupId: number | null): Promise<this> {
    await Deno.chown(this.path.toString(), userId, groupId);
    return this;
  }

  setOwnerUser(userId: number): Promise<this> {
    return this.setOwner(userId, null);
  }

  setOwnerGroup(groupId: number): Promise<this> {
    return this.setOwner(null, groupId);
  }

  async realPath(): Promise<Node> {
    return new Node(await this.path.realPath());
  }

  async rename(newPath: PathInput): Promise<Node> {
    const renamed = new Node(newPath);
    await Deno.rename(this.toString(), renamed.path.toString());
    return renamed;
  }

  async remove(recursive = true): Promise<this> {
    await Deno.remove(this.path.toString(), { recursive });
    return this;
  }

  info(followSymlinks = false): Promise<Deno.FileInfo> {
    return Deno[followSymlinks ? "stat" : "lstat"](this.path.toString());
  }

  watch(recursive = true): Deno.FsWatcher {
    return Deno.watchFs(this.path.toString(), { recursive });
  }

  async type(followSymlinks = false): Promise<NodeType> {
    const info = await this.info(followSymlinks);
    switch (true) {
      case info.isFile:
        return "file";
      case info.isDirectory:
        return "directory";
      case info.isSymlink:
        return "symlink";
      default:
        return "unknown";
    }
  }

  async isType(type: NodeType) {
    return await this.type() === type;
  }
}
