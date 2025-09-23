"use client";

import Accordion, { AccordionItem } from "@/components/Accordion";
import Container from "@/components/Container";
import CTAButton from "@/components/CTAButton";
import Footer from "@/components/Footer";
import ParallaxImage from "@/components/ParallaxImage";
import Section from "@/components/Section";
import SectionTitle from "@/components/SectionTitle";

const cardResponsiveValues_2cols = "bg-[length:250%] sm:bg-[length:150%] md:bg-[length:150%] lg:bg-[length:225%]"

export default function Inversion() {
    const items: AccordionItem[] = [
        {
            title: "¿Qué compro exactamente?",
            content: <span>Una <span className="font-semibold">participación en derechos fiduciarios</span> del proyecto.</span>,
            id: "que-compro-exactamente"
        },
        {
            title: "¿Cómo recibo la rentabilidad?",
            content: <span>A través de la <span className="font-semibold">fiduciaria</span>, conforme a reglamento y desempeño del hotel.</span>,
            id: "como-recibo-la-rentabilidad"
        },
        {
            title: "¿Puedo usar el proyecto?",
            content: <span>Sí: <span className="font-semibold">uso ilimitado</span> de las zonas sociales del Resort y membresía vitalicia al Club de Playa (con invitados).</span>,
            id: "puedo-usar-el-proyecto"
        },
        {
            title: "¿Cómo pago?",
            content: <span><span className="font-semibold">Reserva $3.000.000</span> y eliges <span className="font-semibold">cuotas</span> o <span className="font-semibold">financiación directa</span> según etapa comercial.</span>,
            id: "como-pago"
        },
        {
            title: "¿Qué pasa si quiero ceder mi participación?",
            content: <span>Existen <span className="font-semibold">mecanismos de cesión</span> bajo condiciones del reglamento fiduciario. </span>,
            id: "que-pasa-si-quiero-ceder-mi-participacion"
        },
    ]
    return (<div>
        <Section overrideClassName="w-full">
            <ParallaxImage imageUrl={["/renders/beach/1.jpeg", "/renders/beach/2.jpeg", "/renders/beach/3.jpeg"]} height="h-160" speed={0.5} overlay={true} overlayColor="black" overlayOpacity={0.75} >
                <Container>
                    <div className="text-theme-background-200 text-center">
                        <h1 className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 font-semibold">
                            <span>Invierte en el Desarrollo de Santander</span>
                        </h1>
                        <p className="text-base font-medium md:text-lg">Un destino, tres experiencias frente al agua</p>
                        <div className="mt-6 font-medium">
                            <div className="flex flex-col items-center justify-center gap-2 sm:gap-4 mt-6 border-t border-theme-gold pt-4 max-w-[1200px] mx-auto">
                                <p>Invierte a través de derechos fiduciarios y separa tu cupo con una reserva de $3.000.000 COP. Recibes rentabilidad mensual derivada de la operación hotelera y acceso exclusivo al Ecosistema Yarima:</p>
                                <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
                                    <span><span className="inline sm:hidden mr-1 text-theme-gold">·</span>Resort</span>
                                    <span className="hidden sm:inline text-theme-gold">·</span>
                                    <span><span className="inline sm:hidden mr-1 text-theme-gold">·</span>Club de Playa</span>
                                    <span className="hidden sm:inline text-theme-gold">·</span>
                                    <span><span className="inline sm:hidden mr-1 text-theme-gold">·</span>Lounge Flotante</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </ParallaxImage>
        </Section>
        <Section>
            <Container>
                <div className="w-full h-[800px] bg-theme-background-200 rounded-2xl">

                </div>
            </Container>
        </Section>
        <Section>
            <Container>
                <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-12 xl:col-span-5 flex flex-col gap-8">
                        <SectionTitle title="Modelo de Inversión" removeMargin />
                        <p className="text-base/6 text-gray-600">Inviertes a través de derechos fiduciarios administrados por Acción Fiduciaria, una entidad vigilada por la Superintendencia Financiera de Colombia. Tu participación te hace socio del proyecto y te da derecho a recibir rentabilidad mensual proveniente de la operación hotelera. Además, disfrutas el proyecto: uso ilimitado de las zonas sociales del Resort y membresía vitalicia al Club de Playa (con invitados), más prioridad en experiencias y futuros proyectos.</p>
                        <div className="flex flex-col gap-2">
                            <p className="text-base/6 text-gray-600">Beneficios:</p>
                            <ul className="list-disc list-inside">
                                <li className="text-base/6 text-gray-600">Estructura mediante fiducia (seguridad jurídica)</li>
                                <li className="text-base/6 text-gray-600">Rentabilidad mensual por la operación del hotel  (hospedaje y servicios)</li>
                                <li className="text-base/6 text-gray-600">Uso ilimitado de las zonas sociales del resort.</li>
                                <li className="text-base/6 text-gray-600">Membresía vitalicia al Club de Playa (puedes llevar invitados).</li>
                                <li className="text-base/6 text-gray-600">5 noches al año gratuitas (que podrás usar o vender)</li>
                                <li className="text-base/6 text-gray-600">Código de 30% de descuento (que podrás usar o regalar)</li>
                                <li className="text-base/6 text-gray-600">Acceso exclusivo a eventos</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-span-12 xl:col-span-7 flex flex-col gap-8">
                        <div className="w-full h-[500px] bg-theme-background-200 rounded-2xl">
                        </div>
                    </div>
                </div>
                <div className="mt-10 flex flex-col lg:flex-row justify-center items-center gap-4">
                    <CTAButton text="Contactar por WhatsApp" onClick={() => { }} />
                    <CTAButton text="Agendar visita" onClick={() => { }} />
                </div>
            </Container>
        </Section>
        <Section>
            <Container>
                <SectionTitle title="Formas de pago" description="Empiezas con una reserva de $3.000.000 COP y eliges entre dos formas de pago: " />
                <div className="grid grid-cols-12 xl:gap-2 gap-6">
                    <div className="col-span-12 xl:col-span-6 xl:rounded-tl-4xl xl:rounded-bl-4xl group relative flex flex-col overflow-hidden rounded-lg bg-white shadow-xs ring-1 ring-black/5 data-dark:bg-gray-800 data-dark:ring-white/15">
                        <div className="relative h-80 shrink-0">
                            <div className={`h-80 bg-[url(/renders/v2/2.jpg)] ${cardResponsiveValues_2cols} bg-center bg-no-repeat`} />
                            <div className="absolute inset-0 bg-linear-to-t from-white to-50% group-data-dark:from-gray-800 group-data-dark:from-[-25%]" />
                        </div>
                        <div className="relative p-10 flex flex-col flex-grow">
                            <h3 className="mt-1 text-3xl/8 font-medium tracking-tight text-gray-950 group-data-dark:text-white">Pago durante el desarrollo</h3>
                            <p className="mt-2 max-w-[600px] text-lg text-gray-600 group-data-dark:text-gray-400">24 cuotas mensuales (sin intereses)</p>
                        </div>
                    </div>
                    <div className="col-span-12 xl:col-span-6 xl:rounded-tr-4xl xl:rounded-br-4xl group relative flex flex-col overflow-hidden rounded-lg bg-white shadow-xs ring-1 ring-black/5 data-dark:bg-gray-800 data-dark:ring-white/15">
                        <div className="relative h-80 shrink-0">
                            <div className={`h-80 bg-[url(/renders/v2/2.jpg)] ${cardResponsiveValues_2cols} bg-center bg-no-repeat`} />
                            <div className="absolute inset-0 bg-linear-to-t from-white to-50% group-data-dark:from-gray-800 group-data-dark:from-[-25%]" />
                        </div>
                        <div className="relative p-10 flex flex-col flex-grow">
                            <h3 className="mt-1 text-3xl/8 font-medium tracking-tight text-gray-950 group-data-dark:text-white">Financiación directa</h3>
                            <p className="mt-2 max-w-[600px] text-lg text-gray-600 group-data-dark:text-gray-400">60 cuotas mensuales <span className="whitespace-nowrap">(1% E.A.)</span></p>
                        </div>
                    </div>
                </div>
                <p className="mt-10 text-lg text-center font-medium">Te acompañamos para escoger el plan que mejor se ajuste a tu perfil.</p>
                <div className="mt-5 flex flex-col lg:flex-row justify-center items-center gap-4">
                    <CTAButton text="Hablar con un asesor ahora" onClick={() => { }} />
                </div>
            </Container>
        </Section>
        <Section>
            <Container>
                <SectionTitle title="Preguntas Frecuentes FAQ" />
                <Accordion items={items} />
                <div className="mt-10 flex flex-col lg:flex-row justify-center items-center gap-4">
                    <CTAButton text="Hablar con un asesor ahora" onClick={() => { }} />
                </div>
            </Container>
        </Section>
        <Section>
            <Container>
                <p className="text-4xl text-center font-medium">¿Listo para empezar?</p>
                <div className="mt-10 flex flex-col lg:flex-row justify-center items-center gap-4">
                    <CTAButton text="Hablar por WhatsApp" onClick={() => { }} />
                    <CTAButton text="Agendar visita" onClick={() => { }} />
                </div>
            </Container>
        </Section>
        <Footer />
    </div>)
}