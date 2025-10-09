"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon, XMarkIcon } from "@heroicons/react/24/outline";

interface ImageData {
  thumbnail: string;
  fullRes: string;
}

interface GalleryProps {
  images: ImageData[];
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

interface LazyImageProps {
  thumbnailSrc: string;
  fullResSrc: string;
  alt: string;
  className: string;
  onClick: () => void;
}

function LazyImage({ thumbnailSrc, alt, onClick }: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={imgRef} className="relative">
      {isInView && (
        <motion.div
          className="cursor-pointer overflow-hidden"
          onClick={onClick}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2 }}
        >
          {!isLoaded && (
            <div className="w-full h-100 bg-gray-200 rounded-lg animate-pulse flex items-center justify-center">
              <div className="text-gray-400 text-sm">Cargando...</div>
            </div>
          )}
          <img
            className={`object-cover object-center w-full h-100 max-w-full rounded-lg hover:opacity-90 transition-opacity ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            src={thumbnailSrc}
            alt={alt}
            loading="lazy"
            decoding="async"
            onLoad={() => setIsLoaded(true)}
          />
        </motion.div>
      )}
      {!isInView && (
        <div className="w-full h-100 bg-gray-100 rounded-lg flex items-center justify-center">
          <div className="text-gray-300 text-sm">...</div>
        </div>
      )}
    </div>
  );
}

export default function Gallery({ images, isOpen, onClose, title = "Galería" }: GalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleImageClick = (index: number) => {
    setIsImageLoading(true);
    setSelectedIndex(index);
  };

  const handleCloseEnlarged = () => {
    setSelectedIndex(null);
  };

  const handlePrevious = () => {
    if (selectedIndex !== null && selectedIndex > 0) {
      setIsImageLoading(true);
      setSelectedIndex(selectedIndex - 1);
    }
  };

  const handleNext = () => {
    if (selectedIndex !== null && selectedIndex < images.length - 1) {
      setIsImageLoading(true);
      setSelectedIndex(selectedIndex + 1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      if (selectedIndex !== null) {
        handleCloseEnlarged();
      } else {
        onClose();
      }
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      handlePrevious();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      handleNext();
    }
  };

  // Focus the modal when it opens to enable keyboard events
  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          ref={modalRef}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          onKeyDown={handleKeyDown}
          tabIndex={-1}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/50"
            onClick={onClose}
          />

          {/* Gallery Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative w-full max-w-full mx-4 max-h-[90vh] overflow-hidden rounded-2xl bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  {title}
                </h3>
                <button
                  type="button"
                  className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-theme-gold focus:ring-offset-2"
                  onClick={onClose}
                >
                  <span className="sr-only">Close</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              {/* Gallery Grid */}
              <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {images.map((imageData, index) => (
                    <LazyImage
                      key={index}
                      thumbnailSrc={imageData.thumbnail}
                      fullResSrc={imageData.fullRes}
                      alt={`gallery-photo-${index + 1}`}
                      className=""
                      onClick={() => handleImageClick(index)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Enlarged Image Overlay */}
          <AnimatePresence>
            {selectedIndex !== null && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-black/80 flex items-center justify-center p-4"
                onClick={handleCloseEnlarged}
              >
                {/* Fixed Navigation Elements - positioned relative to overlay */}
                {/* Close Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCloseEnlarged();
                  }}
                  className="fixed top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors z-20"
                  aria-label="Cerrar imagen"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>

                {/* Previous Button */}
                {selectedIndex > 0 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrevious();
                    }}
                    className="fixed left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors"
                    aria-label="Imagen anterior"
                  >
                    <ChevronLeftIcon className="h-6 w-6" />
                  </button>
                )}

                {/* Next Button */}
                {selectedIndex < images.length - 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNext();
                    }}
                    className="fixed right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors"
                    aria-label="Imagen siguiente"
                  >
                    <ChevronRightIcon className="h-6 w-6" />
                  </button>
                )}

                {/* Image Counter */}
                <div 
                  className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm z-20"
                  onClick={(e) => e.stopPropagation()}
                >
                  {selectedIndex + 1} de {images.length}
                </div>

                {/* Image Container */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="relative max-w-[90vw] max-h-[90vh] flex items-center justify-center"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Loading State */}
                  {isImageLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg">
                      <div className="bg-black/50 text-white px-4 py-2 rounded-full text-sm">
                        Cargando...
                      </div>
                    </div>
                  )}

                  {/* Image */}
                  <motion.img
                    key={selectedIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    src={images[selectedIndex].fullRes}
                    alt={`Imagen ampliada ${selectedIndex + 1}`}
                    className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
                    onLoad={() => setIsImageLoading(false)}
                    onError={() => setIsImageLoading(false)}
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </AnimatePresence>
  );
}
