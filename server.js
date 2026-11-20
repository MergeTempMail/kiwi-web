const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const ROOT = path.resolve(__dirname);

const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.apk': 'application/vnd.android.package-archive',
    '.xml': 'application/xml',
    '.txt': 'text/plain; charset=utf-8'
};

const server = http.createServer((req, res) => {
    let safeUrl = decodeURI(req.url.split('?')[0]);
    if (safeUrl === '/') safeUrl = '/index.html';

    const filePath = path.join(ROOT, safeUrl);

    // Prevent directory traversal
    if (!filePath.startsWith(ROOT)) {
        res.writeHead(403);
        res.end('Forbidden');
        return;
    }

    const serveFile = (targetPath, stats) => {
        const ext = path.extname(targetPath).toLowerCase();
        const contentType = MIME_TYPES[ext] || 'application/octet-stream';

        res.writeHead(200, {
            'Content-Type': contentType,
            'Content-Length': stats.size,
            'Access-Control-Allow-Origin': '*'
        });

        const readStream = fs.createReadStream(targetPath);
        readStream.pipe(res);
    };

    fs.stat(filePath, (err, stats) => {
        if (!err && stats.isFile()) {
            return serveFile(filePath, stats);
        }

        // Case-insensitive fallback for cross-platform deployments
        const dir = path.dirname(filePath);
        const base = path.basename(filePath).toLowerCase();

        fs.readdir(dir, (dirErr, files) => {
            if (dirErr) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('404 Not Found');
                return;
            }

            const matched = files.find(f => f.toLowerCase() === base);
            if (!matched) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('404 Not Found');
                return;
            }

            const matchedPath = path.join(dir, matched);
            fs.stat(matchedPath, (mErr, mStats) => {
                if (mErr || !mStats.isFile()) {
                    res.writeHead(404, { 'Content-Type': 'text/plain' });
                    res.end('404 Not Found');
                    return;
                }
                serveFile(matchedPath, mStats);
            });
        });
    });
});

server.listen(PORT, () => {
    console.log(`🚀 KiwiPlay Server is running at http://localhost:${PORT}`);
});
