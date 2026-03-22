# V300 Film Platform (Cloudflare Serverless)

TMDB-based movie/TV metadata site using Cloudflare Pages + Workers

## Next Steps
1. wrangler login
2. In Cloudflare Dashboard: Workers & Pages 鈫?Create Pages project 鈫?Connect GitHub repo chinaCCTVfilm/v300
   - Build: npm run build
   - Output: dist
3. Deploy Worker: cd workers && wrangler deploy
4. Add TMDB_API_KEY in Worker 鈫?Settings 鈫?Variables
5. Bind custom domain usa001.us.ci in Pages project settings
