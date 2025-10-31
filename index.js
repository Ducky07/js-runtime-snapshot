import fs from "node:fs";

// Detect which runtime is running this script
function detectRuntime() {
  if (typeof Deno !== "undefined") return "Deno";
  if (typeof Bun !== "undefined") return "Bun";
  return "Node.js";
}

const currentRuntime = detectRuntime();

const tests = [
  "tests/startup.js",
  "tests/file-test.js",
  "tests/json-test.js",
  "tests/memory.js",
  "tests/fibonacci.js",
];

const results = {
  runtime: currentRuntime,
  timestamp: new Date().toISOString(),
  tests: {},
};

console.log(`Running test suite on ${currentRuntime}...\n`);

for (const test of tests) {
  console.log(`Running ${test}`);
  const startTime = Date.now();
  try {
    if (currentRuntime === "Deno") {
      // Deno specific execution
      const p = Deno.run({
        cmd: ["deno", "run", "--allow-write", "--allow-read", test],
        stdout: "null",
        stderr: "piped",
      });
      const status = await p.status();
      if (!status.success) {
        const rawError = await p.stderrOutput();
        const errorString = new TextDecoder().decode(rawError);
        throw new Error(errorString);
      }
    } else {
      // Node.js and Bun execution
      const { execSync } = await import("node:child_process");
      execSync(`node ${test}`, { stdio: "ignore" });
    }
    const endTime = Date.now();
    results.tests[test] = {
      duration_ms: endTime - startTime,
    };
    console.log(`Completed in ${(endTime - startTime).toFixed(2)} ms\n`);
  } catch (error) {
    results.tests[test] = {
      error: error.message,
    };
    console.error(`Error: ${error.message}\n`);
  }
}

// Save results to a Markdown file
console.log("\nGenerating Markdown report...");

const mdFilename = `benchmarks-${currentRuntime.toLowerCase().replace(".", "")}.md`;
let mdContent = `# Benchmark Results: ${currentRuntime}\n\n`;
mdContent += `*Timestamp: \`${results.timestamp.slice(0, 10)}\`*\n\n`;
mdContent += "| Test Case | Result |\n";
mdContent += "| :--- | :--- |\n";

for (const test of tests) {
  const result = results.tests[test];
  const status = result.error
    ? `**Error**: ${result.error}` // Show error
    : `**${result.duration_ms.toFixed(2)} ms**`; // Show duration

  mdContent += `| \`${test}\` | ${status} |\n`;
}

fs.writeFileSync(`results/${mdFilename}`, mdContent);
console.log(`Markdown report saved to ${mdFilename}`);
// --- End of Markdown section ---

// Display summary
console.log("\n=== SUMMARY ===");
for (const test of tests) {
  const result = results.tests[test];
  const status = result.error
    ? `ERROR: ${result.error.split("\n")[0]}`
    : `${result.duration_ms.toFixed(2)}ms`;
  console.log(`${test.padEnd(20)} ${status}`);
}
console.log("");
