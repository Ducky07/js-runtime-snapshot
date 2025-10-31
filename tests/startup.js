// Measure the startup time of the JavaScript runtime environment
// Maybe there is a better way to do this?

console.time("Startup Time");
console.log("JavaScript runtime started");
console.timeEnd("Startup Time");
process.exit(0);
