import fs from "node:fs/promises";
import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const remove = async () => {
  const basePath = dirname(fileURLToPath(import.meta.url));
  const filePath = "files";
  const fileToRemoveName = "fileToRemove.txt";

  const fileToRemoveFullName = path.join(basePath, filePath, fileToRemoveName);
  const errorMessage = "FS operation failed";

  let errorNeedThrow = await fs
    .stat(fileToRemoveFullName)
    .then((stats) => !stats.isFile())
    .catch(() => true);
  if (errorNeedThrow) throw new Error(errorMessage);

  await fs.rm(fileToRemoveFullName);
};

await remove();
