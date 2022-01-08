import type { AsyncCallback } from "../_types.ts";
import { compose } from "../operator/compose.ts";
import { tap } from "../operator/tap.ts";
import { reduce } from "./reduce.ts";

export const forEach = <T>(callback: AsyncCallback<T, unknown>) =>
  compose(
    tap(callback),
    reduce<T, void>(() => {}, undefined),
  );
