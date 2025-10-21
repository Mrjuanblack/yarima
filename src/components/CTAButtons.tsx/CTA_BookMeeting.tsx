import CTAButtonBase from "./CTAButton";

export default function CTA_BookMeeting() {
    return (
        <CTAButtonBase onClick={() => {window.open("https://flow.kuantia.co/webhook/yarima-booking", "_blank")}}>Agendar visita</CTAButtonBase>
    )
}