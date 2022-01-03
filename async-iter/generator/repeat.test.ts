import { assertYieldsAsync } from "../testing/mod.ts";
import { repeat } from "./repeat.ts";
import { take } from "../operator/take.ts";

Deno.test("repeats ad infinitum", () =>
  assertYieldsAsync(repeat(1).pipe(take(4)), [1, 1, 1, 1]));
