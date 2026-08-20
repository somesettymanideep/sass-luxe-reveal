export function getAssetUrl(path: string) {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  if (path.startsWith(base)) return path;
  if (path.startsWith("/")) return `${base}${path}`;
  return path;
}
