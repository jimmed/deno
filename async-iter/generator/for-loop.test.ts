import { assertYieldsAsync } from "../testing/mod.ts";
import { forLoop } from "./for-loop.ts";

const alphabet = "abcdefghijklmnopqrstuvwxyz";
Deno.test("behaves like a for-loop", () =>
  assertYieldsAsync(
    forLoop({
      initial: () => "a",
      next: (prev) => String.fromCharCode(prev.charCodeAt(0) + 1),
      hasMore: (next) => next.charCodeAt(0) <= "z".charCodeAt(0),
    }),
    alphabet.split(""),
  ));
