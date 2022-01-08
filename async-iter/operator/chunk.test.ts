import { chunk } from "./chunk.ts";
import { of } from "../combinator/of.ts";
import { assertYieldsAsync } from "../testing/mod.ts";
Deno.test("yields items in chunks", () =>
  assertYieldsAsync(chunk(3)(of(1, 2, 3, 4, 5, 6, 7, 8)), [
    [1, 2, 3],
    [4, 5, 6],
  ]));

Deno.test("yields items in chunks, including the last", () =>
  assertYieldsAsync(
    chunk(3, { yieldPartial: true })(of(1, 2, 3, 4, 5, 6, 7, 8)),
    [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8],
    ],
  ));
