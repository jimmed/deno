import { IS_OPTION } from "./_constants.ts";
import { Option } from "./_types.ts";
import { none } from "./none.ts";
import { some } from "./some.ts";

export const maybe = <T>(predicate: (value: unknown) => value is T) =>
  (value: unknown): Option<T> => predicate(value) ? some(value) : none();

// deno-lint-ignore ban-types
export const maybeNullish = maybe((v): v is {} => v != null) as <T>(
  value?: T | null,
) => Option<T>;

// deno-lint-ignore ban-types
export const maybeFalsy = maybe((v): v is {} => Boolean(v)) as <T>(
  value?: T | false | null,
) => Option<T>;

export function isOption<Value = unknown>(
  value: unknown,
): value is Option<Value> {
  return value != null && typeof value == "object" && IS_OPTION in value!;
}
