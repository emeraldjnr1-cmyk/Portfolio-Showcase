// ── Game development page: /game-development ──
// Every line here describes something that exists on disk. The Roblox concept
// demos stay in data/portfolio.ts and keep their "Concept demo" label; nothing
// on this page is a published Roblox game. Client work never names the client.

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");
const file = (slug: string) => `${BASE}/videos/games/${slug}.mp4`;
const still = (slug: string) => `${BASE}/videos/games/posters/${slug}.jpg`;

/** First published on the site, for video structured data. */
export const GAMES_PUBLISHED = "2026-11-24";

export interface FeaturedGame {
  name: string;
  kind: string;
  desc: string;
  stack: string[];
  /** Gameplay film, e.g. `${BASE}/videos/games/mac-vs-the-rex.mp4`. Empty hides the whole block. */
  videoSrc: string;
  /** Still shown before the film loads, and instead of it when motion is off. */
  poster: string;
  /** Where the game can be played. Empty hides the button. */
  playUrl: string;
  seconds: number;
  hasAudio: boolean;
}

// To launch the feature: put the film at public/videos/games/mac-vs-the-rex.mp4
// and its still at public/videos/games/posters/mac-vs-the-rex.jpg, then set
// videoSrc to file("mac-vs-the-rex"), poster to still("mac-vs-the-rex"),
// seconds to the film's length and playUrl to the hosted game. Until videoSrc
// is set the block is not rendered and is left out of the structured data.
export const featuredGame: FeaturedGame = {
  name: "Mac vs the Rex",
  kind: "Original browser game",
  desc: "A 3D endless runner built for the browser with three.js. A T-rex chases Mac through a prehistoric jungle, and the run gets faster the longer you last.",
  stack: ["three.js", "Runs in the browser", "Endless runner"],
  videoSrc: "",
  poster: still("mac-vs-the-rex"),
  playUrl: `${BASE}/play/mac-vs-the-rex/`,
  seconds: 35,
  hasAudio: false,
};

export interface Short {
  slug: string;
  title: string;
  desc: string;
  tag: string;
  seconds: number;
  /** False for silent clips, which get no sound control. */
  hasAudio: boolean;
}

export const shortSrc = (s: Short) => file(s.slug);
export const shortPoster = (s: Short) => still(s.slug);
export const clock = (seconds: number) => `${Math.floor(seconds / 60)}:${String(Math.round(seconds % 60)).padStart(2, "0")}`;

/** One story told across two Shorts. */
export const storyShorts: Short[] = [
  {
    slug: "hair-colour-story",
    title: "The hair colour story",
    desc: "In this world your hair shows your mood. Green means happy, red means angry, and one morning somebody wakes up gold.",
    tag: "Part one",
    seconds: 30,
    hasAudio: true,
  },
  {
    slug: "hair-colour-story-part-2",
    title: "The hair colour story, part two",
    desc: "The town reacts to the gold hair, and the gold stays. A full minute that picks up where part one stopped.",
    tag: "Part two",
    seconds: 64,
    hasAudio: true,
  },
];

/** Four different formats, one Short each. */
export const formatShorts: Short[] = [
  {
    slug: "body-secret-army",
    title: "Your body's secret army",
    desc: "What happens after a cut: white blood cells charge the germs, the gap gets plugged and the scab falls off.",
    tag: "Science explainer",
    seconds: 62,
    hasAudio: true,
  },
  {
    slug: "molasses-flood",
    title: "The molasses flood",
    desc: "Boston, 15 January 1919. A badly built tank fails beside the elevated railway, told in sepia on a period street.",
    tag: "History",
    seconds: 65,
    hasAudio: true,
  },
  {
    slug: "three-am-knock",
    title: "The 3am knock",
    desc: "Someone knocks at 3am and sounds exactly like mum. The message on the phone says mum is on the night shift.",
    tag: "Horror",
    seconds: 61,
    hasAudio: true,
  },
  {
    slug: "one-jump-better",
    title: "One jump better",
    desc: "The chat laughs when Max falls on stage one of an obby. He slows down and finishes without a single fall.",
    tag: "Motivation",
    seconds: 65,
    hasAudio: true,
  },
];

export const clientShorts: Short[] = [
  {
    slug: "hug-swap-story",
    title: "The hug swap story",
    desc: "A story Short that starts with a hug and follows two people around a school and a town square. Voiceover and captions included.",
    tag: "Client work",
    seconds: 103,
    hasAudio: true,
  },
  {
    slug: "style-test-town",
    title: "Style test: daytime town",
    desc: "A bright street of colour-coded characters that ends with a giant hand turning the whole town like a puzzle cube.",
    tag: "Client work",
    seconds: 15,
    hasAudio: false,
  },
  {
    slug: "style-test-mannequins",
    title: "Style test: mannequins",
    desc: "A dark shop aisle lined with mannequins, an exit sign in the distance and a flashlight with 3% battery left.",
    tag: "Client work",
    seconds: 15,
    hasAudio: false,
  },
];

export const allShorts: Short[] = [...storyShorts, ...formatShorts, ...clientShorts];
