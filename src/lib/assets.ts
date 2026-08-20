export function getAssetUrl(path: string) {
  // If we are in development, or if the path is an absolute URL starting with /__l5e/
  // ensure it stays relative to the root of the domain.
  if (path.startsWith("/__l5e/")) {
    return window.location.origin + path;
  }
  return path;
}
