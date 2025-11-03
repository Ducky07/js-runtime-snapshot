// Benchmarking file read/write performance

import { readFileSync, writeFileSync, unlinkSync } from "node:fs";
import { join } from "node:path";
import currentRuntime from "../helpers/detect.js";
import { performance } from "node:perf_hooks";

const iterations = 1000;
const testData = "x".repeat(1024); // 1KB of data
const testFile = join(import.meta.dirname, "test-file.txt");

const startTime = performance.now();

const writeTimeStart = performance.now();
// Write benchmark
for (let i = 0; i < iterations; i++) {
  writeFileSync(testFile, testData);
}
const writeTimeEnd = performance.now();

const readTimeStart = performance.now();
// Read benchmark
for (let i = 0; i < iterations; i++) {
  readFileSync(testFile, "utf8");
}
const readTimeEnd = performance.now();

// Cleanup
unlinkSync(testFile);

const endTime = performance.now();
const totalTime = endTime - startTime;
const writeTime = writeTimeEnd - writeTimeStart;
const readTime = readTimeEnd - readTimeStart;

console.log(`File Read/Write Benchmark on ${currentRuntime}`);
console.log(
  `Total Time for ${iterations} writes and reads: ${totalTime.toFixed(2)} ms`,
);

// Create a markdown file with file read/write performance summary
const md = `# File Read/Write Test
*Runtime: ${currentRuntime}*
*Timestamp: \`${new Date().toISOString().slice(0, 10)}\`*

| Metric                     | Value (ms)          |
|----------------------------|---------------------|
| Total Time                 | ${totalTime.toFixed(2)}  |
| Write Time (${iterations} writes) | ${writeTime.toFixed(2)}   |
| Read Time (${iterations} reads)  | ${readTime.toFixed(2)}       |
`;

writeFileSync(`results/read-write-${currentRuntime}.md`, md);
console.log(`Read/Write summary saved to file-test-${currentRuntime}.md`);
