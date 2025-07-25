var Nr = Object.defineProperty;
var dt = (e) => {
  throw TypeError(e);
};
var Ar = (e, t, r) => t in e ? Nr(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var p = (e, t, r) => Ar(e, typeof t != "symbol" ? t + "" : t, r), We = (e, t, r) => t.has(e) || dt("Cannot " + r);
var f = (e, t, r) => (We(e, t, "read from private field"), r ? r.call(e) : t.get(e)), E = (e, t, r) => t.has(e) ? dt("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, r), m = (e, t, r, s) => (We(e, t, "write to private field"), s ? s.call(e, r) : t.set(e, r), r), w = (e, t, r) => (We(e, t, "access private method"), r);
var pt = (e, t, r, s) => ({
  set _(n) {
    m(e, t, n, r);
  },
  get _() {
    return f(e, t, s);
  }
});
import { stat as xr } from "node:fs/promises";
var Rr = /^\s*(?:text\/(?!event-stream(?:[;\s]|$))[^;\s]+|application\/(?:javascript|json|xml|xml-dtd|ecmascript|dart|postscript|rtf|tar|toml|vnd\.dart|vnd\.ms-fontobject|vnd\.ms-opentype|wasm|x-httpd-php|x-javascript|x-ns-proxy-autoconfig|x-sh|x-tar|x-virtualbox-hdd|x-virtualbox-ova|x-virtualbox-ovf|x-virtualbox-vbox|x-virtualbox-vdi|x-virtualbox-vhd|x-virtualbox-vmdk|x-www-form-urlencoded)|font\/(?:otf|ttf)|image\/(?:bmp|vnd\.adobe\.photoshop|vnd\.microsoft\.icon|vnd\.ms-dds|x-icon|x-ms-bmp)|message\/rfc822|model\/gltf-binary|x-shader\/x-fragment|x-shader\/x-vertex|[^;\s]+?\+(?:json|text|xml|yaml))(?:[;\s]|$)/i, Tr = (e) => {
  let t = e.filename;
  const r = e.defaultDocument || "index.html";
  return t.endsWith("/") ? t = t.concat(r) : t.match(/\.[a-zA-Z0-9_-]+$/) || (t = t.concat("/" + r)), Je({
    root: e.root,
    filename: t
  });
}, Je = (e) => {
  let t = e.root || "", r = e.filename;
  if (/(?:^|[\/\\])\.\.(?:$|[\/\\])/.test(r))
    return;
  r = r.replace(/^\.?[\/\\]/, ""), r = r.replace(/\\/, "/"), t = t.replace(/\/$/, "");
  let s = t ? t + "/" + r : r;
  if (s = s.replace(/^\.?\//, ""), !(t[0] !== "/" && s[0] === "/"))
    return s;
}, gt = (e, t = Pr) => {
  const r = /\.([a-zA-Z0-9]+?)$/, s = e.match(r);
  if (!s)
    return;
  let n = t[s[1]];
  return n && n.startsWith("text") && (n += "; charset=utf-8"), n;
}, Or = {
  aac: "audio/aac",
  avi: "video/x-msvideo",
  avif: "image/avif",
  av1: "video/av1",
  bin: "application/octet-stream",
  bmp: "image/bmp",
  css: "text/css",
  csv: "text/csv",
  eot: "application/vnd.ms-fontobject",
  epub: "application/epub+zip",
  gif: "image/gif",
  gz: "application/gzip",
  htm: "text/html",
  html: "text/html",
  ico: "image/x-icon",
  ics: "text/calendar",
  jpeg: "image/jpeg",
  jpg: "image/jpeg",
  js: "text/javascript",
  json: "application/json",
  jsonld: "application/ld+json",
  map: "application/json",
  mid: "audio/x-midi",
  midi: "audio/x-midi",
  mjs: "text/javascript",
  mp3: "audio/mpeg",
  mp4: "video/mp4",
  mpeg: "video/mpeg",
  oga: "audio/ogg",
  ogv: "video/ogg",
  ogx: "application/ogg",
  opus: "audio/opus",
  otf: "font/otf",
  pdf: "application/pdf",
  png: "image/png",
  rtf: "application/rtf",
  svg: "image/svg+xml",
  tif: "image/tiff",
  tiff: "image/tiff",
  ts: "video/mp2t",
  ttf: "font/ttf",
  txt: "text/plain",
  wasm: "application/wasm",
  webm: "video/webm",
  weba: "audio/webm",
  webmanifest: "application/manifest+json",
  webp: "image/webp",
  woff: "font/woff",
  woff2: "font/woff2",
  xhtml: "application/xhtml+xml",
  xml: "application/xml",
  zip: "application/zip",
  "3gp": "video/3gpp",
  "3g2": "video/3gpp2",
  gltf: "model/gltf+json",
  glb: "model/gltf-binary"
}, Pr = Or, Ht = {
  br: ".br",
  zstd: ".zst",
  gzip: ".gz"
}, Cr = Object.keys(Ht), Sr = "index.html", Ir = (e) => e, $r = (e) => {
  const t = e.startsWith("/"), r = /^[a-zA-Z]:\\/.test(e), s = /^\\\\[^\\]+\\[^\\]+/.test(e);
  return t || r || s;
}, _r = (e) => e.replace(/^[a-zA-Z]:/, "").replace(/\\/g, "/"), jr = (e) => {
  let t = !1, r;
  return e.root && ($r(e.root) ? (t = !0, r = _r(e.root), r = new URL(`file://${r}`).pathname) : r = e.root), async (s, n) => {
    var l, h, d;
    if (s.finalized) {
      await n();
      return;
    }
    let i = e.path ?? decodeURI(s.req.path);
    if (i = e.rewriteRequestPath ? e.rewriteRequestPath(i) : i, !i.endsWith("/") && e.isDir) {
      const g = Je({
        filename: i,
        root: r
      });
      g && await e.isDir(g) && (i += "/");
    }
    let a = Tr({
      filename: i,
      root: r,
      defaultDocument: Sr
    });
    if (!a)
      return await n();
    t && (a = "/" + a);
    const c = e.getContent, o = e.pathResolve ?? Ir;
    a = o(a);
    let u = await c(a, s);
    if (!u) {
      let g = Je({
        filename: i,
        root: r
      });
      if (!g)
        return await n();
      g = o(g), g !== a && (u = await c(g, s), u && (a = g));
    }
    if (u instanceof Response)
      return s.newResponse(u.body, u);
    if (u) {
      const g = e.mimes && gt(a, e.mimes) || gt(a);
      if (s.header("Content-Type", g || "application/octet-stream"), e.precompressed && (!g || Rr.test(g))) {
        const y = new Set(
          (l = s.req.header("Accept-Encoding")) == null ? void 0 : l.split(",").map((b) => b.trim())
        );
        for (const b of Cr) {
          if (!y.has(b))
            continue;
          const v = await c(a + Ht[b], s);
          if (v) {
            u = v, s.header("Content-Encoding", b), s.header("Vary", "Accept-Encoding", { append: !0 });
            break;
          }
        }
      }
      return await ((h = e.onFound) == null ? void 0 : h.call(e, a, s)), s.body(u);
    }
    await ((d = e.onNotFound) == null ? void 0 : d.call(e, a, s)), await n();
  };
}, mt = (e) => async function(r, s) {
  return jr({
    ...e,
    getContent: async (c) => {
      c = c.startsWith("/") ? c : `./${c}`;
      const o = Bun.file(c);
      return await o.exists() ? o : null;
    },
    pathResolve: (c) => c.startsWith("/") ? c : `./${c}`,
    isDir: async (c) => {
      let o;
      try {
        o = (await xr(c)).isDirectory();
      } catch {
      }
      return o;
    }
  })(r, s);
}, A = "ALL", Lr = "all", kr = ["get", "post", "put", "delete", "options", "patch"], Mt = "Can not add a route since the matcher is already built.", qt = class extends Error {
}, Fr = "__COMPOSED_HANDLER", Br = "x-hono-disable-ssg";
(() => {
  try {
    return new Response("SSG is disabled", {
      status: 404,
      headers: { [Br]: "true" }
    });
  } catch {
    return null;
  }
})();
var { write: fi } = Bun, bt = (e, t, r) => (s, n) => {
  let i = -1;
  return a(0);
  async function a(c) {
    if (c <= i)
      throw new Error("next() called multiple times");
    i = c;
    let o, u = !1, l;
    if (e[c] ? (l = e[c][0][0], s.req.routeIndex = c) : l = c === e.length && n || void 0, l)
      try {
        o = await l(s, () => a(c + 1));
      } catch (h) {
        if (h instanceof Error && t)
          s.error = h, o = await t(h, s), u = !0;
        else
          throw h;
      }
    else
      s.finalized === !1 && r && (o = await r(s));
    return o && (s.finalized === !1 || u) && (s.res = o), s;
  }
}, Hr = Symbol(), Mr = async (e, t = /* @__PURE__ */ Object.create(null)) => {
  const { all: r = !1, dot: s = !1 } = t, i = (e instanceof Xt ? e.raw.headers : e.headers).get("Content-Type");
  return i != null && i.startsWith("multipart/form-data") || i != null && i.startsWith("application/x-www-form-urlencoded") ? qr(e, { all: r, dot: s }) : {};
};
async function qr(e, t) {
  const r = await e.formData();
  return r ? Ur(r, t) : {};
}
function Ur(e, t) {
  const r = /* @__PURE__ */ Object.create(null);
  return e.forEach((s, n) => {
    t.all || n.endsWith("[]") ? Vr(r, n, s) : r[n] = s;
  }), t.dot && Object.entries(r).forEach(([s, n]) => {
    s.includes(".") && (Wr(r, s, n), delete r[s]);
  }), r;
}
var Vr = (e, t, r) => {
  e[t] !== void 0 ? Array.isArray(e[t]) ? e[t].push(r) : e[t] = [e[t], r] : t.endsWith("[]") ? e[t] = [r] : e[t] = r;
}, Wr = (e, t, r) => {
  let s = e;
  const n = t.split(".");
  n.forEach((i, a) => {
    a === n.length - 1 ? s[i] = r : ((!s[i] || typeof s[i] != "object" || Array.isArray(s[i]) || s[i] instanceof File) && (s[i] = /* @__PURE__ */ Object.create(null)), s = s[i]);
  });
}, Ut = (e) => {
  const t = e.split("/");
  return t[0] === "" && t.shift(), t;
}, zr = (e) => {
  const { groups: t, path: r } = Gr(e), s = Ut(r);
  return Xr(s, t);
}, Gr = (e) => {
  const t = [];
  return e = e.replace(/\{[^}]+\}/g, (r, s) => {
    const n = `@${s}`;
    return t.push([n, r]), n;
  }), { groups: t, path: e };
}, Xr = (e, t) => {
  for (let r = t.length - 1; r >= 0; r--) {
    const [s] = t[r];
    for (let n = e.length - 1; n >= 0; n--)
      if (e[n].includes(s)) {
        e[n] = e[n].replace(s, t[r][1]);
        break;
      }
  }
  return e;
}, je = {}, Kr = (e, t) => {
  if (e === "*")
    return "*";
  const r = e.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
  if (r) {
    const s = `${e}#${t}`;
    return je[s] || (r[2] ? je[s] = t && t[0] !== ":" && t[0] !== "*" ? [s, r[1], new RegExp(`^${r[2]}(?=/${t})`)] : [e, r[1], new RegExp(`^${r[2]}$`)] : je[s] = [e, r[1], !0]), je[s];
  }
  return null;
}, it = (e, t) => {
  try {
    return t(e);
  } catch {
    return e.replace(/(?:%[0-9A-Fa-f]{2})+/g, (r) => {
      try {
        return t(r);
      } catch {
        return r;
      }
    });
  }
}, Yr = (e) => it(e, decodeURI), Vt = (e) => {
  const t = e.url, r = t.indexOf(
    "/",
    t.charCodeAt(9) === 58 ? 13 : 8
  );
  let s = r;
  for (; s < t.length; s++) {
    const n = t.charCodeAt(s);
    if (n === 37) {
      const i = t.indexOf("?", s), a = t.slice(r, i === -1 ? void 0 : i);
      return Yr(a.includes("%25") ? a.replace(/%25/g, "%2525") : a);
    } else if (n === 63)
      break;
  }
  return t.slice(r, s);
}, Zr = (e) => {
  const t = Vt(e);
  return t.length > 1 && t.at(-1) === "/" ? t.slice(0, -1) : t;
}, ue = (e, t, ...r) => (r.length && (t = ue(t, ...r)), `${(e == null ? void 0 : e[0]) === "/" ? "" : "/"}${e}${t === "/" ? "" : `${(e == null ? void 0 : e.at(-1)) === "/" ? "" : "/"}${(t == null ? void 0 : t[0]) === "/" ? t.slice(1) : t}`}`), Wt = (e) => {
  if (e.charCodeAt(e.length - 1) !== 63 || !e.includes(":"))
    return null;
  const t = e.split("/"), r = [];
  let s = "";
  return t.forEach((n) => {
    if (n !== "" && !/\:/.test(n))
      s += "/" + n;
    else if (/\:/.test(n))
      if (/\?/.test(n)) {
        r.length === 0 && s === "" ? r.push("/") : r.push(s);
        const i = n.replace("?", "");
        s += "/" + i, r.push(s);
      } else
        s += "/" + n;
  }), r.filter((n, i, a) => a.indexOf(n) === i);
}, ze = (e) => /[%+]/.test(e) ? (e.indexOf("+") !== -1 && (e = e.replace(/\+/g, " ")), e.indexOf("%") !== -1 ? it(e, Gt) : e) : e, zt = (e, t, r) => {
  let s;
  if (!r && t && !/[%+]/.test(t)) {
    let a = e.indexOf(`?${t}`, 8);
    for (a === -1 && (a = e.indexOf(`&${t}`, 8)); a !== -1; ) {
      const c = e.charCodeAt(a + t.length + 1);
      if (c === 61) {
        const o = a + t.length + 2, u = e.indexOf("&", o);
        return ze(e.slice(o, u === -1 ? void 0 : u));
      } else if (c == 38 || isNaN(c))
        return "";
      a = e.indexOf(`&${t}`, a + 1);
    }
    if (s = /[%+]/.test(e), !s)
      return;
  }
  const n = {};
  s ?? (s = /[%+]/.test(e));
  let i = e.indexOf("?", 8);
  for (; i !== -1; ) {
    const a = e.indexOf("&", i + 1);
    let c = e.indexOf("=", i);
    c > a && a !== -1 && (c = -1);
    let o = e.slice(
      i + 1,
      c === -1 ? a === -1 ? void 0 : a : c
    );
    if (s && (o = ze(o)), i = a, o === "")
      continue;
    let u;
    c === -1 ? u = "" : (u = e.slice(c + 1, a === -1 ? void 0 : a), s && (u = ze(u))), r ? (n[o] && Array.isArray(n[o]) || (n[o] = []), n[o].push(u)) : n[o] ?? (n[o] = u);
  }
  return t ? n[t] : n;
}, Jr = zt, Qr = (e, t) => zt(e, t, !0), Gt = decodeURIComponent, yt = (e) => it(e, Gt), he, S, U, Kt, Yt, Qe, z, St, Xt = (St = class {
  constructor(e, t = "/", r = [[]]) {
    E(this, U);
    p(this, "raw");
    E(this, he);
    E(this, S);
    p(this, "routeIndex", 0);
    p(this, "path");
    p(this, "bodyCache", {});
    E(this, z, (e) => {
      const { bodyCache: t, raw: r } = this, s = t[e];
      if (s)
        return s;
      const n = Object.keys(t)[0];
      return n ? t[n].then((i) => (n === "json" && (i = JSON.stringify(i)), new Response(i)[e]())) : t[e] = r[e]();
    });
    this.raw = e, this.path = t, m(this, S, r), m(this, he, {});
  }
  param(e) {
    return e ? w(this, U, Kt).call(this, e) : w(this, U, Yt).call(this);
  }
  query(e) {
    return Jr(this.url, e);
  }
  queries(e) {
    return Qr(this.url, e);
  }
  header(e) {
    if (e)
      return this.raw.headers.get(e) ?? void 0;
    const t = {};
    return this.raw.headers.forEach((r, s) => {
      t[s] = r;
    }), t;
  }
  async parseBody(e) {
    var t;
    return (t = this.bodyCache).parsedBody ?? (t.parsedBody = await Mr(this, e));
  }
  json() {
    return f(this, z).call(this, "text").then((e) => JSON.parse(e));
  }
  text() {
    return f(this, z).call(this, "text");
  }
  arrayBuffer() {
    return f(this, z).call(this, "arrayBuffer");
  }
  blob() {
    return f(this, z).call(this, "blob");
  }
  formData() {
    return f(this, z).call(this, "formData");
  }
  addValidatedData(e, t) {
    f(this, he)[e] = t;
  }
  valid(e) {
    return f(this, he)[e];
  }
  get url() {
    return this.raw.url;
  }
  get method() {
    return this.raw.method;
  }
  get [Hr]() {
    return f(this, S);
  }
  get matchedRoutes() {
    return f(this, S)[0].map(([[, e]]) => e);
  }
  get routePath() {
    return f(this, S)[0].map(([[, e]]) => e)[this.routeIndex].path;
  }
}, he = new WeakMap(), S = new WeakMap(), U = new WeakSet(), Kt = function(e) {
  const t = f(this, S)[0][this.routeIndex][1][e], r = w(this, U, Qe).call(this, t);
  return r ? /\%/.test(r) ? yt(r) : r : void 0;
}, Yt = function() {
  const e = {}, t = Object.keys(f(this, S)[0][this.routeIndex][1]);
  for (const r of t) {
    const s = w(this, U, Qe).call(this, f(this, S)[0][this.routeIndex][1][r]);
    s && typeof s == "string" && (e[r] = /\%/.test(s) ? yt(s) : s);
  }
  return e;
}, Qe = function(e) {
  return f(this, S)[1] ? f(this, S)[1][e] : e;
}, z = new WeakMap(), St), Dr = {
  Stringify: 1
}, Zt = async (e, t, r, s, n) => {
  typeof e == "object" && !(e instanceof String) && (e instanceof Promise || (e = e.toString()), e instanceof Promise && (e = await e));
  const i = e.callbacks;
  return i != null && i.length ? (n ? n[0] += e : n = [e], Promise.all(i.map((c) => c({ phase: t, buffer: n, context: s }))).then(
    (c) => Promise.all(
      c.filter(Boolean).map((o) => Zt(o, t, !1, s, n))
    ).then(() => n[0])
  )) : Promise.resolve(e);
}, es = "text/plain; charset=UTF-8", Ge = (e, t) => ({
  "Content-Type": e,
  ...t
}), Oe, Pe, B, de, H, P, Ce, pe, ge, re, Se, Ie, G, fe, It, ts = (It = class {
  constructor(e, t) {
    E(this, G);
    E(this, Oe);
    E(this, Pe);
    p(this, "env", {});
    E(this, B);
    p(this, "finalized", !1);
    p(this, "error");
    E(this, de);
    E(this, H);
    E(this, P);
    E(this, Ce);
    E(this, pe);
    E(this, ge);
    E(this, re);
    E(this, Se);
    E(this, Ie);
    p(this, "render", (...e) => (f(this, pe) ?? m(this, pe, (t) => this.html(t)), f(this, pe).call(this, ...e)));
    p(this, "setLayout", (e) => m(this, Ce, e));
    p(this, "getLayout", () => f(this, Ce));
    p(this, "setRenderer", (e) => {
      m(this, pe, e);
    });
    p(this, "header", (e, t, r) => {
      this.finalized && m(this, P, new Response(f(this, P).body, f(this, P)));
      const s = f(this, P) ? f(this, P).headers : f(this, re) ?? m(this, re, new Headers());
      t === void 0 ? s.delete(e) : r != null && r.append ? s.append(e, t) : s.set(e, t);
    });
    p(this, "status", (e) => {
      m(this, de, e);
    });
    p(this, "set", (e, t) => {
      f(this, B) ?? m(this, B, /* @__PURE__ */ new Map()), f(this, B).set(e, t);
    });
    p(this, "get", (e) => f(this, B) ? f(this, B).get(e) : void 0);
    p(this, "newResponse", (...e) => w(this, G, fe).call(this, ...e));
    p(this, "body", (e, t, r) => w(this, G, fe).call(this, e, t, r));
    p(this, "text", (e, t, r) => !f(this, re) && !f(this, de) && !t && !r && !this.finalized ? new Response(e) : w(this, G, fe).call(this, e, t, Ge(es, r)));
    p(this, "json", (e, t, r) => w(this, G, fe).call(this, JSON.stringify(e), t, Ge("application/json", r)));
    p(this, "html", (e, t, r) => {
      const s = (n) => w(this, G, fe).call(this, n, t, Ge("text/html; charset=UTF-8", r));
      return typeof e == "object" ? Zt(e, Dr.Stringify, !1, {}).then(s) : s(e);
    });
    p(this, "redirect", (e, t) => (this.header("Location", String(e)), this.newResponse(null, t ?? 302)));
    p(this, "notFound", () => (f(this, ge) ?? m(this, ge, () => new Response()), f(this, ge).call(this, this)));
    m(this, Oe, e), t && (m(this, H, t.executionCtx), this.env = t.env, m(this, ge, t.notFoundHandler), m(this, Ie, t.path), m(this, Se, t.matchResult));
  }
  get req() {
    return f(this, Pe) ?? m(this, Pe, new Xt(f(this, Oe), f(this, Ie), f(this, Se))), f(this, Pe);
  }
  get event() {
    if (f(this, H) && "respondWith" in f(this, H))
      return f(this, H);
    throw Error("This context has no FetchEvent");
  }
  get executionCtx() {
    if (f(this, H))
      return f(this, H);
    throw Error("This context has no ExecutionContext");
  }
  get res() {
    return f(this, P) || m(this, P, new Response(null, {
      headers: f(this, re) ?? m(this, re, new Headers())
    }));
  }
  set res(e) {
    if (f(this, P) && e) {
      e = new Response(e.body, e);
      for (const [t, r] of f(this, P).headers.entries())
        if (t !== "content-type")
          if (t === "set-cookie") {
            const s = f(this, P).headers.getSetCookie();
            e.headers.delete("set-cookie");
            for (const n of s)
              e.headers.append("set-cookie", n);
          } else
            e.headers.set(t, r);
    }
    m(this, P, e), this.finalized = !0;
  }
  get var() {
    return f(this, B) ? Object.fromEntries(f(this, B)) : {};
  }
}, Oe = new WeakMap(), Pe = new WeakMap(), B = new WeakMap(), de = new WeakMap(), H = new WeakMap(), P = new WeakMap(), Ce = new WeakMap(), pe = new WeakMap(), ge = new WeakMap(), re = new WeakMap(), Se = new WeakMap(), Ie = new WeakMap(), G = new WeakSet(), fe = function(e, t, r) {
  const s = f(this, P) ? new Headers(f(this, P).headers) : f(this, re) ?? new Headers();
  if (typeof t == "object" && "headers" in t) {
    const i = t.headers instanceof Headers ? t.headers : new Headers(t.headers);
    for (const [a, c] of i)
      a.toLowerCase() === "set-cookie" ? s.append(a, c) : s.set(a, c);
  }
  if (r)
    for (const [i, a] of Object.entries(r))
      if (typeof a == "string")
        s.set(i, a);
      else {
        s.delete(i);
        for (const c of a)
          s.append(i, c);
      }
  const n = typeof t == "number" ? t : (t == null ? void 0 : t.status) ?? f(this, de);
  return new Response(e, { status: n, headers: s });
}, It), rs = (e) => e.text("404 Not Found", 404), Et = (e, t) => {
  if ("getResponse" in e) {
    const r = e.getResponse();
    return t.newResponse(r.body, r);
  }
  return console.error(e), t.text("Internal Server Error", 500);
}, $, x, Qt, _, Q, Le, ke, $t, Jt = ($t = class {
  constructor(t = {}) {
    E(this, x);
    p(this, "get");
    p(this, "post");
    p(this, "put");
    p(this, "delete");
    p(this, "options");
    p(this, "patch");
    p(this, "all");
    p(this, "on");
    p(this, "use");
    p(this, "router");
    p(this, "getPath");
    p(this, "_basePath", "/");
    E(this, $, "/");
    p(this, "routes", []);
    E(this, _, rs);
    p(this, "errorHandler", Et);
    p(this, "onError", (t) => (this.errorHandler = t, this));
    p(this, "notFound", (t) => (m(this, _, t), this));
    p(this, "fetch", (t, ...r) => w(this, x, ke).call(this, t, r[1], r[0], t.method));
    p(this, "request", (t, r, s, n) => t instanceof Request ? this.fetch(r ? new Request(t, r) : t, s, n) : (t = t.toString(), this.fetch(
      new Request(
        /^https?:\/\//.test(t) ? t : `http://localhost${ue("/", t)}`,
        r
      ),
      s,
      n
    )));
    p(this, "fire", () => {
      addEventListener("fetch", (t) => {
        t.respondWith(w(this, x, ke).call(this, t.request, t, void 0, t.request.method));
      });
    });
    [...kr, Lr].forEach((i) => {
      this[i] = (a, ...c) => (typeof a == "string" ? m(this, $, a) : w(this, x, Q).call(this, i, f(this, $), a), c.forEach((o) => {
        w(this, x, Q).call(this, i, f(this, $), o);
      }), this);
    }), this.on = (i, a, ...c) => {
      for (const o of [a].flat()) {
        m(this, $, o);
        for (const u of [i].flat())
          c.map((l) => {
            w(this, x, Q).call(this, u.toUpperCase(), f(this, $), l);
          });
      }
      return this;
    }, this.use = (i, ...a) => (typeof i == "string" ? m(this, $, i) : (m(this, $, "*"), a.unshift(i)), a.forEach((c) => {
      w(this, x, Q).call(this, A, f(this, $), c);
    }), this);
    const { strict: s, ...n } = t;
    Object.assign(this, n), this.getPath = s ?? !0 ? t.getPath ?? Vt : Zr;
  }
  route(t, r) {
    const s = this.basePath(t);
    return r.routes.map((n) => {
      var a;
      let i;
      r.errorHandler === Et ? i = n.handler : (i = async (c, o) => (await bt([], r.errorHandler)(c, () => n.handler(c, o))).res, i[Fr] = n.handler), w(a = s, x, Q).call(a, n.method, n.path, i);
    }), this;
  }
  basePath(t) {
    const r = w(this, x, Qt).call(this);
    return r._basePath = ue(this._basePath, t), r;
  }
  mount(t, r, s) {
    let n, i;
    s && (typeof s == "function" ? i = s : (i = s.optionHandler, s.replaceRequest === !1 ? n = (o) => o : n = s.replaceRequest));
    const a = i ? (o) => {
      const u = i(o);
      return Array.isArray(u) ? u : [u];
    } : (o) => {
      let u;
      try {
        u = o.executionCtx;
      } catch {
      }
      return [o.env, u];
    };
    n || (n = (() => {
      const o = ue(this._basePath, t), u = o === "/" ? 0 : o.length;
      return (l) => {
        const h = new URL(l.url);
        return h.pathname = h.pathname.slice(u) || "/", new Request(h, l);
      };
    })());
    const c = async (o, u) => {
      const l = await r(n(o.req.raw), ...a(o));
      if (l)
        return l;
      await u();
    };
    return w(this, x, Q).call(this, A, ue(t, "*"), c), this;
  }
}, $ = new WeakMap(), x = new WeakSet(), Qt = function() {
  const t = new Jt({
    router: this.router,
    getPath: this.getPath
  });
  return t.errorHandler = this.errorHandler, m(t, _, f(this, _)), t.routes = this.routes, t;
}, _ = new WeakMap(), Q = function(t, r, s) {
  t = t.toUpperCase(), r = ue(this._basePath, r);
  const n = { basePath: this._basePath, path: r, method: t, handler: s };
  this.router.add(t, r, [s, n]), this.routes.push(n);
}, Le = function(t, r) {
  if (t instanceof Error)
    return this.errorHandler(t, r);
  throw t;
}, ke = function(t, r, s, n) {
  if (n === "HEAD")
    return (async () => new Response(null, await w(this, x, ke).call(this, t, r, s, "GET")))();
  const i = this.getPath(t, { env: s }), a = this.router.match(n, i), c = new ts(t, {
    path: i,
    matchResult: a,
    env: s,
    executionCtx: r,
    notFoundHandler: f(this, _)
  });
  if (a[0].length === 1) {
    let u;
    try {
      u = a[0][0][0][0](c, async () => {
        c.res = await f(this, _).call(this, c);
      });
    } catch (l) {
      return w(this, x, Le).call(this, l, c);
    }
    return u instanceof Promise ? u.then(
      (l) => l || (c.finalized ? c.res : f(this, _).call(this, c))
    ).catch((l) => w(this, x, Le).call(this, l, c)) : u ?? f(this, _).call(this, c);
  }
  const o = bt(a[0], this.errorHandler, f(this, _));
  return (async () => {
    try {
      const u = await o(c);
      if (!u.finalized)
        throw new Error(
          "Context is not finalized. Did you forget to return a Response object or `await next()`?"
        );
      return u.res;
    } catch (u) {
      return w(this, x, Le).call(this, u, c);
    }
  })();
}, $t), Be = "[^/]+", Re = ".*", Te = "(?:|/.*)", xe = Symbol(), ss = new Set(".\\+*[^]$()");
function ns(e, t) {
  return e.length === 1 ? t.length === 1 ? e < t ? -1 : 1 : -1 : t.length === 1 || e === Re || e === Te ? 1 : t === Re || t === Te ? -1 : e === Be ? 1 : t === Be ? -1 : e.length === t.length ? e < t ? -1 : 1 : t.length - e.length;
}
var se, ne, j, _t, De = (_t = class {
  constructor() {
    E(this, se);
    E(this, ne);
    E(this, j, /* @__PURE__ */ Object.create(null));
  }
  insert(t, r, s, n, i) {
    if (t.length === 0) {
      if (f(this, se) !== void 0)
        throw xe;
      if (i)
        return;
      m(this, se, r);
      return;
    }
    const [a, ...c] = t, o = a === "*" ? c.length === 0 ? ["", "", Re] : ["", "", Be] : a === "/*" ? ["", "", Te] : a.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
    let u;
    if (o) {
      const l = o[1];
      let h = o[2] || Be;
      if (l && o[2] && (h = h.replace(/^\((?!\?:)(?=[^)]+\)$)/, "(?:"), /\((?!\?:)/.test(h)))
        throw xe;
      if (u = f(this, j)[h], !u) {
        if (Object.keys(f(this, j)).some(
          (d) => d !== Re && d !== Te
        ))
          throw xe;
        if (i)
          return;
        u = f(this, j)[h] = new De(), l !== "" && m(u, ne, n.varIndex++);
      }
      !i && l !== "" && s.push([l, f(u, ne)]);
    } else if (u = f(this, j)[a], !u) {
      if (Object.keys(f(this, j)).some(
        (l) => l.length > 1 && l !== Re && l !== Te
      ))
        throw xe;
      if (i)
        return;
      u = f(this, j)[a] = new De();
    }
    u.insert(c, r, s, n, i);
  }
  buildRegExpStr() {
    const r = Object.keys(f(this, j)).sort(ns).map((s) => {
      const n = f(this, j)[s];
      return (typeof f(n, ne) == "number" ? `(${s})@${f(n, ne)}` : ss.has(s) ? `\\${s}` : s) + n.buildRegExpStr();
    });
    return typeof f(this, se) == "number" && r.unshift(`#${f(this, se)}`), r.length === 0 ? "" : r.length === 1 ? r[0] : "(?:" + r.join("|") + ")";
  }
}, se = new WeakMap(), ne = new WeakMap(), j = new WeakMap(), _t), He, $e, jt, is = (jt = class {
  constructor() {
    E(this, He, { varIndex: 0 });
    E(this, $e, new De());
  }
  insert(e, t, r) {
    const s = [], n = [];
    for (let a = 0; ; ) {
      let c = !1;
      if (e = e.replace(/\{[^}]+\}/g, (o) => {
        const u = `@\\${a}`;
        return n[a] = [u, o], a++, c = !0, u;
      }), !c)
        break;
    }
    const i = e.match(/(?::[^\/]+)|(?:\/\*$)|./g) || [];
    for (let a = n.length - 1; a >= 0; a--) {
      const [c] = n[a];
      for (let o = i.length - 1; o >= 0; o--)
        if (i[o].indexOf(c) !== -1) {
          i[o] = i[o].replace(c, n[a][1]);
          break;
        }
    }
    return f(this, $e).insert(i, t, s, f(this, He), r), s;
  }
  buildRegExp() {
    let e = f(this, $e).buildRegExpStr();
    if (e === "")
      return [/^$/, [], []];
    let t = 0;
    const r = [], s = [];
    return e = e.replace(/#(\d+)|@(\d+)|\.\*\$/g, (n, i, a) => i !== void 0 ? (r[++t] = Number(i), "$()") : (a !== void 0 && (s[Number(a)] = ++t), "")), [new RegExp(`^${e}`), r, s];
  }
}, He = new WeakMap(), $e = new WeakMap(), jt), Dt = [], os = [/^$/, [], /* @__PURE__ */ Object.create(null)], Fe = /* @__PURE__ */ Object.create(null);
function er(e) {
  return Fe[e] ?? (Fe[e] = new RegExp(
    e === "*" ? "" : `^${e.replace(
      /\/\*$|([.\\+*[^\]$()])/g,
      (t, r) => r ? `\\${r}` : "(?:|/.*)"
    )}$`
  ));
}
function as() {
  Fe = /* @__PURE__ */ Object.create(null);
}
function cs(e) {
  var u;
  const t = new is(), r = [];
  if (e.length === 0)
    return os;
  const s = e.map(
    (l) => [!/\*|\/:/.test(l[0]), ...l]
  ).sort(
    ([l, h], [d, g]) => l ? 1 : d ? -1 : h.length - g.length
  ), n = /* @__PURE__ */ Object.create(null);
  for (let l = 0, h = -1, d = s.length; l < d; l++) {
    const [g, y, b] = s[l];
    g ? n[y] = [b.map(([C]) => [C, /* @__PURE__ */ Object.create(null)]), Dt] : h++;
    let v;
    try {
      v = t.insert(y, h, g);
    } catch (C) {
      throw C === xe ? new qt(y) : C;
    }
    g || (r[h] = b.map(([C, ce]) => {
      const we = /* @__PURE__ */ Object.create(null);
      for (ce -= 1; ce >= 0; ce--) {
        const [L, Ue] = v[ce];
        we[L] = Ue;
      }
      return [C, we];
    }));
  }
  const [i, a, c] = t.buildRegExp();
  for (let l = 0, h = r.length; l < h; l++)
    for (let d = 0, g = r[l].length; d < g; d++) {
      const y = (u = r[l][d]) == null ? void 0 : u[1];
      if (!y)
        continue;
      const b = Object.keys(y);
      for (let v = 0, C = b.length; v < C; v++)
        y[b[v]] = c[y[b[v]]];
    }
  const o = [];
  for (const l in a)
    o[l] = r[a[l]];
  return [i, o, n];
}
function le(e, t) {
  if (e) {
    for (const r of Object.keys(e).sort((s, n) => n.length - s.length))
      if (er(r).test(t))
        return [...e[r]];
  }
}
var X, K, be, tr, rr, Lt, ls = (Lt = class {
  constructor() {
    E(this, be);
    p(this, "name", "RegExpRouter");
    E(this, X);
    E(this, K);
    m(this, X, { [A]: /* @__PURE__ */ Object.create(null) }), m(this, K, { [A]: /* @__PURE__ */ Object.create(null) });
  }
  add(e, t, r) {
    var c;
    const s = f(this, X), n = f(this, K);
    if (!s || !n)
      throw new Error(Mt);
    s[e] || [s, n].forEach((o) => {
      o[e] = /* @__PURE__ */ Object.create(null), Object.keys(o[A]).forEach((u) => {
        o[e][u] = [...o[A][u]];
      });
    }), t === "/*" && (t = "*");
    const i = (t.match(/\/:/g) || []).length;
    if (/\*$/.test(t)) {
      const o = er(t);
      e === A ? Object.keys(s).forEach((u) => {
        var l;
        (l = s[u])[t] || (l[t] = le(s[u], t) || le(s[A], t) || []);
      }) : (c = s[e])[t] || (c[t] = le(s[e], t) || le(s[A], t) || []), Object.keys(s).forEach((u) => {
        (e === A || e === u) && Object.keys(s[u]).forEach((l) => {
          o.test(l) && s[u][l].push([r, i]);
        });
      }), Object.keys(n).forEach((u) => {
        (e === A || e === u) && Object.keys(n[u]).forEach(
          (l) => o.test(l) && n[u][l].push([r, i])
        );
      });
      return;
    }
    const a = Wt(t) || [t];
    for (let o = 0, u = a.length; o < u; o++) {
      const l = a[o];
      Object.keys(n).forEach((h) => {
        var d;
        (e === A || e === h) && ((d = n[h])[l] || (d[l] = [
          ...le(s[h], l) || le(s[A], l) || []
        ]), n[h][l].push([r, i - u + o + 1]));
      });
    }
  }
  match(e, t) {
    as();
    const r = w(this, be, tr).call(this);
    return this.match = (s, n) => {
      const i = r[s] || r[A], a = i[2][n];
      if (a)
        return a;
      const c = n.match(i[0]);
      if (!c)
        return [[], Dt];
      const o = c.indexOf("", 1);
      return [i[1][o], c];
    }, this.match(e, t);
  }
}, X = new WeakMap(), K = new WeakMap(), be = new WeakSet(), tr = function() {
  const e = /* @__PURE__ */ Object.create(null);
  return Object.keys(f(this, K)).concat(Object.keys(f(this, X))).forEach((t) => {
    e[t] || (e[t] = w(this, be, rr).call(this, t));
  }), m(this, X, m(this, K, void 0)), e;
}, rr = function(e) {
  const t = [];
  let r = e === A;
  return [f(this, X), f(this, K)].forEach((s) => {
    const n = s[e] ? Object.keys(s[e]).map((i) => [i, s[e][i]]) : [];
    n.length !== 0 ? (r || (r = !0), t.push(...n)) : e !== A && t.push(
      ...Object.keys(s[A]).map((i) => [i, s[A][i]])
    );
  }), r ? cs(t) : null;
}, Lt), Y, M, kt, us = (kt = class {
  constructor(e) {
    p(this, "name", "SmartRouter");
    E(this, Y, []);
    E(this, M, []);
    m(this, Y, e.routers);
  }
  add(e, t, r) {
    if (!f(this, M))
      throw new Error(Mt);
    f(this, M).push([e, t, r]);
  }
  match(e, t) {
    if (!f(this, M))
      throw new Error("Fatal error");
    const r = f(this, Y), s = f(this, M), n = r.length;
    let i = 0, a;
    for (; i < n; i++) {
      const c = r[i];
      try {
        for (let o = 0, u = s.length; o < u; o++)
          c.add(...s[o]);
        a = c.match(e, t);
      } catch (o) {
        if (o instanceof qt)
          continue;
        throw o;
      }
      this.match = c.match.bind(c), m(this, Y, [c]), m(this, M, void 0);
      break;
    }
    if (i === n)
      throw new Error("Fatal error");
    return this.name = `SmartRouter + ${this.activeRouter.name}`, a;
  }
  get activeRouter() {
    if (f(this, M) || f(this, Y).length !== 1)
      throw new Error("No active router has been determined yet.");
    return f(this, Y)[0];
  }
}, Y = new WeakMap(), M = new WeakMap(), kt), ve = /* @__PURE__ */ Object.create(null), Z, T, ie, me, R, q, D, Ft, sr = (Ft = class {
  constructor(e, t, r) {
    E(this, q);
    E(this, Z);
    E(this, T);
    E(this, ie);
    E(this, me, 0);
    E(this, R, ve);
    if (m(this, T, r || /* @__PURE__ */ Object.create(null)), m(this, Z, []), e && t) {
      const s = /* @__PURE__ */ Object.create(null);
      s[e] = { handler: t, possibleKeys: [], score: 0 }, m(this, Z, [s]);
    }
    m(this, ie, []);
  }
  insert(e, t, r) {
    m(this, me, ++pt(this, me)._);
    let s = this;
    const n = zr(t), i = [];
    for (let a = 0, c = n.length; a < c; a++) {
      const o = n[a], u = n[a + 1], l = Kr(o, u), h = Array.isArray(l) ? l[0] : o;
      if (h in f(s, T)) {
        s = f(s, T)[h], l && i.push(l[1]);
        continue;
      }
      f(s, T)[h] = new sr(), l && (f(s, ie).push(l), i.push(l[1])), s = f(s, T)[h];
    }
    return f(s, Z).push({
      [e]: {
        handler: r,
        possibleKeys: i.filter((a, c, o) => o.indexOf(a) === c),
        score: f(this, me)
      }
    }), s;
  }
  search(e, t) {
    var c;
    const r = [];
    m(this, R, ve);
    let n = [this];
    const i = Ut(t), a = [];
    for (let o = 0, u = i.length; o < u; o++) {
      const l = i[o], h = o === u - 1, d = [];
      for (let g = 0, y = n.length; g < y; g++) {
        const b = n[g], v = f(b, T)[l];
        v && (m(v, R, f(b, R)), h ? (f(v, T)["*"] && r.push(
          ...w(this, q, D).call(this, f(v, T)["*"], e, f(b, R))
        ), r.push(...w(this, q, D).call(this, v, e, f(b, R)))) : d.push(v));
        for (let C = 0, ce = f(b, ie).length; C < ce; C++) {
          const we = f(b, ie)[C], L = f(b, R) === ve ? {} : { ...f(b, R) };
          if (we === "*") {
            const V = f(b, T)["*"];
            V && (r.push(...w(this, q, D).call(this, V, e, f(b, R))), m(V, R, L), d.push(V));
            continue;
          }
          if (!l)
            continue;
          const [Ue, ht, _e] = we, k = f(b, T)[Ue], vr = i.slice(o).join("/");
          if (_e instanceof RegExp) {
            const V = _e.exec(vr);
            if (V) {
              if (L[ht] = V[0], r.push(...w(this, q, D).call(this, k, e, f(b, R), L)), Object.keys(f(k, T)).length) {
                m(k, R, L);
                const Ve = ((c = V[0].match(/\//)) == null ? void 0 : c.length) ?? 0;
                (a[Ve] || (a[Ve] = [])).push(k);
              }
              continue;
            }
          }
          (_e === !0 || _e.test(l)) && (L[ht] = l, h ? (r.push(...w(this, q, D).call(this, k, e, L, f(b, R))), f(k, T)["*"] && r.push(
            ...w(this, q, D).call(this, f(k, T)["*"], e, L, f(b, R))
          )) : (m(k, R, L), d.push(k)));
        }
      }
      n = d.concat(a.shift() ?? []);
    }
    return r.length > 1 && r.sort((o, u) => o.score - u.score), [r.map(({ handler: o, params: u }) => [o, u])];
  }
}, Z = new WeakMap(), T = new WeakMap(), ie = new WeakMap(), me = new WeakMap(), R = new WeakMap(), q = new WeakSet(), D = function(e, t, r, s) {
  const n = [];
  for (let i = 0, a = f(e, Z).length; i < a; i++) {
    const c = f(e, Z)[i], o = c[t] || c[A], u = {};
    if (o !== void 0 && (o.params = /* @__PURE__ */ Object.create(null), n.push(o), r !== ve || s && s !== ve))
      for (let l = 0, h = o.possibleKeys.length; l < h; l++) {
        const d = o.possibleKeys[l], g = u[o.score];
        o.params[d] = s != null && s[d] && !g ? s[d] : r[d] ?? (s == null ? void 0 : s[d]), u[o.score] = !0;
      }
  }
  return n;
}, Ft), oe, Bt, fs = (Bt = class {
  constructor() {
    p(this, "name", "TrieRouter");
    E(this, oe);
    m(this, oe, new sr());
  }
  add(e, t, r) {
    const s = Wt(t);
    if (s) {
      for (let n = 0, i = s.length; n < i; n++)
        f(this, oe).insert(e, s[n], r);
      return;
    }
    f(this, oe).insert(e, t, r);
  }
  match(e, t) {
    return f(this, oe).search(e, t);
  }
}, oe = new WeakMap(), Bt), Me = class extends Jt {
  constructor(e = {}) {
    super(e), this.router = e.router ?? new us({
      routers: [new ls(), new fs()]
    });
  }
}, hs = (e) => {
  const r = {
    ...{
      origin: "*",
      allowMethods: ["GET", "HEAD", "PUT", "POST", "DELETE", "PATCH"],
      allowHeaders: [],
      exposeHeaders: []
    },
    ...e
  }, s = /* @__PURE__ */ ((i) => typeof i == "string" ? i === "*" ? () => i : (a) => i === a ? a : null : typeof i == "function" ? i : (a) => i.includes(a) ? a : null)(r.origin), n = ((i) => typeof i == "function" ? i : Array.isArray(i) ? () => i : () => [])(r.allowMethods);
  return async function(a, c) {
    var l;
    function o(h, d) {
      a.res.headers.set(h, d);
    }
    const u = s(a.req.header("origin") || "", a);
    if (u && o("Access-Control-Allow-Origin", u), r.origin !== "*") {
      const h = a.req.header("Vary");
      h ? o("Vary", h) : o("Vary", "Origin");
    }
    if (r.credentials && o("Access-Control-Allow-Credentials", "true"), (l = r.exposeHeaders) != null && l.length && o("Access-Control-Expose-Headers", r.exposeHeaders.join(",")), a.req.method === "OPTIONS") {
      r.maxAge != null && o("Access-Control-Max-Age", r.maxAge.toString());
      const h = n(a.req.header("origin") || "", a);
      h.length && o("Access-Control-Allow-Methods", h.join(","));
      let d = r.allowHeaders;
      if (!(d != null && d.length)) {
        const g = a.req.header("Access-Control-Request-Headers");
        g && (d = g.split(/\s*,\s*/));
      }
      return d != null && d.length && (o("Access-Control-Allow-Headers", d.join(",")), a.res.headers.append("Vary", "Access-Control-Request-Headers")), a.res.headers.delete("Content-Length"), a.res.headers.delete("Content-Type"), new Response(null, {
        headers: a.res.headers,
        status: 204,
        statusText: "No Content"
      });
    }
    await c();
  };
}, ds = (e, t) => {
  var i;
  const r = globalThis, s = (i = r == null ? void 0 : r.process) == null ? void 0 : i.env;
  return t ?? (t = gs()), {
    bun: () => s,
    node: () => s,
    "edge-light": () => s,
    deno: () => Deno.env.toObject(),
    workerd: () => e.env,
    fastly: () => ({}),
    other: () => ({})
  }[t]();
}, ps = {
  deno: "Deno",
  bun: "Bun",
  workerd: "Cloudflare-Workers",
  node: "Node.js"
}, gs = () => {
  var r, s;
  const e = globalThis;
  if (typeof navigator < "u" && typeof navigator.userAgent == "string") {
    for (const [n, i] of Object.entries(ps))
      if (ms(i))
        return n;
  }
  return typeof (e == null ? void 0 : e.EdgeRuntime) == "string" ? "edge-light" : (e == null ? void 0 : e.fastly) !== void 0 ? "fastly" : ((s = (r = e == null ? void 0 : e.process) == null ? void 0 : r.release) == null ? void 0 : s.name) === "node" ? "node" : "other";
}, ms = (e) => navigator.userAgent.startsWith(e);
function bs() {
  const { process: e, Deno: t } = globalThis;
  return !(typeof (t == null ? void 0 : t.noColor) == "boolean" ? t.noColor : e !== void 0 ? "NO_COLOR" in (e == null ? void 0 : e.env) : !1);
}
async function ys() {
  const { navigator: e } = globalThis, t = "cloudflare:workers";
  return !(e !== void 0 && e.userAgent === "Cloudflare-Workers" ? await (async () => {
    try {
      return "NO_COLOR" in ((await import(t)).env ?? {});
    } catch {
      return !1;
    }
  })() : !bs());
}
var Es = (e) => {
  const [t, r] = [",", "."];
  return e.map((n) => n.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1" + t)).join(r);
}, ws = (e) => {
  const t = Date.now() - e;
  return Es([t < 1e3 ? t + "ms" : Math.round(t / 1e3) + "s"]);
}, vs = async (e) => {
  if (await ys())
    switch (e / 100 | 0) {
      case 5:
        return `\x1B[31m${e}\x1B[0m`;
      case 4:
        return `\x1B[33m${e}\x1B[0m`;
      case 3:
        return `\x1B[36m${e}\x1B[0m`;
      case 2:
        return `\x1B[32m${e}\x1B[0m`;
    }
  return `${e}`;
};
async function wt(e, t, r, s, n = 0, i) {
  const a = t === "<--" ? `${t} ${r} ${s}` : `${t} ${r} ${s} ${await vs(n)} ${i}`;
  e(a);
}
var Ns = (e = console.log) => async function(r, s) {
  const { method: n, url: i } = r.req, a = i.slice(i.indexOf("/", 8));
  await wt(e, "<--", n, a);
  const c = Date.now();
  await s(), await wt(e, "-->", n, a, r.res.status, ws(c));
};
async function vt(e, t) {
  const r = new TextEncoder().encode(e), s = new TextEncoder().encode(t);
  return r.byteLength !== s.byteLength ? !1 : await crypto.subtle.timingSafeEqual(r, s);
}
async function ot(e, t) {
  if (!t.USERNAME || !t.PASSWORD)
    return null;
  const r = e.headers.get("Authorization");
  if (!r)
    return new Response("Authentication required", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="RDEBRID Access", charset="UTF-8"'
      }
    });
  const [s, n] = r.split(" ");
  if (!n || s !== "Basic")
    return new Response("Invalid authorization format", { status: 400 });
  const i = atob(n), [a, c] = i.split(":");
  return !await vt(a, t.USERNAME) || !await vt(c, t.PASSWORD) ? new Response("Invalid credentials", { status: 401 }) : null;
}
const at = new Me({ strict: !1 }), As = ["PUT", "POST", "PATCH"], nr = "api.real-debrid.com", ir = "https:", xs = [
  "content-encoding",
  "cache-control",
  "expires",
  "connection",
  "keep-alive",
  "vary"
], Rs = (e) => {
  const t = new Headers(e);
  for (const r of e.keys()) {
    const s = r.toLowerCase();
    (s.startsWith("access-control-") || s.startsWith("x-") && s !== "x-total-count" || xs.includes(s)) && t.delete(r);
  }
  return t;
}, et = async (e, t) => {
  const r = await fetch(e, t);
  return new Response(r.body, {
    status: r.status,
    headers: Rs(r.headers)
  });
};
at.get("/oauth/*", async (e) => {
  const t = new URL(e.req.url);
  return t.host = nr, t.protocol = ir, t.port = "", t.pathname = t.pathname.replace("/api/debrid", ""), et(t.toString(), { method: e.req.method });
});
at.use("*", async (e) => {
  const t = new URL(e.req.url);
  t.host = nr, t.protocol = ir, t.port = "", t.pathname = `/rest/1.0${t.pathname.replace("/api/debrid", "")}`;
  const r = new Headers();
  if (r.set(
    "Authorization",
    `Bearer ${e.env.DEBRID_TOKEN}`
  ), As.includes(e.req.method) && e.req.header("content-type") !== "application/octet-stream") {
    const s = await e.req.parseBody(), n = e.env.FORWARD_IP || e.req.header("CF-Connecting-IP");
    n && (s.ip = n);
    const i = {
      method: e.req.method,
      headers: r,
      body: new URLSearchParams(s)
    };
    return et(t.toString(), i);
  }
  return et(t.toString(), {
    method: e.req.method,
    headers: r
  });
});
var F;
function ye(e) {
  return {
    lang: (e == null ? void 0 : e.lang) ?? (F == null ? void 0 : F.lang),
    message: e == null ? void 0 : e.message,
    abortEarly: (e == null ? void 0 : e.abortEarly) ?? (F == null ? void 0 : F.abortEarly),
    abortPipeEarly: (e == null ? void 0 : e.abortPipeEarly) ?? (F == null ? void 0 : F.abortPipeEarly)
  };
}
var Xe;
function Ts(e) {
  return Xe == null ? void 0 : Xe.get(e);
}
var Ke;
function Os(e) {
  return Ke == null ? void 0 : Ke.get(e);
}
var Ye;
function Ps(e, t) {
  var r;
  return (r = Ye == null ? void 0 : Ye.get(e)) == null ? void 0 : r.get(t);
}
function or(e) {
  var r, s;
  const t = typeof e;
  return t === "string" ? `"${e}"` : t === "number" || t === "bigint" || t === "boolean" ? `${e}` : t === "object" || t === "function" ? (e && ((s = (r = Object.getPrototypeOf(e)) == null ? void 0 : r.constructor) == null ? void 0 : s.name)) ?? "null" : t;
}
function ct(e, t, r, s, n) {
  const i = r.value, a = e.expects ?? null, c = or(i), o = {
    kind: e.kind,
    type: e.type,
    input: i,
    expected: a,
    received: c,
    message: `Invalid ${t}: ${a ? `Expected ${a} but r` : "R"}eceived ${c}`,
    requirement: e.requirement,
    path: n == null ? void 0 : n.path,
    issues: n == null ? void 0 : n.issues,
    lang: s.lang,
    abortEarly: s.abortEarly,
    abortPipeEarly: s.abortPipeEarly
  }, u = e.kind === "schema", l = e.message ?? Ps(e.reference, o.lang) ?? (u ? Os(o.lang) : null) ?? s.message ?? Ts(o.lang);
  l && (o.message = typeof l == "function" ? (
    // @ts-expect-error
    l(o)
  ) : l), u && (r.typed = !1), r.issues ? r.issues.push(o) : r.issues = [o];
}
function Cs(e, t) {
  const r = [...new Set(e)];
  return r.length > 1 ? `(${r.join(` ${t} `)})` : r[0] ?? "never";
}
function ar(e) {
  return {
    kind: "transformation",
    type: "transform",
    reference: ar,
    async: !1,
    operation: e,
    "~validate"(t) {
      return t.value = this.operation(t.value), t;
    }
  };
}
function Ss(e, t, r) {
  return typeof e.fallback == "function" ? (
    // @ts-expect-error
    e.fallback(t, r)
  ) : (
    // @ts-expect-error
    e.fallback
  );
}
function Ze(e, t) {
  return {
    ...e,
    fallback: t,
    "~validate"(r, s = ye()) {
      const n = e["~validate"](r, s);
      return n.issues ? { typed: !0, value: Ss(this, n, s) } : n;
    }
  };
}
function cr(e, t) {
  return {
    kind: "schema",
    type: "object",
    reference: cr,
    expects: "Object",
    async: !1,
    entries: e,
    message: t,
    "~standard": 1,
    "~vendor": "valibot",
    "~validate"(r, s = ye()) {
      var i;
      const n = r.value;
      if (n && typeof n == "object") {
        r.typed = !0, r.value = {};
        for (const a in this.entries) {
          const c = n[a], o = this.entries[a]["~validate"](
            { value: c },
            s
          );
          if (o.issues) {
            const u = {
              type: "object",
              origin: "value",
              input: n,
              key: a,
              value: c
            };
            for (const l of o.issues)
              l.path ? l.path.unshift(u) : l.path = [u], (i = r.issues) == null || i.push(l);
            if (r.issues || (r.issues = o.issues), s.abortEarly) {
              r.typed = !1;
              break;
            }
          }
          o.typed || (r.typed = !1), (o.value !== void 0 || a in n) && (r.value[a] = o.value);
        }
      } else
        ct(this, "type", r, s);
      return r;
    }
  };
}
function tt(e, t) {
  return {
    kind: "schema",
    type: "picklist",
    reference: tt,
    expects: Cs(e.map(or), "|"),
    async: !1,
    options: e,
    message: t,
    "~standard": 1,
    "~vendor": "valibot",
    "~validate"(r, s = ye()) {
      return this.options.includes(r.value) ? r.typed = !0 : ct(this, "type", r, s), r;
    }
  };
}
function rt(e) {
  return {
    kind: "schema",
    type: "string",
    reference: rt,
    expects: "string",
    async: !1,
    message: e,
    "~standard": 1,
    "~vendor": "valibot",
    "~validate"(t, r = ye()) {
      return typeof t.value == "string" ? t.typed = !0 : ct(this, "type", t, r), t;
    }
  };
}
function Is(...e) {
  return {
    ...e[0],
    pipe: e,
    "~validate"(t, r = ye()) {
      for (const s of e)
        if (s.kind !== "metadata") {
          if (t.issues && (s.kind === "schema" || s.kind === "transformation")) {
            t.typed = !1;
            break;
          }
          (!t.issues || !r.abortEarly && !r.abortPipeEarly) && (t = s["~validate"](t, r));
        }
      return t;
    }
  };
}
function $s(e, t, r) {
  const s = e["~validate"](
    { value: t },
    ye(r)
  );
  return {
    typed: s.typed,
    success: !s.issues,
    output: s.value,
    issues: s.issues
  };
}
async function Nt(e, t) {
  const r = { config: e };
  return r.status = t.status, r.statusText = t.statusText, r.headers = t.headers, e.responseType === "stream" ? (r.data = t.body, r) : t[e.responseType || "text"]().then((s) => {
    e.transformResponse ? (Array.isArray(e.transformResponse) ? e.transformResponse.map(
      (n) => s = n.call(e, s, t == null ? void 0 : t.headers, t == null ? void 0 : t.status)
    ) : s = e.transformResponse(s, t == null ? void 0 : t.headers, t == null ? void 0 : t.status), r.data = s) : (r.data = s, r.data = JSON.parse(s));
  }).catch(Object).then(() => r);
}
async function _s(e, t) {
  let r = null;
  if ("any" in AbortSignal) {
    const s = [];
    e.timeout && s.push(AbortSignal.timeout(e.timeout)), e.signal && s.push(e.signal), s.length > 0 && (t.signal = AbortSignal.any(s));
  } else
    e.timeout && (t.signal = AbortSignal.timeout(e.timeout));
  try {
    return r = await fetch(e.url, t), (e.validateStatus ? e.validateStatus(r.status) : r.ok) ? await Nt(e, r) : Promise.reject(
      new W(
        `Request failed with status code ${r == null ? void 0 : r.status}`,
        [W.ERR_BAD_REQUEST, W.ERR_BAD_RESPONSE][Math.floor((r == null ? void 0 : r.status) / 100) - 4],
        e,
        new Request(e.url, t),
        await Nt(e, r)
      )
    );
  } catch (s) {
    if (s.name === "AbortError" || s.name === "TimeoutError") {
      const n = s.name === "TimeoutError";
      return Promise.reject(
        n ? new W(
          e.timeoutErrorMessage || `timeout of ${e.timeout} ms exceeded`,
          W.ECONNABORTED,
          e,
          ee
        ) : new ks(null, e)
      );
    }
    return Promise.reject(
      new W(
        s.message,
        void 0,
        e,
        ee,
        void 0
      )
    );
  }
}
function lr(e) {
  let t = e.url || "";
  return e.baseURL && e.url && (t = e.url.replace(/^(?!.*\/\/)\/?/, `${e.baseURL}/`)), e.params && Object.keys(e.params).length > 0 && e.url && (t += (~e.url.indexOf("?") ? "&" : "?") + (e.paramsSerializer ? e.paramsSerializer(e.params) : new URLSearchParams(e.params))), t;
}
function ur(e, t) {
  const r = {
    ...t,
    ...e
  };
  return t != null && t.params && (e != null && e.params) && (r.params = {
    ...t == null ? void 0 : t.params,
    ...e == null ? void 0 : e.params
  }), t != null && t.headers && (e != null && e.headers) && (r.headers = new Headers(t.headers || {}), new Headers(e.headers || {}).forEach((n, i) => {
    r.headers.set(i, n);
  })), r;
}
function js(e, t) {
  const r = {
    ...t,
    ...e
  };
  return t != null && t.headers && (e != null && e.headers) && (r.headers = new Headers(t.headers || {}), new Headers(e.headers || {}).forEach((n, i) => {
    r.headers.set(i, n);
  })), r;
}
function Ls(e, t) {
  const r = t.get("content-type");
  return r ? r === "application/x-www-form-urlencoded" && !(e instanceof URLSearchParams) ? e = new URLSearchParams(e) : r === "application/json" && typeof e == "object" && (e = JSON.stringify(e)) : typeof e == "string" ? t.set("content-type", "text/plain") : e instanceof URLSearchParams ? t.set("content-type", "application/x-www-form-urlencoded") : e instanceof Blob || e instanceof ArrayBuffer || ArrayBuffer.isView(e) ? t.set("content-type", "application/octet-stream") : typeof e == "object" && typeof e.append != "function" && typeof e.text != "function" && (e = JSON.stringify(e), t.set("content-type", "application/json")), e;
}
async function ee(e, t, r, s, n, i) {
  var u;
  typeof e == "string" ? (t = t || {}, t.url = e) : t = e || {};
  const a = ur(t, r || {});
  if (a.fetchOptions = a.fetchOptions || {}, a.timeout = a.timeout || 0, a.headers = new Headers(a.headers || {}), a.transformRequest = a.transformRequest ?? Ls, i = i || a.data, a.transformRequest && i && (Array.isArray(a.transformRequest) ? a.transformRequest.map(
    (l) => i = l.call(a, i, a.headers)
  ) : i = a.transformRequest(i, a.headers)), a.url = lr(a), a.method = s || a.method || "get", n && n.request.handlers.length > 0) {
    const l = n.request.handlers.filter(
      (d) => !(d != null && d.runWhen) || typeof d.runWhen == "function" && d.runWhen(a)
    ).flatMap((d) => [d.fulfilled, d.rejected]);
    let h = a;
    for (let d = 0, g = l.length; d < g; d += 2) {
      const y = l[d], b = l[d + 1];
      try {
        y && (h = y(h));
      } catch (v) {
        b && (b == null || b(v));
        break;
      }
    }
  }
  const c = js(
    {
      method: (u = a.method) == null ? void 0 : u.toUpperCase(),
      body: i,
      headers: a.headers,
      credentials: a.withCredentials ? "include" : void 0,
      signal: a.signal
    },
    a.fetchOptions
  );
  let o = _s(a, c);
  if (n && n.response.handlers.length > 0) {
    const l = n.response.handlers.flatMap((h) => [
      h.fulfilled,
      h.rejected
    ]);
    for (let h = 0, d = l.length; h < d; h += 2)
      o = o.then(l[h], l[h + 1]);
  }
  return o;
}
var At = class {
  constructor() {
    p(this, "handlers", []);
    p(this, "use", (e, t, r) => (this.handlers.push({
      fulfilled: e,
      rejected: t,
      runWhen: r == null ? void 0 : r.runWhen
    }), this.handlers.length - 1));
    p(this, "eject", (e) => {
      this.handlers[e] && (this.handlers[e] = null);
    });
    p(this, "clear", () => {
      this.handlers = [];
    });
    this.handlers = [];
  }
};
function fr(e) {
  e = e || {};
  const t = {
    request: new At(),
    response: new At()
  }, r = (s, n) => ee(s, n, e, void 0, t);
  return r.defaults = e, r.interceptors = t, r.getUri = (s) => {
    const n = ur(s || {}, e);
    return lr(n);
  }, r.request = (s) => ee(s, void 0, e, void 0, t), ["get", "delete", "head", "options"].forEach((s) => {
    r[s] = (n, i) => ee(n, i, e, s, t);
  }), ["post", "put", "patch"].forEach((s) => {
    r[s] = (n, i, a) => ee(n, a, e, s, t, i);
  }), ["postForm", "putForm", "patchForm"].forEach((s) => {
    r[s] = (n, i, a) => (a = a || {}, a.headers = new Headers(a.headers || {}), a.headers.set("content-type", "application/x-www-form-urlencoded"), ee(
      n,
      a,
      e,
      s.replace("Form", ""),
      t,
      i
    ));
  }), r;
}
var I, W = (I = class extends Error {
  constructor(t, r, s, n, i) {
    super(t);
    p(this, "config");
    p(this, "code");
    p(this, "request");
    p(this, "response");
    p(this, "status");
    p(this, "isAxiosError");
    Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.name = "AxiosError", this.code = r, this.config = s, this.request = n, this.response = i, this.isAxiosError = !0;
  }
}, p(I, "ERR_BAD_OPTION_VALUE", "ERR_BAD_OPTION_VALUE"), p(I, "ERR_BAD_OPTION", "ERR_BAD_OPTION"), p(I, "ERR_NETWORK", "ERR_NETWORK"), p(I, "ERR_BAD_RESPONSE", "ERR_BAD_RESPONSE"), p(I, "ERR_BAD_REQUEST", "ERR_BAD_REQUEST"), p(I, "ERR_INVALID_URL", "ERR_INVALID_URL"), p(I, "ERR_CANCELED", "ERR_CANCELED"), p(I, "ECONNABORTED", "ECONNABORTED"), p(I, "ETIMEDOUT", "ETIMEDOUT"), I), ks = class extends W {
  constructor(e, t, r) {
    super(
      e || "canceled",
      W.ERR_CANCELED,
      t,
      r
    ), this.name = "CanceledError";
  }
};
function Fs(e) {
  return e !== null && typeof e == "object" && e.isAxiosError;
}
var hr = fr();
hr.create = (e) => fr(e);
var xt = hr, lt = {}, qe = {};
(function(e) {
  const t = ":A-Za-z_\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD", r = t + "\\-.\\d\\u00B7\\u0300-\\u036F\\u203F-\\u2040", s = "[" + t + "][" + r + "]*", n = new RegExp("^" + s + "$"), i = function(c, o) {
    const u = [];
    let l = o.exec(c);
    for (; l; ) {
      const h = [];
      h.startIndex = o.lastIndex - l[0].length;
      const d = l.length;
      for (let g = 0; g < d; g++)
        h.push(l[g]);
      u.push(h), l = o.exec(c);
    }
    return u;
  }, a = function(c) {
    const o = n.exec(c);
    return !(o === null || typeof o > "u");
  };
  e.isExist = function(c) {
    return typeof c < "u";
  }, e.isEmptyObject = function(c) {
    return Object.keys(c).length === 0;
  }, e.merge = function(c, o, u) {
    if (o) {
      const l = Object.keys(o), h = l.length;
      for (let d = 0; d < h; d++)
        u === "strict" ? c[l[d]] = [o[l[d]]] : c[l[d]] = o[l[d]];
    }
  }, e.getValue = function(c) {
    return e.isExist(c) ? c : "";
  }, e.isName = a, e.getAllMatches = i, e.nameRegexp = s;
})(qe);
const ut = qe, Bs = {
  allowBooleanAttributes: !1,
  //A tag can have attributes without any value
  unpairedTags: []
};
lt.validate = function(e, t) {
  t = Object.assign({}, Bs, t);
  const r = [];
  let s = !1, n = !1;
  e[0] === "\uFEFF" && (e = e.substr(1));
  for (let i = 0; i < e.length; i++)
    if (e[i] === "<" && e[i + 1] === "?") {
      if (i += 2, i = Tt(e, i), i.err) return i;
    } else if (e[i] === "<") {
      let a = i;
      if (i++, e[i] === "!") {
        i = Ot(e, i);
        continue;
      } else {
        let c = !1;
        e[i] === "/" && (c = !0, i++);
        let o = "";
        for (; i < e.length && e[i] !== ">" && e[i] !== " " && e[i] !== "	" && e[i] !== `
` && e[i] !== "\r"; i++)
          o += e[i];
        if (o = o.trim(), o[o.length - 1] === "/" && (o = o.substring(0, o.length - 1), i--), !Gs(o)) {
          let h;
          return o.trim().length === 0 ? h = "Invalid space after '<'." : h = "Tag '" + o + "' is an invalid name.", N("InvalidTag", h, O(e, i));
        }
        const u = qs(e, i);
        if (u === !1)
          return N("InvalidAttr", "Attributes for '" + o + "' have open quote.", O(e, i));
        let l = u.value;
        if (i = u.index, l[l.length - 1] === "/") {
          const h = i - l.length;
          l = l.substring(0, l.length - 1);
          const d = Pt(l, t);
          if (d === !0)
            s = !0;
          else
            return N(d.err.code, d.err.msg, O(e, h + d.err.line));
        } else if (c)
          if (u.tagClosed) {
            if (l.trim().length > 0)
              return N("InvalidTag", "Closing tag '" + o + "' can't have attributes or invalid starting.", O(e, a));
            if (r.length === 0)
              return N("InvalidTag", "Closing tag '" + o + "' has not been opened.", O(e, a));
            {
              const h = r.pop();
              if (o !== h.tagName) {
                let d = O(e, h.tagStartPos);
                return N(
                  "InvalidTag",
                  "Expected closing tag '" + h.tagName + "' (opened in line " + d.line + ", col " + d.col + ") instead of closing tag '" + o + "'.",
                  O(e, a)
                );
              }
              r.length == 0 && (n = !0);
            }
          } else return N("InvalidTag", "Closing tag '" + o + "' doesn't have proper closing.", O(e, i));
        else {
          const h = Pt(l, t);
          if (h !== !0)
            return N(h.err.code, h.err.msg, O(e, i - l.length + h.err.line));
          if (n === !0)
            return N("InvalidXml", "Multiple possible root nodes found.", O(e, i));
          t.unpairedTags.indexOf(o) !== -1 || r.push({ tagName: o, tagStartPos: a }), s = !0;
        }
        for (i++; i < e.length; i++)
          if (e[i] === "<")
            if (e[i + 1] === "!") {
              i++, i = Ot(e, i);
              continue;
            } else if (e[i + 1] === "?") {
              if (i = Tt(e, ++i), i.err) return i;
            } else
              break;
          else if (e[i] === "&") {
            const h = Ws(e, i);
            if (h == -1)
              return N("InvalidChar", "char '&' is not expected.", O(e, i));
            i = h;
          } else if (n === !0 && !Rt(e[i]))
            return N("InvalidXml", "Extra text at the end", O(e, i));
        e[i] === "<" && i--;
      }
    } else {
      if (Rt(e[i]))
        continue;
      return N("InvalidChar", "char '" + e[i] + "' is not expected.", O(e, i));
    }
  if (s) {
    if (r.length == 1)
      return N("InvalidTag", "Unclosed tag '" + r[0].tagName + "'.", O(e, r[0].tagStartPos));
    if (r.length > 0)
      return N("InvalidXml", "Invalid '" + JSON.stringify(r.map((i) => i.tagName), null, 4).replace(/\r?\n/g, "") + "' found.", { line: 1, col: 1 });
  } else return N("InvalidXml", "Start tag expected.", 1);
  return !0;
};
function Rt(e) {
  return e === " " || e === "	" || e === `
` || e === "\r";
}
function Tt(e, t) {
  const r = t;
  for (; t < e.length; t++)
    if (e[t] == "?" || e[t] == " ") {
      const s = e.substr(r, t - r);
      if (t > 5 && s === "xml")
        return N("InvalidXml", "XML declaration allowed only at the start of the document.", O(e, t));
      if (e[t] == "?" && e[t + 1] == ">") {
        t++;
        break;
      } else
        continue;
    }
  return t;
}
function Ot(e, t) {
  if (e.length > t + 5 && e[t + 1] === "-" && e[t + 2] === "-") {
    for (t += 3; t < e.length; t++)
      if (e[t] === "-" && e[t + 1] === "-" && e[t + 2] === ">") {
        t += 2;
        break;
      }
  } else if (e.length > t + 8 && e[t + 1] === "D" && e[t + 2] === "O" && e[t + 3] === "C" && e[t + 4] === "T" && e[t + 5] === "Y" && e[t + 6] === "P" && e[t + 7] === "E") {
    let r = 1;
    for (t += 8; t < e.length; t++)
      if (e[t] === "<")
        r++;
      else if (e[t] === ">" && (r--, r === 0))
        break;
  } else if (e.length > t + 9 && e[t + 1] === "[" && e[t + 2] === "C" && e[t + 3] === "D" && e[t + 4] === "A" && e[t + 5] === "T" && e[t + 6] === "A" && e[t + 7] === "[") {
    for (t += 8; t < e.length; t++)
      if (e[t] === "]" && e[t + 1] === "]" && e[t + 2] === ">") {
        t += 2;
        break;
      }
  }
  return t;
}
const Hs = '"', Ms = "'";
function qs(e, t) {
  let r = "", s = "", n = !1;
  for (; t < e.length; t++) {
    if (e[t] === Hs || e[t] === Ms)
      s === "" ? s = e[t] : s !== e[t] || (s = "");
    else if (e[t] === ">" && s === "") {
      n = !0;
      break;
    }
    r += e[t];
  }
  return s !== "" ? !1 : {
    value: r,
    index: t,
    tagClosed: n
  };
}
const Us = new RegExp(`(\\s*)([^\\s=]+)(\\s*=)?(\\s*(['"])(([\\s\\S])*?)\\5)?`, "g");
function Pt(e, t) {
  const r = ut.getAllMatches(e, Us), s = {};
  for (let n = 0; n < r.length; n++) {
    if (r[n][1].length === 0)
      return N("InvalidAttr", "Attribute '" + r[n][2] + "' has no space in starting.", Ne(r[n]));
    if (r[n][3] !== void 0 && r[n][4] === void 0)
      return N("InvalidAttr", "Attribute '" + r[n][2] + "' is without value.", Ne(r[n]));
    if (r[n][3] === void 0 && !t.allowBooleanAttributes)
      return N("InvalidAttr", "boolean attribute '" + r[n][2] + "' is not allowed.", Ne(r[n]));
    const i = r[n][2];
    if (!zs(i))
      return N("InvalidAttr", "Attribute '" + i + "' is an invalid name.", Ne(r[n]));
    if (!s.hasOwnProperty(i))
      s[i] = 1;
    else
      return N("InvalidAttr", "Attribute '" + i + "' is repeated.", Ne(r[n]));
  }
  return !0;
}
function Vs(e, t) {
  let r = /\d/;
  for (e[t] === "x" && (t++, r = /[\da-fA-F]/); t < e.length; t++) {
    if (e[t] === ";")
      return t;
    if (!e[t].match(r))
      break;
  }
  return -1;
}
function Ws(e, t) {
  if (t++, e[t] === ";")
    return -1;
  if (e[t] === "#")
    return t++, Vs(e, t);
  let r = 0;
  for (; t < e.length; t++, r++)
    if (!(e[t].match(/\w/) && r < 20)) {
      if (e[t] === ";")
        break;
      return -1;
    }
  return t;
}
function N(e, t, r) {
  return {
    err: {
      code: e,
      msg: t,
      line: r.line || r,
      col: r.col
    }
  };
}
function zs(e) {
  return ut.isName(e);
}
function Gs(e) {
  return ut.isName(e);
}
function O(e, t) {
  const r = e.substring(0, t).split(/\r?\n/);
  return {
    line: r.length,
    // column number is last line's length + 1, because column numbering starts at 1:
    col: r[r.length - 1].length + 1
  };
}
function Ne(e) {
  return e.startIndex + e[1].length;
}
var ft = {};
const dr = {
  preserveOrder: !1,
  attributeNamePrefix: "@_",
  attributesGroupName: !1,
  textNodeName: "#text",
  ignoreAttributes: !0,
  removeNSPrefix: !1,
  // remove NS from tag name or attribute name if true
  allowBooleanAttributes: !1,
  //a tag can have attributes without any value
  //ignoreRootElement : false,
  parseTagValue: !0,
  parseAttributeValue: !1,
  trimValues: !0,
  //Trim string values of tag and attributes
  cdataPropName: !1,
  numberParseOptions: {
    hex: !0,
    leadingZeros: !0,
    eNotation: !0
  },
  tagValueProcessor: function(e, t) {
    return t;
  },
  attributeValueProcessor: function(e, t) {
    return t;
  },
  stopNodes: [],
  //nested tags will not be parsed even for errors
  alwaysCreateTextNode: !1,
  isArray: () => !1,
  commentPropName: !1,
  unpairedTags: [],
  processEntities: !0,
  htmlEntities: !1,
  ignoreDeclaration: !1,
  ignorePiTags: !1,
  transformTagName: !1,
  transformAttributeName: !1,
  updateTag: function(e, t, r) {
    return e;
  }
  // skipEmptyListItem: false
}, Xs = function(e) {
  return Object.assign({}, dr, e);
};
ft.buildOptions = Xs;
ft.defaultOptions = dr;
class Ks {
  constructor(t) {
    this.tagname = t, this.child = [], this[":@"] = {};
  }
  add(t, r) {
    t === "__proto__" && (t = "#__proto__"), this.child.push({ [t]: r });
  }
  addChild(t) {
    t.tagname === "__proto__" && (t.tagname = "#__proto__"), t[":@"] && Object.keys(t[":@"]).length > 0 ? this.child.push({ [t.tagname]: t.child, ":@": t[":@"] }) : this.child.push({ [t.tagname]: t.child });
  }
}
var Ys = Ks;
const Zs = qe;
function Js(e, t) {
  const r = {};
  if (e[t + 3] === "O" && e[t + 4] === "C" && e[t + 5] === "T" && e[t + 6] === "Y" && e[t + 7] === "P" && e[t + 8] === "E") {
    t = t + 9;
    let s = 1, n = !1, i = !1, a = "";
    for (; t < e.length; t++)
      if (e[t] === "<" && !i) {
        if (n && en(e, t)) {
          t += 7;
          let c, o;
          [c, o, t] = Qs(e, t + 1), o.indexOf("&") === -1 && (r[nn(c)] = {
            regx: RegExp(`&${c};`, "g"),
            val: o
          });
        } else if (n && tn(e, t)) t += 8;
        else if (n && rn(e, t)) t += 8;
        else if (n && sn(e, t)) t += 9;
        else if (Ds) i = !0;
        else throw new Error("Invalid DOCTYPE");
        s++, a = "";
      } else if (e[t] === ">") {
        if (i ? e[t - 1] === "-" && e[t - 2] === "-" && (i = !1, s--) : s--, s === 0)
          break;
      } else e[t] === "[" ? n = !0 : a += e[t];
    if (s !== 0)
      throw new Error("Unclosed DOCTYPE");
  } else
    throw new Error("Invalid Tag instead of DOCTYPE");
  return { entities: r, i: t };
}
function Qs(e, t) {
  let r = "";
  for (; t < e.length && e[t] !== "'" && e[t] !== '"'; t++)
    r += e[t];
  if (r = r.trim(), r.indexOf(" ") !== -1) throw new Error("External entites are not supported");
  const s = e[t++];
  let n = "";
  for (; t < e.length && e[t] !== s; t++)
    n += e[t];
  return [r, n, t];
}
function Ds(e, t) {
  return e[t + 1] === "!" && e[t + 2] === "-" && e[t + 3] === "-";
}
function en(e, t) {
  return e[t + 1] === "!" && e[t + 2] === "E" && e[t + 3] === "N" && e[t + 4] === "T" && e[t + 5] === "I" && e[t + 6] === "T" && e[t + 7] === "Y";
}
function tn(e, t) {
  return e[t + 1] === "!" && e[t + 2] === "E" && e[t + 3] === "L" && e[t + 4] === "E" && e[t + 5] === "M" && e[t + 6] === "E" && e[t + 7] === "N" && e[t + 8] === "T";
}
function rn(e, t) {
  return e[t + 1] === "!" && e[t + 2] === "A" && e[t + 3] === "T" && e[t + 4] === "T" && e[t + 5] === "L" && e[t + 6] === "I" && e[t + 7] === "S" && e[t + 8] === "T";
}
function sn(e, t) {
  return e[t + 1] === "!" && e[t + 2] === "N" && e[t + 3] === "O" && e[t + 4] === "T" && e[t + 5] === "A" && e[t + 6] === "T" && e[t + 7] === "I" && e[t + 8] === "O" && e[t + 9] === "N";
}
function nn(e) {
  if (Zs.isName(e))
    return e;
  throw new Error(`Invalid entity name ${e}`);
}
var on = Js;
const an = /^[-+]?0x[a-fA-F0-9]+$/, cn = /^([\-\+])?(0*)([0-9]*(\.[0-9]*)?)$/, ln = {
  hex: !0,
  // oct: false,
  leadingZeros: !0,
  decimalPoint: ".",
  eNotation: !0
  //skipLike: /regex/
};
function un(e, t = {}) {
  if (t = Object.assign({}, ln, t), !e || typeof e != "string") return e;
  let r = e.trim();
  if (t.skipLike !== void 0 && t.skipLike.test(r)) return e;
  if (e === "0") return 0;
  if (t.hex && an.test(r))
    return hn(r, 16);
  if (r.search(/[eE]/) !== -1) {
    const s = r.match(/^([-\+])?(0*)([0-9]*(\.[0-9]*)?[eE][-\+]?[0-9]+)$/);
    if (s) {
      if (t.leadingZeros)
        r = (s[1] || "") + s[3];
      else if (!(s[2] === "0" && s[3][0] === ".")) return e;
      return t.eNotation ? Number(r) : e;
    } else
      return e;
  } else {
    const s = cn.exec(r);
    if (s) {
      const n = s[1], i = s[2];
      let a = fn(s[3]);
      if (!t.leadingZeros && i.length > 0 && n && r[2] !== ".") return e;
      if (!t.leadingZeros && i.length > 0 && !n && r[1] !== ".") return e;
      if (t.leadingZeros && i === e) return 0;
      {
        const c = Number(r), o = "" + c;
        return o.search(/[eE]/) !== -1 ? t.eNotation ? c : e : r.indexOf(".") !== -1 ? o === "0" && a === "" || o === a || n && o === "-" + a ? c : e : i ? a === o || n + a === o ? c : e : r === o || r === n + o ? c : e;
      }
    } else
      return e;
  }
}
function fn(e) {
  return e && e.indexOf(".") !== -1 && (e = e.replace(/0+$/, ""), e === "." ? e = "0" : e[0] === "." ? e = "0" + e : e[e.length - 1] === "." && (e = e.substr(0, e.length - 1))), e;
}
function hn(e, t) {
  if (parseInt) return parseInt(e, t);
  if (Number.parseInt) return Number.parseInt(e, t);
  if (window && window.parseInt) return window.parseInt(e, t);
  throw new Error("parseInt, Number.parseInt, window.parseInt are not supported");
}
var dn = un;
function pn(e) {
  return typeof e == "function" ? e : Array.isArray(e) ? (t) => {
    for (const r of e)
      if (typeof r == "string" && t === r || r instanceof RegExp && r.test(t))
        return !0;
  } : () => !1;
}
var pr = pn;
const gr = qe, Ae = Ys, gn = on, mn = dn, bn = pr;
let yn = class {
  constructor(t) {
    this.options = t, this.currentNode = null, this.tagsNodeStack = [], this.docTypeEntities = {}, this.lastEntities = {
      apos: { regex: /&(apos|#39|#x27);/g, val: "'" },
      gt: { regex: /&(gt|#62|#x3E);/g, val: ">" },
      lt: { regex: /&(lt|#60|#x3C);/g, val: "<" },
      quot: { regex: /&(quot|#34|#x22);/g, val: '"' }
    }, this.ampEntity = { regex: /&(amp|#38|#x26);/g, val: "&" }, this.htmlEntities = {
      space: { regex: /&(nbsp|#160);/g, val: " " },
      // "lt" : { regex: /&(lt|#60);/g, val: "<" },
      // "gt" : { regex: /&(gt|#62);/g, val: ">" },
      // "amp" : { regex: /&(amp|#38);/g, val: "&" },
      // "quot" : { regex: /&(quot|#34);/g, val: "\"" },
      // "apos" : { regex: /&(apos|#39);/g, val: "'" },
      cent: { regex: /&(cent|#162);/g, val: "¢" },
      pound: { regex: /&(pound|#163);/g, val: "£" },
      yen: { regex: /&(yen|#165);/g, val: "¥" },
      euro: { regex: /&(euro|#8364);/g, val: "€" },
      copyright: { regex: /&(copy|#169);/g, val: "©" },
      reg: { regex: /&(reg|#174);/g, val: "®" },
      inr: { regex: /&(inr|#8377);/g, val: "₹" },
      num_dec: { regex: /&#([0-9]{1,7});/g, val: (r, s) => String.fromCharCode(Number.parseInt(s, 10)) },
      num_hex: { regex: /&#x([0-9a-fA-F]{1,6});/g, val: (r, s) => String.fromCharCode(Number.parseInt(s, 16)) }
    }, this.addExternalEntities = En, this.parseXml = xn, this.parseTextData = wn, this.resolveNameSpace = vn, this.buildAttributesMap = An, this.isItStopNode = Pn, this.replaceEntitiesValue = Tn, this.readStopNodeData = Sn, this.saveTextToParentTag = On, this.addChild = Rn, this.ignoreAttributesFn = bn(this.options.ignoreAttributes);
  }
};
function En(e) {
  const t = Object.keys(e);
  for (let r = 0; r < t.length; r++) {
    const s = t[r];
    this.lastEntities[s] = {
      regex: new RegExp("&" + s + ";", "g"),
      val: e[s]
    };
  }
}
function wn(e, t, r, s, n, i, a) {
  if (e !== void 0 && (this.options.trimValues && !s && (e = e.trim()), e.length > 0)) {
    a || (e = this.replaceEntitiesValue(e));
    const c = this.options.tagValueProcessor(t, e, r, n, i);
    return c == null ? e : typeof c != typeof e || c !== e ? c : this.options.trimValues ? nt(e, this.options.parseTagValue, this.options.numberParseOptions) : e.trim() === e ? nt(e, this.options.parseTagValue, this.options.numberParseOptions) : e;
  }
}
function vn(e) {
  if (this.options.removeNSPrefix) {
    const t = e.split(":"), r = e.charAt(0) === "/" ? "/" : "";
    if (t[0] === "xmlns")
      return "";
    t.length === 2 && (e = r + t[1]);
  }
  return e;
}
const Nn = new RegExp(`([^\\s=]+)\\s*(=\\s*(['"])([\\s\\S]*?)\\3)?`, "gm");
function An(e, t, r) {
  if (this.options.ignoreAttributes !== !0 && typeof e == "string") {
    const s = gr.getAllMatches(e, Nn), n = s.length, i = {};
    for (let a = 0; a < n; a++) {
      const c = this.resolveNameSpace(s[a][1]);
      if (this.ignoreAttributesFn(c, t))
        continue;
      let o = s[a][4], u = this.options.attributeNamePrefix + c;
      if (c.length)
        if (this.options.transformAttributeName && (u = this.options.transformAttributeName(u)), u === "__proto__" && (u = "#__proto__"), o !== void 0) {
          this.options.trimValues && (o = o.trim()), o = this.replaceEntitiesValue(o);
          const l = this.options.attributeValueProcessor(c, o, t);
          l == null ? i[u] = o : typeof l != typeof o || l !== o ? i[u] = l : i[u] = nt(
            o,
            this.options.parseAttributeValue,
            this.options.numberParseOptions
          );
        } else this.options.allowBooleanAttributes && (i[u] = !0);
    }
    if (!Object.keys(i).length)
      return;
    if (this.options.attributesGroupName) {
      const a = {};
      return a[this.options.attributesGroupName] = i, a;
    }
    return i;
  }
}
const xn = function(e) {
  e = e.replace(/\r\n?/g, `
`);
  const t = new Ae("!xml");
  let r = t, s = "", n = "";
  for (let i = 0; i < e.length; i++)
    if (e[i] === "<")
      if (e[i + 1] === "/") {
        const c = te(e, ">", i, "Closing Tag is not closed.");
        let o = e.substring(i + 2, c).trim();
        if (this.options.removeNSPrefix) {
          const h = o.indexOf(":");
          h !== -1 && (o = o.substr(h + 1));
        }
        this.options.transformTagName && (o = this.options.transformTagName(o)), r && (s = this.saveTextToParentTag(s, r, n));
        const u = n.substring(n.lastIndexOf(".") + 1);
        if (o && this.options.unpairedTags.indexOf(o) !== -1)
          throw new Error(`Unpaired tag can not be used as closing tag: </${o}>`);
        let l = 0;
        u && this.options.unpairedTags.indexOf(u) !== -1 ? (l = n.lastIndexOf(".", n.lastIndexOf(".") - 1), this.tagsNodeStack.pop()) : l = n.lastIndexOf("."), n = n.substring(0, l), r = this.tagsNodeStack.pop(), s = "", i = c;
      } else if (e[i + 1] === "?") {
        let c = st(e, i, !1, "?>");
        if (!c) throw new Error("Pi Tag is not closed.");
        if (s = this.saveTextToParentTag(s, r, n), !(this.options.ignoreDeclaration && c.tagName === "?xml" || this.options.ignorePiTags)) {
          const o = new Ae(c.tagName);
          o.add(this.options.textNodeName, ""), c.tagName !== c.tagExp && c.attrExpPresent && (o[":@"] = this.buildAttributesMap(c.tagExp, n, c.tagName)), this.addChild(r, o, n);
        }
        i = c.closeIndex + 1;
      } else if (e.substr(i + 1, 3) === "!--") {
        const c = te(e, "-->", i + 4, "Comment is not closed.");
        if (this.options.commentPropName) {
          const o = e.substring(i + 4, c - 2);
          s = this.saveTextToParentTag(s, r, n), r.add(this.options.commentPropName, [{ [this.options.textNodeName]: o }]);
        }
        i = c;
      } else if (e.substr(i + 1, 2) === "!D") {
        const c = gn(e, i);
        this.docTypeEntities = c.entities, i = c.i;
      } else if (e.substr(i + 1, 2) === "![") {
        const c = te(e, "]]>", i, "CDATA is not closed.") - 2, o = e.substring(i + 9, c);
        s = this.saveTextToParentTag(s, r, n);
        let u = this.parseTextData(o, r.tagname, n, !0, !1, !0, !0);
        u == null && (u = ""), this.options.cdataPropName ? r.add(this.options.cdataPropName, [{ [this.options.textNodeName]: o }]) : r.add(this.options.textNodeName, u), i = c + 2;
      } else {
        let c = st(e, i, this.options.removeNSPrefix), o = c.tagName;
        const u = c.rawTagName;
        let l = c.tagExp, h = c.attrExpPresent, d = c.closeIndex;
        this.options.transformTagName && (o = this.options.transformTagName(o)), r && s && r.tagname !== "!xml" && (s = this.saveTextToParentTag(s, r, n, !1));
        const g = r;
        if (g && this.options.unpairedTags.indexOf(g.tagname) !== -1 && (r = this.tagsNodeStack.pop(), n = n.substring(0, n.lastIndexOf("."))), o !== t.tagname && (n += n ? "." + o : o), this.isItStopNode(this.options.stopNodes, n, o)) {
          let y = "";
          if (l.length > 0 && l.lastIndexOf("/") === l.length - 1)
            o[o.length - 1] === "/" ? (o = o.substr(0, o.length - 1), n = n.substr(0, n.length - 1), l = o) : l = l.substr(0, l.length - 1), i = c.closeIndex;
          else if (this.options.unpairedTags.indexOf(o) !== -1)
            i = c.closeIndex;
          else {
            const v = this.readStopNodeData(e, u, d + 1);
            if (!v) throw new Error(`Unexpected end of ${u}`);
            i = v.i, y = v.tagContent;
          }
          const b = new Ae(o);
          o !== l && h && (b[":@"] = this.buildAttributesMap(l, n, o)), y && (y = this.parseTextData(y, o, n, !0, h, !0, !0)), n = n.substr(0, n.lastIndexOf(".")), b.add(this.options.textNodeName, y), this.addChild(r, b, n);
        } else {
          if (l.length > 0 && l.lastIndexOf("/") === l.length - 1) {
            o[o.length - 1] === "/" ? (o = o.substr(0, o.length - 1), n = n.substr(0, n.length - 1), l = o) : l = l.substr(0, l.length - 1), this.options.transformTagName && (o = this.options.transformTagName(o));
            const y = new Ae(o);
            o !== l && h && (y[":@"] = this.buildAttributesMap(l, n, o)), this.addChild(r, y, n), n = n.substr(0, n.lastIndexOf("."));
          } else {
            const y = new Ae(o);
            this.tagsNodeStack.push(r), o !== l && h && (y[":@"] = this.buildAttributesMap(l, n, o)), this.addChild(r, y, n), r = y;
          }
          s = "", i = d;
        }
      }
    else
      s += e[i];
  return t.child;
};
function Rn(e, t, r) {
  const s = this.options.updateTag(t.tagname, r, t[":@"]);
  s === !1 || (typeof s == "string" && (t.tagname = s), e.addChild(t));
}
const Tn = function(e) {
  if (this.options.processEntities) {
    for (let t in this.docTypeEntities) {
      const r = this.docTypeEntities[t];
      e = e.replace(r.regx, r.val);
    }
    for (let t in this.lastEntities) {
      const r = this.lastEntities[t];
      e = e.replace(r.regex, r.val);
    }
    if (this.options.htmlEntities)
      for (let t in this.htmlEntities) {
        const r = this.htmlEntities[t];
        e = e.replace(r.regex, r.val);
      }
    e = e.replace(this.ampEntity.regex, this.ampEntity.val);
  }
  return e;
};
function On(e, t, r, s) {
  return e && (s === void 0 && (s = t.child.length === 0), e = this.parseTextData(
    e,
    t.tagname,
    r,
    !1,
    t[":@"] ? Object.keys(t[":@"]).length !== 0 : !1,
    s
  ), e !== void 0 && e !== "" && t.add(this.options.textNodeName, e), e = ""), e;
}
function Pn(e, t, r) {
  const s = "*." + r;
  for (const n in e) {
    const i = e[n];
    if (s === i || t === i) return !0;
  }
  return !1;
}
function Cn(e, t, r = ">") {
  let s, n = "";
  for (let i = t; i < e.length; i++) {
    let a = e[i];
    if (s)
      a === s && (s = "");
    else if (a === '"' || a === "'")
      s = a;
    else if (a === r[0])
      if (r[1]) {
        if (e[i + 1] === r[1])
          return {
            data: n,
            index: i
          };
      } else
        return {
          data: n,
          index: i
        };
    else a === "	" && (a = " ");
    n += a;
  }
}
function te(e, t, r, s) {
  const n = e.indexOf(t, r);
  if (n === -1)
    throw new Error(s);
  return n + t.length - 1;
}
function st(e, t, r, s = ">") {
  const n = Cn(e, t + 1, s);
  if (!n) return;
  let i = n.data;
  const a = n.index, c = i.search(/\s/);
  let o = i, u = !0;
  c !== -1 && (o = i.substring(0, c), i = i.substring(c + 1).trimStart());
  const l = o;
  if (r) {
    const h = o.indexOf(":");
    h !== -1 && (o = o.substr(h + 1), u = o !== n.data.substr(h + 1));
  }
  return {
    tagName: o,
    tagExp: i,
    closeIndex: a,
    attrExpPresent: u,
    rawTagName: l
  };
}
function Sn(e, t, r) {
  const s = r;
  let n = 1;
  for (; r < e.length; r++)
    if (e[r] === "<")
      if (e[r + 1] === "/") {
        const i = te(e, ">", r, `${t} is not closed`);
        if (e.substring(r + 2, i).trim() === t && (n--, n === 0))
          return {
            tagContent: e.substring(s, r),
            i
          };
        r = i;
      } else if (e[r + 1] === "?")
        r = te(e, "?>", r + 1, "StopNode is not closed.");
      else if (e.substr(r + 1, 3) === "!--")
        r = te(e, "-->", r + 3, "StopNode is not closed.");
      else if (e.substr(r + 1, 2) === "![")
        r = te(e, "]]>", r, "StopNode is not closed.") - 2;
      else {
        const i = st(e, r, ">");
        i && ((i && i.tagName) === t && i.tagExp[i.tagExp.length - 1] !== "/" && n++, r = i.closeIndex);
      }
}
function nt(e, t, r) {
  if (t && typeof e == "string") {
    const s = e.trim();
    return s === "true" ? !0 : s === "false" ? !1 : mn(e, r);
  } else
    return gr.isExist(e) ? e : "";
}
var In = yn, mr = {};
function $n(e, t) {
  return br(e, t);
}
function br(e, t, r) {
  let s;
  const n = {};
  for (let i = 0; i < e.length; i++) {
    const a = e[i], c = _n(a);
    let o = "";
    if (r === void 0 ? o = c : o = r + "." + c, c === t.textNodeName)
      s === void 0 ? s = a[c] : s += "" + a[c];
    else {
      if (c === void 0)
        continue;
      if (a[c]) {
        let u = br(a[c], t, o);
        const l = Ln(u, t);
        a[":@"] ? jn(u, a[":@"], o, t) : Object.keys(u).length === 1 && u[t.textNodeName] !== void 0 && !t.alwaysCreateTextNode ? u = u[t.textNodeName] : Object.keys(u).length === 0 && (t.alwaysCreateTextNode ? u[t.textNodeName] = "" : u = ""), n[c] !== void 0 && n.hasOwnProperty(c) ? (Array.isArray(n[c]) || (n[c] = [n[c]]), n[c].push(u)) : t.isArray(c, o, l) ? n[c] = [u] : n[c] = u;
      }
    }
  }
  return typeof s == "string" ? s.length > 0 && (n[t.textNodeName] = s) : s !== void 0 && (n[t.textNodeName] = s), n;
}
function _n(e) {
  const t = Object.keys(e);
  for (let r = 0; r < t.length; r++) {
    const s = t[r];
    if (s !== ":@") return s;
  }
}
function jn(e, t, r, s) {
  if (t) {
    const n = Object.keys(t), i = n.length;
    for (let a = 0; a < i; a++) {
      const c = n[a];
      s.isArray(c, r + "." + c, !0, !0) ? e[c] = [t[c]] : e[c] = t[c];
    }
  }
}
function Ln(e, t) {
  const { textNodeName: r } = t, s = Object.keys(e).length;
  return !!(s === 0 || s === 1 && (e[r] || typeof e[r] == "boolean" || e[r] === 0));
}
mr.prettify = $n;
const { buildOptions: kn } = ft, Fn = In, { prettify: Bn } = mr, Hn = lt;
let Mn = class {
  constructor(t) {
    this.externalEntities = {}, this.options = kn(t);
  }
  /**
   * Parse XML dats to JS object 
   * @param {string|Buffer} xmlData 
   * @param {boolean|Object} validationOption 
   */
  parse(t, r) {
    if (typeof t != "string") if (t.toString)
      t = t.toString();
    else
      throw new Error("XML data is accepted in String or Bytes[] form.");
    if (r) {
      r === !0 && (r = {});
      const i = Hn.validate(t, r);
      if (i !== !0)
        throw Error(`${i.err.msg}:${i.err.line}:${i.err.col}`);
    }
    const s = new Fn(this.options);
    s.addExternalEntities(this.externalEntities);
    const n = s.parseXml(t);
    return this.options.preserveOrder || n === void 0 ? n : Bn(n, this.options);
  }
  /**
   * Add Entity which is not by default supported by this library
   * @param {string} key 
   * @param {string} value 
   */
  addEntity(t, r) {
    if (r.indexOf("&") !== -1)
      throw new Error("Entity value can't have '&'");
    if (t.indexOf("&") !== -1 || t.indexOf(";") !== -1)
      throw new Error("An entity must be set without '&' and ';'. Eg. use '#xD' for '&#xD;'");
    if (r === "&")
      throw new Error("An entity with value '&' is not permitted");
    this.externalEntities[t] = r;
  }
};
var qn = Mn;
const Un = `
`;
function Vn(e, t) {
  let r = "";
  return t.format && t.indentBy.length > 0 && (r = Un), yr(e, t, "", r);
}
function yr(e, t, r, s) {
  let n = "", i = !1;
  for (let a = 0; a < e.length; a++) {
    const c = e[a], o = Wn(c);
    if (o === void 0) continue;
    let u = "";
    if (r.length === 0 ? u = o : u = `${r}.${o}`, o === t.textNodeName) {
      let y = c[o];
      zn(u, t) || (y = t.tagValueProcessor(o, y), y = Er(y, t)), i && (n += s), n += y, i = !1;
      continue;
    } else if (o === t.cdataPropName) {
      i && (n += s), n += `<![CDATA[${c[o][0][t.textNodeName]}]]>`, i = !1;
      continue;
    } else if (o === t.commentPropName) {
      n += s + `<!--${c[o][0][t.textNodeName]}-->`, i = !0;
      continue;
    } else if (o[0] === "?") {
      const y = Ct(c[":@"], t), b = o === "?xml" ? "" : s;
      let v = c[o][0][t.textNodeName];
      v = v.length !== 0 ? " " + v : "", n += b + `<${o}${v}${y}?>`, i = !0;
      continue;
    }
    let l = s;
    l !== "" && (l += t.indentBy);
    const h = Ct(c[":@"], t), d = s + `<${o}${h}`, g = yr(c[o], t, u, l);
    t.unpairedTags.indexOf(o) !== -1 ? t.suppressUnpairedNode ? n += d + ">" : n += d + "/>" : (!g || g.length === 0) && t.suppressEmptyNode ? n += d + "/>" : g && g.endsWith(">") ? n += d + `>${g}${s}</${o}>` : (n += d + ">", g && s !== "" && (g.includes("/>") || g.includes("</")) ? n += s + t.indentBy + g + s : n += g, n += `</${o}>`), i = !0;
  }
  return n;
}
function Wn(e) {
  const t = Object.keys(e);
  for (let r = 0; r < t.length; r++) {
    const s = t[r];
    if (e.hasOwnProperty(s) && s !== ":@")
      return s;
  }
}
function Ct(e, t) {
  let r = "";
  if (e && !t.ignoreAttributes)
    for (let s in e) {
      if (!e.hasOwnProperty(s)) continue;
      let n = t.attributeValueProcessor(s, e[s]);
      n = Er(n, t), n === !0 && t.suppressBooleanAttributes ? r += ` ${s.substr(t.attributeNamePrefix.length)}` : r += ` ${s.substr(t.attributeNamePrefix.length)}="${n}"`;
    }
  return r;
}
function zn(e, t) {
  e = e.substr(0, e.length - t.textNodeName.length - 1);
  let r = e.substr(e.lastIndexOf(".") + 1);
  for (let s in t.stopNodes)
    if (t.stopNodes[s] === e || t.stopNodes[s] === "*." + r) return !0;
  return !1;
}
function Er(e, t) {
  if (e && e.length > 0 && t.processEntities)
    for (let r = 0; r < t.entities.length; r++) {
      const s = t.entities[r];
      e = e.replace(s.regex, s.val);
    }
  return e;
}
var Gn = Vn;
const Xn = Gn, Kn = pr, Yn = {
  attributeNamePrefix: "@_",
  attributesGroupName: !1,
  textNodeName: "#text",
  ignoreAttributes: !0,
  cdataPropName: !1,
  format: !1,
  indentBy: "  ",
  suppressEmptyNode: !1,
  suppressUnpairedNode: !0,
  suppressBooleanAttributes: !0,
  tagValueProcessor: function(e, t) {
    return t;
  },
  attributeValueProcessor: function(e, t) {
    return t;
  },
  preserveOrder: !1,
  commentPropName: !1,
  unpairedTags: [],
  entities: [
    { regex: new RegExp("&", "g"), val: "&amp;" },
    //it must be on top
    { regex: new RegExp(">", "g"), val: "&gt;" },
    { regex: new RegExp("<", "g"), val: "&lt;" },
    { regex: new RegExp("'", "g"), val: "&apos;" },
    { regex: new RegExp('"', "g"), val: "&quot;" }
  ],
  processEntities: !0,
  stopNodes: [],
  // transformTagName: false,
  // transformAttributeName: false,
  oneListGroup: !1
};
function J(e) {
  this.options = Object.assign({}, Yn, e), this.options.ignoreAttributes === !0 || this.options.attributesGroupName ? this.isAttribute = function() {
    return !1;
  } : (this.ignoreAttributesFn = Kn(this.options.ignoreAttributes), this.attrPrefixLen = this.options.attributeNamePrefix.length, this.isAttribute = Qn), this.processTextOrObjNode = Zn, this.options.format ? (this.indentate = Jn, this.tagEndChar = `>
`, this.newLine = `
`) : (this.indentate = function() {
    return "";
  }, this.tagEndChar = ">", this.newLine = "");
}
J.prototype.build = function(e) {
  return this.options.preserveOrder ? Xn(e, this.options) : (Array.isArray(e) && this.options.arrayNodeName && this.options.arrayNodeName.length > 1 && (e = {
    [this.options.arrayNodeName]: e
  }), this.j2x(e, 0, []).val);
};
J.prototype.j2x = function(e, t, r) {
  let s = "", n = "";
  const i = r.join(".");
  for (let a in e)
    if (Object.prototype.hasOwnProperty.call(e, a))
      if (typeof e[a] > "u")
        this.isAttribute(a) && (n += "");
      else if (e[a] === null)
        this.isAttribute(a) || a === this.options.cdataPropName ? n += "" : a[0] === "?" ? n += this.indentate(t) + "<" + a + "?" + this.tagEndChar : n += this.indentate(t) + "<" + a + "/" + this.tagEndChar;
      else if (e[a] instanceof Date)
        n += this.buildTextValNode(e[a], a, "", t);
      else if (typeof e[a] != "object") {
        const c = this.isAttribute(a);
        if (c && !this.ignoreAttributesFn(c, i))
          s += this.buildAttrPairStr(c, "" + e[a]);
        else if (!c)
          if (a === this.options.textNodeName) {
            let o = this.options.tagValueProcessor(a, "" + e[a]);
            n += this.replaceEntitiesValue(o);
          } else
            n += this.buildTextValNode(e[a], a, "", t);
      } else if (Array.isArray(e[a])) {
        const c = e[a].length;
        let o = "", u = "";
        for (let l = 0; l < c; l++) {
          const h = e[a][l];
          if (!(typeof h > "u")) if (h === null)
            a[0] === "?" ? n += this.indentate(t) + "<" + a + "?" + this.tagEndChar : n += this.indentate(t) + "<" + a + "/" + this.tagEndChar;
          else if (typeof h == "object")
            if (this.options.oneListGroup) {
              const d = this.j2x(h, t + 1, r.concat(a));
              o += d.val, this.options.attributesGroupName && h.hasOwnProperty(this.options.attributesGroupName) && (u += d.attrStr);
            } else
              o += this.processTextOrObjNode(h, a, t, r);
          else if (this.options.oneListGroup) {
            let d = this.options.tagValueProcessor(a, h);
            d = this.replaceEntitiesValue(d), o += d;
          } else
            o += this.buildTextValNode(h, a, "", t);
        }
        this.options.oneListGroup && (o = this.buildObjectNode(o, a, u, t)), n += o;
      } else if (this.options.attributesGroupName && a === this.options.attributesGroupName) {
        const c = Object.keys(e[a]), o = c.length;
        for (let u = 0; u < o; u++)
          s += this.buildAttrPairStr(c[u], "" + e[a][c[u]]);
      } else
        n += this.processTextOrObjNode(e[a], a, t, r);
  return { attrStr: s, val: n };
};
J.prototype.buildAttrPairStr = function(e, t) {
  return t = this.options.attributeValueProcessor(e, "" + t), t = this.replaceEntitiesValue(t), this.options.suppressBooleanAttributes && t === "true" ? " " + e : " " + e + '="' + t + '"';
};
function Zn(e, t, r, s) {
  const n = this.j2x(e, r + 1, s.concat(t));
  return e[this.options.textNodeName] !== void 0 && Object.keys(e).length === 1 ? this.buildTextValNode(e[this.options.textNodeName], t, n.attrStr, r) : this.buildObjectNode(n.val, t, n.attrStr, r);
}
J.prototype.buildObjectNode = function(e, t, r, s) {
  if (e === "")
    return t[0] === "?" ? this.indentate(s) + "<" + t + r + "?" + this.tagEndChar : this.indentate(s) + "<" + t + r + this.closeTag(t) + this.tagEndChar;
  {
    let n = "</" + t + this.tagEndChar, i = "";
    return t[0] === "?" && (i = "?", n = ""), (r || r === "") && e.indexOf("<") === -1 ? this.indentate(s) + "<" + t + r + i + ">" + e + n : this.options.commentPropName !== !1 && t === this.options.commentPropName && i.length === 0 ? this.indentate(s) + `<!--${e}-->` + this.newLine : this.indentate(s) + "<" + t + r + i + this.tagEndChar + e + this.indentate(s) + n;
  }
};
J.prototype.closeTag = function(e) {
  let t = "";
  return this.options.unpairedTags.indexOf(e) !== -1 ? this.options.suppressUnpairedNode || (t = "/") : this.options.suppressEmptyNode ? t = "/" : t = `></${e}`, t;
};
J.prototype.buildTextValNode = function(e, t, r, s) {
  if (this.options.cdataPropName !== !1 && t === this.options.cdataPropName)
    return this.indentate(s) + `<![CDATA[${e}]]>` + this.newLine;
  if (this.options.commentPropName !== !1 && t === this.options.commentPropName)
    return this.indentate(s) + `<!--${e}-->` + this.newLine;
  if (t[0] === "?")
    return this.indentate(s) + "<" + t + r + "?" + this.tagEndChar;
  {
    let n = this.options.tagValueProcessor(t, e);
    return n = this.replaceEntitiesValue(n), n === "" ? this.indentate(s) + "<" + t + r + this.closeTag(t) + this.tagEndChar : this.indentate(s) + "<" + t + r + ">" + n + "</" + t + this.tagEndChar;
  }
};
J.prototype.replaceEntitiesValue = function(e) {
  if (e && e.length > 0 && this.options.processEntities)
    for (let t = 0; t < this.options.entities.length; t++) {
      const r = this.options.entities[t];
      e = e.replace(r.regex, r.val);
    }
  return e;
};
function Jn(e) {
  return this.options.indentBy.repeat(e);
}
function Qn(e) {
  return e.startsWith(this.options.attributeNamePrefix) && e !== this.options.textNodeName ? e.substr(this.attrPrefixLen) : !1;
}
var Dn = J;
const ei = lt, ti = qn, ri = Dn;
var si = {
  XMLParser: ti,
  XMLValidator: ei,
  XMLBuilder: ri
};
const ni = cr({
  q: rt(),
  orderBy: Ze(
    tt(["time", "size", "seeders", "relevance"]),
    "relevance"
  ),
  category: Ze(
    tt(["all", "movie", "audio", "doc", "app", "other"]),
    "all"
  ),
  page: Ze(Is(rt(), ar(Number)), 1)
});
function ii(e) {
  const t = new Date(e), r = t.getUTCFullYear(), s = (t.getUTCMonth() + 1).toString().padStart(2, "0"), n = t.getUTCDate().toString().padStart(2, "0"), i = t.getUTCHours().toString().padStart(2, "0"), a = t.getUTCMinutes().toString().padStart(2, "0"), c = t.getUTCSeconds().toString().padStart(2, "0");
  return `${r}-${s}-${n}T${i}:${a}:${c}Z`;
}
function oi(e) {
  const t = new URL(e);
  if (t.protocol !== "magnet:")
    throw new Error("Not a valid magnet link");
  const r = new URLSearchParams(t.search);
  r.forEach((n, i) => {
    i === "tr" && r.delete(i);
  });
  const s = `${t.protocol}${t.pathname}?${r.toString()}`;
  return decodeURIComponent(s);
}
function ai(e) {
  const t = /Found\D+(\d+)\D+items/m, r = e.match(t);
  return r ? Number(r[1]) : 0;
}
const wr = new Me({ strict: !1 });
wr.get("/", async (e) => {
  var a, c;
  const t = $s(ni, e.req.query());
  if (!t.success)
    return new Response(
      JSON.stringify({
        error: t.issues
      }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  const { q: r, page: s, orderBy: n, category: i } = t.output;
  try {
    const o = e.env.PROXY_URL ? {
      proxy: e.env.PROXY_URL
    } : {}, u = [
      xt.get("https://bt4gprx.com/search", {
        params: {
          q: r,
          p: s,
          orderby: n,
          category: i,
          page: "rss"
        },
        //@ts-ignore
        fetchOptions: o
      }),
      xt.get("https://bt4gprx.com/search", {
        params: {
          q: r,
          category: i,
          orderby: n
        },
        //@ts-ignore
        fetchOptions: o
      })
    ], l = await Promise.all(u), h = ai(l[l.length - 1].data), g = new si.XMLParser().parse(l[0].data);
    g.rss.channel.item && !Array.isArray(g.rss.channel.item) && (g.rss.channel.item = [g.rss.channel.item]);
    const y = (a = g.rss.channel.item) == null ? void 0 : a.map((b) => ({
      title: b.title,
      magnet: oi(b.link),
      link: b.guid,
      createdAt: ii(b.pubDate),
      size: b.description.split("<br>")[1]
    }));
    return e.json({
      torrents: y || [],
      meta: {
        total: h,
        page: s,
        pages: Math.ceil(h / 15)
      }
    });
  } catch (o) {
    if (Fs(o) && ((c = o.response) == null ? void 0 : c.status) === 404)
      return e.json({
        torrents: [],
        meta: {}
      });
    throw o;
  }
});
const ae = new Me({ strict: !1 });
ae.use("/debrid/*", async (e, t) => {
  const r = await ot(e.req.raw, e.env);
  if (r) return r;
  await t();
});
ae.use("/btsearch", async (e, t) => {
  const r = await ot(e.req.raw, e.env);
  if (r) return r;
  await t();
});
ae.route("/debrid", at);
ae.route("/btsearch", wr);
ae.get("/cors", async (e, t) => {
  const r = await ot(e.req.raw, e.env);
  if (r) return r;
  const s = e.req.query("link");
  if (!s)
    return e.text("No link provided", 400);
  const n = await fetch(s);
  return new Response(n.body, n);
});
ae.get("/health", async (e) => e.json({ status: "ok", timestamp: (/* @__PURE__ */ new Date()).toISOString() }));
const Ee = new Me({ strict: !1 }).basePath("/");
Ee.use(Ns());
Ee.use(
  "/api/*",
  hs({
    origin: "*",
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["*"],
    maxAge: 86400
  })
);
Ee.use("/api/*", (e, t) => (e.env = ds(e), t()));
Ee.route("/api", ae);
Ee.use("*", async (e, t) => {
  await t(), (e.req.path.startsWith("/assets") || e.req.path.startsWith("/fonts")) && e.header("Cache-Control", "public, max-age=31536000");
}).use(
  "*",
  mt({
    root: "./build/client"
  })
).use(
  "*",
  mt({
    path: "index.html",
    root: "./build/client"
  })
);
const mi = {
  port: Number(process.env.PORT) || 8080,
  fetch: Ee.fetch
};
export {
  mi as default
};
