import { where } from "./where.ts";
import { of } from "../combinator/of.ts";
import { assertYieldsAsync } from "../testing/mod.ts";

type Test = { id: number; name: string };
type Matching = { id: 1; name: "test" };

const matches = where<Test, Matching>({
  id: 1,
  name: "test",
});

const matching: Matching = { id: 1, name: "test" };
const nonMatching: Test = { id: 2, name: "other" };

Deno.test("yields the items matching the partial object", () =>
  assertYieldsAsync(matches(of(nonMatching, matching, nonMatching)), [
    matching,
  ]));

Deno.test("yields empty when no items match", () =>
  assertYieldsAsync(matches(of(nonMatching, nonMatching)), []));
