import { Path, PathInput } from "../path/mod.ts";

export type NodeInput = PathInput | { path: Path };

export type NodeType = "file" | "directory" | "symlink" | "unknown";
