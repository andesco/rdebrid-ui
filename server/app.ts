import { Hono } from "hono";
import { cors } from "hono/cors";
import { env } from "hono/adapter";
import { logger } from "hono/logger";

import IndexRouter from "./routes";

interface Env {
  USERNAME?: string;
  PASSWORD?: string;
  DEBRID_TOKEN: string;
  __STATIC_CONTENT: KVNamespace;
}

const app = new Hono<{ Bindings: Env }>({ strict: false }).basePath("/");

app.use(logger());
app.use(
  "/api/*",
  cors({
    origin: "*",
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["*"],
    maxAge: 86400,
  }),
);

app.use("/api/*", (c, next) => {
  c.env = env(c);
  return next();
});

app.route("/api", IndexRouter);

// Serve static files
app.get("*", async (c) => {
  try {
    const kvKeys = await c.env.__STATIC_CONTENT.list({ limit: 50 });
    
    if (c.req.path === "/debug") {
      return c.json({
        path: c.req.path,
        kvKeys: kvKeys.keys.map(k => k.name),
        totalKvKeys: kvKeys.keys.length,
        authMode: c.env.USERNAME && c.env.PASSWORD ? "basic-auth-enabled" : "no-auth-required",
        hasUsername: !!c.env.USERNAME,
        hasPassword: !!c.env.PASSWORD,
        hasDebridToken: !!c.env.DEBRID_TOKEN
      });
    }
    
    // Try to get index.html directly by its hashed name
    const indexAsset = await c.env.__STATIC_CONTENT.get("index.fd1221fc4e.html", "arrayBuffer");
    
    if (c.req.path === "/" && indexAsset) {
      return new Response(indexAsset, {
        headers: { "Content-Type": "text/html" }
      });
    }
    
    // Handle other asset paths by looking through KV keys
    if (c.req.path.startsWith("/assets/") || c.req.path.startsWith("/fonts/") || c.req.path === "/favicon.ico") {
      // Find the hashed version of the requested file
      const requestedFile = c.req.path.substring(1); // remove leading slash
      const matchingKey = kvKeys.keys.find(key => {
        const keyName = key.name;
        // Match the original filename pattern
        if (requestedFile.includes("index-B-8WjzM4.js")) return keyName.includes("index-B-8WjzM4");
        if (requestedFile.includes("index-DAIJuZOP.js")) return keyName.includes("index-DAIJuZOP");
        if (requestedFile.includes("index-Sbz81UDz.css")) return keyName.includes("index-Sbz81UDz");
        if (requestedFile.includes("watch._-DE511lZx.css")) return keyName.includes("watch._-DE511lZx");
        if (requestedFile.includes("watch._.lazy-mpnTaOqP.js")) return keyName.includes("watch._.lazy-mpnTaOqP");
        if (requestedFile === "favicon.ico") return keyName.includes("favicon");
        if (requestedFile.includes("rubik.woff2")) return keyName.includes("rubik");
        return false;
      });
      
      if (matchingKey) {
        const asset = await c.env.__STATIC_CONTENT.get(matchingKey.name, "arrayBuffer");
        if (asset) {
          let contentType = "text/plain";
          if (c.req.path.endsWith(".css")) contentType = "text/css";
          else if (c.req.path.endsWith(".js")) contentType = "application/javascript";
          else if (c.req.path.endsWith(".ico")) contentType = "image/x-icon";
          else if (c.req.path.endsWith(".woff2")) contentType = "font/woff2";
          
          const headers = new Headers({ "Content-Type": contentType });
          if (c.req.path.startsWith("/assets/") || c.req.path.startsWith("/fonts/")) {
            headers.set("Cache-Control", "public, max-age=31536000");
          }
          
          return new Response(asset, { headers });
        }
      }
    }
    
    // SPA fallback - serve index.html for all other non-API routes
    if (!c.req.path.startsWith("/api") && indexAsset) {
      return new Response(indexAsset, {
        headers: { "Content-Type": "text/html" }
      });
    }
    
    return c.text("Not Found", 404);
  } catch (error) {
    console.error("Static file serving error:", error);
    return c.text("Static file error: " + error.message, 500);
  }
});

export default app;
