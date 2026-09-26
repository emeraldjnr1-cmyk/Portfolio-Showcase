import { renderToString } from "react-dom/server";
import App from "./App";

export { PAGES, SITE } from "./seo/pages";
export { buildKnowledge } from "./seo/knowledge";

/** Build-time only: renders one route to HTML for scripts/prerender.mjs. */
export function render(url: string) {
  return renderToString(<App ssrPath={url} />);
}
