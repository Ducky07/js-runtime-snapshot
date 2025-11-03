// Detect which runtime is running this script
function detectRuntime() {
  if (typeof Deno !== "undefined") return "Deno";
  if (typeof Bun !== "undefined") return "Bun";
  return "Node.js";
}

const currentRuntime = detectRuntime();

export default currentRuntime;
