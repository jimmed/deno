import { buffer } from "./buffer.ts";
import { of } from "../combinator/of.ts";
import { assertYieldsAsync } from "../testing/mod.ts";

Deno.test("buffers a number of items and yields them", () =>
  assertYieldsAsync(buffer(3)(of(1, 2, 3, 4, 5)), [
    [1, 2, 3],
    [2, 3, 4],
    [3, 4, 5],
  ]));

Deno.test("never yields if the buffer never fills", () =>
  assertYieldsAsync(buffer(3)(of(1, 2)), []));

Deno.test(
  "yields the partial buffer if it never fills and yieldPartial is true",
  () =>
    assertYieldsAsync(buffer(3, { yieldPartial: true })(of(1, 2)), [[1, 2]]),
);
