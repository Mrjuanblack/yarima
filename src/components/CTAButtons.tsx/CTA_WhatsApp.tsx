import { IoLogoWhatsapp } from "react-icons/io5";
import CTAButtonBase from "./CTAButton";
import { useWhatsApp } from "@/hooks/useWhatsApp";

export default function CTA_WhatsApp() {
    const { openWhatsApp } = useWhatsApp();

    return (
        <CTAButtonBase onClick={openWhatsApp}>Contáctanos<IoLogoWhatsapp className=" ml-2 w-6 h-6" /></CTAButtonBase>
    )
}