// Memory consumption

import fs from "node:fs";
import currentRuntime from "../helpers/detect.js";

function formatBytes(bytes) {
  return (bytes / 1024 / 1024).toFixed(2) + " MB";
}

function getMemoryUsage() {
  const usage = process.memoryUsage();
  return {
    rss: formatBytes(usage.rss),
    heapTotal: formatBytes(usage.heapTotal),
    heapUsed: formatBytes(usage.heapUsed),
  };
}

const initialMemory = getMemoryUsage();
console.log("Initial Memory:", initialMemory);

// Create memory load
const data = [];
for (let i = 0; i < 100000; i++) {
  data.push({
    id: i,
    value: Math.random(),
    text: `Item ${i}`.repeat(10),
  });
}
const loadMemory = getMemoryUsage();
console.log("After Data Creation:", loadMemory);

// Process data
const processed = data.map((item) => ({
  ...item,
  doubled: item.value * 2,
}));
const finalMemory = getMemoryUsage();
console.log("After Processing:", finalMemory);

// Create a markdown file with memory usage summary
const md = `# Memory Usage Test
*Runtime: ${currentRuntime}*
*Timestamp: \`${new Date().toISOString().slice(0, 10)}\`*

| Stage               | RSS       | Heap Total | Heap Used |
|---------------------|-----------|------------|-----------|
| Initial            | ${initialMemory.rss} | ${initialMemory.heapTotal} | ${initialMemory.heapUsed} |
| After Data Creation | ${loadMemory.rss} | ${loadMemory.heapTotal} | ${loadMemory.heapUsed} |
| After Processing    | ${finalMemory.rss} | ${finalMemory.heapTotal} | ${finalMemory.heapUsed} |
`;

fs.writeFileSync(`results/memory-${currentRuntime}.md`, md);
console.log(`Memory usage summary saved to memory-${currentRuntime}.md`);
