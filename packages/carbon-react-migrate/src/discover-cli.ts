import { resolve } from "node:path";
import { discover, writeDiscovery } from "./discovery.js";

function parse(args: string[]): { from?: string; to?: string } {
  const result: { from?: string; to?: string } = {};
  const seen = new Set<string>();
  while (args.length) {
    const option = args.shift();
    if (!option?.startsWith("--"))
      throw new Error(`Unexpected positional argument ${option ?? ""}`);
    if (!["--from", "--to"].includes(option))
      throw new Error(`Unknown option ${option}`);
    if (seen.has(option)) throw new Error(`Duplicate option ${option}`);
    seen.add(option);
    const value = args.shift();
    if (!value || value.startsWith("-"))
      throw new Error(`${option} requires a value`);
    if (option === "--from") result.from = value;
    else result.to = value;
  }
  return result;
}

export default function run(
  args: string[],
  root = resolve(import.meta.dirname, "../../.."),
): number {
  try {
    const { from, to } = parse([...args]);
    if (!from || !to)
      throw new Error(
        "usage: discover:migrations -- --from <version> --to <version>",
      );
    const inventory = discover(root, from, to);
    writeDiscovery(root, inventory);
    process.stdout.write(
      `Wrote ${inventory.candidates.length} non-authoritative needs-review candidates to migration-tooling/discovery\n`,
    );
    return 0;
  } catch (error) {
    process.stderr.write(
      `${error instanceof Error ? error.message : String(error)}\n`,
    );
    return 2;
  }
}

if (
  process.argv[1] &&
  import.meta.url === new URL(process.argv[1], "file:").href
)
  process.exitCode = run(process.argv.slice(2));
