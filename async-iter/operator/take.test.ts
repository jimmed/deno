import { take } from "./take.ts";
import { of } from "../combinator/of.ts";
import { assertYieldsAsync } from "../testing/mod.ts";

Deno.test("takes the specified number of items", () =>
  assertYieldsAsync(take(2)(of(1, 2, 3, 4, 5)), [1, 2]));
