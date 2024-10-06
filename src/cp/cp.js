import { fork } from "child_process";
import { Transform } from "stream";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const basePath = dirname(fileURLToPath(import.meta.url));
const filePath = path.join(basePath, "files", "script.js");

const input = process.stdin;
const output = process.stdout;

const masterSign = new Transform({
  transform(chunk, _, callback) {
    let chunkString = chunk.toString();
    if (chunkString.includes("CHECK")) {
      chunkString = `Master received from child process stdout: ${chunkString}`;
    }
    callback(null, chunkString);
  },
});

const spawnChildProcess = async (args) => {
  const child = fork(filePath, args, { silent: true });

  input.pipe(child.stdin);
  child.stdout.pipe(masterSign).pipe(output);

  child.on("exit", (code) => {
    console.log(
      `Child process exited with code ${code}`
    );
  });

};

spawnChildProcess(["Hello", 12, "someArgument1", "someArgument2"]);
