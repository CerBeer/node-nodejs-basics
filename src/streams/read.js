import path, { dirname } from "path";
import fs from "fs";

const read = async () => {
  const args = process.argv;
  const __filename = args[1];
  const __dirname = dirname(__filename);
  
  const filePath = "files";
  const fileName = "fileToRead.txt";
  const fileFullName = path.join(__dirname, filePath, fileName);

  const input = fs.createReadStream(fileFullName);
  input.on("data", (chunk) => process.stdout.write(chunk.toString()));
  input.on("end", () => process.stdout.write("\n"));
};

await read();
