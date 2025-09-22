"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';

interface ParallaxImageProps {
  imageUrl: string | string[];
  height?: string;
  speed?: number;
  className?: string;
  overlay?: boolean;
  overlayColor?: string;
  overlayOpacity?: number;
  fadeDuration?: number;
  autoFade?: boolean;
  fadeInterval?: number;
  children?: React.ReactNode;
}

const ParallaxImage = ({ 
  imageUrl, 
  height = "h-screen", 
  speed = 0.5,
  className = "",
  overlay = false,
  overlayColor = "black",
  overlayOpacity = 0.5,
  fadeDuration = 2,
  fadeInterval = 5000,
  children
}: ParallaxImageProps) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, -500 * speed]);
  
  // Handle multiple images
  const images = Array.isArray(imageUrl) ? imageUrl : [imageUrl];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Auto-fade between images
  useEffect(() => {
    if (images.length <= 1) return;

    let intervalId: number | undefined;
    const timeoutId = window.setTimeout(() => {
      // First transition after the initial wait
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
      // Continue cycling at the specified interval
      intervalId = window.setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }, fadeInterval);
    }, fadeInterval);

    return () => {
      window.clearTimeout(timeoutId);
      if (intervalId !== undefined) window.clearInterval(intervalId);
    };
  }, [images.length, fadeInterval]);

  return (
    <div className={`relative ${height} overflow-hidden ${className} w-full`}>
      {/* Image layers with fade animation */}
      {images.map((img, index) => (
        <motion.div
          key={img}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            y,
            backgroundImage: `url(${img})`,
            height: '150%',
            top: '-25%',
          }}
          initial={false}
          animate={{
            opacity: index === currentImageIndex ? 1 : 0
          }}
          transition={{ duration: fadeDuration, ease: "easeInOut" }}
        />
      ))}
      
      {/* Overlay */}
      {overlay && (
        <div 
          className="absolute inset-0 z-10"
          style={{
            backgroundColor: overlayColor,
            opacity: overlayOpacity
          }}
        />
      )}
      
      {/* Children content */}
      {children && (
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          {children}
        </div>
      )}
    </div>
  );
};

export default ParallaxImage;
