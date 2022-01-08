import { assertYieldsAsync } from "../testing/mod.ts";
import { repeat } from "./repeat.ts";
import { take } from "../operator/take.ts";

Deno.test("repeats ad infinitum", () =>
  assertYieldsAsync(take(4)(repeat(1)), [1, 1, 1, 1])
);
