"use client";

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface SectionProps {
    children: React.ReactNode;
    overrideClassName?: string;
    fadeIn?: boolean;
    videoPadding?: boolean;
}

const Section = ({ children, overrideClassName, fadeIn = false, videoPadding = false }: SectionProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const paddingClasses = videoPadding ? "pt-8 pb-8 md:pt-20 md:pb-4" : "py-8 md:py-20";

    if (fadeIn) {
        return (
            <motion.section
                ref={ref}
                className={overrideClassName || paddingClasses}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                {children}
            </motion.section>
        );
    }

    return (
        <section className={overrideClassName || "py-8 md:py-20"}>
            {children}
        </section>
    );
}

export default Section;