"use client";

import { useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface ButtonProps {
    text: string;
    onClick: () => void;
    shadow?: boolean;
    outline?: boolean;
}
const Button = ({ text, onClick, shadow = true, outline = false }: ButtonProps) => {
    const mouseX = useMotionValue(50);
    const mouseY = useMotionValue(50);
    const mouseXSpring = useSpring(mouseX);
    const mouseYSpring = useSpring(mouseY);
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = ({ clientX, clientY, currentTarget }: React.MouseEvent<HTMLButtonElement>) => {
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        mouseX.set(((clientX - left) / width) * 100);
        mouseY.set(((clientY - top) / height) * 100);
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        mouseX.set(50);
        mouseY.set(50);
    };

    const baseClasses = "text-base font-normal px-4 py-2 rounded-full transition-all duration-200 cursor-pointer";
    const filledClasses = "bg-theme-gold text-theme-background-200 hover:bg-theme-background-600";
    const outlinedClasses = "border-2 border-theme-gold text-theme-gold hover:bg-theme-gold hover:text-theme-background-200";
    const shadowClass = shadow ? 'shadow-lg' : '';
    
    const spotlightBackground = useMotionTemplate`radial-gradient(circle at ${mouseXSpring}% ${mouseYSpring}%, rgba(255,255,255,0.1), transparent 70%)`;
    
    return (
        <motion.button 
            className={`${baseClasses} ${outline ? outlinedClasses : filledClasses} ${shadowClass} hover:ring-2 hover:ring-theme-background-200/80 relative overflow-hidden`} 
            onClick={onClick}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
                backgroundImage: isHovered ? spotlightBackground : 'none',
            }}
        >
            <span className="relative z-10">{text}</span>
        </motion.button>
    );
}

export default Button;