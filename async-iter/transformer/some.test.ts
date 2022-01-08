import { assert } from "../../dev_deps.ts";
import { some } from "./some.ts";
import { from } from "../combinator/from.ts";
import { of } from "../combinator/of.ts";

const test = some<number>((x) => x < 10);

Deno.test("returns false on empty", async () => {
  assert(!(await test(from<number>([]))));
});

Deno.test(
  "returns true when some of the items match the predicate",
  async () => {
    assert(await test(of(10, 2, 30)));
  },
);

Deno.test(
  "returns false when none of the items match the predicate",
  async () => {
    assert(!(await test(of(10, 20, 30))));
  },
);
