import fs from "fs";

// Detect which runtime is running this script
function detectRuntime() {
  if (typeof Deno !== "undefined") return "Deno";
  if (typeof Bun !== "undefined") return "Bun";
  return "Node.js";
}

const currentRuntime = detectRuntime();
const runtimeCmd = currentRuntime === "Deno" ? "Bun" : "Node";

const tests = [
  "startup.js",
  "file-test.js",
  "json-test.js",
  "memory.js",
  "fibonacci.js",
];

const results = {
  runtime: currentRuntime,
  timestamp: new Date().toISOString(),
  tests: {},
};

console.log(`Running test suite on ${currentRuntime}...\n`);

for (const test of tests) {
  try {
    console.log(`  Running ${test}...`);
    const startTime = Date.now();

    const { execSync } = require("child_process");
    const output = execSync(`${runtimeCmd} ${test}`, {
      encoding: "utf8",
      timeout: 30000,
    });
    const duration = Date.now() - startTime;
    results.tests[test] = {
      duration_ms: duration,
      output: output.trim(),
    };

    console.log(`    ✓ Completed in ${results.tests[test].duration_ms}ms`);
  } catch (error) {
    console.log(`    ✗ Failed: ${error.message}`);
    results.tests[test] = { error: error.message };
  }
}

// Save results
const filename = `results-${currentRuntime.toLowerCase().replace(".", "")}.json`;
fs.writeFileSync(filename, JSON.stringify(results, null, 2));
console.log(`\nResults saved to ${filename}`);

// Display summary
console.log("\n=== SUMMARY ===");
for (const test of tests) {
  const result = results.tests[test];
  const status = result.error
    ? `ERROR: ${result.error}`
    : `${result.duration_ms}ms`;
  console.log(`${test.padEnd(20)} ${status}`);
}
console.log("");
