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
  }
});