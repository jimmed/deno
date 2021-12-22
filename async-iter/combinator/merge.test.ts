import { assertYieldsAsync } from "../testing/mod.ts";
import { merge } from "./merge.ts";
import { of } from "./of.ts";

const delay = <T>(v: T, d: number) =>
  new Promise<T>((r) => setTimeout(r, d, v));
Deno.test("merges multiple iterators", () =>
  assertYieldsAsync(
    merge(of(delay(1, 100), 2, delay(3, 200)), of(delay(4, 10)), of(5, 6)),
    [5, 6, 4, 1, 2, 3],
  ));
