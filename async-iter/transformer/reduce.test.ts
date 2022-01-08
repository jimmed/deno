import { reduce } from "./reduce.ts";
import { of } from "../combinator/of.ts";
import { from } from "../combinator/from.ts";
import { assertEquals } from "../../dev_deps.ts";

const sum = reduce<number, number>((a, b) => a + b, 0);

Deno.test(
  "resolves the initial value with an empty async iterable",
  async () => {
    assertEquals(await sum(from([])), 0);
  },
);

Deno.test(
  "resolves the result of reducing over items from an async iterable",
  async () => {
    assertEquals(await sum(of(1, 2, 3)), 6);
  },
);
