const { Worker } = require('worker_threads');
const http = require('http');
const worker = new Worker("./worker.js");
const url = require('url');

const server = http.createServer((req, res) => {

    let { pathname: path } = url.parse(req.url, true)

    if (path == '/worker') {
        worker.on("message", (data) => {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(`Calculation result: ${data}`);
        });
        
        worker.on("error", (msg) => {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end(`An error occured: ${msg}`);
        });
    } else {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Not found');
    }
})

server.listen(PORT = 6000, () => {
    console.log(`Server running on http://127.0.0.1:${PORT}/`);
});