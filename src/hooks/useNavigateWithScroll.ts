import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export const useNavigateWithScroll = () => {
  const router = useRouter();
  
  const scrollToElement = useCallback((elementId: string, offset: number = 96) => {
    const element = document.getElementById(elementId);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }, []);

  const navigateToElement = useCallback((path: string, elementId?: string) => {
    if (elementId) {
      // Include hash so destination can handle offset scroll reliably
      router.push(`${path}#${elementId}`);
      return;
    }
    router.push(path);
  }, [router]);

  return { scrollToElement, navigateToElement };
};

export const useHashScroll = (offset: number = 96) => {
  const doScroll = useCallback(() => {
    if (typeof window === 'undefined') return;
    const hash = window.location.hash;
    if (!hash) return;
    const id = decodeURIComponent(hash.slice(1));
    if (!id) return;

    const startTime = performance.now();
    const tryScroll = () => {
      const element = document.getElementById(id);
      if (element) {
        const elementTop = element.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({ top: elementTop - offset, behavior: 'smooth' });
        return;
      }
      if (performance.now() - startTime < 2000) {
        requestAnimationFrame(tryScroll);
      }
    };
    tryScroll();
  }, [offset]);

  useEffect(() => {
    doScroll();
    const onHashChange = () => doScroll();
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, [doScroll]);
};
