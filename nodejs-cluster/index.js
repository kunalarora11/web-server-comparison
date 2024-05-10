const cluster = require('cluster');
const http = require('http');
const os = require('os');
const url = require('url');

const totalCPUs = os.cpus().length

console.log("Total CPUs: ", totalCPUs)

function calculation() {
    let result = 0;
    for (let i = 0; i < 100_000_000; i++) {
        result += Math.sin(i) * Math.cos(i);
    }
    return result;
}

if (cluster.isPrimary) {
    console.log(`Primary ${process.pid} is running`);

    // Fork workers
    for (let i = 0; i < totalCPUs; i++) {
        const worker = cluster.fork();
        console.log(`Worker ${worker.process.pid} is running`);
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`);

        const newWorker = cluster.fork();
        console.log(`Worker ${newWorker.process.pid} is running`);
    });
} else {
    const server = http.createServer((req, res) => {

        let { pathname: path } = url.parse(req.url, true)

        if (path == '/cluster') {
            const result = calculation()
    
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(`Calculation result: ${result}`);
        } else {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end('Not found');
        }
    })
    
    server.listen(PORT = 5000, () => {
        console.log(`Server running on http://127.0.0.1:${PORT}/`);
    });
}
