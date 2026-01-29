import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { crx } from "@crxjs/vite-plugin";
import manifest from "./manifest.json";
import zip from "vite-plugin-zip-pack";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    crx({ manifest }),
    zip({ outDir: "release", outFileName: "release.zip" }),
  ],
  build: {
    // keep default; the crx plugin handles extension bundling
  },
  server: {
    cors: {
      origin: [/chrome-extension:\/\//],
    },
  },
});
