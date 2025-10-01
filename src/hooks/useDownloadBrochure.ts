"use client";

import { useIsMobile } from './useIsMobile';

export const useDownloadBrochure = () => {
  const isMobile = useIsMobile();

  const downloadBrochure = () => {
    const brochurePath = isMobile 
      ? "/brochure/Brochure-Movil.pdf" 
      : "/brochure/Brochure-Escritorio.pdf";
    
    const fileName = isMobile ? "Brochure-Movil.pdf" : "Brochure-Escritorio.pdf";
    
    // Create a temporary link element to trigger download
    const link = document.createElement('a');
    link.href = brochurePath;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return {
    downloadBrochure,
    isMobile,
    brochurePath: isMobile ? "/brochure/Brochure-Movil.pdf" : "/brochure/Brochure-Escritorio.pdf",
    fileName: isMobile ? "Brochure-Movil.pdf" : "Brochure-Escritorio.pdf"
  };
};
