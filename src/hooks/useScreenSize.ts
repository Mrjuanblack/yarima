"use client";

import { useState, useEffect } from 'react';

export type ScreenSize = 'base' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export const useScreenSize = () => {
    const [screenSize, setScreenSize] = useState<ScreenSize>('base');

    useEffect(() => {
        // Hidden probe whose ::before content changes at Tailwind breakpoints
        const probe = document.createElement('div');
        probe.setAttribute('aria-hidden', 'true');
        probe.style.cssText = 'position:fixed;pointer-events:none;opacity:0;z-index:-1;';
        probe.className = "before:content-['base'] sm:before:content-['sm'] md:before:content-['md'] lg:before:content-['lg'] xl:before:content-['xl'] 2xl:before:content-['2xl']";
        document.body.appendChild(probe);

        const readBreakpoint = () => {
            const raw = getComputedStyle(probe, '::before').content;
            const value = raw.replace(/^['"]|['"]$/g, '');
            if (value) setScreenSize(value as ScreenSize);
        };

        readBreakpoint();
        const onResize = () => readBreakpoint();
        window.addEventListener('resize', onResize);
        window.addEventListener('orientationchange', onResize);

        let ro: ResizeObserver | null = null;
        if (typeof ResizeObserver !== 'undefined') {
            ro = new ResizeObserver(readBreakpoint);
            ro.observe(document.documentElement);
        }

        return () => {
            window.removeEventListener('resize', onResize);
            window.removeEventListener('orientationchange', onResize);
            if (ro) ro.disconnect();
            document.body.removeChild(probe);
        };
    }, []);

    return screenSize;
};
