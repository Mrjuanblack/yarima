"use client";

import { useState } from "react";
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from "next/navigation";
import NavBarButton from "./NavBarButton";
import { useScrollPosition } from "../../hooks/useScrollPosition";
import { useScreenSize } from "@/hooks/useScreenSize";

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const router = useRouter();
    const { isAtTop } = useScrollPosition();
    const screenSize = useScreenSize();

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const menuVariants = {
        hidden: {
            opacity: 0,
            y: -100,
        },
        visible: {
            opacity: 1,
            y: 0,
        },
        exit: {
            opacity: 0,
            y: -100,
        }
    };

    const itemVariants = {
		hidden: {
			opacity: 0,
			y: -8,
		},
		visible: (i: number) => ({
			opacity: 1,
			y: 0,
			transition: { duration: 0.2, delay: i * 0.03 },
		}),
        exit: {
			opacity: 0,
			y: -8,
			transition: { duration: 0.15 },
        }
    };

    const menuItems = [
        { text: "Inicio", url: "/" },
        { text: "Ecosistema Yarima", url: "/ecosistema" },
        { text: "Inversión", url: "/inversion" },
        { text: "Aliados", url: "/aliados" },
        { text: "Topocoro", url: "/topocoro" },
        { text: "Contacto", url: "/contact" }
    ];

    const getGradientValues = (): {
        start: string;
        gold: string;
        end: string;
    } => {
        switch (screenSize) {
            case 'base':
                return { start: '45vw', gold: '50vw', end: '60vw' };
            case 'sm':
                return { start: '25vw', gold: '30vw', end: '35vw' };
            case 'md':
                return { start: '20vw', gold: '25vw', end: '30vw' };
            case 'lg':
                return { start: '10vw', gold: '15vw', end: '20vw' };
            case 'xl':
            case '2xl':
                return { start: '15vw', gold: '20vw', end: '25vw' };
        }
    }

    const gradientValues = getGradientValues();

    const handleClick = () => {
        setIsMobileMenuOpen(false);
    }

    return (
        <>
            {/* <nav className={`sticky top-0 z-50 bg-theme-background-200 border-gray-200 ${isMobileMenuOpen ? '' : 'shadow-sm'}`}> */}
            {/* <nav className={`fixed top-0 left-0 right-0 z-50 ${isAtTop ? 'h-24' : 'h-18'} ${isAtTop ? (isMobileMenuOpen ? 'bg-white' : 'bg-transparent') : 'bg-theme-background-200 h-18'} ${isAtTop ? 'border-theme-gold/50 border-b' : 'shadow-sm'} transition-[height,background-color] ease-in-out duration-300`}> */}
            <nav className={`fixed top-0 left-0 right-0 z-50 bg-white ${isAtTop ? 'h-24' : 'h-18'} ${isAtTop ? 'border-white/50 border-b' : 'shadow-md'} transition-[height,background-color] ease-in-out duration-300`}>
                {/* Gradient overlay that animates */}
                <motion.div
                    className={`absolute inset-0 pointer-events-none -z-10 ${isAtTop ? 'backdrop-blur-none' : 'backdrop-blur-md'}`}
                    animate={{
                        background: isAtTop
                            ? `linear-gradient(to right, color-mix(in srgb, var(--color-background) 90%, transparent) ${gradientValues.start}, color-mix(in srgb, var(--color-background) 90%, transparent) ${gradientValues.gold}, transparent ${gradientValues.end})`
                            : "linear-gradient(to right, color-mix(in srgb, var(--color-background) 80%, transparent) 0px, color-mix(in srgb, var(--color-background) 80%, transparent) 100vw, transparent 100vw)"
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                />
                <div className=" mx-auto px-4 sm:px-6 lg:px-8 h-full">
                    <div className="flex items-center h-full">
                        {/* Logo/Brand */}
                        <div className="flex-shrink-0">
                            <img src="/nav-logo.png" alt="Yarima Logo" className="w-45 h-auto cursor-pointer" onClick={() => router.push('/')} />
                        </div>
                        {/* Navigation Links */}
                        <div className="hidden lg:flex w-full h-full justify-center">
                            <div className="ml-10 h-full flex space-x-8 gap-8">
                                {menuItems.map((item, index) => (
                                    <NavBarButton key={index} text={item.text} url={item.url} showBorder={isAtTop} onClick={handleClick} />
                                ))}
                            </div>
                        </div>
                        {/* Padding for md size */}
                        <div className="w-45 hidden lg:block" />
                        {/* Mobile menu button */}
                        <div className="lg:hidden w-full flex justify-end">
                            <button
                                type="button"
                                onClick={toggleMobileMenu}
                                className="bg-gray-50 inline-flex items-center justify-center p-2 rounded-md text-gray-700 ring-1 ring-gray-200 hover:bg-gray-100 transition-colors duration-200"
                                aria-controls="mobile-menu"
                                aria-expanded={isMobileMenuOpen}
                            >
                                <span className="sr-only">{isMobileMenuOpen ? 'Close main menu' : 'Open main menu'}</span>
                                {/* Dynamic icon - changes based on menu state */}
                                {isMobileMenuOpen ? (
                                    <XMarkIcon className="h-6 w-6" />
                                ) : (
                                    <Bars3Icon className="h-6 w-6" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

            </nav>

            {/* Backdrop - With animation */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        className={`lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-30 ${isAtTop ? 'top-24' : 'top-14'}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    ></motion.div>
                )}
            </AnimatePresence>

            {/* Mobile menu overlay - Outside navbar */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        className={`lg:hidden fixed ${isAtTop ? 'top-24' : 'top-18'} left-0 right-0 z-30`}
                        id="mobile-menu"
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={menuVariants}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                    >

                        {/* Menu content */}
                        <motion.div
                            className="relative bg-white border-b border-gray-200 shadow-lg"
                            variants={menuVariants}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                        >
                            <div className="px-4 pt-4 pb-6 space-y-2">
                                {menuItems.map((item, index) => (
                                    <motion.div
                                        variants={itemVariants}
                                        key={index}
                                        custom={index}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                    >
                                        <NavBarButton key={index} text={item.text} url={item.url} onClick={handleClick} />
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
