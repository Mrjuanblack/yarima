import CTAButtonBase from "./CTAButton";
import { useWhatsApp } from "@/hooks/useWhatsApp";

export default function CTA_WhatsAppAlter() {
    const { openWhatsApp } = useWhatsApp();

    return (
        <CTAButtonBase text="Hablar con un asesor ahora" onClick={() => openWhatsApp("Quiero hablar con un asesor")} />
    )
}