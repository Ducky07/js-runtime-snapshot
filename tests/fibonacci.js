// Tests CPU-bound operations

function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

function sortBenchmark() {
  const array = Array.from({ length: 10000 }, () => Math.random());
  return array.sort((a, b) => a - b);
}

console.time("Fibonacci(35)");
const result = fibonacci(35);
console.timeEnd("Fibonacci(35)");
console.log("Result:", result);

console.time("Array Sort (10k elements)");
for (let i = 0; i < 100; i++) {
  sortBenchmark();
}
console.timeEnd("Array Sort (10k elements)");
