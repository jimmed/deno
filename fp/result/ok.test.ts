import {
  assert,
  assertEquals,
} from "https://deno.land/std@0.117.0/testing/asserts.ts";

import { ok } from "./ok.ts";

Deno.test("isOk", () => assert(ok(1).isOk()));
Deno.test("isErr", () => assert(!ok(1).isErr()));
Deno.test("unwrap", () => assertEquals(ok(1).unwrap(), 1));
