import {
  assertEquals,
  assertRejects,
  assertThrows,
} from "https://deno.land/std/testing/asserts.ts";

import { maybeRejects, maybeThrows } from "./util.ts";

Deno.test("maybeThrows", () => {
  assertEquals(maybeThrows(() => "yay").unwrap(), "yay");

  assertThrows(
    () =>
      maybeThrows(() => {
        throw new Error("test");
      }).unwrap(),
    Error,
    "test",
  );
});

Deno.test("maybeRejects", async () => {
  assertEquals((await maybeRejects(Promise.resolve(1))).unwrap(), 1);

  await assertRejects(
    () =>
      maybeRejects(Promise.reject(new Error("test"))).then(
        (r) => r.unwrap(),
      ),
    Error,
    "test",
  );
});
