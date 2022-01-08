import { filter } from "./filter.ts";
import { of } from "../combinator/of.ts";
import { assertYieldsAsync } from "../testing/mod.ts";

Deno.test("yields only items matching the predicate", () =>
  assertYieldsAsync(filter<number>((x) => x > 0)(of(0, -1, 2, 0, 5)), [2, 5]));
