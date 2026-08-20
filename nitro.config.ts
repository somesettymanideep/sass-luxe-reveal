import { defineNitroConfig } from "nitro/config";

export default defineNitroConfig({
  // Completely disable SSR at the Nitro level to prevent the SSR build pass in Vite
  // which is causing the Rolldown entry error in GitHub Actions.
  ssr: false,
});