import { defineNitroConfig } from "nitro/config";

export default defineNitroConfig({
  ssr: false,
  preset: "github-pages",
  prerender: {
    routes: ['/'],
    crawlLinks: true
  }
});
