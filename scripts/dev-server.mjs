import { createServer } from "node:http";
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { extname, join, normalize, resolve } from "node:path";

const rootArg = process.argv[2] ?? ".";
const root = resolve(process.cwd(), rootArg);
const port = Number(process.env.PORT ?? 5173);

const types = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg"
};

function resolvePath(url) {
  const requested = decodeURIComponent(new URL(url, `http://localhost:${port}`).pathname);
  const filePath = normalize(join(root, requested === "/" ? "index.html" : requested));
  if (!filePath.startsWith(root)) {
    return null;
  }
  return filePath;
}

const server = createServer(async (request, response) => {
  const filePath = resolvePath(request.url ?? "/");
  if (!filePath) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  try {
    const info = await stat(filePath);
    const targetPath = info.isDirectory() ? join(filePath, "index.html") : filePath;
    const targetInfo = await stat(targetPath);
    if (!targetInfo.isFile()) {
      throw new Error("Not a file");
    }
    response.writeHead(200, {
      "Content-Type": types[extname(targetPath)] ?? "application/octet-stream"
    });
    createReadStream(targetPath).pipe(response);
  } catch {
    response.writeHead(404);
    response.end("Not found");
  }
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Serving ${root} at http://127.0.0.1:${port}/`);
});
