import { get } from "./get.ts";
import { of } from "../combinator/of.ts";
import { assertYieldsAsync } from "../testing/mod.ts";

type Test = { id: number; name: string };

const getName = get<Test, "name">("name");
Deno.test("yields values from each item specified by the key", () =>
  assertYieldsAsync(
    getName(of({ id: 1, name: "test" }, { id: 2, name: "test 2" })),
    ["test", "test 2"],
  ));
