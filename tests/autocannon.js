import fs from "node:fs";
import autocannon from "autocannon";

// Detect which runtime is running this script
function detectRuntime() {
  if (typeof Deno !== "undefined") return "Deno";
  if (typeof Bun !== "undefined") return "Bun";
  return "Node.js";
}

const currentRuntime = detectRuntime();

// async/await
async function cannon() {
  const result = await autocannon({
    url: "http://localhost:3000",
    connections: 10, //default
    pipelining: 1, // default
    duration: 10, // default
  });
  console.log("Benchmarking complete");
  const md = `# Autocannon Benchmark Results

  *Timestap: ${new Date().toISOString().slice(0, 10)}*

## Results Summary

| Metric | Min | Max | Average | Total |
|--------|-----|-----|---------|-------|
| **Latency** | ${result.latency.min}ms | ${result.latency.max}ms | ${result.latency.mean}s | - |
| **Requests/sec** | ${result.requests.min} | ${result.requests.max} | ${result.requests.mean.toFixed(0)} | ${result.requests.total} |
| **Throughput (bytes/sec)** | ${result.throughput.min} | ${result.throughput.max} | ${result.throughput.mean.toFixed(0)} | ${result.throughput.total} |

## Additional Details

- **Duration:** ${result.duration} seconds
- **Connections:** ${result.connections}
- **Pipelining:** ${result.pipelining}
- **Total Errors:** ${result.errors}
- **Total Timeouts:** ${result.timeouts}

`;

  fs.writeFileSync(`results/autocannon-${currentRuntime}.md`, md);
  console.log(`Results saved to autocannon-${currentRuntime}.md`);
}

cannon();
