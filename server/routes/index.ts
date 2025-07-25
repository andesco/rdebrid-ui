import { Hono } from "hono";
import { optionalBasicAuth } from "../middleware/basic-auth";

import DebridRouter from "./debrid";
import BTDigRouter from "./btsearch";

const router = new Hono({ strict: false });

// Apply optional basic auth to protected routes
router.use("/debrid/*", async (c, next) => {
  const authResult = await optionalBasicAuth(c.req.raw, c.env);
  if (authResult) return authResult;
  await next();
});

router.use("/btsearch", async (c, next) => {
  const authResult = await optionalBasicAuth(c.req.raw, c.env);
  if (authResult) return authResult;
  await next();
});

router.route("/debrid", DebridRouter);

router.route("/btsearch", BTDigRouter);

router.get("/cors", async (c, next) => {
  const authResult = await optionalBasicAuth(c.req.raw, c.env);
  if (authResult) return authResult;
  
  const link = c.req.query("link");
  if (!link) {
    return c.text("No link provided", 400);
  }
  const res = await fetch(link);
  return new Response(res.body, res);
});

router.get("/health", async (c) => {
  return c.json({ status: "ok", timestamp: new Date().toISOString() });
});

export default router;
