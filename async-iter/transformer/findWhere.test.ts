import { findWhere } from "./findWhere.ts";
import { of } from "../combinator/of.ts";
import { assertEquals, assertRejects } from "../../dev_deps.ts";

type Test = { id: number; name: string };
type Matching = { id: 1; name: "test" };

const findWhereNegative = findWhere<Test, Matching>({
  id: 1,
  name: "test",
});
const findWhereNegativeThrow = findWhere<Test, Matching>(
  { id: 1, name: "test" },
  true,
);

const matching: Matching = { id: 1, name: "test" };
const nonMatching: Test = { id: 2, name: "other" };

Deno.test(
  "resolves the first matching item of a non-empty async iterable",
  async () => {
    assertEquals(
      await findWhereNegative(of(nonMatching, matching, nonMatching)),
      matching,
    );
  },
);

Deno.test("resolves undefined when no items match", async () => {
  assertEquals(
    await findWhereNegative(of(nonMatching, nonMatching)),
    undefined,
  );
});

Deno.test("throws undefined when no items match and throwOnEmpty is true", () =>
  assertRejects(() => findWhereNegativeThrow(of(nonMatching, nonMatching))));
