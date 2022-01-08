import { toMap } from "./toMap.ts";
import { of } from "../combinator/of.ts";
import { assertEquals } from "../../dev_deps.ts";

Deno.test("resolves to a map", async () =>
  assertEquals(
    await toMap()(of([1, 2], [2, 3], [1, 4])),
    new Map([
      [1, 2],
      [2, 3],
      [1, 4],
    ]),
  ));
