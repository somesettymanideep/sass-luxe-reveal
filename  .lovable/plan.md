---
title: Fix SSR build for Netlify
description: Resolve rolldownOptions.input error during SSR build by ensuring proper Nitro and TanStack Start configuration.
type: feature
---

## Problem
The build fails on Netlify because `rolldownOptions.input` receives an HTML file when building for SSR, which is not supported. This usually happens when the SSR entry point is not correctly identified or when the environment configuration (Nitro preset) conflicts with the build process.

## Solution
1. **Update `vite.config.ts`**: Ensure the Nitro preset is correctly handled for Netlify and the TanStack Start server entry is explicitly pointed to the bundled entry if necessary, or let the config handle it.
2. **Verify `src/server.ts`**: Ensure the custom server entry correctly imports the TanStack server-entry.
3. **Clean build artifacts**: Sometimes stale `.nitro` or `dist` folders cause configuration leaks.

## Technical Details
- Change `nitro.preset` logic to be more robust.
- Ensure `tanstackStart.server.entry` is correctly resolved by the `@lovable.dev/vite-tanstack-config` wrapper.
- Use `build:dev` or `build` locally to verify the SSR bundle generation doesn't include HTML inputs.

## Impact
- Fixes the production build on Netlify.
- Ensures the SASS Hair & Beauty site can be successfully deployed.
