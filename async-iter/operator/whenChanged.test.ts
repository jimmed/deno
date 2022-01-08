import { whenChanged } from "./whenChanged.ts";
import { of } from "../combinator/of.ts";
import { assertYieldsAsync } from "../testing/mod.ts";

Deno.test("only yields when value changes", () =>
  assertYieldsAsync(
    whenChanged<number>()(of(1, 1, 2, 2, 3, 3, 2)),
    [1, 2, 3, 2],
  ));

Deno.test("only yields when value changes based on comparator", () =>
  assertYieldsAsync(
    whenChanged<string>((a, b) => a.toLowerCase() === b.toLowerCase())(
      of("hello", "world", "World", "WORLD", "hello"),
    ),
    ["hello", "world", "hello"],
  ));
