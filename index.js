const tests = [
  "tests/startup.js",
  "tests/file-test.js",
  "tests/json-test.js",
  "tests/memory.js",
  "tests/fibonacci.js",
];

for (const test of tests) {
  console.log(`Running test: ${test}`);
  const start = Date.now();
  await import(`./${test}`);
  const end = Date.now();
  console.log(`Finished test: ${test} in ${(end - start).toFixed(2)} ms\n`);
}
