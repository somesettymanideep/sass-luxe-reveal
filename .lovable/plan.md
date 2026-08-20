# Deployment Plan: GitHub Pages Transition

Convert the TanStack Start project to a React SPA for GitHub Pages deployment, ensuring all assets and dynamic routes function correctly.

## Proposed Changes

### Configuration
- Modify `vite.config.ts` to set `base: "/sass-luxe-reveal/"` (matching the repository name).
- Update Nitro configuration to `preset: "static"` to generate a pure SPA build.
- Configure TanStack Router for `history: 'hash'` or ensure a `404.html` redirect for GitHub Pages clean URLs.

### Feature Replacement (Server Functions to Client Logic)
- **Problem**: GitHub Pages is static; `createServerFn` (server functions) will not run.
- **Solution**: Refactor `src/lib/bookings.functions.ts` and `src/lib/admin.functions.ts` to use direct Supabase client calls instead of server functions.
  - Submissions (bookings, consultations) will use `supabase.from('bookings').insert()`.
  - Admin dashboard will use `supabase.from('bookings').select()`.

### Asset Integrity
- Verify all image and video paths use relative URLs or `import.meta.env.BASE_URL` to prevent breakage on GitHub Pages sub-paths.
- Ensure all video reels are properly bundled or hosted.

### Build & Deploy
- Add `gh-pages` package.
- Add `predeploy` and `deploy` scripts to `package.json`.

## Technical Details
- **Base URL**: `/sass-luxe-reveal/`
- **Router**: TanStack Router with hash history or 404 redirect script.
- **Data Access**: Move all logic from `.functions.ts` to `.ts` using the browser Supabase client.
- **Backend**: Supabase RLS policies must allow public inserts (already configured) and authenticated selects (managed via client-side auth state).
