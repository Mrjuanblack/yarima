import CTAButtonBase from "./CTAButton";
import { useDownloadBrochure } from "@/hooks/useDownloadBrochure";

export default function CTA_Brochure() {
    const { downloadBrochure } = useDownloadBrochure();

    return (
        <CTAButtonBase onClick={downloadBrochure}>Descargar Brochure</CTAButtonBase>
    )
}