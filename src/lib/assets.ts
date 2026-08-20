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
import why1 from "@/assets/why-1.svg.asset.json";
import why2 from "@/assets/why-2.svg.asset.json";
import why3 from "@/assets/why-3.svg.asset.json";
import why4 from "@/assets/why-4.svg.asset.json";
import why5 from "@/assets/why-5.svg.asset.json";
import why6 from "@/assets/why-6.svg.asset.json";
import why7 from "@/assets/why-7.svg.asset.json";
import why8 from "@/assets/why-8.svg.asset.json";

// Helper to ensure assets from .asset.json or vite imports resolve correctly with base path
export const getAssetUrl = (asset: any) => {
  if (typeof asset === 'string') {
    if (asset.startsWith('/') && !asset.startsWith(import.meta.env.BASE_URL)) {
      const resolved = `${import.meta.env.BASE_URL.replace(/\/$/, "")}${asset}`;
      if (import.meta.env.DEV) console.debug(`[AssetDebug] Resolving string: ${asset} -> ${resolved}`);
      return resolved;
    }
    return asset;
  }
  
  if (asset?.url) {
    if (asset.url.startsWith('/') && !asset.url.startsWith(import.meta.env.BASE_URL)) {
      const resolved = `${import.meta.env.BASE_URL.replace(/\/$/, '')}${asset.url}`;
      if (import.meta.env.DEV) console.debug(`[AssetDebug] Resolving object: ${asset.url} -> ${resolved}`);
      return resolved;
    }
    return asset.url;
  }
  
  if (asset && import.meta.env.DEV) console.warn(`[AssetDebug] Asset missing url property:`, asset);
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

export const brandIcons = {
  why1: getAssetUrl(why1),
  why2: getAssetUrl(why2),
  why3: getAssetUrl(why3),
  why4: getAssetUrl(why4),
  why5: getAssetUrl(why5),
  why6: getAssetUrl(why6),
  why7: getAssetUrl(why7),
  why8: getAssetUrl(why8),
};

