import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  vite: {
    base: './',
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      emptyOutDir: true,
      ssr: false,
    },
    // Force Vite to avoid SSR building even if Nitro requests it
    ssr: {
      noExternal: true
    }
  },
  nitro: { 
    preset: "static",
    prerender: {
      crawlLinks: true,
      routes: ['/']
    }
  }
});