import { wrap } from "./wrap.ts";
import { assertYieldsAsync } from "./testing/mod.ts";

const test = wrap(async function* () {
  for (let i = 0; i < 7; i++) yield i;
})
  .skip(1)
  .map((x) => x * 2)
  .filter((x) => x < 10);
Deno.test("wrap", () => assertYieldsAsync(test, [2, 4, 6, 8]));
