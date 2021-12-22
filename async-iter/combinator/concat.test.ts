import { assertYieldsAsync } from "../testing/mod.ts";
import { concat } from "./concat.ts";
import { of } from "./of.ts";

Deno.test("concats multiple iterators", () =>
  assertYieldsAsync(concat(of(1, 2, 3), of(4), of(5, 6)), [1, 2, 3, 4, 5, 6]));
