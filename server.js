const http = require('http');
const fs = require('fs');
const path = require('path');
const WebSocket = require('ws');

const PORT = 3000;

// Create HTTP server
const server = http.createServer((req, res) => {
    let filePath = '.' + req.url;
    if (filePath === './') filePath = './index.html';

    const extname = path.extname(filePath);
    const contentType = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'text/javascript',
        '.svg': 'image/svg+xml'
    }[extname] || 'text/plain';

    fs.readFile(filePath, (error, content) => {
        if (error) {
            res.writeHead(404);
            res.end('File not found');
            return;
        }

        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content, 'utf-8');
    });
});

// Create WebSocket server
const wss = new WebSocket.Server({ server });

// Watch for file changes
fs.watch('.', { recursive: true }, (eventType, filename) => {
    if (filename) {
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send('reload');
            }
        });
    }
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
}); 