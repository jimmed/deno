import { assertYieldsAsync } from "../testing/mod.ts";
import { repeat } from "./repeat.ts";

Deno.test("repeats ad infinitum", () =>
  assertYieldsAsync(repeat(1).take(4), [1, 1, 1, 1]));
