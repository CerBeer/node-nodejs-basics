import Transform, { pipeline } from "stream";
import path, { dirname } from "path";
import fs from "fs";

const args = process.argv;
const __filename = args[1];
const __dirname = dirname(__filename);
const filePath = "files";
const fileName = "fileToRead.txt";
const fileFullName = path.join(__dirname, filePath, fileName);
const fileNameWrite = "fileToWrite.txt";
const fileFullNameWrite = path.join(__dirname, filePath, fileNameWrite);

const transform = async () => {
  process.stdin.resume();
  process.stdin.setEncoding("utf-8");

  process.stdin.on("data", (inputStdin) => {
    const result = inputStdin.replace('\n', '');
    process.stdout.write(`${result.split("").reverse().join("")}\n\n`)
  });
  process.stdin.on("end", () => process.stdout.end());
};

await transform();
