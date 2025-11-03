// Tests CPU-bound operations

import fs from "node:fs";
import currentRuntime from "../helpers/detect.js";
import { performance } from "node:perf_hooks";

function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

function sortBenchmark() {
  const array = Array.from({ length: 10000 }, () => Math.random());
  return array.sort((a, b) => a - b);
}

// Fibonacci benchmark
const fibonacciStartTime = performance.now();
console.log(`Testing CPU-bound operations on ${currentRuntime}...`);
const result = fibonacci(35);
const fibonacciEndTime = performance.now();
console.log("Result:", result);

// Sort benchmark
const sortStartTime = performance.now();
for (let i = 0; i < 100; i++) {
  sortBenchmark();
}
const sortEndTime = performance.now();

const fibonacciTime = fibonacciEndTime - fibonacciStartTime;
const sortTime = sortEndTime - sortStartTime;

const md = `# CPU-bound Operations Test
*Runtime: ${currentRuntime}*
*Timestamp: \`${new Date().toISOString().slice(0, 10)}\`*

| Metric                 | Value (ms)          |
|------------------------|---------------------|
| Fibonacci Time (n=35)  | ${fibonacciTime.toFixed(2)}   |
| Sort Time (100 runs)   | ${sortTime.toFixed(2)}       |
`;

fs.writeFileSync(`results/cpu-${currentRuntime}.md`, md);
console.log(`CPU operations summary saved to cpu-${currentRuntime}.md`);
