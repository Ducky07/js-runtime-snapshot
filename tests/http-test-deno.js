// Slightly different HTTP server test for Deno runtime. Code is otherwise the same.
// Run this server and use autocannon on http://localhost:3000

Deno.serve({ port: 3000 }, () => {
  return new Response(
    JSON.stringify({ message: "Hello World", timestamp: Date.now() }),
    {
      headers: { "Content-Type": "application/json" },
    },
  );
});
