import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  vite: {
    base: './',
    build: {
      rollupOptions: {
        // Explicitly set to undefined to prevent the wrapper from 
        // passing index.html to the SSR build environment.
        input: undefined,
      }
    }
  },
  nitro: {
    preset: "github-pages",
  }
});