const http = require("http");
const fs = require("fs");
const path = require("path");

let root = __dirname;
let types = {
".html": "text/html; charset=utf-8",
".js": "text/javascript; charset=utf-8",
".css": "text/css; charset=utf-8",
".json": "application/json; charset=utf-8",
".png": "image/png",
".jpg": "image/jpeg",
".jpeg": "image/jpeg",
".svg": "image/svg+xml",
".ico": "image/x-icon",
".woff2": "font/woff2",
};

let server = http.createServer((req, res) => {
let urlPath = decodeURIComponent(req.url.split("?")[0]);
if (urlPath === "/") {
urlPath = "/index.html";
} else if (urlPath === "/chat") {
urlPath = "/chat.html";
}
let target = path.resolve(root, "." + path.posix.normalize(urlPath));
if (target !== root && !target.startsWith(root + path.sep)) {
res.writeHead(403);
return res.end();
}
fs.readFile(target, (err, data) => {
if (err) {
res.writeHead(404);
return res.end("not found");
}
res.writeHead(200, { "Content-Type": types[path.extname(target)] || "application/octet-stream" });
res.end(data);
});
});

let port = process.env.PORT || 3000;
server.listen(port, () => {
console.log(`front end listening on port ${port}`);
});