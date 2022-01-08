import { first } from "./first.ts";
import { of } from "../combinator/of.ts";
import { from } from "../combinator/from.ts";
import { assertEquals, assertRejects } from "../../dev_deps.ts";

Deno.test("resolves the first item of a non-empty async iterable", async () => {
  assertEquals(await first()(of(1, 2, 3)), 1);
});

Deno.test("resolves void from an empty async iterable", async () => {
  assertEquals(await first()(from([])), undefined);
});

Deno.test(
  "rejects from an empty async iterable when `throwOnEmpty` is true",
  () => assertRejects(() => first(true)(from([]))),
);
