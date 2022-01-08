import { groupByKey } from "./groupByKey.ts";
import { of } from "../combinator/of.ts";
import { assertEquals } from "../../dev_deps.ts";

type T = { id: number; name?: string };

Deno.test(
  "creates a map indexed by the return value of the callback",
  async () =>
    assertEquals(
      await groupByKey<T, "id">("id")(
        of({ id: 1, name: "a" }, { id: 1, name: "b" }, { id: 3 }),
      ),
      new Map([
        [
          1,
          [
            { id: 1, name: "a" },
            { id: 1, name: "b" },
          ],
        ],
        [3, [{ id: 3 }]],
      ]),
    ),
);
