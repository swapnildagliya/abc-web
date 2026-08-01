// Tiny static server for local preview: node scripts/serve.mjs [port]
import { createServer } from "node:http";
import { createReadStream, existsSync, statSync } from "node:fs";
import { join, normalize, extname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("../", import.meta.url));
const PORT = Number(process.argv[2] || process.env.PORT || 4173);

const TYPES = {
  ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8", ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json", ".xml": "application/xml", ".txt": "text/plain; charset=utf-8",
  ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".svg": "image/svg+xml",
  ".webp": "image/webp", ".mp4": "video/mp4", ".woff2": "font/woff2", ".ics": "text/calendar",
};

createServer((req, res) => {
  let path = decodeURIComponent(new URL(req.url, "http://x").pathname);
  let file = normalize(join(ROOT, path));
  if (!file.startsWith(ROOT)) { res.writeHead(403); res.end(); return; }
  if (existsSync(file) && statSync(file).isDirectory()) file = join(file, "index.html");
  if (!existsSync(file)) {
    const notFound = join(ROOT, "404.html");
    res.writeHead(404, { "content-type": "text/html; charset=utf-8" });
    if (existsSync(notFound)) createReadStream(notFound).pipe(res); else res.end("404");
    return;
  }
  const size = statSync(file).size;
  const type = TYPES[extname(file)] || "application/octet-stream";
  // range support so <video> seeks work
  const range = req.headers.range;
  if (range) {
    const [s, e] = range.replace("bytes=", "").split("-");
    const start = Number(s) || 0;
    const end = e ? Number(e) : size - 1;
    res.writeHead(206, {
      "content-type": type, "accept-ranges": "bytes",
      "content-range": `bytes ${start}-${end}/${size}`, "content-length": end - start + 1,
    });
    createReadStream(file, { start, end }).pipe(res);
    return;
  }
  // no-store: a cached stylesheet once made QA report a bug that was already
  // fixed. A dev/QA server must always answer with what is on disk.
  res.writeHead(200, { "content-type": type, "content-length": size, "accept-ranges": "bytes", "cache-control": "no-store" });
  createReadStream(file).pipe(res);
}).listen(PORT, () => console.log(`Fable 5 Motion Concept → http://localhost:${PORT}`));
