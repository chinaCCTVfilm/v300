import { Hono } from 'hono';
import { cache } from 'hono/cache';

const app = new Hono();

app.use('/api/*', cache({
  cacheName: 'v300-tmdb-cache',
  cacheControl: 'public, max-age=3600, s-maxage=86400',
}));

// 热门电影
app.get('/api/popular', async (c) => {
  try {
    const cacheKey = c.req.url;
    let response = await caches.default.match(cacheKey);

    if (!response) {
      const apiKey = c.env.TMDB_API_KEY;
      if (!apiKey) {
        return c.json({ error: 'TMDB_API_KEY not configured' }, 500);
      }

      const url = `${c.env.TMDB_BASE_URL}/movie/popular?api_key=${apiKey}&language=zh-CN&page=1`;
      const tmdbRes = await fetch(url);

      if (!tmdbRes.ok) {
        return c.json({ error: `TMDB API error: ${tmdbRes.status}` }, 502);
      }

      const data = await tmdbRes.json();
      response = c.json(data);
      response.headers.set('Cache-Control', 'public, max-age=3600');
      await caches.default.put(cacheKey, response.clone());
    }

    return response;
  } catch (err) {
    console.error(err);
    return c.json({ error: 'Internal Server Error' }, 500);
  }
});

export default app;