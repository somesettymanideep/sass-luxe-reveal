export function getAssetUrl(path: string) {
  // If we are in development, the base path /sass-luxe-reveal/ is NOT where assets are served
  // They are served at the root /__l5e/... by the Vite dev server
  const isDev = import.meta.env.DEV;
  if (isDev) return path;

  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  if (path.startsWith(base)) return path;
  if (path.startsWith("/")) return `${base}${path}`;
  return path;
}
