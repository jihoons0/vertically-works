#!/usr/bin/env node
// verticallyworks — copy-in components for vertical writing interfaces.
// Fetches component source from the vertically.works registry and writes it
// into your project. Zero dependencies; Node 18+.

import { parseArgs } from "node:util";
import { mkdir, readFile, writeFile, access } from "node:fs/promises";
import { createInterface } from "node:readline/promises";
import path from "node:path";
import process from "node:process";

const VERSION = "0.1.0";
const DEFAULT_REGISTRY = "https://vertically.works";

const HELP = `verticallyworks ${VERSION} — components for vertical writing interfaces

Usage:
  npx verticallyworks init            Install design tokens (components/vw/tokens.css)
  npx verticallyworks add <name...>   Copy component source into your project
  npx verticallyworks list            List everything in the registry

Options:
  --yes, -y          Overwrite existing files without asking
  --dir <path>       Target directory root (default: auto-detects src/)
  --registry <url>   Registry base URL (default: ${DEFAULT_REGISTRY})
  --help, -h         Show this help
  --version, -v      Show the version

After init, import the tokens once, globally:
  CSS:    @import "./components/vw/tokens.css";   (after @import "tailwindcss"; if present)
  or JS:  import "@/components/vw/tokens.css";    (in your root layout)

Themes: set data-theme="light" | "dark" | "sepia" on <html>.
Docs: https://vertically.works/components
`;

function fail(message) {
  console.error(`\x1b[31merror\x1b[0m ${message}`);
  process.exit(1);
}

function ok(message) {
  console.log(`\x1b[32m✓\x1b[0m ${message}`);
}

async function fetchJson(base, name) {
  const url = `${base.replace(/\/$/, "")}/r/${name}.json`;
  let res;
  try {
    res = await fetch(url, { headers: { "user-agent": `verticallyworks/${VERSION}` } });
  } catch (cause) {
    fail(`could not reach ${url} — check your network, or pass --registry http://localhost:3000 for local dev`);
  }
  if (res.status === 404) return null;
  if (!res.ok) fail(`registry responded ${res.status} for ${url}`);
  return res.json();
}

async function exists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

async function detectRoot(dirFlag) {
  if (dirFlag) return path.resolve(dirFlag);
  // Next.js convention: if src/ exists and there is no top-level components/, use src/.
  if ((await exists("src")) && !(await exists("components"))) return path.resolve("src");
  return process.cwd();
}

async function confirm(question, autoYes) {
  if (autoYes) return true;
  if (!process.stdin.isTTY) return false;
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  const answer = (await rl.question(`${question} [y/N] `)).trim().toLowerCase();
  rl.close();
  return answer === "y" || answer === "yes";
}

/** Write one registry file; returns "created" | "overwritten" | "skipped". */
async function writeRegistryFile(root, file, autoYes) {
  // Components land in components/vw/<basename>; explicit targets are honored.
  const target = file.target ?? path.join("components", "vw", path.basename(file.path));
  const dest = path.join(root, target);
  const already = await exists(dest);
  if (already) {
    const overwrite = await confirm(`${path.relative(process.cwd(), dest)} exists — overwrite?`, autoYes);
    if (!overwrite) return { dest, outcome: "skipped" };
  }
  await mkdir(path.dirname(dest), { recursive: true });
  await writeFile(dest, file.content, "utf8");
  return { dest, outcome: already ? "overwritten" : "created" };
}

async function installItem(base, root, name, autoYes, installed = new Set()) {
  if (installed.has(name)) return;
  installed.add(name);

  const item = await fetchJson(base, name);
  if (!item) fail(`unknown component "${name}" — run \`npx verticallyworks list\``);

  // Install registry dependencies (e.g. tokens) first, once.
  for (const dep of item.registryDependencies ?? []) {
    const depName = String(dep).split("/").pop().replace(/\.json$/, "");
    const tokensPath = path.join(root, "components", "vw", "tokens.css");
    if (depName === "tokens" && (await exists(tokensPath))) continue;
    await installItem(base, root, depName, autoYes, installed);
  }

  for (const file of item.files ?? []) {
    const { dest, outcome } = await writeRegistryFile(root, file, autoYes);
    const rel = path.relative(process.cwd(), dest);
    if (outcome === "skipped") console.log(`\x1b[33m–\x1b[0m ${rel} (kept existing)`);
    else ok(`${rel} (${outcome})`);
  }

  if ((item.dependencies ?? []).length > 0) {
    console.log(`\nInstall the npm dependencies:\n  npm install ${item.dependencies.join(" ")}`);
  }
}

async function main() {
  const { values, positionals } = parseArgs({
    allowPositionals: true,
    options: {
      yes: { type: "boolean", short: "y", default: false },
      dir: { type: "string" },
      registry: { type: "string" },
      help: { type: "boolean", short: "h", default: false },
      version: { type: "boolean", short: "v", default: false },
    },
  });

  if (values.version) {
    console.log(VERSION);
    return;
  }
  const [command, ...names] = positionals;
  if (values.help || !command) {
    console.log(HELP);
    return;
  }

  const base = values.registry ?? process.env.VERTICALLYWORKS_REGISTRY ?? DEFAULT_REGISTRY;
  const root = await detectRoot(values.dir);

  if (command === "list") {
    const index = await fetchJson(base, "index");
    if (!index) fail("registry index not found");
    const width = Math.max(...index.items.map((i) => i.name.length)) + 2;
    console.log(`\nVertically Works registry (${base})\n`);
    for (const item of index.items) {
      console.log(`  ${item.name.padEnd(width)}${item.description}`);
      if (item.docs) console.log(`  ${"".padEnd(width)}\x1b[2m${item.docs}\x1b[0m`);
    }
    console.log(`\nInstall with: npx verticallyworks add <name>\n`);
    return;
  }

  if (command === "init") {
    await installItem(base, root, "tokens", values.yes);
    console.log(`\nNext steps:
  1. Import the tokens once, globally:
       CSS:  @import "./components/vw/tokens.css";  (after @import "tailwindcss"; if you use Tailwind)
       or:   import "@/components/vw/tokens.css";   (in your root layout)
  2. Optional themes: set data-theme="dark" or "sepia" on <html>.
  3. Add components: npx verticallyworks add vertical-button\n`);
    return;
  }

  if (command === "add") {
    if (names.length === 0) fail("nothing to add — usage: npx verticallyworks add <name...>");
    const installed = new Set();
    for (const name of names) {
      await installItem(base, root, name, values.yes, installed);
    }
    console.log(`\nDone. Import from "@/components/vw/<name>" and read the docs at https://vertically.works/components\n`);
    return;
  }

  fail(`unknown command "${command}" — try --help`);
}

main().catch((error) => fail(error?.message ?? String(error)));
