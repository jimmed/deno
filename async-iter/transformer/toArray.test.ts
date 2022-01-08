import { toArray } from "./toArray.ts";
import { of } from "../combinator/of.ts";
import { from } from "../combinator/from.ts";
import { assertEquals } from "../../dev_deps.ts";

Deno.test("resolves the items from the iterable as an array", async () => {
  assertEquals(await toArray()(of(1, 2, 3)), [1, 2, 3]);
});

Deno.test("resolves an empty array from an empty async iterable", async () => {
  assertEquals(await toArray()(from([])), []);
});
