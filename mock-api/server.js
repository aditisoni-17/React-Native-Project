const http = require('http');
const { URL } = require('url');
const db = require('./db.json');

const PORT = process.env.API_PORT || 3001;

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  });
  res.end(JSON.stringify(payload));
}

function notFound(res) {
  sendJson(res, 404, { error: 'Not found' });
}

const server = http.createServer((req, res) => {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    });
    res.end();
    return;
  }

  const requestUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = requestUrl.pathname;

  if (req.method !== 'GET') {
    notFound(res);
    return;
  }

  if (pathname === '/restaurants') {
    const category = requestUrl.searchParams.get('category');
    const restaurants = category
      ? db.restaurants.filter((restaurant) => restaurant.category === category)
      : db.restaurants;
    sendJson(res, 200, restaurants);
    return;
  }

  if (pathname === '/categories') {
    sendJson(res, 200, db.categories);
    return;
  }

  const restaurantMatch = pathname.match(/^\/restaurants\/(\d+)$/);
  if (restaurantMatch) {
    const restaurant = db.restaurants.find((item) => item.id === Number(restaurantMatch[1]));
    if (!restaurant) {
      notFound(res);
      return;
    }
    sendJson(res, 200, restaurant);
    return;
  }

  notFound(res);
});

server.listen(PORT, () => {
  console.log(`Mock API running on http://localhost:${PORT}`);
});
