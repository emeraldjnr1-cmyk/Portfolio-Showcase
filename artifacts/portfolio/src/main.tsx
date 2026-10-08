import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import { routes, routeKeyFor } from "./routes";
import "./index.css";

const root = document.getElementById("root")!;
const base = import.meta.env.BASE_URL.replace(/\/$/, "");
const pathname = location.pathname.startsWith(base) ? location.pathname.slice(base.length) || "/" : location.pathname;

// Production pages arrive prerendered (scripts/prerender.mjs), so the app
// hydrates onto that markup instead of throwing it away and rendering again.
// The route's chunk is loaded first: a lazy page that is still in flight
// would hydrate as a fallback and miss the markup already on screen.
// The dev server has an empty root, so there it renders from scratch.
routes[routeKeyFor(pathname)]
  .preload()
  .catch((e) => console.error("[route] chunk failed to load", e))
  .then(() => {
    if (root.firstElementChild) {
      hydrateRoot(root, <App />, {
        onRecoverableError(error, info) {
          console.error("[hydrate]", error, info.componentStack);
        },
      });
    } else {
      createRoot(root).render(<App />);
    }
    prefetchOnIntent();
  });

// Every link is a full page load, so warming a route's chunk into the HTTP
// cache when a link is hovered or focused makes the next page's modulepreload
// a cache hit. Internal links only; the import is deduped per route.
function prefetchOnIntent() {
  const warm = (e: Event) => {
    const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
    if (!a || a.origin !== location.origin || a.target === "_blank") return;
    const path = a.pathname.startsWith(base) ? a.pathname.slice(base.length) || "/" : a.pathname;
    routes[routeKeyFor(path)].preload().catch(() => {});
  };
  document.addEventListener("pointerover", warm, { passive: true });
  document.addEventListener("focusin", warm, { passive: true });
}
