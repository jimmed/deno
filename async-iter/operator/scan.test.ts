import { scan } from "./scan.ts";
import { of } from "../combinator/of.ts";
import { assertYieldsAsync } from "../testing/mod.ts";

type StringLike = { toString(): string };

const joinScan = scan<StringLike, string>((a, b) => a + b, "");
Deno.test("yields values from each item specified by the key", () =>
  assertYieldsAsync(joinScan(of<StringLike>(1, "hello", [1, 2])), [
    "",
    "1",
    "1hello",
    "1hello1,2",
  ]));
