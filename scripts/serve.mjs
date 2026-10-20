#!/usr/bin/env node
import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { dirname, extname, join, normalize, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const port = Number(process.env.PORT || 4321);

const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
};

if (!existsSync(root)) {
  console.error('No dist/ directory. Run "npm run build" first.');
  process.exit(1);
}

createServer((request, response) => {
  const url = new URL(request.url || '/', 'http://localhost');
  let pathname = decodeURIComponent(url.pathname);
  let file = resolve(join(root, pathname));

  if (!file.startsWith(root + '/') && file !== root) {
    response.writeHead(403).end('Forbidden');
    return;
  }

  if (existsSync(file) && statSync(file).isDirectory()) file = join(file, 'index.html');
  if (!existsSync(file)) {
    const fallback = join(root, '404.html');
    if (existsSync(fallback)) {
      response.writeHead(404, { 'content-type': types['.html'] });
      createReadStream(fallback).pipe(response);
      return;
    }
    response.writeHead(404).end('Not found');
    return;
  }

  response.writeHead(200, {
    'content-type': types[extname(file)] || 'application/octet-stream',
    'cache-control': 'no-cache',
  });
  if (request.method === 'HEAD') {
    response.end();
    return;
  }
  createReadStream(file).pipe(response);
}).listen(port, () => {
  console.log('CHY3 site: http://localhost:' + port);
});
