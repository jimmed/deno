export class OptionIsNone extends Error {
  constructor(msg?: string | null) {
    super(msg ?? "Expected an Option to be Some { ... }, but got None");
  }
}

export class OptionIsSome<T = unknown> extends Error {
  constructor(public readonly value: T, msg?: string | null) {
    super(msg ?? `Expected an Option to be None, but got Some { ${value} }`);
  }
}
