// Testing parsing and stringifying large JSON objects

import fs from "node:fs";
import currentRuntime from "../helpers/detect.js";
import { performance } from "node:perf_hooks";

const largeObject = {
  users: Array.from({ length: 1000 }, (_, i) => ({
    id: i,
    name: `User ${i}`,
    email: `user${i}@example.com`,
    age: 20 + (i % 50),
    active: i % 2 === 0,
    tags: ["tag1", "tag2", "tag3"],
    metadata: {
      created: Date.now(),
      updated: Date.now(),
      score: Math.random() * 100,
    },
  })),
};

const iterations = 10000;

console.log(`Testing JSON performance on ${currentRuntime}...`);
const totalStartTime = performance.now();
const startStringifyTime = performance.now();
for (let i = 0; i < iterations; i++) {
  JSON.stringify(largeObject);
}
const endStringifyTime = performance.now();

const jsonString = JSON.stringify(largeObject);

const parseStartTime = performance.now();
for (let i = 0; i < iterations; i++) {
  JSON.parse(jsonString);
}
const parseEndTime = performance.now();

const totalEndTime = performance.now();

const totalTimeTaken = totalEndTime - totalStartTime;
const stringifyTime = endStringifyTime - startStringifyTime;
const parseTime = parseEndTime - parseStartTime;

const md = `# JSON Stringify and Parse Test
*Runtime: ${currentRuntime}*
*Timestamp: \`${new Date().toISOString().slice(0, 10)}\`*

| Metric                 | Value (ms)          |
|------------------------|---------------------|
| Total Time Taken       | ${totalTimeTaken.toFixed(2)}  |
| Stringify Time         | ${stringifyTime.toFixed(2)}   |
| Parse Time             | ${parseTime.toFixed(2)}       |
`;

fs.writeFileSync(`results/json-${currentRuntime}.md`, md);
console.log(`JSON performance summary saved to json-${currentRuntime}.md`);
