# emBench

[![NPM](https://nodei.co/npm/em-bench.png)](https://nodei.co/npm/em-bench/)

[![npm downloads](https://img.shields.io/npm/dm/em-bench)](https://www.npmjs.com/package/em-bench)

<div align="center">

![Logo](/assets/logo/emBench.png)

</div>

## Overview

emBench is a Node.js package designed to provide benchmarking capabilities for Express.js applications. It offers a decorator function called `Benchmark` that can be applied to route handler methods to log the start time, end time, and duration of their execution.

### Installation

You can install emBench via npm, pnpm or yarn by running:

```bash
npm install em-bench
```

OR

```bash
pnpm add em-bench
```

OR

```bash
yarn add em-bench
```

### Usage

After installing emBench, you can import the `Benchmark` decorator function and apply it to your Express route handler methods.

### Example 1

``` typescript
import express, { Request, Response } from "express";
import { Benchmark } from "em-bench";

const app = express();
const PORT = 3000;

// Define route with benchmarking
app.get("/", Benchmark, (req: Request, res: Response) => {
    res.send("Welcome to the homepage!");
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
```

### Example 2

```typescript
import express, { Request, Response } from "express";
import { Benchmark } from "em-bench";

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

class MyController {
    @Benchmark
    async myRoute(req: Request, res: Response) {
        // Your route handling logic goes here
        const { name } = req.body;
        res.send(`Hello, ${name || "world"}!`);
    }
}

const myController = new MyController();

// Route with benchmarking
app.post("/api/myroute", myController.myRoute);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
```

### Benchmark Decorator

The `Benchmark` decorator logs the start time, end time, and duration of method execution. It takes the following parameters:

- `_target`: Ignored parameter, represents the constructor function of the class for instance methods.
- `_propertyKey`: Ignored parameter, represents the name of the decorated property.
- `descriptor`: Descriptor object representing the property being decorated.

### Example Log Output

```bash
[GET] /api/myroute - Start time: 1632549760s 352.101ms
[GET] /api/myroute - End time: 1632549760s 756.243ms
[GET] /api/myroute - Duration: 404.142ms
```

### Note

Make sure to apply the `Benchmark` decorator to your route handler methods within an Express application to utilize the benchmarking functionality provided by emBench.

### Contributing

Contributions are welcome! Please open an issue or fork on the GitHub repository.

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### Author

Developed by [Ethern Myth](https://github.com/Ethern-Myth).
