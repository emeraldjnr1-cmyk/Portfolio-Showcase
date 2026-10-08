import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

const port = Number(process.env.PORT) || 5173;
const basePath = process.env.BASE_PATH || "/";

export default defineConfig({
  base: basePath,
  plugins: [
    react(),
    tailwindcss(),
    runtimeErrorOverlay(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer({
              root: path.resolve(import.meta.dirname, ".."),
            }),
          ),
          await import("@replit/vite-plugin-dev-banner").then((m) =>
            m.devBanner(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      "@assets": path.resolve(import.meta.dirname, "..", "..", "attached_assets"),
    },
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve(import.meta.dirname),
  // The footer renders this year first, then the live one after hydration,
  // so a visit after New Year never trips a hydration mismatch.
  define: { __BUILD_YEAR__: String(new Date().getFullYear()) },
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    // scripts/prerender.mjs reads the manifest to add a modulepreload for
    // each page's route chunk, then deletes it.
    manifest: true,
    rollupOptions: {
      output: {
        // Big, rarely changing vendors get their own files so a copy change
        // on the site does not make every visitor download React again.
        // Everything else is left to Rollup, which keeps packages that only
        // the lazy pieces use (the onboarding form, Pax) out of the entry.
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          if (/node_modules\/(react|react-dom|scheduler)\//.test(id)) return "react";
          if (/node_modules\/(framer-motion|motion-dom|motion-utils)\//.test(id)) return "motion";
          if (/node_modules\/lenis\//.test(id)) return "lenis";
          if (/node_modules\/(react-icons|lucide-react)\//.test(id)) return "icons";
        },
      },
    },
  },
  server: {
    port,
    host: "0.0.0.0",
  },
  preview: {
    port,
    host: "0.0.0.0",
  },
});
