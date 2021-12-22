import { from } from "./from.ts";
import { assertYieldsAsync } from "../testing/mod.ts";

const values = [1, 2, 3];
Deno.test("sync array", () => assertYieldsAsync(from(values), values));

const delay = <T>(v: T, d: number) =>
  new Promise<T>((r) => setTimeout(r, d, v));
Deno.test("async array", () =>
  assertYieldsAsync(
    from([delay(1, 1000), 2, delay(3, 500)]),
    values,
  ));

Deno.test("Set", () => assertYieldsAsync(from(new Set(values)), values));
