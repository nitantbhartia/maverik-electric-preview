const http = require("http");
const fs = require("fs");
const path = require("path");
const port = process.env.PORT || 8080;
const root = __dirname;
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".ico": "image/x-icon"
};
http.createServer((req, res) => {
  const url = new URL(req.url, "http://127.0.0.1");
  let p = path.join(root, decodeURIComponent(url.pathname));
  if (p.endsWith(path.sep)) p = path.join(p, "index.html");
  if (!p.startsWith(root)) { res.writeHead(403); return res.end(); }
  fs.readFile(p, (err, data) => {
    if (err) { res.writeHead(404); return res.end("Not found"); }
    res.writeHead(200, { "Content-Type": types[path.extname(p)] || "application/octet-stream" });
    res.end(data);
  });
}).listen(port, () => console.log("Maverik Electric static http://localhost:" + port));
