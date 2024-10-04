import path, { dirname } from "path";
import fs from "fs";
import { createUnzip } from "zlib";

const args = process.argv;
const __filename = args[1];
const __dirname = dirname(__filename);

const filePath = "files";
const fileName = "archive.gz";
const fileZipName = "fileToCompress.txt";
const fileFullName = path.join(__dirname, filePath, fileName);
const fileZipFullName = path.join(__dirname, filePath, fileZipName);

const gzip = createUnzip();
const input = fs.createReadStream(fileFullName);
const output = fs.createWriteStream(fileZipFullName);

const decompress = async () => {
  input.pipe(gzip).pipe(output);
};

await decompress();
