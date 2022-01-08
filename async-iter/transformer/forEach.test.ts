import { forEach } from "./forEach.ts";
import { of } from "../combinator/of.ts";
import { assertEquals } from "../../dev_deps.ts";

Deno.test(
  "calls the callback for each item, and resolves when finished",
  async () => {
    const items: number[] = [];
    await forEach<number>((item) => items.push(item))(of(1, 2, 3));
    assertEquals(items, [1, 2, 3]);
  },
);
