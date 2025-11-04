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

### HTTP Request Benchmark (higher value is better)

![HTTP Request Benchmark](https://github.com/Ducky07/js-runtime-snapshot/raw/main/results/pictures/Request-Per-Second.png "HTTP Request Benchmark Results")
In general throughout multiple test runs, Bun performed the best in this benchmark, followed closely by Node.js.
Deno lagged behind both runtimes, likely due to not using its native APIs for handling HTTP requests. Having to do conversions which adds overhead.

### HTTP Request Benchmark with Deno Native APIs (higher value is better)

![HTTP Request Benchmark with Deno Native APIs](https://github.com/Ducky07/js-runtime-snapshot/raw/main/results/pictures/Request-Per-Second-Native.png "HTTP Request Benchmark Results, Deno running with native APIs")
In this chart I just used Denos native API instead of Node.js's implementation. In this example Deno was able to perform on par with Node.js. Hence, why I mentioned earlier that the previous test was not entirely fair towards Deno. I believe Deno could perform better if each test were implemented with its native APIs in mind.

### Read and Write File Benchmark (lower value is better)

Reading and writing 1000 files, each with 1KB of data.

![Read and Write File Benchmark](https://github.com/Ducky07/js-runtime-snapshot/raw/main/results/pictures/Read-Write.png "Read and Write File Benchmark Results")
Bun performed the best in this benchmark, followed by Node.js, and Deno coming in last. Assuming once again that Deno could perform better if the tests were implemented with its native APIs in mind.

### JSON Stringify and Parse Benchmark (lower value is better)

1000 generic userdata object, 10000 iterations both stringify and parse.

![JSON Stringify and Parse Benchmark](https://github.com/Ducky07/js-runtime-snapshot/raw/main/results/pictures/JSON-Stringify-Parse.png "JSON Stringify and Parse Benchmark Results")
Here we can clearly observe speed benefits to both Deno and Bun when compared to Node.js.

### CPU Operations Benchmark (lower value is better)

Reading and calculating Fibonacci of 35 over 10000 iterations, and sorting an array of 10000 random numbers, 100 times.

![CPU Operations Benchmark](https://github.com/Ducky07/js-runtime-snapshot/raw/main/results/pictures/CPU-Operations.png "CPU Operations Benchmark Results")
Here Bun outperforms both Node.js and Deno by a significant margin.
Although both Deno and Node.js perform similarly in this benchmark, with Deno being slightly slower. Once again, I believe Deno could perform better if the tests were implemented with its native APIs in mind.

In conclusion, Bun seems to be the fastest runtime in these benchmarks.
That being said, I recommend doing your own testing as results may vary depending on the use case and implementation, like seen with Deno in the HTTP benchmark section.
