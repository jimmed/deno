import { assert } from "https://deno.land/std@0.117.0/testing/asserts.ts";
import fc from "https://cdn.skypack.dev/fast-check?dts";

import { none } from "./none.ts";
import { some } from "./some.ts";
import { isOption, maybeFalsy, maybeNullish } from "./util.ts";

const nullishValues = fc.constantFrom(undefined, null);
const falseyValues = fc.falsy().filter((x) => x != null);
const truthyValues = fc.anything().filter(Boolean);

Deno.test("maybeNullish", () => {
  fc.assert(
    fc.property(nullishValues, (value) => assert(maybeNullish(value).isNone())),
  );
  fc.assert(
    fc.property(
      falseyValues,
      (value) => assert(maybeNullish(value).eq(some(value!))),
    ),
  );
  fc.assert(
    fc.property(
      truthyValues,
      (value) => assert(maybeNullish(value).eq(some(value!))),
    ),
  );
});

Deno.test("maybeFalsy", () => {
  fc.assert(
    fc.property(nullishValues, (value) => assert(maybeFalsy(value).isNone())),
  );
  fc.assert(
    fc.property(falseyValues, (value) => assert(maybeFalsy(value).isNone())),
  );
  fc.assert(
    fc.property(
      truthyValues,
      (value) => assert(maybeFalsy(value).eq(some(value))),
    ),
  );
});

Deno.test("isOption", () => {
  fc.assert(fc.property(fc.anything(), (value) => assert(!isOption(value))));
  fc.assert(
    fc.property(
      fc.constantFrom(none(), some(1)),
      (value) => assert(isOption(value)),
    ),
  );
});
