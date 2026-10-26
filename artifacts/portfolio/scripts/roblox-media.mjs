// Pulls public metadata and a thumbnail for published Roblox games, so the
// Roblox gallery on /services/roblox can be filled from real game pages.
//
//   node scripts/roblox-media.mjs <roblox.com game url> [<url> ...]
//
// Writes public/roblox/NN-<kebab-name>.jpg and prints a ready-to-paste
// robloxProjects entry per game. Visits and player counts are printed for
// reference only and must never be copied into site copy.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.resolve(here, "../public/roblox");
const UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) denvernocode-roblox-media/1.0";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function get(url, as = "json", attempt = 1) {
  const res = await fetch(url, { headers: { "User-Agent": UA, Accept: as === "json" ? "application/json" : "*/*" } });
  if (res.status === 429 && attempt <= 4) {
    const wait = 2000 * attempt;
    console.warn(`429 from ${url}, waiting ${wait}ms`);
    await sleep(wait);
    return get(url, as, attempt + 1);
  }
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${url}`);
  return as === "json" ? res.json() : Buffer.from(await res.arrayBuffer());
}

const kebab = (s) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);

const firstSentence = (s) =>
  (s || "")
    .replace(/[\u2014\u2013]/g, ",")
    .replace(/[\p{Extended_Pictographic}️]/gu, "")
    .replace(/\s+/g, " ")
    .trim()
    .split(/(?<=[.!?])\s/)[0]
    .slice(0, 110);

async function thumbnails(universeId) {
  for (let i = 0; i < 5; i++) {
    const r = await get(
      `https://thumbnails.roblox.com/v1/games/multiget/thumbnails?universeIds=${universeId}&countPerUniverse=10&defaults=true&size=768x432&format=Jpeg`,
    );
    const list = r.data?.[0]?.thumbnails || [];
    const done = list.filter((t) => t.state === "Completed" && t.imageUrl);
    if (done.length || !list.some((t) => t.state === "Pending")) return done;
    await sleep(2000);
  }
  return [];
}

const urls = process.argv.slice(2);
if (!urls.length) {
  console.error("Usage: node scripts/roblox-media.mjs <roblox.com game url> [...]");
  process.exit(1);
}
fs.mkdirSync(outDir, { recursive: true });

const entries = [];
for (const [i, url] of urls.entries()) {
  const m = url.match(/games\/(\d+)/);
  if (!m) throw new Error(`No place id in ${url}`);
  const placeId = m[1];
  const { universeId } = await get(`https://apis.roblox.com/universes/v1/places/${placeId}/universe`);
  if (!universeId) throw new Error(`No universe for place ${placeId}`);
  const game = (await get(`https://games.roblox.com/v1/games?universeIds=${universeId}`)).data?.[0];
  if (!game) throw new Error(`No game data for universe ${universeId}`);

  const nn = String(i + 1).padStart(2, "0");
  const slug = `${nn}-${kebab(game.name)}`;
  const thumbs = await thumbnails(universeId);
  if (!thumbs.length) console.warn(`No completed thumbnails for ${game.name}`);
  for (const [k, t] of thumbs.slice(0, 3).entries()) {
    const file = path.join(outDir, k === 0 ? `${slug}.jpg` : `${slug}-${k + 1}.jpg`);
    fs.writeFileSync(file, await get(t.imageUrl, "buffer"));
    console.log(`saved ${path.relative(process.cwd(), file)}`);
  }

  console.log(`\n${game.name}`);
  console.log(`  creator: ${game.creator?.name} (${game.creator?.type})   genre: ${game.genre}   created: ${game.created?.slice(0, 10)}   updated: ${game.updated?.slice(0, 10)}`);
  console.log(`  reference only, do not publish: visits ${game.visits}, playing ${game.playing}`);

  entries.push(
    `  {\n` +
      `    slug: "${slug}",\n` +
      `    name: ${JSON.stringify(game.name)},\n` +
      `    kind: "",\n` +
      `    desc: ${JSON.stringify(firstSentence(game.description))},\n` +
      `    stack: ["Roblox Studio", "Luau", "DataStore"],\n` +
      "    img: `${BASE}/roblox/" + slug + ".jpg`,\n" +
      `    href: "https://www.roblox.com/games/${game.rootPlaceId}",\n` +
      `  },`,
  );
}

console.log("\n// Paste into robloxProjects in src/data/portfolio.ts, then fill kind and rewrite desc by hand:\n");
console.log(entries.join("\n"));
