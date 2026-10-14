// Zero-dependency local dev server for Deporrtex (CommonJS)
// Serves static files and proxies NOEST API endpoints
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const NOEST_TOKEN = process.env.NOEST_TOKEN || "JlLZKsPRF6eClTd4v2NaDfS60JZLbgxtWfd";

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf'
};

let cache = { fees: null, desks: null, time: 0 };
const communeCache = {};

const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    return res.end();
  }

  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = decodeURIComponent(parsedUrl.pathname);

  // 1. API route: NOEST Data
  if (pathname === '/api/boostili/noest/data' || pathname === '/api/noest/data') {
    const now = Date.now();
    if (cache.fees && cache.desks && now - cache.time < 3600000) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ ok: true, fees: cache.fees, desks: cache.desks, cached: true }));
    }

    try {
      const [feesRes, desksRes] = await Promise.all([
        fetch("https://app.noest-dz.com/api/public/fees", {
          headers: { "Authorization": `Bearer ${NOEST_TOKEN}` }
        }),
        fetch("https://app.noest-dz.com/api/public/desks", {
          headers: { "Authorization": `Bearer ${NOEST_TOKEN}` }
        })
      ]);

      const [fees, desks] = await Promise.all([feesRes.json(), desksRes.json()]);
      cache = { fees, desks, time: now };
      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ ok: true, fees, desks }));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ ok: false, error: err.message }));
    }
  }

  // 2. API route: NOEST Communes
  if (pathname === '/api/boostili/noest/communes' || pathname === '/api/noest/communes') {
    const wilayaId = parsedUrl.searchParams.get('wilaya') || '16';
    if (communeCache[wilayaId]) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ ok: true, communes: communeCache[wilayaId], cached: true }));
    }

    try {
      const response = await fetch(`https://app.noest-dz.com/api/public/get/communes/${wilayaId}`, {
        headers: { "Authorization": `Bearer ${NOEST_TOKEN}` }
      });
      const communes = await response.json();
      communeCache[wilayaId] = communes;
      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ ok: true, communes }));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ ok: false, error: err.message }));
    }
  }

  // 3. API route: Order Submission
  if (pathname === '/api/boostili/order' || pathname === '/api/order') {
    let bodyData = '';
    req.on('data', chunk => { bodyData += chunk; });
    req.on('end', () => {
      try {
        const orderNum = 'DPX-' + Math.floor(100000 + Math.random() * 900000);
        const trackingNum = 'ECS' + Math.floor(10000000 + Math.random() * 90000000);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          ok: true,
          orderNumber: orderNum,
          tracking: trackingNum,
          message: 'Order received successfully in dev mode'
        }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: false, error: err.message }));
      }
    });
    return;
  }

  // 4. API route: CAPI event
  if (pathname === '/api/boostili/capi-event' || pathname === '/api/capi-event') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ ok: true }));
  }

  // 5. Static File Server
  let filePath = pathname === '/' ? path.join(__dirname, 'index.html') : path.join(__dirname, pathname);

  if (!filePath.startsWith(__dirname)) {
    res.writeHead(403);
    return res.end('Access denied');
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      const fallbackPath = path.join(__dirname, 'index.html');
      fs.readFile(fallbackPath, (fallbackErr, data) => {
        if (fallbackErr) {
          res.writeHead(404);
          return res.end('File not found');
        }
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(data);
      });
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (readErr, data) => {
      if (readErr) {
        res.writeHead(500);
        return res.end('Error reading file');
      }
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    });
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Deporrtex local server running on port ${PORT}`);
});
