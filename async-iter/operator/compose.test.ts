import { compose } from "./compose.ts";
import { get } from "./get.ts";
import { reduce } from "../transformer/reduce.ts";
import { assertEquals } from "../../dev_deps.ts";
import { of } from "../combinator/of.ts";
import { map } from "./map.ts";

const getSumOfLengths = compose(
  get<string, "length">("length"),
  map((x) => x * 2),
  reduce((a, b) => a + b, 0),
);
Deno.test("composes multiple operators", async () =>
  assertEquals(await getSumOfLengths(of("hey", "there", "world")), 26));
