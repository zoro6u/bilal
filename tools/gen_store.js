// Generate Google Play store assets: phone screenshots + feature graphic.
// Usage: node tools/gen_store.js   (run from project root; needs playwright)
const { chromium } = require("playwright");
const http = require("http");
const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const OUT = path.join(ROOT, "store");
fs.mkdirSync(OUT, { recursive: true });

const MIME = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css",
  ".json": "application/json", ".png": "image/png", ".mp3": "audio/mpeg", ".svg": "image/svg+xml" };

function serve(dir, port) {
  return new Promise((resolve) => {
    const srv = http.createServer((req, res) => {
      let p = decodeURIComponent(req.url.split("?")[0]);
      if (p === "/") p = "/index.html";
      const fp = path.join(dir, p);
      fs.readFile(fp, (err, data) => {
        if (err) { res.writeHead(404); res.end("404"); return; }
        res.writeHead(200, { "Content-Type": MIME[path.extname(fp)] || "application/octet-stream" });
        res.end(data);
      });
    });
    srv.listen(port, () => resolve(srv));
  });
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  const srv = await serve(ROOT, 8123);
  const browser = await chromium.launch();

  // ---- phone screenshots (1080x1920) ----
  const ctx = await browser.newContext({
    viewport: { width: 432, height: 768 },
    deviceScaleFactor: 2.5,                 // -> 1080x1920 output
    locale: "ar",
    permissions: ["geolocation"],
    geolocation: { latitude: 30.0444, longitude: 31.2357 }, // Cairo (meaningful Qibla bearing/distance)
  });
  const page = await ctx.newPage();
  await page.goto("http://localhost:8123/index.html", { waitUntil: "networkidle" });
  await sleep(3500); // let prayer times + qibla resolve

  const shot = async (name) => { await page.screenshot({ path: path.join(OUT, name) }); console.log("  •", name); };

  await shot("01-times.png");
  await page.click('.tab[data-tab="morning"]'); await sleep(400); await shot("02-morning.png");
  await page.click('.tab[data-tab="qibla"]');   await sleep(600); await shot("03-qibla.png");
  await page.click('.tab[data-tab="after"]');   await sleep(400); await shot("04-after.png");

  // English variant for one shot
  await page.click("#langToggle"); await sleep(900);
  await page.click('.tab[data-tab="evening"]'); await sleep(400); await shot("05-evening-en.png");

  await ctx.close();

  // ---- feature graphic (1024x500) ----
  const fctx = await browser.newContext({ viewport: { width: 1024, height: 500 }, deviceScaleFactor: 1 });
  const fpage = await fctx.newPage();
  await fpage.goto("http://localhost:8123/tools/store/feature.html", { waitUntil: "networkidle" });
  await sleep(600);
  await fpage.screenshot({ path: path.join(OUT, "feature-graphic-1024x500.png") });
  console.log("  • feature-graphic-1024x500.png");
  await fctx.close();

  await browser.close();
  srv.close();
  console.log("Store assets written to store/");
})();
