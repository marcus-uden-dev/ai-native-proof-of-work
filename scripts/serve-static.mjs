import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const siteRoot = resolve(fileURLToPath(new URL('../site/', import.meta.url)));
const port = Number.parseInt(process.env.PORT ?? '4173', 10);
const projectSegment = 'ai-native-proof-of-work';
const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8',
  '.pdf': 'application/pdf',
  '.png': 'image/png',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8'
};

function resolveRequestPath(url) {
  const pathname = decodeURIComponent(new URL(url, 'http://localhost').pathname);
  const segments = pathname.split('/').filter(Boolean);
  if (segments[0] === projectSegment) segments.shift();
  const requested = normalize(segments.join('/'));
  let absolute = resolve(siteRoot, requested);
  if (!absolute.startsWith(siteRoot)) return null;
  if (existsSync(absolute) && statSync(absolute).isDirectory()) absolute = join(absolute, 'index.html');
  if (!existsSync(absolute) && !extname(absolute)) absolute = join(absolute, 'index.html');
  return absolute;
}

const server = createServer((request, response) => {
  const absolute = resolveRequestPath(request.url ?? '/');
  if (!absolute || !existsSync(absolute) || !statSync(absolute).isFile()) {
    response.writeHead(404, { 'Content-Type': contentTypes['.html'] });
    createReadStream(join(siteRoot, '404.html')).pipe(response);
    return;
  }
  response.writeHead(200, {
    'Cache-Control': 'no-store',
    'Content-Type': contentTypes[extname(absolute).toLowerCase()] ?? 'application/octet-stream'
  });
  createReadStream(absolute).pipe(response);
});

server.listen(port, '127.0.0.1', () => {
  console.log(`Static site available at http://127.0.0.1:${port}`);
});

