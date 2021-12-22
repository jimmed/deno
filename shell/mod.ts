import * as AsyncIter from "../async-iter/mod.ts";
import { TextIter } from "../async-iter/TextIter.ts";

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

    const stdout = TextIter.fromReader(process.stdout!);
    const stderr = TextIter.fromReader(process.stderr!);

    const allOutput = AsyncIter.merge(
      stdout.map((chunk) => ["stdout", chunk] as const),
      stderr.map((chunk) => ["stderr", chunk] as const),
      AsyncIter.of(
        process.status().then((status) => ["exit", status] as const),
      ),
    );

    return {
      stdout,
      stderr,
      allOutput,
    };
  }
}
