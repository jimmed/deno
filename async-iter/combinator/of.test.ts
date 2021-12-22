import { of } from "./of.ts";
import { assertYieldsAsync } from "../testing/mod.ts";

Deno.test("sync values", () => assertYieldsAsync(of(1, 2, 3), [1, 2, 3]));

const delay = <T>(v: T, d: number) =>
  new Promise<T>((r) => setTimeout(r, d, v));
Deno.test("async values", () =>
  assertYieldsAsync(
    of(delay(1, 1000), 2, delay(3, 500)),
    [1, 2, 3],
  ));
