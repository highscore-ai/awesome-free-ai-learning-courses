import http from "node:http";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

// Keep the standalone preview synchronized even when it is started directly.
await import("./generate.mjs");

const projectDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const port = Number(process.env.PORT ?? 4173);

const escapeHtml = (value) => value.replace(/[&<>"']/g, (character) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
}[character]));

const renderInline = (value) => escapeHtml(value)
  .replace(/&lt;p align=&quot;(left|center|right)&quot;&gt;&lt;img src=&quot;([^&]+)&quot; alt=&quot;([^&]+)&quot; width=&quot;(\d+)&quot;&gt;&lt;\/p&gt;/g, '<p style="text-align:$1"><img src="$2" alt="$3" style="width:min($4px,100%);height:auto"></p>')
  .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="provider-logo">')
  .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
  .replace(/`([^`]+)`/g, "<code>$1</code>")
  .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");

function renderMarkdown(markdown) {
  const output = [];
  let inTable = false;
  let inList = false;
  const closeBlocks = () => {
    if (inTable) output.push("</tbody></table>"), inTable = false;
    if (inList) output.push("</ul>"), inList = false;
  };
  const rows = markdown.split("\n");
  for (let index = 0; index < rows.length; index += 1) {
    const line = rows[index];
    if (/^<a id=/.test(line)) { output.push(line); continue; }
    if (/^#{1,3} /.test(line)) {
      closeBlocks();
      const level = line.match(/^#+/)[0].length;
      output.push(`<h${level}>${renderInline(line.slice(level + 1))}</h${level}>`);
    } else if (/^\|/.test(line)) {
      if (/^\|[-|]+\|$/.test(line.replace(/ /g, ""))) continue;
      if (inList) output.push("</ul>"), inList = false;
      const cells = line.slice(1, -1).split("|").map((cell) => cell.trim());
      if (!inTable) {
        output.push(`<table><thead><tr>${cells.map((cell) => `<th>${renderInline(cell)}</th>`).join("")}</tr></thead><tbody>`);
        inTable = true;
      } else output.push(`<tr>${cells.map((cell) => `<td>${renderInline(cell)}</td>`).join("")}</tr>`);
    } else if (/^\s*- /.test(line)) {
      if (inTable) output.push("</tbody></table>"), inTable = false;
      if (!inList) output.push("<ul>"), inList = true;
      output.push(`<li>${renderInline(line.replace(/^\s*- /, ""))}</li>`);
    } else if (line === "---") {
      closeBlocks(); output.push("<hr>");
    } else if (line.startsWith("> ")) {
      closeBlocks(); output.push(`<blockquote>${renderInline(line.slice(2))}</blockquote>`);
    } else if (line.trim()) {
      closeBlocks(); output.push(`<p>${renderInline(line)}</p>`);
    }
  }
  closeBlocks();
  return output.join("\n");
}

const server = http.createServer(async (request, response) => {
  const pathname = new URL(request.url, `http://${request.headers.host}`).pathname;
  if (pathname === "/data/resources.json") {
    const data = await readFile(path.join(projectDir, "data/resources.json"));
    response.writeHead(200, {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    });
    response.end(data);
    return;
  }
  const assetMatch = pathname.match(/^\/assets\/(provider-logos\/)?([a-z0-9-]+\.(?:png|svg))$/);
  if (assetMatch) {
    const asset = await readFile(path.join(projectDir, "assets", assetMatch[1] ?? "", assetMatch[2])).catch(() => null);
    if (!asset) {
      response.writeHead(404).end("Not found");
      return;
    }
    const contentType = assetMatch[2].endsWith(".svg") ? "image/svg+xml" : "image/png";
    response.writeHead(200, { "content-type": contentType, "cache-control": "no-cache" });
    response.end(asset);
    return;
  }
  const markdown = await readFile(path.join(projectDir, "README.md"), "utf8");
  const body = renderMarkdown(markdown);
  response.writeHead(200, {
    "content-type": "text/html; charset=utf-8",
    "cache-control": "no-store",
  });
  response.end(`<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Awesome Free Highscore AI Learning Resources</title><style>body{font:16px/1.55 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:#1f2328;max-width:1100px;margin:40px auto;padding:0 24px}a{color:#0969da;text-decoration:none}a:hover{text-decoration:underline}h1,h2{border-bottom:1px solid #d0d7de;padding-bottom:.3em}h2{margin-top:2em}h3{margin-top:1.6em;display:flex;align-items:center;gap:8px}.provider-logo{width:28px;height:28px;object-fit:contain}table{border-collapse:collapse;width:100%;display:block;overflow:auto}th,td{border:1px solid #d0d7de;padding:6px 13px;text-align:left}tr:nth-child(2n){background:#f6f8fa}blockquote{border-left:4px solid #d0d7de;color:#59636e;margin-left:0;padding-left:1em}code{background:#eff1f3;border-radius:6px;padding:.2em .4em}</style></head><body>${body}</body></html>`);
});

server.listen(port, "127.0.0.1", () => console.log(`Preview: http://127.0.0.1:${port}`));
