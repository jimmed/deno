import { slice } from "./slice.ts";
import { of } from "../combinator/of.ts";
import { assertYieldsAsync } from "../testing/mod.ts";

Deno.test("skips/takes", () =>
  assertYieldsAsync(slice(2, 3)(of(1, 2, 3, 4, 5, 6)), [3, 4, 5]));
