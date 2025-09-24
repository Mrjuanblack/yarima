import CTAButtonBase from "./CTAButton";

export default function CTA_WhatsApp() {
    return (
        <CTAButtonBase text="Hablar por WhatsApp" onClick={() => { window.open("https://wa.me/573016656808?text=Hola, vi la web de Yarima Resort y estoy interesado en recibir más información", "_blank") }} />
    )
}