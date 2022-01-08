import { indexBy } from "./indexBy.ts";

export const indexByKey = <T, K extends keyof T>(key: K) =>
  indexBy((item: T) => item[key]);
