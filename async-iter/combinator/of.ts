import { Async } from "../_types.ts";
import { from } from "./from.ts";

/**
 * Constructs an `AsyncIter` from zero or more values passed as arguments.
 *
 * ```
 * const values = of(1, 'hello', 3)
 *
 * for await (const value of values) {
 *   console.log(value)
 * }
 *
 * // => 1
 * // => hello
 * // => 3
 * ```
 *
 * Promises can be passed, and they will be consumed in the order supplied,
 * regardless of the order in which they resolve.
 *
 * ```
 * const wait = <T>(value: T, delay: number) =>
 *  new Promise<T>(r => setTimeout(r, delay, value))
 *
 * const values = of(
 *   wait(1, 1000),
 *   2,
 *   wait(3, 500)
 * )
 *
 * // => 2 (immediately)
 * // => 3 (after 500ms)
 * // => 1 (after 1000ms)
 * ```
 */
export function of(): never;
export function of<T>(...values: Async<T>[]): AsyncIterable<T>;
export function of<T>(...values: Async<T>[]) {
  return from(values);
}
