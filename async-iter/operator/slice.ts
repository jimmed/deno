import type { AsyncOperator } from "../_types.ts";
import { compose } from "../transformer/compose.ts";
import { take } from "./take.ts";
import { skip } from "./skip.ts";

export const slice = <T>(toSkip: number, toTake: number): AsyncOperator<T> =>
  compose(skip(toSkip), take(toTake));
