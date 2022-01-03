import { merge } from "../async-iter/combinator/merge.ts";
import { of } from "../async-iter/combinator/of.ts";
import { fromReader } from "../async-iter/combinator/fromReader.ts";
import { map } from "../async-iter/operator/map.ts";

export type CommandInput = Omit<Deno.RunOptions, "stdout" | "stderr">;

export class Command {
  constructor(
    public readonly options: CommandInput,
  ) {}

  spawn(...extraArgs: string[]) {
    return Deno.run({
      ...this.options,
      cmd: [...this.options.cmd, ...extraArgs],
      stdout: "piped",
      stderr: "piped",
    });
  }

  run(...extraArgs: string[]) {
    const process = this.spawn(...extraArgs);

    const stdout = fromReader(process.stdout!);
    const stderr = fromReader(process.stderr!);

    const allOutput = merge(
      stdout.pipe(map((chunk) => ["stdout", chunk] as const)),
      stderr.pipe(map((chunk) => ["stderr", chunk] as const)),
      of(process.status().then((status) => ["exit", status] as const)),
    );

    return {
      stdout,
      stderr,
      allOutput,
    };
  }
}
