import { takeWhile } from "./takeWhile.ts";
import { of } from "../combinator/of.ts";
import { assertYieldsAsync } from "../testing/mod.ts";

Deno.test("takes while predicate is true", () =>
  assertYieldsAsync(takeWhile<number>((x) => x < 3)(of(1, 2, 3, 2, 1)), [
    1,
    2,
  ]));
