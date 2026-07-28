import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";

const dist = new URL("../dist/", import.meta.url);
await mkdir(dist, { recursive: true });
await copyFile(new URL("../src/styles/matterflux.css", import.meta.url), new URL("matterflux.css", dist));

for (const filename of ["react/index.js", "react/index.cjs"]) {
  const output = new URL(filename, dist);
  const source = await readFile(output, "utf8");
  if (!source.startsWith('"use client";')) {
    await writeFile(output, `"use client";\n${source}`);
  }
}
