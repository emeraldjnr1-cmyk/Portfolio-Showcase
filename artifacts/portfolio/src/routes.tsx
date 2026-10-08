import { lazy, type ComponentType } from "react";

// Every page is its own chunk. The browser downloads only the route it is on,
// and the prerender (scripts/prerender.mjs) loads them all before rendering.

type Module<P> = { default: ComponentType<P> };

/**
 * React.lazy plus a preload handle. Once the module is in memory the thenable
 * resolves synchronously, so a preloaded route renders on the very first pass
 * with no Suspense fallback. That matters for hydration: the first client
 * render has to produce the exact tree the prerender did.
 */
function lazyRoute<M, P extends object>(load: () => Promise<M>, pick: (m: M) => ComponentType<P>) {
  let resolved: Module<P> | undefined;
  let inflight: Promise<void> | undefined;
  const preload = () =>
    (inflight ??= load().then((m) => {
      resolved = { default: pick(m) };
    }));
  const thenable = {
    then(onOk: (m: Module<P>) => void, onErr: (e: unknown) => void) {
      if (resolved) return onOk(resolved);
      preload().then(() => onOk(resolved!), onErr);
    },
  };
  const Component = lazy(() => thenable as unknown as Promise<Module<P>>);
  return Object.assign(Component, { preload });
}

export const routes = {
  home: lazyRoute(() => import("@/pages/Home"), (m) => m.default),
  services: lazyRoute(() => import("@/pages/Services"), (m) => m.ServicesIndex),
  service: lazyRoute(() => import("@/pages/Services"), (m) => m.ServicePage),
  industries: lazyRoute(() => import("@/pages/Industries"), (m) => m.IndustriesIndex),
  industry: lazyRoute(() => import("@/pages/Industries"), (m) => m.IndustryPage),
  work: lazyRoute(() => import("@/pages/Work"), (m) => m.WorkIndex),
  workPage: lazyRoute(() => import("@/pages/Work"), (m) => m.WorkPage),
  team: lazyRoute(() => import("@/pages/Team"), (m) => m.TeamPage),
  teamProfile: lazyRoute(() => import("@/pages/TeamProfile"), (m) => m.TeamProfilePage),
  films: lazyRoute(() => import("@/pages/Films"), (m) => m.FilmsPage),
  notFound: lazyRoute(() => import("@/pages/not-found"), (m) => m.default),
};

export type RouteKey = keyof typeof routes;

/** Source file behind each route, as keyed in Vite's manifest. The prerender uses this to add modulepreload links. */
export const ROUTE_SOURCES: Record<RouteKey, string> = {
  home: "src/pages/Home.tsx",
  services: "src/pages/Services.tsx",
  service: "src/pages/Services.tsx",
  industries: "src/pages/Industries.tsx",
  industry: "src/pages/Industries.tsx",
  work: "src/pages/Work.tsx",
  workPage: "src/pages/Work.tsx",
  team: "src/pages/Team.tsx",
  teamProfile: "src/pages/TeamProfile.tsx",
  films: "src/pages/Films.tsx",
  notFound: "src/pages/not-found.tsx",
};

/**
 * Which route a pathname lands on. Mirrors the <Switch> in App.tsx: one
 * optional slug segment, trailing slash ignored, anything else is the 404.
 */
export function routeKeyFor(pathname: string): RouteKey {
  const clean = pathname.replace(/\/+$/, "") || "/";
  const m = clean.match(/^\/([^/]*)(?:\/([^/]+))?$/);
  if (!m) return "notFound";
  const [, head, slug] = m;
  switch (head) {
    case "":
      return slug ? "notFound" : "home";
    case "services":
      return slug ? "service" : "services";
    case "industries":
      return slug ? "industry" : "industries";
    case "work":
      return slug ? "workPage" : "work";
    case "team":
      return slug ? "teamProfile" : "team";
    case "films":
      return slug ? "notFound" : "films";
    default:
      return "notFound";
  }
}

export function preloadAllRoutes() {
  return Promise.all(Object.values(routes).map((r) => r.preload()));
}
