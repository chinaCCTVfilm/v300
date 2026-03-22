import { Hono } from 'hono';
import { cache } from 'hono/cache';

const app = new Hono();

const TMDB_KEY = 'YOUR_TMDB_KEY_HERE';   // Better to use env var from Cloudflare
const BASE_URL = 'https://api.themoviedb.org/3';

app.use('/api/*', cache({
  cacheName: 'v300-tmdb-cache',
  cacheControl: 'public, max-age=86400, s-maxage=604800',
}));

app.get('/api/popular', async (c) => {
  const cacheKey = c.req.url;
  let response = await caches.default.match(cacheKey);

  if (!response) {
    const url = `${BASE_URL}/movie/popular?api_key=${TMDB_KEY}&language=zh-CN&page=1`;
    const tmdbRes = await fetch(url);
    const data = await tmdbRes.json();

    response = c.json(data);
    response.headers.set('Cache-Control', 'public, max-age=86400');
    await caches.default.put(cacheKey, response.clone());
  }

  return response;
});

app.get('/api/movie/:id', async (c) => {
  const id = c.req.param('id');
  const cacheKey = c.req.url;

  let response = await caches.default.match(cacheKey);
  if (!response) {
    const url = `${BASE_URL}/movie/${id}?api_key=${TMDB_KEY}&language=zh-CN&append_to_response=credits,videos`;
    const tmdbRes = await fetch(url);
    const data = await tmdbRes.json();

    response = c.json(data);
    await caches.default.put(cacheKey, response.clone());
  }

  return response;
});

export default app;
