import fs from "node:fs/promises";
import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const copy = async () => {
  const basePath = dirname(fileURLToPath(import.meta.url));
  const sourcePath = "/files/";
  const destinationPath = "/files_copy/";
  const sourceFullPath = path.join(basePath, sourcePath);
  const destinationFullPath = path.join(basePath, destinationPath);

  const copyDir = async (source, destination) => {
    await fs.mkdir(destination, { recursive: true });
    const dirEntry = await fs.readdir(source, { withFileTypes: true });

    return Promise.all(
      dirEntry.map(async (entry) => {
        const sourcePath = path.join(source, entry.name);
        const destPath = path.join(destination, entry.name);

        if (entry.isDirectory()) copyDir(sourcePath, destPath);
        else fs.copyFile(sourcePath, destPath);
      })
    );
  };

  const errorMessage = "FS operation failed";
  let errorNeedThrow = await fs
    .stat(sourceFullPath)
    .then((stats) => stats.isFile())
    .catch(() => true);
  errorNeedThrow =
    errorNeedThrow ||
    (await fs
      .access(destinationFullPath)
      .then(() => true)
      .catch(() => false));
  if (errorNeedThrow) throw new Error(errorMessage);

  await copyDir(sourceFullPath, destinationFullPath);
};

await copy();
