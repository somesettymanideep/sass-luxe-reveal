import { useEffect, useState } from "react";

interface MediaError {
  url: string;
  type: "image" | "video";
  status?: number;
  timestamp: number;
}

export function MediaDebugOverlay() {
  const [errors, setErrors] = useState<MediaError[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (process.env['NODE_ENV'] === "production" && !window.location.search.includes("debug=true")) {
      return;
    }

    const handleError = (event: ErrorEvent | PromiseRejectionEvent) => {
      const target = event instanceof ErrorEvent ? event.target : null;
      if (target instanceof HTMLImageElement || target instanceof HTMLVideoElement) {
        const url = target.src || (target instanceof HTMLVideoElement ? target.currentSrc : "");
        const type = target instanceof HTMLImageElement ? "image" : "video";
        
        console.error(`[MediaDebug] Failed to load ${type}: ${url}`);
        
        setErrors(prev => {
          if (prev.some(e => e.url === url)) return prev;
          return [...prev, { url, type, timestamp: Date.now() }];
        });
      }
    };

    window.addEventListener("error", handleError, true);
    return () => window.removeEventListener("error", handleError, true);
  }, []);

  if (!isVisible && errors.length === 0) {
    if (process.env['NODE_ENV'] === "production" && !window.location.search.includes("debug=true")) {
      return null;
    }
    return (
      <button 
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 left-4 z-[9999] bg-gold/80 text-black px-2 py-1 rounded-sm text-xs font-mono border border-black shadow-lg"
      >
        DEBUG MEDIA
      </button>
    );
  }

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 z-[9999] bg-black/90 border-2 border-gold text-white p-4 rounded-sm max-w-md max-h-[50vh] overflow-auto shadow-2xl font-mono text-xs">
      <div className="flex justify-between items-center mb-2 border-b border-gold/30 pb-2">
        <h3 className="text-gold font-bold uppercase tracking-wider">Media Debugger</h3>
        <button onClick={() => setIsVisible(false)} className="text-gold hover:text-white px-2">✕</button>
      </div>
      
      {errors.length === 0 ? (
        <p className="text-green-400">No media errors detected yet.</p>
      ) : (
        <div className="space-y-3">
          {errors.map((error, i) => (
            <div key={i} className="border-l-2 border-red-500 pl-2 py-1 bg-red-500/10">
              <div className="flex justify-between text-[10px] text-gray-400 mb-1">
                <span>{error.type.toUpperCase()}</span>
                <span>{new Date(error.timestamp).toLocaleTimeString()}</span>
              </div>
              <p className="break-all text-red-400 font-bold">{error.url}</p>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 pt-2 border-t border-gold/30 text-[10px] text-gray-400">
        Base URL: <span className="text-gold">{import.meta.env.BASE_URL}</span>
      </div>
    </div>
  );
}
