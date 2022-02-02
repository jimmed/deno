import { filter } from "./filter.ts";

export function exhaust<T>() {
  return filter<T, never>(() => false);
}
