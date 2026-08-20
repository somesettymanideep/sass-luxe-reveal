import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  vite: {
    base: './',
    build: {
      emptyOutDir: true,
      ssr: false,
    }
  },
  nitro: {
    preset: "github-pages",
  }
});
