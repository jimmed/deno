import type { Async, AsyncReducer, AsyncTransformer } from "../_types.ts";
import { compose } from "../operator/compose.ts";
import { scan } from "../operator/scan.ts";
import { last } from "./last.ts";

export const reduce = <T, U>(
  reducer: AsyncReducer<T, U>,
  initialValue: Async<U>,
): AsyncTransformer<T, Promise<U>> =>
  compose(scan(reducer, initialValue), last(true));
