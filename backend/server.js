const http = require('http');
const { parse } = require('url');

let conceptos = [];

// Helper para enviar JSON
function sendJSON(res, status, data) {
  const payload = JSON.stringify(data);
  res.writeHead(status, {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(payload),
  });
  res.end(payload);
}

const server = http.createServer((req, res) => {
  const { pathname } = parse(req.url, true);
  const partes = pathname.split('/').filter(Boolean);

  // GET /conceptos y GET /conceptos/:id
  if (req.method === 'GET' && partes[0] === 'conceptos') {
    if (partes.length === 1) {
      return sendJSON(res, 200, conceptos);
    }
    const id = Number(partes[1]);
    const item = conceptos[id];
    if (!item) return sendJSON(res, 404, { error: 'No existe ese concepto' });
    return sendJSON(res, 200, item);
  }

  // POST /conceptos
  if (req.method === 'POST' && pathname === '/conceptos') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const obj = JSON.parse(body);
        conceptos.push(obj);
        return sendJSON(res, 201, obj);
      } catch {
        return sendJSON(res, 400, { error: 'JSON inválido' });
      }
    });
    return;
  }

  // DELETE /conceptos y DELETE /conceptos/:id
  if (req.method === 'DELETE' && partes[0] === 'conceptos') {
    if (partes.length === 1) {
      conceptos = [];
      res.writeHead(204);
      return res.end();
    }
    const id = Number(partes[1]);
    if (conceptos[id]) {
      conceptos.splice(id, 1);
      res.writeHead(204);
      return res.end();
    }
    return sendJSON(res, 404, { error: 'No existe ese concepto' });
  }

  // Ruta no encontrada
  sendJSON(res, 404, { error: 'Ruta no implementada' });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});