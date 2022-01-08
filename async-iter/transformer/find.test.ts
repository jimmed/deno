import { find } from "./find.ts";
import { of } from "../combinator/of.ts";
import { assertEquals, assertRejects } from "../../dev_deps.ts";

const findNegative = find<number>((x) => x < 0);
const findNegativeThrow = find<number>((x) => x < 0, true);

Deno.test(
  "resolves the first matching item of a non-empty async iterable",
  async () => {
    assertEquals(await findNegative(of(1, -3, -4)), -3);
  },
);

Deno.test("resolves undefined when no items match", async () => {
  assertEquals(await findNegative(of(1, 2, 3)), undefined);
});

Deno.test("throws undefined when no items match and throwOnEmpty is true", () =>
  assertRejects(() => findNegativeThrow(of(1, 2, 3))));
