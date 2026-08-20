# Transition to Supabase Client & GitHub Pages Deployment

Refactor the application to use the client-side Supabase SDK instead of TanStack Start server functions, enabling static deployment to GitHub Pages (SPA mode) while maintaining full backend functionality.

## Proposed Changes

### 1. Refactor Data Access (Client-side Only)
- **Replace Server Functions**: Convert all `createServerFn` handlers in `src/lib/bookings.functions.ts` and `src/lib/admin.functions.ts` to regular async functions that use the `supabase` client from `@/integrations/supabase/client`.
- **Direct Database Interaction**: Components will call these functions directly from the browser.
- **Why**: GitHub Pages is a static host and cannot execute server-side Node.js code/functions. Direct client-to-Supabase calls are the standard for SPAs.

### 2. Configuration for GitHub Pages (SPA)
- **Vite Config**: Update `vite.config.ts` to use `base: "/sass-luxe-reveal/"` (assuming this matches the repo name) and set Nitro to `preset: "static"`.
- **Router Configuration**: Switch TanStack Router to `history: 'hash'` mode (e.g., `/#/about`) to ensure deep links work on GitHub Pages without complex 404 redirects.
- **Asset Integrity**: Audit all components to ensure image/video paths are relative or correctly prefixed with the base path.

### 3. Build & Deployment Setup
- **Dependencies**: Install `gh-pages` for easy deployment.
- **Scripts**: Add `predeploy` and `deploy` commands to `package.json`.

### 4. Admin Security Implementation
- **Client-side Auth**: Maintain the existing local login state logic in `src/routes/admin.tsx`.
- **RLS Enforcement**: Verify that Supabase RLS policies allow public `INSERT` but require authentication or matching credentials for `SELECT` (this is managed on the database side via the service role or user auth if configured).

## Technical Details
- **Base URL**: `/sass-luxe-reveal/`
- **Nitro Preset**: `static`
- **Router History**: Hash History
- **Data Flow**: `Component` -> `Client-side Utility` -> `Supabase Client` -> `Database`
