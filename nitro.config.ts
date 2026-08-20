import { defineNitroConfig } from "nitro/config";

export default defineNitroConfig({
  ssr: true,
  preset: "github-pages",
  prerender: {
    routes: ['/'],
    crawlLinks: true
  }
});
