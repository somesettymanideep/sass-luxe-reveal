# Plan: Fix Broken Media and Base Paths for GitHub Pages

The website assets (images and videos) are currently broken because the app is hosted in a subdirectory (`/sass-luxe-reveal/`) on GitHub Pages. Asset paths currently resolve to the root `/`, missing the subdirectory prefix. This plan standardizes asset handling to use the correct base path and fixes hardcoded URLs.

## User Review Required

> [!IMPORTANT]
> - All media will be updated to resolve relative to the `/sass-luxe-reveal/` base path.
> - Hardcoded absolute URLs in the Vijayawada clinic page metadata will be updated to point to the correct production domain.

## Proposed Changes

### Media & Asset Standardization
- Update all components using `.asset.json` imports to ensure the `.url` property is used correctly.
- Update components using `?url` imports or direct relative paths to use absolute paths that Vite will prefix during build, or wrap them in a utility to handle the base path.
- Verify video `<source>` tags in `Hero`, `Gallery`, `BranchHero`, and `VjaHero` use the correct URL resolution.

### Metadata & SEO Fixes
- Update `src/routes/vijayawada-hair-beauty-clinic.tsx` to change hardcoded `https://sass-elegance-animated.lovable.app` to `https://somesettymanideep.github.io/sass-luxe-reveal/`.
- Standardize the `og:image` and `canonical` links across all routes to respect the base path.

### Component Logic Fixes
- **Appointment Form & Backend**: Ensure form submissions in `AppointmentForm.tsx` and `BranchConversion.tsx` handle redirects correctly if they navigate after success.
- **Admin Dashboard**: Ensure the admin panel links and redirects respect the base path.

## Technical Details
- **Base Path**: The `base` is already set in `vite.config.ts`, but runtime-generated URLs (like those in JSON-LD) need manual adjustment.
- **Asset Imports**: Vite's `?url` imports automatically handle the base path. JSON imports from `.asset.json` contain hardcoded paths like `/__l5e/assets-v1/...` which might need to be prefixed if they aren't being resolved correctly by the custom Lovable asset handler in production.
- **Verification**: I will use a test script to check if the generated asset URLs in the DOM include the base path where expected.
