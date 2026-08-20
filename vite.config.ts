import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  vite: ({ isSsr }) => ({
    base: './',
    build: {
      rollupOptions: {
        // Ensure index.html is not passed as an entry point to the SSR build
        // which causes Rolldown to fail in newer Vite versions.
        input: isSsr ? undefined : undefined, 
      }
    }
  }),
  nitro: {
    preset: "github-pages",
  }
});