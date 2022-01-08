import { map } from "./map.ts";
import { of } from "../combinator/of.ts";
import { assertYieldsAsync } from "../testing/mod.ts";

type StringLike = { toString(): string };

const toString = map<StringLike, string>((x) => x.toString());
Deno.test("yields values from each item specified by the key", () =>
  assertYieldsAsync(toString(of<StringLike>(1, "hello", [1, 2])), [
    "1",
    "hello",
    "1,2",
  ]));
