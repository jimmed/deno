import {
  assert,
  assertEquals,
  assertThrows,
} from "https://deno.land/std/testing/asserts.ts";
import { OptionIsSome } from "./_errors.ts";
import { none } from "./none.ts";
import { some } from "./some.ts";

Deno.test("isSome", () => {
  assert(some(undefined).isSome());
});

Deno.test("isNone", () => {
  assert(!some(1).isNone());
});

Deno.test("unwrap", () => {
  const value = {};
  assertEquals(some(value).unwrap(), value);
});

Deno.test("expectSome", () => {
  const value = {};
  assertEquals(some(value).expectSome("boom"), value);
});

Deno.test("expectNone", () => {
  assertThrows(() => some(1).expectNone("boom"), OptionIsSome, `boom`);
});

Deno.test("eq", () => {
  const a = {} as const;
  const b = {} as const;
  assert(!some(a).eq(none()));
  assert(some(a).eq(some(a)));
  assert(some(b).eq(some(b)));
  assert(!some(a).eq(some(b)));
  assert(!some(b).eq(some(a)));
});

Deno.test("neq", () => {
  const a = {} as const;
  const b = {} as const;
  assert(some(a).neq(none()));
  assert(!some(a).neq(some(a)));
  assert(!some(b).neq(some(b)));
  assert(some(a).neq(some(b)));
  assert(some(b).neq(some(a)));
});

Deno.test("flatten", () => {
  assert(some(none()).flatten().isNone());
  assertEquals(some("value").flatten().unwrap(), "value");
  assertEquals(some(some("value")).flatten().unwrap(), "value");
  assertEquals(
    some(some(some("value")))
      .flatten()
      .unwrap(),
    "value",
  );
});

Deno.test("and", () => {
  assert(some(1).and(none()).isNone());
  assert(some(1).and(some("a")).eq(some("a")));
  assert(some("a").and(some(1)).eq(some(1)));
});

Deno.test("or", () => {
  assert(some(1).or(none()).eq(some(1)));
  assert(some(1).or(some("a")).eq(some(1)));
  assert(some("a").or(some(1)).eq(some("a")));
});

Deno.test("otherwise", () => {
  assertEquals(some(2).otherwise(1), 2);
});
