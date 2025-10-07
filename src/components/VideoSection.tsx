"use client";

import { motion } from 'framer-motion';

interface VideoSectionProps {
  /** Background image path */
  backgroundImage: string;
  /** Function to call when play button is clicked */
  onPlayClick: () => void;
  /** Optional title text to display */
  title?: string;
  /** Optional subtitle text */
  subtitle?: string;
  /** Optional overlay opacity (default: bg-black/60) */
  overlayOpacity?: string;
  /** Optional title text size (default: 4xl) */
  titleSize?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | '8xl' | '9xl';
}

export default function VideoSection({
  backgroundImage,
  onPlayClick,
  title,
  subtitle,
  overlayOpacity = "bg-black/60",
  titleSize = "4xl"
}: VideoSectionProps) {
  // Generate responsive text classes based on titleSize
  const getResponsiveTextClasses = (baseSize: string) => {
    const sizeMap: Record<string, string> = {
      'xs': 'text-xs sm:text-sm md:text-base',
      'sm': 'text-sm sm:text-base md:text-lg',
      'base': 'text-base sm:text-lg md:text-xl',
      'lg': 'text-lg sm:text-xl md:text-2xl',
      'xl': 'text-xl sm:text-2xl md:text-3xl',
      '2xl': 'text-2xl sm:text-3xl md:text-4xl',
      '3xl': 'text-3xl sm:text-4xl md:text-5xl',
      '4xl': 'text-4xl sm:text-4xl md:text-5xl lg:text-6xl',
      '5xl': 'text-5xl sm:text-5xl md:text-6xl lg:text-7xl',
      '6xl': 'text-6xl sm:text-6xl md:text-7xl lg:text-8xl',
      '7xl': 'text-7xl sm:text-7xl md:text-8xl lg:text-9xl',
      '8xl': 'text-8xl sm:text-8xl md:text-9xl',
      '9xl': 'text-9xl'
    };
    return sizeMap[baseSize] || sizeMap['4xl'];
  };
  return (
    <div className="relative rounded-2xl overflow-hidden w-full h-80 md:h-100 lg:h-125">
      <img 
        src={backgroundImage} 
        alt="Background" 
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className={`absolute inset-0 ${overlayOpacity}`}>
        {/* Play button - absolutely centered */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <motion.div
              className="absolute inset-0 rounded-full bg-white/20"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.6, 0.2, 0.6],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute inset-0 rounded-full bg-white/20"
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.4, 0.1, 0.4],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
            />
            <button
              onClick={onPlayClick}
              className="relative p-4 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 transition-all duration-300 group"
            >
              <svg className="w-12 h-12 text-white group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Title - positioned below the center */}
        {(title || subtitle) && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-16 w-full px-4">
            <div className="text-center">
              {title && (
                <h2 className={`${getResponsiveTextClasses(titleSize)} mb-4 font-semibold text-theme-background-200`}>
                  {title}
                </h2>
              )}
              {subtitle && (
                <p className="text-lg md:text-xl text-theme-background-200">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
