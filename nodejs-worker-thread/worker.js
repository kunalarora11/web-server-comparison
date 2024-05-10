const { parentPort } = require("worker_threads");

let result = 0;
for (let i = 0; i < 100_000_000; i++) {
    result += Math.sin(i) * Math.cos(i);
}

parentPort.postMessage(result);