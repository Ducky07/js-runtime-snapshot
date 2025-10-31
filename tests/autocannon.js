import autocannon from "autocannon";

// async/await
async function cannon() {
  const result = await autocannon({
    url: "http://localhost:3000",
    connections: 10, //default
    pipelining: 1, // default
    duration: 10, // default
  });
  console.log(result);
}

// worker version
async function cannonWorker() {
  const result = await autocannon({
    url: "http://localhost:3000",
    connections: 10, //default
    pipelining: 1, // default
    duration: 10, // default
    workers: 2,
  });
  console.log(result);
}

cannon();
