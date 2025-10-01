import CTAButtonBase from "./CTAButton";
import { useWhatsApp } from "@/hooks/useWhatsApp";

export default function CTA_WhatsApp() {
    const { openWhatsApp } = useWhatsApp();

    return (
        <CTAButtonBase text="Hablar por WhatsApp" onClick={openWhatsApp} />
    )
}