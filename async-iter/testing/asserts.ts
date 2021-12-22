import { AI } from "../_types.ts";
import { assertEquals } from "../../dev_deps.ts";

/**
 * Asserts that the supplied AsyncIterable yields the expected values
 */
export async function assertYieldsAsync<T>(iterable: AI<T>, expected: T[]) {
  const actual: T[] = [];
  for await (const item of iterable) actual.push(item);
  assertEquals(actual, expected);
}
