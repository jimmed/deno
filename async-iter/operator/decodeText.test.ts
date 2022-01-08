import { decodeText } from "./decodeText.ts";
import { from } from "../combinator/from.ts";
import { assertYieldsAsync } from "../testing/mod.ts";

const text = ["hello", "there", "world"];
const encoder = new TextEncoder();

Deno.test("decodes text from buffers", () =>
  assertYieldsAsync(
    decodeText()(from(text.map((chunk) => encoder.encode(chunk)))),
    text,
  ));
