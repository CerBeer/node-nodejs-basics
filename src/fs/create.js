import fs from "node:fs/promises";
import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const create = async () => {
  const basePath = dirname(fileURLToPath(import.meta.url));
  const filePath = "files";
  const fileName = "fresh.txt";
  const fileFullNameToWrite = path.join(basePath, filePath, fileName);
  const contentToWrite = "I am fresh and young";

  const errorMessage = "FS operation failed";
  const errorNeedThrow = await fs
    .access(fileFullNameToWrite)
    .then(() => true)
    .catch(() => false);
  if (errorNeedThrow) throw new Error(errorMessage);
  await fs.writeFile(fileFullNameToWrite, contentToWrite);
};

await create();
