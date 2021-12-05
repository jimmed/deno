import { assert, assertThrows } from "../../dev_deps.ts";
import { err } from "./err.ts";

Deno.test("isOk", () => assert(!err(new Error()).isOk()));
Deno.test("isErr", () => assert(err(new Error()).isErr()));
Deno.test("unwrap", () =>
  assertThrows(() => err(new Error("test")).unwrap(), Error, "test"));
