import fs from "node:fs";
import autocannon from "autocannon";
import currentRuntime from "../helpers/detect.js";

// async/await
async function cannon() {
  const cannon = await autocannon({
    url: "http://localhost:3000",
    connections: 10, //default
    pipelining: 1, // default
    duration: 10, // default
  });
  console.log("Benchmarking complete");
  const md = `# Autocannon Benchmark Results

  *Timestamp: \`${new Date().toISOString().slice(0, 10)}\`*

## Results Summary

| Metric | Min | Max | Average | Total |
|--------|-----|-----|---------|-------|
| **Latency (ms)** | ${cannon.latency.min} | ${cannon.latency.max} | ${Math.round(cannon.latency.mean * 100)} | - |
| **Requests/sec** | ${cannon.requests.min} | ${cannon.requests.max} | ${cannon.requests.mean.toFixed(0)} | ${cannon.requests.total} |
| **Throughput (bytes/sec)** | ${cannon.throughput.min} | ${cannon.throughput.max} | ${cannon.throughput.mean.toFixed(0)} | ${cannon.throughput.total} |

## Additional Details

- **Duration:** ${cannon.duration} seconds
- **Connections:** ${cannon.connections}
- **Pipelining:** ${cannon.pipelining}
- **Total Errors:** ${cannon.errors}
- **Total Timeouts:** ${cannon.timeouts}

`;

  fs.writeFileSync(`results/autocannon-${currentRuntime}.md`, md);
  console.log(`Results saved to autocannon-${currentRuntime}.md`);
}

cannon();
