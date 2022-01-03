import { streams } from "../../deps.ts";
import { AsyncIter } from "../AsyncIter.ts";

export const fromReader = (
  ...args: Parameters<typeof streams["iterateReader"]>
) => new AsyncIter(() => streams.iterateReader(...args));
