"use client";

import { useState } from "react";
import { IoLogoWhatsapp } from "react-icons/io5";
import { motion } from "framer-motion";

const WhatsAppButton = () => {
    const [isHovered, setIsHovered] = useState(false);
    
    return (
        <div className="w-10 h-10 text-green-500 hover:text-green-600 transition-all duration-200" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <motion.div
                animate={{ scale: isHovered ? 1.1 : 1 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="w-10 h-10 cursor-pointer"
            >
                <IoLogoWhatsapp className="w-10 h-10" />
            </motion.div>
        </div>
    )
}

export default WhatsAppButton;