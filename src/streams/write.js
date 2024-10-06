import path, { dirname } from "path";
import fs from "fs";

const write = async () => {
  const args = process.argv;
  const __filename = args[1];
  const __dirname = dirname(__filename);

  const filePath = "files";
  const fileName = "fileToWrite.txt";
  const fileFullName = path.join(__dirname, filePath, fileName);

  const output = fs.createWriteStream(fileFullName);

  process.stdin.resume();
  process.stdin.setEncoding("utf-8");

  process.stdin.on("data", (inputStdin) => output.write(inputStdin));
  process.stdin.on("end", () => output.end());
};

await write();
