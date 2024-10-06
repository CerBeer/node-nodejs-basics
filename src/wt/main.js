import { Worker } from "worker_threads";
import { cpus } from "os";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const basePath = dirname(fileURLToPath(import.meta.url));
const fileWorker = path.join(basePath, "worker.js");

const createWorkerThread = (num) => {
  const result = new Promise((resolve) => {
    const worker = new Worker(fileWorker, { workerData: num });

    worker.on("message", (data) =>
      resolve({
        status: "resolved",
        data,
      })
    );

    worker.on("error", (data) =>
      resolve({
        status: "error",
        data: null,
      })
    );
  });
  return result;
};

const performCalculations = async () => {
  const cores = cpus().length;
  const initNumber = 10;

  const workerThreads = new Array();
  for (let i = 0; i < cores; i += 1) {
    workerThreads.push(createWorkerThread(initNumber + i));
  }

  const results = await Promise.all(workerThreads);
  console.log(results);
};

await performCalculations();
