import { useEffect, useState, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface VimeoVideoProps {
    children: ReactNode;
    className?: string;
}

export default function VimeoVideo({
    children,
    className = "aspect-video w-full"
}: VimeoVideoProps) {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <div className={className}>
            {isClient ? (
                children
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
