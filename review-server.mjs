import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const port = Number(process.env.PORT || 8080);
const host = '0.0.0.0';

const mime = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf',
  '.mp3': 'audio/mpeg',
  '.m4a': 'audio/mp4',
  '.mp4': 'video/mp4',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8'
};

function safePath(urlPath) {
  const raw = decodeURIComponent((urlPath || '/').split('?')[0]);
  const requested = raw === '/' ? '/index.html' : raw;
  const normalized = path.normalize(requested).replace(/^([/\\])+/, '');
  const file = path.resolve(root, normalized);
  return file.startsWith(root) ? file : null;
}

const server = http.createServer((req, res) => {
  let file;
  try { file = safePath(req.url); }
  catch { res.writeHead(400); res.end('Bad request'); return; }
  if (!file) { res.writeHead(403); res.end('Forbidden'); return; }

  fs.stat(file, (err, stat) => {
    if (!err && stat.isDirectory()) file = path.join(file, 'index.html');
    fs.readFile(file, (readErr, data) => {
      if (readErr) {
        res.writeHead(readErr.code === 'ENOENT' ? 404 : 500, {'Content-Type':'text/plain; charset=utf-8'});
        res.end(readErr.code === 'ENOENT' ? '404 Not Found' : '500 Server Error');
        return;
      }
      res.writeHead(200, {
        'Content-Type': mime[path.extname(file).toLowerCase()] || 'application/octet-stream',
        'Cache-Control': 'no-store, no-cache, must-revalidate',
        'Access-Control-Allow-Origin': '*'
      });
      res.end(data);
    });
  });
});

server.listen(port, host, () => {
  const addresses = [];
  for (const entries of Object.values(os.networkInterfaces())) {
    for (const net of entries || []) {
      if (net.family === 'IPv4' && !net.internal) addresses.push(`http://${net.address}:${port}`);
    }
  }
  console.log('');
  console.log('========================================');
  console.log(' BHUMI WANAPRASTHA - LOCAL REVIEW');
  console.log('========================================');
  console.log(`Laptop : http://localhost:${port}`);
  if (addresses.length) {
    console.log('Ponsel :');
    for (const address of [...new Set(addresses)]) console.log(`  ${address}`);
  } else {
    console.log('Alamat ponsel tidak terdeteksi. Pastikan Wi-Fi aktif.');
  }
  console.log('');
  console.log('Laptop dan ponsel harus terhubung ke jaringan Wi-Fi yang sama.');
  console.log('Tekan Ctrl+C untuk menghentikan server.');
});
