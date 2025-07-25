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

// Serve static files using KV
app.get("*", async (c) => {
  try {
    if (c.req.path === "/debug") {
      const kvKeys = c.env.__STATIC_CONTENT ? await c.env.__STATIC_CONTENT.list({ limit: 20 }) : null;
      return c.json({
        path: c.req.path,
        authMode: c.env.USERNAME && c.env.PASSWORD ? "basic-auth-enabled" : "no-auth-required",
        hasUsername: !!c.env.USERNAME,
        hasPassword: !!c.env.PASSWORD,
        hasDebridToken: !!c.env.DEBRID_TOKEN,
        hasKV: !!c.env.__STATIC_CONTENT,
        kvKeys: kvKeys ? kvKeys.keys.map(k => k.name) : []
      });
    }
    
    // Fallback to KV-based static file serving
    if (!c.env.__STATIC_CONTENT) {
      return c.text("Static content not available", 500);
    }
    
    // Get all KV keys to find the hashed version of requested file
    const kvKeys = await c.env.__STATIC_CONTENT.list({ limit: 50 });
    
    let path = c.req.path;
    
    // Handle root path
    if (path === "/") {
      path = "/index.html";
    }
    
    // Remove leading slash for key matching
    const requestedFile = path.substring(1);
    
    // Find the hashed version of the requested file
    let matchingKey = null;
    
    // Direct match first
    matchingKey = kvKeys.keys.find(key => key.name === requestedFile);
    
    // If no direct match, try to find by pattern (for hashed files)
    if (!matchingKey) {
      if (requestedFile === "index.html") {
        matchingKey = kvKeys.keys.find(key => key.name.startsWith("index.") && key.name.endsWith(".html"));
      } else if (requestedFile === "favicon.ico") {
        matchingKey = kvKeys.keys.find(key => key.name.startsWith("favicon.") && key.name.endsWith(".ico"));
      } else if (requestedFile.startsWith("assets/")) {
        const fileName = requestedFile.split("/").pop();
        const baseName = fileName?.split(".")[0];
        const extension = fileName?.split(".").pop();
        if (baseName && extension) {
          matchingKey = kvKeys.keys.find(key => 
            key.name.startsWith(`assets/${baseName}.`) && key.name.endsWith(`.${extension}`)
          );
        }
      } else if (requestedFile.startsWith("fonts/")) {
        const fileName = requestedFile.split("/").pop();
        const baseName = fileName?.split(".")[0];
        const extension = fileName?.split(".").pop();
        if (baseName && extension) {
          matchingKey = kvKeys.keys.find(key => 
            key.name.startsWith(`fonts/${baseName}.`) && key.name.endsWith(`.${extension}`)
          );
        }
      }
    }
    
    if (matchingKey) {
      const file = await c.env.__STATIC_CONTENT.get(matchingKey.name, { type: "arrayBuffer" });
      
      if (file) {
        // Determine content type
        let contentType = "text/plain";
        if (path.endsWith(".html")) contentType = "text/html";
        else if (path.endsWith(".css")) contentType = "text/css";
        else if (path.endsWith(".js")) contentType = "application/javascript";
        else if (path.endsWith(".json")) contentType = "application/json";
        else if (path.endsWith(".ico")) contentType = "image/x-icon";
        else if (path.endsWith(".woff2")) contentType = "font/woff2";
        else if (path.endsWith(".svg")) contentType = "image/svg+xml";
        else if (path.endsWith(".png")) contentType = "image/png";
        else if (path.endsWith(".jpg") || path.endsWith(".jpeg")) contentType = "image/jpeg";
        
        const headers = new Headers({ "Content-Type": contentType });
        
        // Add caching headers for assets
        if (path.startsWith("/assets/") || path.startsWith("/fonts/")) {
          headers.set("Cache-Control", "public, max-age=31536000");
        }
        
        return new Response(file, { headers });
      }
    }
    
    // SPA fallback - serve index.html for non-API routes
    if (!path.startsWith("/api")) {
      const indexKey = kvKeys.keys.find(key => key.name.startsWith("index.") && key.name.endsWith(".html"));
      if (indexKey) {
        const indexFile = await c.env.__STATIC_CONTENT.get(indexKey.name, { type: "arrayBuffer" });
        if (indexFile) {
          return new Response(indexFile, {
            headers: { "Content-Type": "text/html" }
          });
        }
      }
    }
    
    return c.text("Not Found", 404);
  } catch (error) {
    console.error("Static file serving error:", error);
    return c.text("Static file error: " + (error instanceof Error ? error.message : String(error)), 500);
  }
});

export default app;
