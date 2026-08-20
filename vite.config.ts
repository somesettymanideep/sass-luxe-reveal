import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  vite: {
    base: './',
    build: {
      emptyOutDir: true,
      // We explicitly disable SSR build in Vite to prevent Rolldown from attempting to process
      // index.html as an SSR entry point, which causes the build failure in GH Actions.
      ssr: false,
    }
  },
  nitro: {
    preset: "github-pages",
    // Completely disable SSR at the Nitro level to prevent the SSR build pass in Vite
    // which is causing the Rolldown entry error in GitHub Actions.
    ssr: false,
  }
});