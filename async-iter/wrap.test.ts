import { wrap } from "./wrap.ts";
import { assertEquals } from "../dev_deps.ts";
import { of } from "./combinator/of.ts";

Deno.test("generator fn", async () =>
  assertEquals(
    await wrap(async function* () {
      for (let i = 0; i < 7; i++) yield i;
    })
      .skip(1)
      .map((x) => x * 2)
      .filter((x) => x < 10)
      .pipe(async function* (values) {
        yield* values;
      })
      .reduce((a, b) => a + b, 0),
    20,
  ));

Deno.test("iterable", async () =>
  assertEquals(await wrap(of(1, 2, 3)).last(), 3));
