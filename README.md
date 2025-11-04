# JavaScript Runtime Benchmarks

_**Note:** All results were obtained using a M2 Macbook Air, with macOS version 26.0.1 Tahoe.
These tests are not meant to be perfect, more just a comparison to see roughly where these runtimes will land on the spectrum.
It is recommended to do your own testing and compare results elsewhere.
Lastly, I will mention that these results are not entirely fair towards Deno, since I did not implement all of these tests with Denos native APIs in mind (see native chart and tests/http-test-deno file to see the difference)._

## Runtime testing at the end of 2025 (03.11.2025)

Link to results folder: [results](./results)

**Node.js version: 24.10.0**

**Deno version: 2.5.6**

**Bun version: 1.3.1**

### HTTP Request Benchmark

![HTTP Request Benchmark](https://github.com/Ducky07/js-runtime-snapshot/raw/main/results/pictures/Request-Per-Second.png "HTTP Request Benchmark Results")

### HTTP Request Benchmark with Deno Native APIs

![HTTP Request Benchmark with Deno Native APIs](https://github.com/Ducky07/js-runtime-snapshot/raw/main/results/pictures/Request-Per-Second-Native.png "HTTP Request Benchmark Results, Deno running with native APIs")

### Read and Write File Benchmark

![Read and Write File Benchmark](https://github.com/Ducky07/js-runtime-snapshot/raw/main/results/pictures/Read-Write.png "Read and Write File Benchmark Results")

### JSON Stringify and Parse Benchmark

![JSON Stringify and Parse Benchmark](https://github.com/Ducky07/js-runtime-snapshot/raw/main/results/pictures/JSON-Stringify-Parse.png "JSON Stringify and Parse Benchmark Results")

### CPU Operations Benchmark

![CPU Operations Benchmark](https://github.com/Ducky07/js-runtime-snapshot/blob/main/results/pictures/CPU-Operations.png?raw=true "CPU Operations Benchmark Results")
