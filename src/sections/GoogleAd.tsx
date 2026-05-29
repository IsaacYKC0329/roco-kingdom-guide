/**
 * Google AdSense Component
 *
 * To enable ads:
 * 1. Replace "ca-pub-XXXXXXXXXXXX" in index.html with your AdSense Publisher ID
 * 2. Replace ad slot IDs below with your actual ad unit IDs from AdSense dashboard
 * 3. Uncomment the AdSense script tag in index.html <head>
 */
import { useEffect, useRef } from 'react';

interface GoogleAdProps {
  /** Your AdSense ad unit ID (e.g. "1234567890") */
  slot: string;
  /** Ad format/size */
  format?: 'auto' | 'rectangle' | 'horizontal' | 'vertical';
  /** Additional CSS classes */
  className?: string;
}

export default function GoogleAd({ slot, format = 'auto', className = '' }: GoogleAdProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const isLoaded = useRef(false);

  useEffect(() => {
    // Prevent double-loading on React Strict Mode
    if (isLoaded.current) return;

    try {
      const w = window as any;
      if (w.adsbygoogle && adRef.current) {
        w.adsbygoogle.push({});
        isLoaded.current = true;
      }
    } catch {
      // AdSense not loaded yet — safe to ignore
    }
  }, []);

  // Show placeholder when AdSense isn't configured yet
  const isConfigured = !slot.includes('123456789');

  if (!isConfigured) {
    return (
      <div className={`flex justify-center items-center ${className}`}>
        <div className="glass-panel rounded-xl p-6 w-full text-center border border-dashed border-[#334155]">
          <p className="text-xs text-[#64748B] uppercase tracking-wider">Ad Placeholder</p>
          <p className="text-[10px] text-[#475569] mt-1">Slot: {slot} — Replace with your AdSense unit ID</p>
        </div>
      </div>
    );
  }

  const styleMap: Record<string, React.CSSProperties> = {
    auto: { display: 'block', minHeight: '90px' },
    rectangle: { display: 'inline-block', width: '300px', height: '250px' },
    horizontal: { display: 'block', width: '100%', minHeight: '90px' },
    vertical: { display: 'inline-block', width: '160px', minHeight: '600px' },
  };

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div className="glass-panel rounded-xl p-4 w-full">
        <p className="text-center text-[10px] text-[#64748B] mb-2 uppercase tracking-wider">Advertisement</p>
        <div ref={adRef} style={{ overflow: 'hidden' }}>
          <ins
            className="adsbygoogle"
            style={styleMap[format]}
            data-ad-client="ca-pub-XXXXXXXXXXXX"
            data-ad-slot={slot}
            data-ad-format={format === 'auto' ? 'auto' : undefined}
            data-full-width-responsive={format === 'auto' ? 'true' : undefined}
          />
        </div>
      </div>
    </div>
  );
}
