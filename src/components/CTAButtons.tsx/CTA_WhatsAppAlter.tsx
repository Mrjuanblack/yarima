import { IoLogoWhatsapp } from "react-icons/io5";
import CTAButtonBase from "./CTAButton";
import { useWhatsApp } from "@/hooks/useWhatsApp";

export default function CTA_WhatsAppAlter() {
    const { openWhatsApp } = useWhatsApp();

    return (
        <CTAButtonBase onClick={() => openWhatsApp("Quiero hablar con un asesor")}>Hablar con un asesor ahora<IoLogoWhatsapp className=" ml-2 w-6 h-6" /></CTAButtonBase>
    )
}