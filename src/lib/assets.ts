export function getAssetUrl(path: string) {
  // Always return the absolute URL if it starts with /__l5e/ 
  // to ensure the dev server picks it up from the root
  // regardless of the current base path.
  return path;
}
