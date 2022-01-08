import { last } from "./last.ts";
import { of } from "../combinator/of.ts";
import { from } from "../combinator/from.ts";
import { assertEquals, assertRejects } from "../../dev_deps.ts";

Deno.test("resolves the last item of a non-empty async iterable", async () => {
  assertEquals(await last()(of(1, 2, 3)), 3);
});

Deno.test("resolves void from an empty async iterable", async () => {
  assertEquals(await last()(from([])), undefined);
});

Deno.test(
  "rejects from an empty async iterable when `throwOnEmpty` is true",
  () => assertRejects(() => last(true)(from([]))),
);
