// Benchmarking file read/write performance

import { writeFileSync, readFileSync, unlinkSync } from "node:fs";
import { join } from "node:path";

const iterations = 1000;
const testData = "x".repeat(1024); // 1KB of data
const testFile = join(import.meta.dirname, "test-file.txt");

console.time("File I/O Benchmark");

// Write benchmark
for (let i = 0; i < iterations; i++) {
  writeFileSync(testFile, testData);
}

// Read benchmark
for (let i = 0; i < iterations; i++) {
  readFileSync(testFile, "utf8");
}

// Cleanup
unlinkSync(testFile);

console.timeEnd("File I/O Benchmark");
