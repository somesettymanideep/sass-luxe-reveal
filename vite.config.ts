import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  nitro: { 
    preset: "github-pages",
  },
  tanstackStart: {
    server: { entry: "server" },
  },
});
