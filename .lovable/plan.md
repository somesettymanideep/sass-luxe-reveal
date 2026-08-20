---
title: Fix SSR build for Netlify
description: Resolve rolldownOptions.input error during SSR build by ensuring proper Nitro and TanStack Start configuration.
type: feature
---

## Problem
The build fails on Netlify with "rolldownOptions.input should not be an html file when building for SSR". This occurs because the build process is incorrectly picking up `index.html` as an input for the SSR (Server-Side Rendering) environment bundle.

## Solution
1. **Update vite.config.ts**: 
   - Refine the Nitro preset detection.
   - Ensure the server entry point is correctly explicitly defined to avoid fallback to HTML inputs during SSR build.
2. **Environment Synchronization**: Ensure the build command uses the correct mode to match the expected Nitro output.

## Technical Details
- The error `rolldownOptions.input should not be an html file when building for SSR` is a Vite 8 / Rolldown specific error when SSR builds are misconfigured.
- We will adjust `vite.config.ts` to ensure `tanstackStart.server.entry` is explicitly handled.
- We will verify that `src/server.ts` is correctly identified as the entry point for the SSR build.

## Impact
- Enables successful deployment to Netlify.
- Maintains the custom error handling and performance optimizations of the current setup.
