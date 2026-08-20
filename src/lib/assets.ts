export function getAssetUrl(path: string) {
  // Directly point to the Lovable production URL for these specific assets
  // if they are not being served correctly in the local dev environment
  // OR just keep them root-relative. 
  // The Playwright output shows it's still trying to fetch from 
  // http://localhost:8080/sass-luxe-reveal/__l5e/... 
  // because the JS might have been cached or getAssetUrl wasn't called correctly.
  
  if (path.startsWith("/__l5e/")) {
    // In local dev, we want http://localhost:8080/__l5e/...
    // but the browser/router might be prefixing it.
    // Using an absolute URL with the origin ensures it works.
    if (typeof window !== "undefined") {
      return window.location.origin + path;
    }
  }
  return path;
}
