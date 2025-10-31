// Testing parsing and stringifying large JSON objects
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

console.time("JSON Stringify");
for (let i = 0; i < iterations; i++) {
  JSON.stringify(largeObject);
}
console.timeEnd("JSON Stringify");

const jsonString = JSON.stringify(largeObject);

console.time("JSON Parse");
for (let i = 0; i < iterations; i++) {
  JSON.parse(jsonString);
}
console.timeEnd("JSON Parse");
