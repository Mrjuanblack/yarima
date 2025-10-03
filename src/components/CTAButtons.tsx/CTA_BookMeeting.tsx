import CTAButtonBase from "./CTAButton";

export default function CTA_BookMeeting() {
    return (
        <CTAButtonBase text="Agendar visita" onClick={() => {window.open("https://flow.kuantia.co/webhook/yarima-booking", "_blank")}} />
    )
}