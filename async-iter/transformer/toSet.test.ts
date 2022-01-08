import { toSet } from "./toSet.ts";
import { of } from "../combinator/of.ts";
import { from } from "../combinator/from.ts";
import { assertEquals } from "../../dev_deps.ts";

Deno.test("resolves the items from the iterable as a set", async () => {
  assertEquals(await toSet()(of(1, 2, 3)), new Set([1, 2, 3]));
});

Deno.test("resolves an empty set from an empty async iterable", async () => {
  assertEquals(await toSet()(from([])), new Set());
});
