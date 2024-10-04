import fs from "node:fs/promises";
import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const read = async () => {
  const basePath = dirname(fileURLToPath(import.meta.url));
  const filePath = "files";
  const fileName = "fileToRead.txt";
  const fileFullNameToRead = path.join(basePath, filePath, fileName);
  const errorMessage = "FS operation failed";
  const errorNeedThrow = await fs
    .stat(fileFullNameToRead)
    .then((stats) => !stats.isFile())
    .catch(() => true);
  if (errorNeedThrow) throw new Error(errorMessage);
  const contents = await fs.readFile(fileFullNameToRead, { encoding: "utf8" });
  console.log(contents);
};

await read();
