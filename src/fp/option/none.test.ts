import {
  assert,
  assertEquals,
  assertThrows,
} from "https://deno.land/std/testing/asserts.ts";

import { OptionIsNoneError } from "./option.ts";
import { none } from "./none.ts";
import { some } from "./some.ts";

const value = Symbol("test value");
Deno.test("isSome", () => assert(!none().isSome()));

Deno.test("isNone", () => assert(none().isNone()));

Deno.test("unwrap", () =>
  assertThrows(() => none().unwrap(), OptionIsNoneError));

Deno.test("expectSome", () =>
  assertThrows(() => none().expectSome("boom"), OptionIsNoneError, "boom"));

Deno.test("eq", () => {
  assert(none().eq(none()));
  assert(!none<typeof value>().eq(some(value)));
});

Deno.test("neq", () => {
  assert(!none().neq(none()));
  assert(none<typeof value>().neq(some(value)));
});

Deno.test("flatten", () => {
  assert(none().flatten().eq(none()));
});

Deno.test("and", () => {
  assert(none().and(none()).eq(none()));
  assert(none().and(some(value)).eq(none()));
});

Deno.test("or", () => {
  assert(none().or(none()).eq(none()));
  assert(none().or(some(value)).eq(some(value)));
});

Deno.test("otherwise", () => {
  assertEquals(none().otherwise(value), value);
});
