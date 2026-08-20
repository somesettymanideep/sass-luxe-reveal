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
    // We explicitly disable Nitro's SSR and prerendering logic to avoid the SSR entry error
    // since we only need a static client build for GitHub Pages in this configuration.
    ssr: false,
    prerender: {
      crawlLinks: false,
      routes: []
    }
  }
});