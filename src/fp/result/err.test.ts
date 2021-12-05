import { assert, assertThrows } from "https://deno.land/std/testing/asserts.ts";

import { err } from "./err.ts";

Deno.test("isOk", () => assert(!err(new Error()).isOk()));
Deno.test("isErr", () => assert(err(new Error()).isErr()));
Deno.test("unwrap", () =>
  assertThrows(() => err(new Error("test")).unwrap(), Error, "test"));
