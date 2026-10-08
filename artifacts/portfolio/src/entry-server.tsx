import { renderToString } from "react-dom/server";
import App from "./App";
import { preloadAllRoutes } from "./routes";

export { PAGES, SITE } from "./seo/pages";
export { buildKnowledge } from "./seo/knowledge";
export { ROUTE_SOURCES, routeKeyFor } from "./routes";

/**
 * Build-time only: renders one route to HTML for scripts/prerender.mjs.
 * Pages are code-split for the browser and renderToString cannot wait for a
 * chunk, so every route module is loaded before the first render.
 */
export async function render(url: string) {
  await preloadAllRoutes();
  return renderToString(<App ssrPath={url} />);
}
