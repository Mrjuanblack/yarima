"use client";

import Container from "@/components/Container";
import CTAButtonBase from "@/components/CTAButtons.tsx/CTAButton";
import ParallaxImage from "@/components/ParallaxImage";
import SectionTitle from "@/components/SectionTitle";
import { FaBuilding, FaCar, FaFutbol, FaHotel, FaPeace, FaSpa, FaUtensils } from "react-icons/fa";
import { FaSwimmingPool } from "react-icons/fa";
import { FaUmbrellaBeach } from "react-icons/fa";
import { GiBeachBall } from "react-icons/gi";
import { FaSailboat } from "react-icons/fa6";
import { FaWater } from "react-icons/fa";
import { MdKitesurfing } from "react-icons/md";
import { IoMusicalNotes } from "react-icons/io5";
import Footer from "@/components/Footer";
import Section from "@/components/Section";

const iconClass = "h-8 w-auto text-theme-background-dark-950";
export default function Ecosistema() {
    const features1 = [
        {
            title: "52 Suites de 40 m² con terraza, jacuzzi y vista 180° al embalse",
            description: "52 Suites de 40 m² con terraza, jacuzzi y vista 180° al embalse",
            icon: <FaHotel className={iconClass} />
        },
        {
            title: "Piscina infinita y solárium",
            description: "Piscina infinita y solárium",
            icon: <FaSwimmingPool className={iconClass} />
        },
        {
            title: "Spa & circuito wellness (sauna, turco e hidromasajes)",
            description: "Spa & circuito wellness (sauna, turco e hidromasajes)",
            icon: <FaSpa className={iconClass} />
        },
        {
            title: "Restaurante de autor",
            description: "Restaurante de autor",
            icon: <FaUtensils className={iconClass} />
        },
        {
            title: "Salones de eventos",
            description: "Salón de eventos (≈150 pax) + salón corporativo (≈50 pax)",
            icon: <FaBuilding className={iconClass} />
        },
        {
            title: "Zonas recreativas",
            description: "Cancha de pádel, salón de juegos, parque infantil y parque canino.",
            icon: <FaFutbol className={iconClass} />
        },
        {
            title: "Zonas de silencio obligatorio (decks de yoga, lectura y senderos)",
            description: "Zonas de silencio obligatorio (decks de yoga, lectura y senderos)",
            icon: <FaPeace className={iconClass} />
        },
        {
            title: "Car lobby con valet parking",
            description: "Car lobby con valet parking",
            icon: <FaCar className={iconClass} />
        }
    ];

    const features2 = [
        {
            title: "Playa artificial y zonas lounge con sombra.",
            description: "Playa artificial y zonas lounge con sombra.",
            icon: <GiBeachBall className={iconClass} />
        },
        {
            title: "Piscinas y zonas de jacuzzis",
            description: "Piscinas y zonas de jacuzzis",
            icon: <FaSwimmingPool className={iconClass} />
        },
        {
            title: "Restaurantes",
            description: "Restaurantes",
            icon: <FaUtensils className={iconClass} />
        },
        {
            title: "Bar de playa",
            description: "Bar de playa",
            icon: <FaUmbrellaBeach className={iconClass} />
        },
        {
            title: "Muelle privado",
            description: "Muelle privado",
            icon: <FaSailboat className={iconClass} />
        },
        {
            title: "Marina mixta (en agua y seca ligera)",
            description: "Marina mixta (en agua y seca ligera)",
            icon: <FaWater className={iconClass} />
        },
        {
            title: "Deportes náuticos",
            description: "Wakeboard, Kitesurf, Jetski, Paddle, Kayak",
            icon: <MdKitesurfing className={iconClass} />
        },
        {
            title: "Espacios para conciertos y festivales musicales",
            description: "Espacios para conciertos y festivales musicales",
            icon: <IoMusicalNotes className={iconClass} />
        }

    ]

    const features3 = [
        {
            title: "Deck privado para socios",
            description: "Deck privado para socios",
            icon: <FaSailboat className={iconClass} />
        },
        {
            title: "Solárium con sillas asoleadoras y parasoles",
            description: "Solárium con sillas asoleadoras y parasoles",
            icon: <FaSailboat className={iconClass} />
        },
        {
            title: "Lounge con servicio de bebidas y estación de snacks",
            description: "Lounge con servicio de bebidas y estación de snacks",
            icon: <FaSailboat className={iconClass} />
        },
        {
            title: "Deck de música en vivo y socialización",
            description: "Deck de música en vivo y socialización",
            icon: <FaSailboat className={iconClass} />
        },
        {
            title: "Acceso desde el muelle del Club de Playa",
            description: "Acceso desde el muelle del Club de Playa",
            icon: <FaSailboat className={iconClass} />
        }
    ]

    return (
        <div>
            <Section overrideClassName="w-full">
                <ParallaxImage imageUrl={["/renders/beach/1.jpeg", "/renders/beach/2.jpeg", "/renders/beach/3.jpeg"]} height="h-160" speed={0.5} overlay={true} overlayColor="black" overlayOpacity={0.75} >
                    <Container>
                        <div className="text-theme-background-200 text-center">
                            <h1 className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 font-semibold">
                                <span className="whitespace-nowrap">Yarima Resort &</span><wbr /><span className="whitespace-nowrap"> Club de Playa</span>
                            </h1>
                            <p className="text-base font-medium md:text-lg">Un destino, tres experiencias frente al agua</p>
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
                    <div className="grid grid-cols-12 gap-6">
                        <div className="col-span-12 lg:col-span-4 flex flex-col justify-end gap-4">
                            <p className="text-base/6 text-gray-600">Descanso, Bienestar y Entretenimiento. Ese es el ecosistema Yarima: suites con terraza, jacuzzi y vista 180° al embalse para desconectar; un Club de Playa con acceso exclusivo para disfrutar de la playa artificial, las piscinas y los deportes náuticos; y el Lounge Flotante, un deck sobre el agua con todas las comodidades.</p>
                            <p className="text-base/6 text-gray-600">Una experiencia integral de lujo, con múltiples atracciones y servicios de alto nivel, todo en un mismo destino frente al embalse de Topocoro.</p>
                        </div>
                        <div className="col-span-12 md:col-span-8">
                            <div className="h-[540px] w-full bg-amber-600 rounded-2xl"></div>
                        </div>
                    </div>
                </Container>
            </Section>
            <Section>
                <Container id="ecosistema-yarima">
                    <div className="grid grid-cols-12 gap-6">
                        <div className="col-span-12 xl:col-span-8 flex flex-col gap-8">
                            <SectionTitle title="Yarima Resort" removeMargin />
                            <p className="text-base/6 text-gray-600">Un resort destino frente al embalse de Topocoro, concebido para integrar descanso y bienestar en un mismo espacio. La propuesta combina hospitalidad de alto nivel, una oferta de experiencias cuidadosamente diseñadas y una relación respetuosa con el entorno. Aquí, el huésped encuentra equilibrio: energía durante el día y serenidad en su descanso.</p>
                            <div className="grid grid-cols-12 gap-6">
                                {features1.map((feature, index) => (
                                    <div className="col-span-12 md:col-span-6 flex gap-4" key={index}>
                                        {feature.icon}
                                        <div className="flex flex-col">
                                            <h3 className="text-base font-medium">{feature.title}</h3>
                                            <p className="text-sm/6 text-gray-600">{feature.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="w-full">
                                <div className="mt-10 flex flex-col 2xl:flex-row justify-center items-center gap-4">
                                    <CTAButtonBase text="Descargar Brochure" onClick={() => { }} />
                                    <CTAButtonBase text="Ver galería del Resort" onClick={() => { }} />
                                    <CTAButtonBase text="Agendar visita al Centro de Experiencias" onClick={() => { }} />
                                </div>
                            </div>
                        </div>
                        <div className="col-span-0 hidden xl:flex xl:col-span-4 justify-center items-center bg-[url('/renders/beach/1.jpeg')] bg-cover bg-center rounded-2xl">
                        </div>
                    </div>
                </Container>
            </Section>
            <Section>
                <Container id="ecosistema-club-de-playa">
                    <div className="grid grid-cols-12 gap-6">
                        <div className="col-span-12 xl:col-span-4 hidden xl:flex justify-center items-center bg-[url('/renders/beach/2.jpeg')] bg-cover bg-center rounded-2xl">
                        </div>
                        <div className="col-span-12 xl:col-span-8 flex flex-col gap-8">
                            <SectionTitle title="Club de Playa" removeMargin />
                            <p className="text-base/6 text-gray-600">Nuestro Club de Playa será el epicentro de entretenimiento: un espacio de acceso exclusivo para socios, huéspedes e invitados, inspirado en los mejores beach clubs del Caribe. Un lugar donde deporte, música y entretenimiento convergen en decenas de actividades náuticas, sesiones musicales y experiencias frente al embalse.</p>
                            <div className="grid grid-cols-12 gap-6">
                                {features2.map((feature, index) => (
                                    <div className="col-span-12 md:col-span-6 flex gap-4" key={index}>
                                        {feature.icon}
                                        <div className="flex flex-col">
                                            <h3 className="text-base font-medium">{feature.title}</h3>
                                            <p className="text-sm/6 text-gray-600">{feature.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-10 flex flex-col lg:flex-row justify-center items-center gap-4">
                                <CTAButtonBase text="Ver galería del Club de Playa" onClick={() => { }} />
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>
            <Section>
                <Container id="ecosistema-lounge-flotante">
                    <div className="grid grid-cols-12 gap-6">
                        <div className="col-span-12 xl:col-span-8 flex flex-col gap-8">
                            <SectionTitle title="Lounge Flotante" removeMargin />
                            <p className="text-base/6 text-gray-600">Nuestro lounge flotante es una plataforma de diseño modular sobre el embalse que se configura como punto de encuentro frente al agua. Al centro, una zona de baño segura; alrededor, diferentes espacios se integran, desde solárium amplio y un lounge con servicio de bebidas y snacks.</p>
                            <p className="text-base/6 text-gray-600">Contará además con un deck privado para socios y un muelle para deportes náuticos y embarcaciones livianas.</p>
                            <div className="grid grid-cols-12 gap-6">
                                {features3.map((feature, index) => (
                                    <div className="col-span-12 md:col-span-6 flex gap-4" key={index}>
                                        {feature.icon}
                                        <div className="flex flex-col">
                                            <h3 className="text-base font-medium">{feature.title}</h3>
                                            <p className="text-sm/6 text-gray-600">{feature.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-10 flex flex-col lg:flex-row justify-center items-center gap-4">
                                <CTAButtonBase text="Ver galería" onClick={() => { }} />
                            </div>
                        </div>
                        <div className="col-span-12 hidden xl:flex xl:col-span-4 justify-center items-center bg-[url('/renders/beach/3.jpeg')] bg-cover bg-center rounded-2xl">
                        </div>
                    </div>

                </Container>
            </Section>
            <Footer />
        </div>
    );
}