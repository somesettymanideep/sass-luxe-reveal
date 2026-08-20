import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  vite: {
    base: './',
    build: {
      emptyOutDir: true,
    }
  },
  nitro: {
    preset: "github-pages",
    // @ts-ignore - Disable SSR to avoid Rolldown entry errors and produce a static SPA
    ssr: false,
  }
});