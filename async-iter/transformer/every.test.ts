import { assert } from "../../dev_deps.ts";
import { every } from "./every.ts";
import { from } from "../combinator/from.ts";
import { of } from "../combinator/of.ts";

const test = every<number>((x) => x < 10);

Deno.test("returns true on empty", async () => {
  assert(await test(from<number>([])));
});

Deno.test("returns true when every item matches the predicate", async () => {
  assert(await test(of(1, 2, 3)));
});

Deno.test(
  "returns false when some items do not match the predicate",
  async () => {
    assert(!(await test(of(1, 20, 3))));
  },
);
