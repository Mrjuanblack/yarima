"use client";

import Container from "./Container"
import { FaInstagram } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
// import { AiFillTikTok } from "react-icons/ai";


const Footer: React.FC = () => {
    const socialMediaSize = "w-5 h-auto";
    return (
        <footer className="bg-gradient-to-br from-theme-background-dark-950 via-theme-background-dark-950/95 to-theme-background-dark-950 pt-12 pb-8 px-6 lg:px-8 text-theme-background-200">
            <Container>
                <div className="flex flex-col gap-4">
                    <div className="w-full grid grid-cols-8 gap-4">
                        <div className="col-span-3 sm:col-span-4 flex justify-center items-center">
                            <img src="logo-full-blanco.png" alt="Yarima" className="w-full md:w-40 h-auto" />
                        </div>
                        <div className="flex flex-col gap-2 col-span-5 sm:col-span-4 justify-center items-start">
                            <p className="text-white text-sm sm:text-base md:text-base"><span className="font-medium mr-1">Sala de Experiencias: </span>Km 1.4, vía Ruitoque Bajo - Acapulco.</p>
                            <p className="text-white text-sm sm:text-base md:text-base">Floridablanca, Santander</p>
                            <div className="flex justify-start items-center gap-4">
                                <FaInstagram className={`${socialMediaSize} cursor-pointer`} onClick={() => window.open("https://www.instagram.com/yarima.topocoro", "_blank")} />
                                <FaFacebookSquare className={`${socialMediaSize} cursor-pointer`} onClick={() => window.open("https://www.facebook.com/share/17NMsPpvfX/?mibextid=wwXIfr", "_blank")} />
                                <FaYoutube className={`${socialMediaSize} cursor-pointer`} onClick={() => window.open("https://www.youtube.com/@YarimaResort", "_blank")} />
                                {/* <AiFillTikTok className={`${socialMediaSize} cursor-pointer`} onClick={() => window.open("https://www.tiktok.com/@yarimaresort", "_blank")} /> */}
                            </div>
                        </div>
                    </div>
                    <div>
                        <p className="mt-2 text-center text-white text-sm md:text-sm">© {new Date().getFullYear()} Yarima Resort & Club de Playa. Todos los derechos reservados.</p>
                        <p className="text-center text-white text-sm md:text-sm">Desarrollado por <a href="https://mimmers.com" target="_blank" rel="noopener noreferrer" className="text-theme-gold">MIMMERS</a></p>
                    </div>
                </div>
            </Container>
        </footer>
    )
}

export default Footer;