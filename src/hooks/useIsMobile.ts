"use client";

import { useState, useEffect } from 'react';

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      // 1) Prefer client hints if available (Chromium-based browsers)
      // @ts-expect-error: userAgentData is not in the TS lib for all targets
      const uaData: { mobile?: boolean } | undefined = navigator.userAgentData;

      if (uaData && typeof uaData.mobile === 'boolean') {
        setIsMobile(uaData.mobile);
        return;
      }

      // 2) Fallback to UA sniffing
      const userAgent = navigator.userAgent.toLowerCase();
      const mobilePatterns = [
        /android/i,
        /webos/i,
        /iphone/i,
        /ipad/i,
        /ipod/i,
        /blackberry/i,
        /iemobile/i,
        /opera mini/i,
        /mobile/i,
      ];
      const isMobileByUA = mobilePatterns.some((pattern) => pattern.test(userAgent));

      // 3) Additional signals: touch + coarse pointer
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const prefersCoarsePointer = typeof window.matchMedia === 'function'
        ? window.matchMedia('(pointer: coarse)').matches
        : false;

      // 4) Optional screen heuristic to avoid some touchscreen laptops being marked mobile
      const isNarrowViewport = typeof window.matchMedia === 'function'
        ? window.matchMedia('(max-width: 768px)').matches
        : window.innerWidth <= 768;

      // Combine heuristics: UA hit OR (coarse/touch AND narrow viewport)
      setIsMobile(isMobileByUA || ((hasTouch || prefersCoarsePointer) && isNarrowViewport));
    };

    checkMobile();
    
    // Re-evaluate on orientation and resize changes
    const handleChange = () => {
      checkMobile();
    };
    window.addEventListener('orientationchange', handleChange);
    window.addEventListener('resize', handleChange);

    return () => {
      window.removeEventListener('orientationchange', handleChange);
      window.removeEventListener('resize', handleChange);
    };
  }, []);

  return isMobile;
};
