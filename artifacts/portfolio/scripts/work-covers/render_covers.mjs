import { chromium } from "playwright";
const b = await chromium.launch({ channel: "chrome" });
const p = await b.newPage({ viewport: { width: 1640, height: 1000 }, deviceScaleFactor: 1 });
await p.goto("file:///Users/pc/Downloads/Pari/portfolio-site-work/.tmp/work/covers.html");
await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(800);
for (const el of await p.$$(".cover")) { const id = await el.getAttribute("id"); await el.screenshot({ path: `fr/cover-${id}.png` }); console.log(id); }
await b.close();
