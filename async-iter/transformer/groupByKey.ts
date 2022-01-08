import { groupBy } from "./groupBy.ts";

export const groupByKey = <T, K extends keyof T>(key: K) =>
  groupBy((item: T) => item[key]);
