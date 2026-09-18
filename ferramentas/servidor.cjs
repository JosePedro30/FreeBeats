/* Servidor LOCAL opcional. Em produção publicam-se apenas os ficheiros de site/.
   Usa apenas módulos incluídos no Node.js: não é necessário npm install. */
const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const pastaSite = path.resolve(__dirname, "../site");
const porta = Number(process.argv[2] || process.env.PORT || 8080);
const tipos = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".txt": "text/plain; charset=utf-8",
};

const servidor = http.createServer((pedido, resposta) => {
  let caminho;
  try {
    caminho = decodeURIComponent(new URL(pedido.url, "http://localhost").pathname);
  } catch {
    resposta.writeHead(400);
    return resposta.end("Endereço inválido.");
  }
  if (caminho.includes("\0")) {
    resposta.writeHead(400);
    return resposta.end("Endereço inválido.");
  }

  if (caminho.endsWith("/")) caminho += "index.html";
  const ficheiro = path.resolve(pastaSite, "." + caminho);
  if (!ficheiro.startsWith(pastaSite + path.sep)) {
    resposta.writeHead(403);
    return resposta.end("Acesso não permitido.");
  }
  fs.readFile(ficheiro, (erro, conteudo) => {
    if (erro) {
      resposta.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
      return resposta.end(fs.readFileSync(path.join(pastaSite, "404.html")));
    }
    resposta.writeHead(200, {
      "Content-Type": tipos[path.extname(ficheiro)] || "application/octet-stream",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    });
    resposta.end(conteudo);
  });
});
servidor.on("error", (erro) => {
  console.error(
    erro.code === "EADDRINUSE"
      ? `A porta ${porta} já está ocupada. Feche o outro servidor ou use npm run dev -- 8081.`
      : erro.message,
  );
  process.exitCode = 1;
});
servidor.listen(porta, "127.0.0.1", () => {
  console.log(`\nFreeBeats disponível em http://localhost:${porta}\n`);
  console.log(
    "Edite os ficheiros em site/ e atualize a página no browser. Ctrl+C termina o servidor.",
  );
});
