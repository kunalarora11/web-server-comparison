const http = require('http');
const url = require('url')

function calculation() {
    let result = 0;
    for (let i = 0; i < 100_000_000; i++) {
        result += Math.sin(i) * Math.cos(i);
    }
    return result;
}

const server = http.createServer((req, res) => {

    let  { pathname: path } = url.parse(req.url, true)
    
    if (path == '/calc') {
        const result = calculation()
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(`Calculation result: ${result}`);
    } else {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Not found');
    }
})

server.listen(PORT = 4000, () => {
    console.log(`Server running on http://127.0.0.1:${PORT}/`);
});