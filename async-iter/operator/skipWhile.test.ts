import { skipWhile } from "./skipWhile.ts";
import { of } from "../combinator/of.ts";
import { assertYieldsAsync } from "../testing/mod.ts";

Deno.test("skips while predicate is true", () =>
  assertYieldsAsync(
    skipWhile<number>((x) => x < 3)(of(1, 2, 3, 2, 1)),
    [3, 2, 1],
  ));
