import { tap } from "./tap.ts";
import { of } from "../combinator/of.ts";
import { assertYieldsAsync } from "../testing/mod.ts";
import { assertEquals } from "../../dev_deps.ts";

Deno.test("calls the callback but returns the original value", async () => {
  const items: number[] = [];
  const cb = (item: number) =>
    new Promise<void>((r) =>
      setTimeout(() => {
        items.push(item);
        r();
      }, 1)
    );
  await assertYieldsAsync(tap(cb)(of(1, 2, 3)), [1, 2, 3]);
  assertEquals(items, [1, 2, 3]);
});
