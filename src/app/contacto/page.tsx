"use client";

import ContactForm from "@/components/ContactForm";
import Container from "@/components/Container";
import ParallaxImage from "@/components/ParallaxImage";
import Section from "@/components/Section";

export default function Contact() {

    return (
        <div>
            <Section overrideClassName="w-full">
                <ParallaxImage imageUrl={["/renders/beach/1.jpeg", "/renders/beach/2.jpeg", "/renders/beach/3.jpeg"]} height="h-160" speed={0.5} overlay={true} overlayColor="black" overlayOpacity={0.75} >
                    <Container>
                        <div className="text-theme-background-200 text-center">
                            <h1 className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 font-semibold">
                                <span className="whitespace-nowrap">¿Interesado en nuestro proyecto?</span>
                            </h1>
                            <p className="text-base font-medium md:text-lg">Contáctanos para más información</p>
                            <div className="mt-6 font-medium">
                                <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mt-6 border-t border-theme-gold pt-4">
                                    <span><span className="inline sm:hidden mr-1 text-theme-gold">·</span>Resort</span>
                                    <span className="hidden sm:inline text-theme-gold">·</span>
                                    <span><span className="inline sm:hidden mr-1 text-theme-gold">·</span>Club de Playa</span>
                                    <span className="hidden sm:inline text-theme-gold">·</span>
                                    <span><span className="inline sm:hidden mr-1 text-theme-gold">·</span>Lounge Flotante</span>
                                </div>
                            </div>
                        </div>
                    </Container>
                </ParallaxImage>
            </Section>
            <Section>
                <Container>
                    <div className="max-w-[1000px] mx-auto">
                        <ContactForm />
                    </div>
                </Container>
            </Section>

            <h1>Contacto</h1>
        </div>
    )
}