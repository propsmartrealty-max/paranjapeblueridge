const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3005;
const HOST = '0.0.0.0';
const STATIC_DIR = path.join(__dirname, '..', 'dist', 'client');
const FALLBACK_DIR = path.join(__dirname, '..', 'dist');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
};

const server = http.createServer((req, res) => {
  let reqPath = decodeURIComponent(new URL(req.url, `http://${req.headers.host}`).pathname);
  if (reqPath === '/') reqPath = '/index.html';

  let filePath = path.join(STATIC_DIR, reqPath);
  
  // Check if directory, try index.html inside it
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }

  // Fallback to FALLBACK_DIR
  if (!fs.existsSync(filePath)) {
    let altPath = path.join(FALLBACK_DIR, reqPath);
    if (fs.existsSync(altPath) && fs.statSync(altPath).isDirectory()) {
      altPath = path.join(altPath, 'index.html');
    }
    if (fs.existsSync(altPath) && fs.statSync(altPath).isFile()) {
      filePath = altPath;
    }
  }

  // If path doesn't have an extension, try .html
  if (!fs.existsSync(filePath) && !path.extname(filePath)) {
    if (fs.existsSync(filePath + '.html')) {
      filePath = filePath + '.html';
    } else if (fs.existsSync(path.join(filePath, 'index.html'))) {
      filePath = path.join(filePath, 'index.html');
    }
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    
    // Explicitly NO HSTS and NO upgrade-insecure-requests
    res.writeHead(200, {
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    });
    fs.createReadStream(filePath).pipe(res);
  } else {
    // 404 handler
    const notFoundPath = path.join(STATIC_DIR, '404.html');
    if (fs.existsSync(notFoundPath)) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      fs.createReadStream(notFoundPath).pipe(res);
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
    }
  }
});

server.listen(PORT, HOST, () => {
  console.log(`🚀 Blue Ridge local server live at:`);
  console.log(`   http://localhost:${PORT}`);
  console.log(`   http://127.0.0.1:${PORT}`);
});
