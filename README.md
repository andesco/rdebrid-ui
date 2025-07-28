# rdebrid-worker

rdebrid is a Cloudflare Worker that servers a modern interface for Real Debrid.

## Features

- clean and modern interface for Real Debrid using HeroUI
- fast and responsive web app
- basic library managment
- search torrent using `BT4G` API
- convert torrent files to magnet links using `Tor2Magnet`
- mobile UI


## Deploy to Cloudflare

### Automatically

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/andesco/rdebrid-worker)

1. [Deploy to Cloudflare](https://deploy.workers.cloudflare.com/?url=https://github.com/andesco/rdebrid-worker)
2. select: Create and deploy, Continue to project…
3. Workers & Pages › rdebrid-worker › Settings › Variables and Secrets › Add: \
`DEBRID_TOKEN`: your Real Debrid [API Private Token](https://real-debrid.com/apitoken)\
`USERNAME` & `PASSWORD`: enable [basic authentication](https://en.wikipedia.org/wiki/Basic_access_authentication)
4. Optional: Add `rdebrid-worker` to [Cloudflare Access](https://one.dash.cloudflare.com/) as a self-hosted app

### Command Line

1. Fork and clone this repository:\
```gh repo fork andesco/rdebrid-worker --clone```
2. Install dependencies: `npm install`
3. Set environment variables:
   ```bash
   wrangler secret put DEBRID_TOKEN
   wrangler secret put USERNAME
   wrangler secret put PASSWORD
   ```
4. Deploy: `npm run deploy`

> [!NOTE]
> Edit `wrangler.toml` and uncomment the `[[routes]]` section to add a custom domain, .

### Development

```bash
# terminal 1
npm run dev:watch # server and auto-update UI
```

```bash
# terminal 2
printf "API token: " && read -r token && echo "DEBRID_TOKEN=$token" > .dev.vars
npm run server # server local Worker
npm run deploy # build and deploy to production
```

## Environment Variables

The application requires the following environment variables:

| Variable                   | Description                                                |
|----------------------------|------------------------------------------------------------|
| `DEBRID_TOKEN`             | **required:** [API Private Token](https://real-debrid.com/apitoken)  |
| `USERNAME` & `PASSWORD`    | optional: enable [basic authentication](https://en.wikipedia.org/wiki/Basic_access_authentication) |
| `FORWARD_IP`               | override IP address forwarded to Real Debrid API (falls back to `CF-Connecting-IP` header) |
| `PROXY_URL`                | optional: proxy URL for search requests |

> [!NOTE]
> When deploying on Cloudflare Workers, the IP will be automatically taken from `CF-Connecting-IP` header and forwarded to real-debrid.com API.

