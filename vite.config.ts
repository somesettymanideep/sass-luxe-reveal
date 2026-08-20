import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  vite: {
    base: './',
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      emptyOutDir: true,
      ssr: false,
    }
  },
  nitro: { 
    preset: "static",
    prerender: {
      routes: ['/'],
      crawlLinks: true
    }
  }
});