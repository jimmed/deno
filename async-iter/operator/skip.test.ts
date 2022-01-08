import { skip } from "./skip.ts";
import { of } from "../combinator/of.ts";
import { assertYieldsAsync } from "../testing/mod.ts";

Deno.test("skips the specified number of items", () =>
  assertYieldsAsync(skip(2)(of(1, 2, 3, 4, 5)), [3, 4, 5]));
