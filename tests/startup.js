// Measure the startup time of the JavaScript runtime environment
// Maybe there is a better way to do this?

import fs from "node:fs";
import { performance } from "node:perf_hooks";
import currentRuntime from "../helpers/detect.js";

const startTime = performance.now();
console.log(`Measuring startup time for ${currentRuntime}...`);
const endTime = performance.now();
const startupTime = endTime - startTime;

console.log(`Startup Time for ${currentRuntime}: ${startupTime.toFixed(2)} ms`);

// Create a markdown file with startup time

const md = `# Startup Time Measurement
*Runtime: ${currentRuntime}*
*Timestamp: \`${new Date().toISOString().slice(0, 10)}\`*

| Metric        | Value          |
|---------------|----------------|
| Startup Time  | ${startupTime.toFixed(2)} ms |
`;

fs.writeFileSync(`results/startup-${currentRuntime}.md`, md);
console.log(`Startup time summary saved to startup-${currentRuntime}.md`);
