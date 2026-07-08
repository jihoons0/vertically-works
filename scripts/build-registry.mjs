// Builds the public component registry (public/r/*.json) from registry/registry.json.
// Zero dependencies; runs before `next build`/`next dev` via the npm scripts.
// The emitted item files follow shadcn's registry-item shape so both our CLI
// and `npx shadcn add <url>` can consume them.

import { mkdir, readFile, writeFile, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "public", "r");

const manifest = JSON.parse(await readFile(path.join(root, "registry", "registry.json"), "utf8"));
const HOME = manifest.homepage.replace(/\/$/, "");

await rm(outDir, { recursive: true, force: true });
await mkdir(outDir, { recursive: true });

const indexItems = [];
const shadcnIndexItems = [];

for (const item of manifest.items) {
  const files = [];
  for (const file of item.files) {
    const content = await readFile(path.join(root, file.path), "utf8");
    files.push({
      path: file.path,
      type: file.type,
      ...(file.target ? { target: file.target } : {}),
      content,
    });
  }

  const registryItem = {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: item.name,
    type: item.type,
    title: item.title,
    description: item.description,
    ...(item.registryDependencies
      ? { registryDependencies: item.registryDependencies.map((dep) => `${HOME}/r/${dep}.json`) }
      : {}),
    files,
  };

  await writeFile(path.join(outDir, `${item.name}.json`), JSON.stringify(registryItem, null, 2));

  indexItems.push({
    name: item.name,
    title: item.title,
    description: item.description,
    ...(item.siteSlug ? { docs: `${HOME}/components/${item.siteSlug}` } : {}),
  });
  shadcnIndexItems.push({
    name: item.name,
    type: item.type,
    title: item.title,
    description: item.description,
    files: item.files.map(({ path: p, type: t }) => ({ path: p, type: t })),
  });
}

// Our CLI's stable contract
await writeFile(
  path.join(outDir, "index.json"),
  JSON.stringify({ version: 1, homepage: HOME, items: indexItems }, null, 2)
);

// shadcn-style registry index (best-effort compatibility)
await writeFile(
  path.join(outDir, "registry.json"),
  JSON.stringify(
    {
      $schema: "https://ui.shadcn.com/schema/registry.json",
      name: manifest.name,
      homepage: HOME,
      items: shadcnIndexItems,
    },
    null,
    2
  )
);

console.log(`registry: built ${manifest.items.length + 2} files into public/r/`);
