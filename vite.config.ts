import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  vite: {
    base: './',
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      emptyOutDir: true,
      // We keep ssr: false to help prevent Vite from looking for SSR entries
      ssr: false,
    }
  },
  nitro: { 
    // "static" is the most robust for pure GH Pages output
    preset: "static",
    // Disable Nitro's SSR building specifically
    ssr: false
  }
});