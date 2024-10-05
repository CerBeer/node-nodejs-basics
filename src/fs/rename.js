import fs from "node:fs/promises";
import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const rename = async () => {
  const basePath = dirname(fileURLToPath(import.meta.url));
  const filePath = "files";
  const wrongFileName = "wrongFilename.txt";
  const properFileName = "properFilename.md";
  const wrongFileFullName = path.join(basePath, filePath, wrongFileName);
  const properFileFullName = path.join(basePath, filePath, properFileName);

  const errorMessage = "FS operation failed";

  let errorNeedThrow = await fs
    .stat(wrongFileFullName)
    .then((stats) => !stats.isFile())
    .catch(() => true);
  errorNeedThrow =
    errorNeedThrow ||
    (await fs
      .access(properFileFullName)
      .then(() => true)
      .catch(() => false));
  if (errorNeedThrow) throw new Error(errorMessage);

  await fs.rename(wrongFileFullName, properFileFullName);
};

await rename();
