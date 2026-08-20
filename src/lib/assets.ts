import before from "@/assets/before.jpg";
import after from "@/assets/after.jpg";
import reel1 from "@/assets/transformation-1.mp4.asset.json";
import reel2 from "@/assets/transformation-2.mp4.asset.json";
import reel3 from "@/assets/transformation-3.mp4.asset.json";
import reel4 from "@/assets/transformation-4.mp4.asset.json";
import poster1 from "@/assets/trans-poster-1.jpg.asset.json";
import poster2 from "@/assets/trans-poster-2.jpg.asset.json";
import poster3 from "@/assets/trans-poster-3.jpg.asset.json";
import poster4 from "@/assets/trans-poster-4.jpg.asset.json";

// Helper to ensure assets from .asset.json or vite imports resolve correctly with base path
const getAssetUrl = (asset: any) => {
  if (typeof asset === 'string') return asset;
  if (asset?.url) {
    // If it's a relative path starting with /, prepend the base path if in production
    if (asset.url.startsWith('/') && !asset.url.startsWith(import.meta.env.BASE_URL)) {
      return `${import.meta.env.BASE_URL.replace(/\/$/, '')}${asset.url}`;
    }
    return asset.url;
  }
  return '';
};

export const reels = [
  { src: getAssetUrl(reel1), poster: getAssetUrl(poster1), tag: "Keratin", title: "Signature Keratin treatment" },
  { src: getAssetUrl(reel2), poster: getAssetUrl(poster2), tag: "Bridal", title: "Bridal makeover reveal" },
  { src: getAssetUrl(reel3), poster: getAssetUrl(poster3), tag: "Styling", title: "Professional hair styling" },
  { src: getAssetUrl(reel4), poster: getAssetUrl(poster4), tag: "Blowout", title: "Classic salon blowout" },
];

export const beforeAfter = {
  before: getAssetUrl(before),
  after: getAssetUrl(after),
};
