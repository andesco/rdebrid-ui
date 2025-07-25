# rdebrid-worker

rdebrid is a Cloudflare Worker that servers a modern interface for Real Debrid.

## Features

- clean and modern interface for Real Debrid using HeroUI
- fast and responsive web app
- basic library managment
- search torrent using `BT4G` API
- convert torrent files to magnet links using `Tor2Magnet`
- mobile UI


## Getting Started

### Deploy to Cloudflare Workers

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/andesco/rdebrid-worker)

1. [Deploy to Cloudflare](https://deploy.workers.cloudflare.com/?url=https://github.com/andesco/rdebrid-worker)
2. select: Create and deploy, Continue to project…
3. Workers & Pages › rdebrid-worker › Settings › Variables and Secrets › Add: \
`DEBRID_TOKEN`: your Real Debrid [API Private Token](https://real-debrid.com/devices#:~:text=API%20token)\
`USERNAME` & `PASSWORD`: enable [basic authentication](https://en.wikipedia.org/wiki/Basic_access_authentication)
4. Optional: Add `rdebrid-worker` to [Cloudflare Access](https://one.dash.cloudflare.com/) as a self-hosted app

### Deploy using Command Line

1. Fork and clone this repository:\
```gh repo fork andesco/rdebrid-worker --clone```
2. Install dependencies: `npm install`
3. Configure `wrangler.toml` with your account ID and custom domain
4. Set environment variables using wrangler secrets:
   ```bash
   wrangler secret put DEBRID_TOKEN
   wrangler secret put USERNAME
   wrangler secret put PASSWORD
   ```
5. Deploy: `wrangler deploy`

## Environment Variables

The application requires the following environment variables:

| Variable                   | Description                                                |
|----------------------------|------------------------------------------------------------|
| `DEBRID_TOKEN`             | **required:** [API Private Token](https://real-debrid.com/devices#:~:text=API%20token)  |
| `USERNAME`                 | Basic auth username (optional, enables basic auth when set with PASSWORD) |
| `PASSWORD`                 | Basic auth password (optional, enables basic auth when set with USERNAME) |
| `FORWARD_IP`               | Override IP address forwarded to Real Debrid API (optional, falls back to CF-Connecting-IP header) |
| `PROXY_URL`                | Proxy URL for BT search requests (optional) |



> [!NOTE]
> When deploying on Cloudflare Workers, the IP will be automatically taken from `CF-Connecting-IP` header and forwarded to real-debrid.com api.

