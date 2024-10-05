import { fork } from "child_process";
import path from "path";
import * as url from "url";
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
const file = path.join(__dirname, "files", "script.js");

const spawnChildProcess = async (args) => {
  // Write your code here
  fork(filePath, args);
};

// Put your arguments in function call to test this functionality
// spawnChildProcess( /* [someArgument1, someArgument2, ...] */);

spawnChildProcess(file, [1, 2, 3, "str"]);
