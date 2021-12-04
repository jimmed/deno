import { Option } from "./option.ts";
import { Some } from "./some.ts";
import { None } from "./none.ts";

const SHARED_NONE = new None();

export const none = <Value>() => SHARED_NONE as None<Value>;

export const some = <Value>(value: Value) => new Some(value);

export const maybe = <Value>(value?: Value | null): Option<Value> =>
  value == null ? none() : some(value);
