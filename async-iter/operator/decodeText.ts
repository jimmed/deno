import { map } from "./map.ts";

export const decodeText = (decoder = new TextDecoder()) =>
  map<BufferSource | undefined, string>((chunk) => decoder.decode(chunk));
