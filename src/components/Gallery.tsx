"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/outline";

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

function LazyImage({ thumbnailSrc, fullResSrc, alt, className, onClick }: LazyImageProps) {
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

  const handleImageClick = (index: number) => {
    setSelectedIndex(index);
  };

  const handleCloseEnlarged = () => {
    setSelectedIndex(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      if (selectedIndex !== null) {
        handleCloseEnlarged();
      } else {
        onClose();
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
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
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="relative max-w-[90vw] max-h-[90vh]"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Close Button */}
                  <button
                    onClick={handleCloseEnlarged}
                    className="absolute -top-12 right-0 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors z-10"
                    aria-label="Cerrar imagen"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>

                  {/* Image */}
                  <motion.img
                    key={selectedIndex}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    src={images[selectedIndex].fullRes}
                    alt={`Imagen ampliada ${selectedIndex + 1}`}
                    className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
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
