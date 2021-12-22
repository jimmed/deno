import { Path } from "./Path.ts";
import { assert, assertEquals } from "../dev_deps.ts";

const pathString = "/a/b/c.d";
const fileUrlString = `file://${pathString}`;
const fileUrl = new URL(fileUrlString);
const parsedPath = {
  root: "/",
  dir: "/a/b",
  base: "c.d",
  name: "c",
  ext: ".d",
};

Deno.test("creating from string", () => {
  assertEquals(Path.from(pathString).toString(), pathString);
});

Deno.test("creating from file URL object", () => {
  assertEquals(Path.from(fileUrl).toString(), pathString);
});

Deno.test("creating from file URL string", () => {
  assertEquals(Path.fromFileURL(fileUrlString).toString(), pathString);
});

Deno.test("creating from parsed path object", () => {
  assertEquals(
    Path.from(parsedPath)
      .toString(),
    pathString,
  );
});

Deno.test("creating from other Path", () => {
  assertEquals(
    Path.from(Path.from(Path.from(pathString))).toString(),
    pathString,
  );
});

Deno.test("converting to parsed path object", () => {
  assertEquals(Path.from(pathString).toJSON(), parsedPath);
});

Deno.test("converting to file URL", () => {
  assertEquals(Path.from(pathString).toFileURL(), fileUrl);
});

Deno.test("parsed path implementation", () => {
  const actual = Path.from(pathString);
  for (const [k, v] of Object.entries(parsedPath)) {
    assertEquals(actual[k as keyof Path], v);
  }
});

Deno.test("static join", () => {
  assertEquals(
    Path.join("/a", Path.from("../b"), "./c/d").toString(),
    "/b/c/d",
  );
});

Deno.test("static resolve", () => {
  assertEquals(
    Path.resolve("/a", Path.from("../b"), "./c/d").toString(),
    "/b/c/d",
  );
});

Deno.test("normalize", () => {
  assertEquals(Path.from("/a/f/../b/./c.d").normalize().toString(), pathString);
});

Deno.test("join", () => {
  assertEquals(
    Path.from("/a").join("../b", "./c/d").toString(),
    "/b/c/d",
  );
});

Deno.test("resolve", () => {
  assertEquals(
    Path.from("/a").resolve("../b", "./c/d").toString(),
    "/b/c/d",
  );
});

Deno.test("isAbsolute", () => {
  assert(Path.from("/a").isAbsolute);
  assert(!Path.from("./a").isAbsolute);
});

Deno.test("isRelative", () => {
  assert(!Path.from("/a").isRelative);
  assert(Path.from("./a").isRelative);
});

Deno.test("dirIsRoot", () => {
  assert(Path.from("/").dirIsRoot);
  assert(Path.from("/a").dirIsRoot);
  assert(!Path.from("/a/b").dirIsRoot);
  assert(Path.from("./").dirIsRoot);
  assert(!Path.from("./a").dirIsRoot);
  assert(!Path.from("./a/b").dirIsRoot);
});
