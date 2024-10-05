import { Transform } from "stream";

const input = process.stdin;
const output = process.stdout;

const transform = async () => {
  const reverse = new Transform({
    transform(chunk, _, callback) {
      const reversedChunk = chunk
        .toString()
        .trim()
        .split("")
        .reverse()
        .join("");
      callback(null, reversedChunk + "\n");
    },
  });
  input.pipe(reverse).pipe(output);
};

await transform();
