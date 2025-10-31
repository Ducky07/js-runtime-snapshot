// Monitors memory consumption

function formatBytes(bytes) {
  return (bytes / 1024 / 1024).toFixed(2) + " MB";
}

function getMemoryUsage() {
  const usage = process.memoryUsage();
  return {
    rss: formatBytes(usage.rss),
    heapTotal: formatBytes(usage.heapTotal),
    heapUsed: formatBytes(usage.heapUsed),
    external: formatBytes(usage.external),
  };
}

console.log("Initial Memory:", getMemoryUsage());

// Create memory load
const data = [];
for (let i = 0; i < 100000; i++) {
  data.push({
    id: i,
    value: Math.random(),
    text: `Item ${i}`.repeat(10),
  });
}

console.log("After Data Creation:", getMemoryUsage());

// Process data
const processed = data.map((item) => ({
  ...item,
  doubled: item.value * 2,
}));

console.log("After Processing:", getMemoryUsage());
