// Service worker for Mac vs the Rex. vite.config.js fills in the file lists and versions at
// build time and writes the result to dist/sw.js.
//
// The page itself is fetched from the network first, so a reload always picks up a new build.
// Everything else (hashed scripts and styles, icons, models, sound) is served from the cache first.
// Models and sound have their own cache, keyed by their contents, so a new build that did not
// change them does not download them again. They are not part of the install step: the page
// asks for them to be kept once it is up and running.

const SHELL_CACHE = 'mac-rex-shell-6beabda7800a';
const MEDIA_CACHE = 'mac-rex-media-9cae71e8b9ed';
const SHELL = ["./","assets/index-CdhRP9G3.js","assets/index-DgJhSlYc.css","icons/apple-touch-icon.png","icons/icon-192.png","icons/icon-512.png","icons/icon-maskable-512.png","index.html","manifest.webmanifest"];
const MEDIA = ["assets/audio/adrenaline_full.mp3","assets/audio/boulder_impact.mp3","assets/audio/boulder_roll_pass.mp3","assets/audio/boulder_rumble_loop.mp3","assets/audio/boulder_rumble_warn.mp3","assets/audio/bridge_creak_warn.mp3","assets/audio/caught.mp3","assets/audio/closecall_ding.mp3","assets/audio/fall_scream_short.mp3","assets/audio/floor_collapse.mp3","assets/audio/floor_crack_warn.mp3","assets/audio/footstep_dirt_1.mp3","assets/audio/footstep_dirt_2.mp3","assets/audio/footstep_dirt_3.mp3","assets/audio/footstep_dirt_4.mp3","assets/audio/footstep_tar_1.mp3","assets/audio/footstep_tar_2.mp3","assets/audio/footstep_wood_1.mp3","assets/audio/footstep_wood_2.mp3","assets/audio/footstep_wood_3.mp3","assets/audio/gameover_sting.mp3","assets/audio/geyser_blast.mp3","assets/audio/geyser_hiss_warn.mp3","assets/audio/heartbeat_loop.mp3","assets/audio/hit_body.mp3","assets/audio/jump.mp3","assets/audio/jungle_ambience_loop.mp3","assets/audio/land.mp3","assets/audio/log_creak_warn.mp3","assets/audio/log_swing_whoosh.mp3","assets/audio/manifest.json","assets/audio/music_chase_calm.mp3","assets/audio/music_chase_intense.mp3","assets/audio/music_menu_loop.mp3","assets/audio/nearmiss_slowmo_in.mp3","assets/audio/nearmiss_slowmo_out.mp3","assets/audio/new_best_sting.mp3","assets/audio/pickup_amber_1.mp3","assets/audio/pickup_amber_2.mp3","assets/audio/pickup_amber_3.mp3","assets/audio/plank_snap_1.mp3","assets/audio/plank_snap_2.mp3","assets/audio/plank_snap_3.mp3","assets/audio/ptero_screech_warn.mp3","assets/audio/ptero_swoop_whoosh.mp3","assets/audio/raptor_bush_rustle_warn.mp3","assets/audio/raptor_call.mp3","assets/audio/raptor_leap.mp3","assets/audio/rex_bite.mp3","assets/audio/rex_breath_loop.mp3","assets/audio/rex_footstep_heavy_1.mp3","assets/audio/rex_footstep_heavy_2.mp3","assets/audio/rex_footstep_heavy_3.mp3","assets/audio/rex_roar_1.mp3","assets/audio/rex_roar_2.mp3","assets/audio/rex_snarl.mp3","assets/audio/rope_snap.mp3","assets/audio/slide.mp3","assets/audio/sprint_start.mp3","assets/audio/stumble.mp3","assets/audio/tar_bubble_warn.mp3","assets/audio/tar_splash.mp3","assets/audio/tree_crack.mp3","assets/audio/tree_fall.mp3","assets/audio/ui_start.mp3","assets/audio/ui_tap.mp3","assets/audio/wind_loop.mp3","assets/mac.glb","assets/pterosaur.glb","assets/raptor.glb","assets/rex.glb"];

self.addEventListener('install', (event) => {
  event.waitUntil(precacheShell().then(() => self.skipWaiting()));
});

async function precacheShell() {
  const cache = await caches.open(SHELL_CACHE);
  await cache.addAll(SHELL.map((url) => new Request(url, { cache: 'reload' })));
}

self.addEventListener('activate', (event) => {
  event.waitUntil(dropOldCaches().then(() => self.clients.claim()));
});

async function dropOldCaches() {
  const keep = new Set([SHELL_CACHE, MEDIA_CACHE]);
  const names = await caches.keys();
  await Promise.all(names.filter((name) => name.startsWith('mac-rex-') && !keep.has(name)).map((name) => caches.delete(name)));
}

// The page asks for this once its own model downloads have finished, so the first visit
// does not fetch the models twice at the same time. Sound files come along here too.
self.addEventListener('message', (event) => {
  if (event.data === 'cache-models') event.waitUntil(cacheMedia());
});

async function cacheMedia() {
  const cache = await caches.open(MEDIA_CACHE);
  for (const url of MEDIA) {
    if (!(await cache.match(url))) await cache.add(url).catch(() => {});
  }
}

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET' || !request.url.startsWith(self.registration.scope)) return;
  event.respondWith(request.mode === 'navigate' ? pageFirstFromNetwork(request) : cacheFirst(request));
});

async function pageFirstFromNetwork(request) {
  try {
    const response = await fetch(request);
    if (response.ok) (await caches.open(SHELL_CACHE)).put('./', response.clone());
    return response;
  } catch {
    return (await caches.match('./')) || (await caches.match('index.html')) || Response.error();
  }
}

function isMedia(url) {
  return url.endsWith('.glb') || url.includes('/assets/audio/');
}

async function cacheFirst(request) {
  const cached = await caches.match(request, { ignoreSearch: true });
  if (cached) return cached;
  const response = await fetch(request);
  if (response.ok && isMedia(request.url)) (await caches.open(MEDIA_CACHE)).put(request, response.clone());
  return response;
}
