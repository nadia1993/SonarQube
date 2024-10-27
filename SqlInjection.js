const http = require('http');
const url = require('url');
const crypto = require('crypto');

const users = {
    admin: {
        password: 'password123', // Hardcoded password
        role: 'admin'
    }
};

http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const username = parsedUrl.query.username;
    const password = parsedUrl.query.password;

    // Vulnerability 1: Insecure password comparison
    if (users[username] && users[username].password === password) {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(`Welcome, ${username}`);
    } else {
        res.writeHead(401, { 'Content-Type': 'text/plain' });
        res.end('Unauthorized');
    }

    // Vulnerability 2: Insufficient input validation and command injection
    const command = parsedUrl.query.command;
    require('child_process').exec(command, (error, stdout, stderr) => {
        if (error) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end(`Error: ${stderr}`);
            return;
        }
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(`Output: ${stdout}`);
    });

    // Vulnerability 3: Sensitive information exposure
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`Your session token: ${crypto.randomBytes(16).toString('hex')}`);
}).listen(8080);
