import { indexByKey } from "./indexByKey.ts";
import { of } from "../combinator/of.ts";
import { assertEquals } from "../../dev_deps.ts";

type T = { id: number };

Deno.test(
  "creates a map indexed by the return value of the callback",
  async () =>
    assertEquals(
      await indexByKey<T, "id">("id")(of({ id: 1 }, { id: 2 }, { id: 3 })),
      new Map([
        [1, { id: 1 }],
        [2, { id: 2 }],
        [3, { id: 3 }],
      ]),
    ),
);
