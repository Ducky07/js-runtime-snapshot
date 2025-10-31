// Simple HTTP server that responds with a JSON message
// Run this server and use autocannon on http://localhost:3000

import { createServer } from "node:http";

const server = createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Hello World", timestamp: Date.now() }));
});
server.listen(3000, () => console.log("Server running on port 3000"));
