import { wrap } from "./wrap.ts";
import { assertEquals } from "../dev_deps.ts";

const test = wrap(async function* () {
  for (let i = 0; i < 7; i++) yield i;
})
  .skip(1)
  .map((x) => x * 2)
  .filter((x) => x < 10)
  .pipe(async function* (values) {
    yield* values;
  })
  .reduce((a, b) => a + b, 0);
Deno.test("wrap", async () => assertEquals(await test, 20));
