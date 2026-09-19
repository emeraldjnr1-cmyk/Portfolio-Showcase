import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

export type HeroBgVariant = "paths" | "dots" | "nodes";

const INK = "20,20,20";
const COBALT = "0,21,212";

/**
 * Motion only where it is cheap: desktop, a real mouse, motion allowed.
 * Phones get a still frame. Same gate VelocitySkew uses, for the same reason:
 * we spent a whole pass removing per-frame cost from mobile scrolling.
 */
function useMotionAllowed() {
  const reduced = useReducedMotion();
  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px) and (pointer: fine)");
    const apply = () => setDesktop(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);
  return desktop && !reduced;
}

// ── Variant 1: flowing ink paths, like a workflow drawn in pencil ──────────
function FlowingPaths({ animate }: { animate: boolean }) {
  const layers = useMemo(
    () =>
      [1, -1].flatMap((pos) =>
        Array.from({ length: 18 }, (_, i) => ({
          key: `${pos}-${i}`,
          d: `M-${380 - i * 5 * pos} -${189 + i * 6}C-${380 - i * 5 * pos} -${189 + i * 6} -${312 - i * 5 * pos} ${216 - i * 6} ${152 - i * 5 * pos} ${343 - i * 6}C${616 - i * 5 * pos} ${470 - i * 6} ${684 - i * 5 * pos} ${875 - i * 6} ${684 - i * 5 * pos} ${875 - i * 6}`,
          width: 0.5 + i * 0.03,
          opacity: 0.05 + i * 0.012,
          // deterministic, so re-renders never restart the loop
          duration: 20 + ((i * 7 + (pos > 0 ? 3 : 11)) % 10),
        })),
      ),
    [],
  );

  return (
    <svg className="h-full w-full" viewBox="0 0 696 316" fill="none" preserveAspectRatio="none">
      {layers.map((p) =>
        animate ? (
          <motion.path
            key={p.key}
            d={p.d}
            stroke={`rgb(${INK})`}
            strokeWidth={p.width}
            strokeOpacity={p.opacity}
            initial={{ pathLength: 0.3, opacity: 0.6 }}
            animate={{ pathLength: 1, opacity: [0.3, 0.6, 0.3], pathOffset: [0, 1, 0] }}
            transition={{ duration: p.duration, repeat: Infinity, ease: "linear" }}
          />
        ) : (
          <path key={p.key} d={p.d} stroke={`rgb(${INK})`} strokeWidth={p.width} strokeOpacity={p.opacity * 0.6} />
        ),
      )}
    </svg>
  );
}

// ── Shared canvas plumbing ──────────────────────────────────────────────
type Draw = (ctx: CanvasRenderingContext2D, w: number, h: number, mouse: { x: number; y: number }, t: number) => void;

function CanvasBg({ draw, animate }: { draw: Draw; animate: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const inView = useInView(canvasRef, { margin: "0px" });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const mouse = { x: -9999, y: -9999 };
    let w = 0;
    let h = 0;
    let raf = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const r = canvas.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const frame = (t: number) => {
      draw(ctx, w, h, mouse, t);
      raf = requestAnimationFrame(frame);
    };

    const ro = new ResizeObserver(() => {
      resize();
      if (!animate || !inView) draw(ctx, w, h, mouse, 0);
    });
    ro.observe(canvas);

    // Only burn frames while the hero is actually on screen.
    if (animate && inView) {
      window.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("pointerleave", onLeave);
      raf = requestAnimationFrame(frame);
    } else {
      draw(ctx, w, h, mouse, 0);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [draw, animate, inView]);

  return <canvas ref={canvasRef} className="h-full w-full" />;
}

// ── Variant 2: dot grid that parts around the cursor ─────────────────────
function useDotsDraw(): Draw {
  return useMemo(() => {
    const GAP = 28;
    const RADIUS = 150;
    const offsets = new Map<number, { x: number; y: number }>();
    return (ctx, w, h, mouse) => {
      ctx.clearRect(0, 0, w, h);
      const cols = Math.ceil(w / GAP) + 1;
      const rows = Math.ceil(h / GAP) + 1;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const bx = c * GAP;
          const by = r * GAP;
          const id = r * 10000 + c;
          const o = offsets.get(id) ?? { x: 0, y: 0 };
          const dx = bx - mouse.x;
          const dy = by - mouse.y;
          const dist = Math.hypot(dx, dy);
          let tx = 0;
          let ty = 0;
          let near = 0;
          if (dist < RADIUS && dist > 0.01) {
            near = 1 - dist / RADIUS;
            const push = near * near * 16;
            tx = (dx / dist) * push;
            ty = (dy / dist) * push;
          }
          // ease toward target, so dots spring back rather than snap
          o.x += (tx - o.x) * 0.12;
          o.y += (ty - o.y) * 0.12;
          offsets.set(id, o);
          ctx.beginPath();
          ctx.arc(bx + o.x, by + o.y, 1.15 + near * 1.4, 0, Math.PI * 2);
          ctx.fillStyle = near > 0.25 ? `rgba(${COBALT},${0.25 + near * 0.6})` : `rgba(${INK},0.16)`;
          ctx.fill();
        }
      }
    };
  }, []);
}

// ── Variant 3: node network with pulses running the edges, like an n8n canvas
function useNodesDraw(): Draw {
  return useMemo(() => {
    let seed = 7;
    const rand = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
    let built = { w: 0, h: 0 };
    let nodes: { x: number; y: number }[] = [];
    let edges: [number, number][] = [];
    let pulses: { e: number; p: number; speed: number }[] = [];

    const build = (w: number, h: number) => {
      seed = 7;
      const GAP = 130;
      nodes = [];
      for (let y = GAP / 2; y < h + GAP; y += GAP)
        for (let x = GAP / 2; x < w + GAP; x += GAP)
          nodes.push({ x: x + (rand() - 0.5) * GAP * 0.7, y: y + (rand() - 0.5) * GAP * 0.7 });
      edges = [];
      nodes.forEach((a, i) => {
        const near = nodes
          .map((b, j) => ({ j, d: Math.hypot(a.x - b.x, a.y - b.y) }))
          .filter((n) => n.j !== i)
          .sort((m, n) => m.d - n.d)
          .slice(0, 2);
        near.forEach(({ j }) => {
          if (!edges.some(([p, q]) => (p === i && q === j) || (p === j && q === i))) edges.push([i, j]);
        });
      });
      pulses = Array.from({ length: Math.max(6, Math.round(edges.length / 14)) }, () => ({
        e: Math.floor(rand() * edges.length),
        p: rand(),
        speed: 0.0025 + rand() * 0.003,
      }));
      built = { w, h };
    };

    return (ctx, w, h, mouse, t) => {
      if (built.w !== w || built.h !== h) build(w, h);
      ctx.clearRect(0, 0, w, h);

      const lit = (n: { x: number; y: number }) => Math.max(0, 1 - Math.hypot(n.x - mouse.x, n.y - mouse.y) / 220);

      ctx.lineWidth = 1;
      for (const [i, j] of edges) {
        const a = nodes[i];
        const b = nodes[j];
        const l = Math.max(lit(a), lit(b));
        ctx.strokeStyle = l > 0.05 ? `rgba(${COBALT},${0.1 + l * 0.35})` : `rgba(${INK},0.07)`;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }

      for (const n of nodes) {
        const l = lit(n);
        ctx.beginPath();
        ctx.arc(n.x, n.y, 2.2 + l * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = l > 0.05 ? `rgba(${COBALT},${0.35 + l * 0.6})` : `rgba(${INK},0.2)`;
        ctx.fill();
      }

      // pulses only move when animating (t > 0); the still frame shows them parked
      for (const pl of pulses) {
        if (t > 0) {
          pl.p += pl.speed;
          if (pl.p >= 1) {
            pl.p = 0;
            pl.e = Math.floor(Math.random() * edges.length);
          }
        }
        const [i, j] = edges[pl.e] ?? [0, 0];
        const a = nodes[i];
        const b = nodes[j];
        if (!a || !b) continue;
        const x = a.x + (b.x - a.x) * pl.p;
        const y = a.y + (b.y - a.y) * pl.p;
        ctx.beginPath();
        ctx.arc(x, y, 2.6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${COBALT},0.85)`;
        ctx.fill();
      }
    };
  }, []);
}

/**
 * Hero backdrop. Pointer-events off, sits under the content, and never
 * animates on phones or for reduced-motion users.
 */
export function HeroBackground({ variant }: { variant: HeroBgVariant }) {
  const animate = useMotionAllowed();
  const dots = useDotsDraw();
  const nodes = useNodesDraw();

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
      {variant === "paths" && <FlowingPaths animate={animate} />}
      {variant === "dots" && <CanvasBg draw={dots} animate={animate} />}
      {variant === "nodes" && <CanvasBg draw={nodes} animate={animate} />}
    </div>
  );
}
