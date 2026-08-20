import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import { tanstackStartVite } from "@tanstack/react-start/vite";

export default defineConfig({
  plugins: [
    TanStackRouterVite(),
    tanstackStartVite(),
    react(),
    tsconfigPaths(),
  ],
  base: "./",
  build: {
    outDir: "dist/client",
    emptyOutDir: true,
  },
});
