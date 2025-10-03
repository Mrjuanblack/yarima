import { useEffect, useState, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/useIsMobile';

interface YoutubeVideoProps {
    /** Object containing mobile and desktop videos */
    videos: {
        mobileVideo: ReactNode;
        desktopVideo: ReactNode;
    };
    className?: string;
}

export default function YoutubeVideo({
    videos,
    className = "aspect-video w-full"
}: YoutubeVideoProps) {
    const [isClient, setIsClient] = useState(false);
    const isMobile = useIsMobile();

    useEffect(() => {
        setIsClient(true);
    }, []);

    // Select the appropriate video based on device type
    const selectedVideo = isMobile ? videos.mobileVideo : videos.desktopVideo;

    // Make any iframe responsive by removing width/height and setting dimensions based on device
    const makeIframeResponsive = (video: ReactNode) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const videoElement = video as any;
        
        // Check if it's an iframe
        if (videoElement?.type === 'iframe') {
            if (isMobile) {
                // Mobile styling: 85vh height, auto width, auto margin-x
                const mobileContainerStyle = {
                    width: 'auto',
                    height: '85vh',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    maxWidth: '100%'
                };
                
                const mobileIframeStyle = {
                    ...videoElement.props.style,
                    width: '100%',
                    height: '100%',
                    border: 'none'
                };
                
                const iframeProps = {
                    ...videoElement.props,
                    width: undefined, // Remove fixed width
                    height: undefined, // Remove fixed height
                    style: mobileIframeStyle
                };
                
                return (
                    <div className="mx-auto" style={mobileContainerStyle}>
                        <iframe {...iframeProps} />
                    </div>
                );
            } else {
                // Desktop styling: responsive container with aspect ratio
                const iframeProps = {
                    ...videoElement.props,
                    width: undefined, // Remove fixed width
                    height: undefined, // Remove fixed height
                    style: {
                        ...videoElement.props.style,
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        top: 0,
                        left: 0
                    }
                };
                
                return (
                    <div className="relative w-full h-full" style={{ paddingTop: '56.25%' }}>
                        <iframe {...iframeProps} />
                    </div>
                );
            }
        }
        
        return video;
    };

    return (
        <div className={className}>
            {isClient ? (
                makeIframeResponsive(selectedVideo)
            ) : (
                <div className="w-full h-full bg-gray-200 border border-gray-300 rounded-lg flex items-center justify-center">
                    <div className="flex gap-1">
                        {[0, 1, 2].map((index) => (
                            <motion.div
                                key={index}
                                className="w-2 h-2 bg-gray-500 rounded-full"
                                animate={{
                                    opacity: [0.3, 1, 0.3],
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    delay: index * 0.2,
                                    ease: "easeInOut"
                                }}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
