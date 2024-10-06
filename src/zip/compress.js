import path, { dirname } from "path";
import fs from "fs";
import { createGzip } from "zlib";

const compress = async () => {
  const args = process.argv;
  const __filename = args[1];
  const __dirname = dirname(__filename);
  
  const filePath = "files";
  const fileName = "fileToCompress.txt";
  const fileZipName = "archive.gz";
  const fileFullName = path.join(__dirname, filePath, fileName);
  const fileZipFullName = path.join(__dirname, filePath, fileZipName);
  
  const gzip = createGzip();
  const input = fs.createReadStream(fileFullName);
  const output = fs.createWriteStream(fileZipFullName);

  input.pipe(gzip).pipe(output);
};

await compress();
