import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { motionOff, useMotionOff } from "@/lib/motion-pref";
import { clock, shortPoster, shortSrc, type FeaturedGame, type Short } from "@/data/games";

// Shared by every control that sits on top of a video: no grey tap flash, no
// double-tap delay, no text selection on a long press.
const TOUCH = "touch-manipulation select-none [-webkit-tap-highlight-color:transparent]";
// The site-wide focus ring (index.css) applies; nothing local.
const RING = "";
const CHIP =
  "flex h-11 w-11 items-center justify-center rounded-full border-2 border-black bg-white text-black shadow-[3px_3px_0_#141414] transition-transform duration-150 ease-out";

// Only one Short plays at a time, so two soundtracks never overlap.
let stopCurrent: (() => void) | null = null;

/**
 * A vertical Short. Costs one small poster until someone shows intent: the
 * <video> is only mounted on the first hover or tap, so a page of Shorts
 * downloads no film on load. Hover previews it muted; a tap or click keeps it
 * playing, and a second one pauses it.
 */
export function ShortCard({ short }: { short: Short }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mounted, setMounted] = useState(false);
  const [wantPlay, setWantPlay] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [started, setStarted] = useState(false);
  const [muted, setMuted] = useState(true);
  const [failed, setFailed] = useState(false);
  const [posterOk, setPosterOk] = useState(true);
  const off = useMotionOff();
  const posterRef = useRef<HTMLImageElement>(null);

  // A poster that failed before hydration never fires React's onError.
  useEffect(() => {
    const img = posterRef.current;
    if (img && img.complete && img.naturalWidth === 0) setPosterOk(false);
  }, []);

  const stop = () => {
    setWantPlay(false);
    setPinned(false);
  };
  const stopRef = useRef(stop);
  stopRef.current = stop;

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (!wantPlay) {
      v.pause();
      return;
    }
    const mine = () => stopRef.current();
    if (stopCurrent && stopCurrent !== mine) stopCurrent();
    stopCurrent = mine;
    v.play().catch(() => stopRef.current());
    // Scrolled away: stop, so nothing plays (or is heard) off screen.
    const io = new IntersectionObserver(([e]) => !e.isIntersecting && stopRef.current(), { threshold: 0.15 });
    if (wrapRef.current) io.observe(wrapRef.current);
    return () => {
      io.disconnect();
      if (stopCurrent === mine) stopCurrent = null;
    };
  }, [wantPlay, mounted]);

  const toggle = () => {
    if (failed) return;
    setMounted(true);
    if (wantPlay && pinned) return stop();
    setWantPlay(true);
    setPinned(true);
  };
  const hoverIn = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || off || failed || pinned) return;
    setMounted(true);
    setWantPlay(true);
  };
  const hoverOut = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse" && !pinned) setWantPlay(false);
  };

  const paused = !(wantPlay && pinned);
  return (
    <article className="group flex gap-4 sm:gap-5 lg:block">
      <div
        ref={wrapRef}
        onPointerEnter={hoverIn}
        onPointerLeave={hoverOut}
        className="relative aspect-[9/16] w-36 shrink-0 overflow-hidden rounded-2xl border-2 border-black bg-[#141414] transition-shadow duration-200 ease-out group-hover:shadow-[6px_6px_0_#0015D4] sm:w-44 lg:w-auto"
      >
        {mounted && !failed && (
          <video
            ref={videoRef}
            src={shortSrc(short)}
            muted={muted}
            loop
            playsInline
            preload="metadata"
            onPlaying={() => setStarted(true)}
            onError={() => {
              setFailed(true);
              stop();
            }}
            className="absolute inset-0 h-full w-full object-cover"
            tabIndex={-1}
            aria-hidden
          />
        )}
        <button
          type="button"
          onClick={toggle}
          disabled={failed}
          aria-label={`${paused ? "Play" : "Pause"}: ${short.title}`}
          className={`absolute inset-0 h-full w-full ${TOUCH} ${RING} ${failed ? "cursor-default" : "cursor-pointer"}`}
          data-cursor-label={paused ? "Play" : "Pause"}
        >
          {posterOk && (
            <img
              ref={posterRef}
              src={shortPoster(short)}
              alt=""
              width={540}
              height={960}
              loading="lazy"
              decoding="async"
              onError={() => setPosterOk(false)}
              className={`h-full w-full object-cover transition-opacity duration-200 ease-out ${started ? "opacity-0" : "opacity-100"}`}
            />
          )}
          {!failed && (
            <span className={`absolute bottom-3 left-3 ${CHIP} group-active:scale-95`} aria-hidden>
              {paused ? <Play className="ml-0.5 h-4 w-4 fill-current" /> : <Pause className="h-4 w-4 fill-current" />}
            </span>
          )}
          <span className="absolute bottom-3 right-3 rounded-md bg-black/75 px-2 py-0.5 font-mono text-[11px] font-semibold tabular-nums text-white">
            {clock(short.seconds)}
          </span>
        </button>
        {short.hasAudio && started && !failed && (
          <button
            type="button"
            onClick={() => setMuted((m) => !m)}
            aria-label={muted ? `Turn sound on: ${short.title}` : `Turn sound off: ${short.title}`}
            aria-pressed={!muted}
            className={`absolute right-3 top-3 ${CHIP} ${TOUCH} ${RING} active:scale-95`}
          >
            {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </button>
        )}
      </div>
      <div className="min-w-0 flex-1 lg:mt-4">
        <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-primary">{short.tag}</p>
        <h3 className="mt-1.5 font-display text-lg font-extrabold leading-snug tracking-tight text-black [overflow-wrap:anywhere] md:text-xl">
          {short.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-body [overflow-wrap:anywhere]">{short.desc}</p>
      </div>
    </article>
  );
}

/** Rows with the film beside its text on small screens, four across on large ones. */
export function ShortList({ shorts, className = "" }: { shorts: Short[]; className?: string }) {
  if (shorts.length === 0) return null;
  return (
    <ul className={`grid gap-x-6 gap-y-8 md:grid-cols-2 lg:gap-y-12 ${className}`}>
      {shorts.map((s) => (
        <li key={s.slug} className="min-w-0">
          <ShortCard short={s} />
        </li>
      ))}
    </ul>
  );
}

/**
 * The gameplay film at the top of the page. Plays muted on a loop as soon as
 * the page is interactive, unless animations are off, in which case the still
 * stays up with a play control. Nothing here reads the browser during render:
 * the first paint is always the still, which is what the prerender wrote.
 */
export function FeaturedGameFilm({ game }: { game: FeaturedGame }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [failed, setFailed] = useState(false);
  const off = useMotionOff();

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (motionOff()) {
      v.pause();
      return;
    }
    v.play().catch(() => {});
    // Off screen it rests, and picks up again when it scrolls back.
    const io = new IntersectionObserver(
      ([e]) => {
        if (motionOff()) return;
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.2 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [off]);

  // Before the gameplay film exists, the still stands in, and it opens the game when it is hosted.
  if (!game.videoSrc || failed) {
    if (!game.poster) return null;
    const still = (
      <img
        src={game.poster}
        alt={`${game.name}: Mac runs with the T-rex behind him`}
        width={1200}
        height={630}
        loading="eager"
        className="absolute inset-0 h-full w-full object-cover"
      />
    );
    const frame = "game-film relative block aspect-video overflow-hidden rounded-2xl border-2 border-black bg-[#141414] shadow-[8px_8px_0_#0015D4]";
    return game.playUrl ? (
      <a
        href={game.playUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Play ${game.name} in your browser`}
        className={`${frame} group ${TOUCH} ${RING}`}
      >
        {still}
        <span className={`absolute bottom-3 left-3 ${CHIP} group-active:scale-95`}>
          <Play className="ml-0.5 h-4 w-4 fill-current" />
        </span>
      </a>
    ) : (
      <div className={frame}>{still}</div>
    );
  }
  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) v.play().catch(() => {});
    else v.pause();
  };

  return (
    <div className="game-film relative aspect-video overflow-hidden rounded-2xl border-2 border-black bg-[#141414] shadow-[8px_8px_0_#0015D4]">
      <video
        ref={videoRef}
        src={game.videoSrc}
        poster={game.poster || undefined}
        muted={muted}
        loop
        playsInline
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onError={() => setFailed(true)}
        aria-label={`${game.name}: gameplay film`}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute bottom-3 left-3 flex gap-2">
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? `Pause the ${game.name} film` : `Play the ${game.name} film`}
          className={`${CHIP} ${TOUCH} ${RING} active:scale-95`}
        >
          {playing ? <Pause className="h-4 w-4 fill-current" /> : <Play className="ml-0.5 h-4 w-4 fill-current" />}
        </button>
        {game.hasAudio && (
          <button
            type="button"
            onClick={() => setMuted((m) => !m)}
            aria-label={muted ? "Turn sound on" : "Turn sound off"}
            aria-pressed={!muted}
            className={`${CHIP} ${TOUCH} ${RING} active:scale-95`}
          >
            {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </button>
        )}
      </div>
    </div>
  );
}

/** Name, one paragraph and the play link for the featured game. The link is hidden until the game is hosted. */
export function FeaturedGameText({ game }: { game: FeaturedGame }) {
  return (
    <div>
      <p className="font-mono text-xs font-bold uppercase tracking-widest text-primary">{game.kind}</p>
      <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-black md:text-4xl">{game.name}</h2>
      <p className="mt-3 max-w-xl leading-relaxed text-ink-body">{game.desc}</p>
      <ul className="mt-4 flex flex-wrap gap-2" aria-label="Built with">
        {game.stack.map((s) => (
          <li key={s} className="rounded-md border border-black/15 bg-white px-2.5 py-1 text-xs font-medium text-ink-body">
            {s}
          </li>
        ))}
      </ul>
      {game.playUrl && (
        <a
          href={game.playUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-6 inline-flex h-14 items-center gap-2 whitespace-nowrap rounded-full bg-black px-7 font-display text-[15px] font-bold text-white transition-[background-color,transform] duration-150 ease-out hover:bg-primary active:scale-[0.97] md:text-base ${TOUCH} ${RING}`}
        >
          Play it in your browser <ArrowUpRight className="h-5 w-5" />
        </a>
      )}
    </div>
  );
}
