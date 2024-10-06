import path, { dirname } from "path";
import crypto from "crypto";
import fs from "fs";

const calculateHash = async () => {
  const args = process.argv;
  const __filename = args[1];
  const __dirname = dirname(__filename);

  const filePath = "files";
  const fileName = "fileToCalculateHashFor.txt";
  const fileFullName = path.join(__dirname, filePath, fileName);
  const input = fs.createReadStream(fileFullName);

  const fileHash = await new Promise((resolve, reject) => {
    const hash = crypto.createHash("sha256");
    const rs = input;
    rs.on("error", reject);
    rs.on("data", (chunk) => hash.update(chunk));
    rs.on("end", () => resolve(hash.digest("hex")));
  });

  process.stdout.write(fileHash + "\n");
};

await calculateHash();
