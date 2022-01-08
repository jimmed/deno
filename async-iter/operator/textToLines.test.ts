import { textToLines } from "./textToLines.ts";
import { of } from "../combinator/of.ts";
import { assertYieldsAsync } from "../testing/mod.ts";

Deno.test("yields text line-by-line", () =>
  assertYieldsAsync(textToLines()(of("a", "bc\nd", "\nef\n", "g")), [
    "abc",
    "d",
    "ef",
    "g",
  ]));
