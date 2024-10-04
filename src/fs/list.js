import fs from "node:fs/promises";
import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const listDir = async (source) => {
  const dirEntry = await fs.readdir(source.sourcePath, { withFileTypes: true });

  const subDirs = new Array();
  dirEntry.forEach((entry) => {
    const name = entry.name;
    const sourcePath = path.join(source.sourcePath, name);
    if (entry.isFile()) console.log(name);
    else subDirs.push({name: `${path.join(source.name, name)}`, sourcePath});
  });
  for (const entry of subDirs) {
    console.log(`\n[${entry.name}]`);
    await listDir(entry);
  };
};

const list = async () => {
  const basePath = dirname(fileURLToPath(import.meta.url));
  const source = "files";
  const sourcePath = path.join(basePath, source);
  const errorMessage = "FS operation failed";

  let errorNeedThrow = await fs
    .stat(sourcePath)
    .then((stats) => stats.isFile())
    .catch(() => true);
  if (errorNeedThrow) throw new Error(errorMessage);

  await listDir({name: '', sourcePath});
};

await list();
