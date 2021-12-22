import { assertYieldsAsync } from "../testing/mod.ts";
import { count } from "./count.ts";

Deno.test("counts from min to max by step", () =>
  assertYieldsAsync(count({ max: 10, step: 2 }), [0, 2, 4, 6, 8, 10]));
