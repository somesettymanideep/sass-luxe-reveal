import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  vite: {
    base: '/sass-luxe-reveal/',
  },
  nitro: { 
    preset: "github-pages",
  },
  tanstackStart: {
    server: { entry: "server" },
  },
});
