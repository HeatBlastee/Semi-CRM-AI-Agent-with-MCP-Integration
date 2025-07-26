import { register } from "ts-node/esm";
import { pathToFileURL } from "url";

// Register ts-node with ESM support
register({
  project: "./tsconfig.json",
});

// Convert entry to file URL
import(pathToFileURL("./src/index.ts").href);
