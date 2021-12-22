import { assertYieldsAsync } from "../testing/mod.ts";
import { zip, zipExhaustive } from "./zip.ts";
import { of } from "./of.ts";

Deno.test("zips multiple iterators", () =>
  assertYieldsAsync(zip(of(1, 2, 3), of(4, 5), of(5, 6)), [[1, 4, 5], [
    2,
    5,
    6,
  ]]));

Deno.test("exhaustively zips multiple iterators", () =>
  assertYieldsAsync(zipExhaustive(of(1, 2, 3), of(4, 5), of(5, 6)), [
    [1, 4, 5],
    [2, 5, 6],
    [3, undefined, undefined],
  ]));
