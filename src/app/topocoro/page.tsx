"use client";

import Container from "@/components/Container";
import CTAButtonBase from "@/components/CTAButtons.tsx/CTAButton";
import Footer from "@/components/Footer";
import ParallaxImage from "@/components/ParallaxImage";
import Section from "@/components/Section";
import SectionTitle from "@/components/SectionTitle";
import YoutubeVideo from "@/components/VimeoVideo";

const cardResponsiveValues_3cols = "bg-[length:110%] sm:bg-[length:100%] md:bg-[length:115%] lg:bg-[length:145%]"

export default function Topocoro() {
    const features1 = [
        {
            title: "7.000 hectáreas de espejo de agua (uno de los más grandes del país)",
        },
        {
            title: "Paisaje lacustre de montaña, ideal para fotografías y contemplación.",
        },
        {
            title: "Condiciones propicias para deportes náuticos y recreativos.",
        },
        {
            title: "Cercanía a polos turísticos regionales (San Gil, Barichara y circuitos de aventura).",
        },
        {
            title: "Excelente conexión terrestre y aérea",
            sublist: [
                "30 minutos del Aeropuerto Internacional de Palonegro",
                "45 minutos de Bucaramanga",
                "5 horas de Medellín",
                "1 hora de Barrancabermeja"
            ]
        }
    ];

    return (
        <div>
            <Section overrideClassName="w-full">
                <ParallaxImage imageUrl={["/topocoro/1.jpg"]} height="h-160" speed={0.5} overlay={true} overlayColor="black" overlayOpacity={0.75} >
                    <Container>
                        <div className="text-theme-background-200 text-center">
                            <h1 className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 font-semibold">
                                <span>¿Por qué Topocoro?</span>
                            </h1>
                            <p className="text-base font-medium md:text-lg max-w-[1200px] mx-auto">Un embalse en la montaña, con clima cálido y acceso rápido desde Bucaramanga, paisaje espectacular y condiciones ideales para deportes náuticos, descanso y eventos.</p>
                            <p className="text-base font-medium md:text-lg mt-4">El lugar perfecto para un <span className="text-theme-gold">hotel destino</span>.</p>
                        </div>
                    </Container>
                </ParallaxImage>
            </Section>
            <Section>
                <Container>
                    <YoutubeVideo
                        videos={{
                            desktopVideo: (
                                <iframe width="560" height="315" src="https://www.youtube.com/embed/OCgpWTIzCwE?si=6eQctDHJCn3wYb5r&amp;controls=0&amp;hd=1&amp;vq=highres" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                            ),
                            mobileVideo: (
                                <iframe width="560" height="315" src="https://www.youtube.com/embed/retE5fkzRDc?si=4DOEx4LCFkyJU4XW&amp;controls=0&amp;hd=1&amp;vq=highres" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                            )
                        }}
                    />
                </Container>
            </Section>
            <Section>
                <Container id="embalse-de-topocoro">
                    <div className="grid grid-cols-12 gap-6">
                        <div className="col-span-12 xl:col-span-8 flex flex-col gap-8">
                            <SectionTitle title="Embalse de Topocoro" removeMargin />
                            <p className="text-base/6 text-gray-600">Topocoro combina 7.000 hectáreas de espejo de agua rodeado de imponentes montañas. A solo 45 minutos del área metropolitana de Bucaramanga, y 30 minutos del Aeropuerto Internacional de Palonegro, Topocoro combina clima cálido, acceso ágil desde Bucaramanga y un paisaje excepcional, creando el lugar perfecto para deportes náuticos, entretenimiento y eventos. El sitio ideal para un hotel destino.</p>
                            <div className="grid grid-cols-12 gap-6">
                                {features1.map((feature, index) => (
                                    <div className="col-span-12 md:col-span-6 flex gap-4" key={index}>
                                        <ul className="list-disc max-w-[500px]">
                                            <li className="text-base font-medium">{feature.title}</li>
                                            {feature.sublist && (
                                                <ul className="list-disc list-inside">
                                                    {feature.sublist?.map((subitem, index) => (
                                                        <li key={index}>{subitem}</li>
                                                    ))}
                                                </ul>
                                            )}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                            <div className="w-full">
                                <div className="mt-10 flex flex-col 2xl:flex-row justify-center items-center gap-4">
                                    <CTAButtonBase
                                        text="Ver mapa y accesos"
                                        onClick={() => window.open('https://www.google.com/maps/place/Embalse+Topocoro/@7.0792033,-73.3772926,7549m/data=!3m1!1e3!4m7!3m6!1s0x8e6823e51debb2eb:0x566c9bbe60ed888c!8m2!3d7.0792033!4d-73.3772926!15sChNlbWJhbHNlIGRlIHRvcG9jb3JvkgEEd2VpcqoBOxABMh4QASIaqVsILYNfCHcwv7pJr9lczEEBLQaHz8Eg4jEyFxACIhNlbWJhbHNlIGRlIHRvcG9jb3Jv4AEA!16s%2Fg%2F11dynypcws?entry=tts&g_ep=EgoyMDI1MDgxMy4wIPu8ASoASAFQAw%3D%3D&skid=abe67268-b05e-4b05-883f-5fc33699793e', '_blank')}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-span-0 hidden xl:flex xl:col-span-4 justify-center items-center bg-[url('/topocoro/2.jpg')] bg-cover bg-center rounded-2xl">
                        </div>
                    </div>
                </Container>
            </Section>
            <Section>
                <Container id="que-hace-unico-a-topocoro">
                    <SectionTitle title="¿Qué hace único a Topocoro?" description="Es un destino emergente que integra naturaleza, agua, montañas y buen clima. Esto abre oportunidades para viajeros y turistas de muchos tipos, desde turistas de fin de semana, turismo de bienestar, grupos corporativos, observadores de aves, hasta amantes de los deportes náuticos." />
                    <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 md:grid-cols-4">
                        {/* Card 1 - Suites */}
                        <div className="lg:col-span-1 md:col-span-2 md:rounded-tl-4xl lg:rounded-tl-4xl lg:rounded-bl-4xl group relative flex flex-col overflow-hidden rounded-lg bg-white shadow-xs ring-1 ring-black/5 data-dark:bg-gray-800 data-dark:ring-white/15">
                            <div className="relative h-80 shrink-0">
                                <div className={`h-80 bg-[url(/actividades/nautica.png)] ${cardResponsiveValues_3cols} bg-center bg-no-repeat`} />
                                {/* <div className="absolute inset-0 bg-linear-to-t from-white to-50% group-data-dark:from-gray-800 group-data-dark:from-[-25%]" /> */}
                            </div>
                            <div className="relative p-10 flex flex-col flex-grow">
                                <h3 className="mt-1 text-xl/8 font-medium tracking-tight text-gray-950 group-data-dark:text-white">Náutica y recreación</h3>
                                <p className="mt-2 max-w-[600px] text-base/6 text-gray-600 group-data-dark:text-gray-400">Wakeboard, kitesurf, jet ski, paddle board y kayak.</p>
                            </div>
                        </div>

                        {/* Card 2 - Club de Playa */}
                        <div className="lg:col-span-1 md:col-span-2 md:rounded-tr-4xl lg:rounded-lg group relative flex flex-col overflow-hidden rounded-lg bg-white shadow-xs ring-1 ring-black/5 data-dark:bg-gray-800 data-dark:ring-white/15">
                            <div className="relative h-80 shrink-0">
                                <div className={`h-80 bg-[url(/actividades/relajacion.png)] ${cardResponsiveValues_3cols} bg-center bg-no-repeat`} />
                                {/* <div className="absolute inset-0 bg-linear-to-t from-white to-50% group-data-dark:from-gray-800 group-data-dark:from-[-25%]" /> */}
                            </div>
                            <div className="relative p-10 flex flex-col flex-grow">
                                <h3 className="mt-1 text-xl/8 font-medium tracking-tight text-gray-950 group-data-dark:text-white">Bienestar y desconexión</h3>
                                <p className="mt-2 max-w-[600px] text-base/6 text-gray-600 group-data-dark:text-gray-400">Spa, yoga al aire libre, observación de aves, senderismo.</p>
                            </div>
                        </div>

                        {/* Card 3 - Lounge Flotante */}
                        <div className="lg:col-span-1 md:col-span-2 md:rounded-bl-4xl lg:rounded-lg group relative flex flex-col overflow-hidden rounded-lg bg-white shadow-xs ring-1 ring-black/5 data-dark:bg-gray-800 data-dark:ring-white/15">
                            <div className="relative h-80 shrink-0">
                                <div className={`h-80 bg-[url(/actividades/musica.png)] ${cardResponsiveValues_3cols} bg-center bg-no-repeat`} />
                                {/* <div className="absolute inset-0 bg-linear-to-t from-white to-50% group-data-dark:from-gray-800 group-data-dark:from-[-25%]" /> */}
                            </div>
                            <div className="relative p-10 flex flex-col flex-grow">
                                <h3 className="mt-1 text-xl/8 font-medium tracking-tight text-gray-950 group-data-dark:text-white">Social & entretenimiento</h3>
                                <p className="mt-2 max-w-[600px] text-base/6 text-gray-600 group-data-dark:text-gray-400">Festivales musicales, eventos y experiencias frente al embalse.</p>
                            </div>
                        </div>
                        {/* Card 4 - Lounge Flotante */}
                        <div className="lg:col-span-1 md:col-span-2 md:rounded-br-4xl lg:rounded-tr-4xl lg:rounded-br-4xl group relative flex flex-col overflow-hidden rounded-lg bg-white shadow-xs ring-1 ring-black/5 data-dark:bg-gray-800 data-dark:ring-white/15">
                            <div className="relative h-80 shrink-0">
                                <div className={`h-80 bg-[url(/actividades/corporate.png)] ${cardResponsiveValues_3cols} bg-center bg-no-repeat`} />
                                {/* <div className="absolute inset-0 bg-linear-to-t from-white to-50% group-data-dark:from-gray-800 group-data-dark:from-[-25%]" /> */}
                            </div>
                            <div className="relative p-10 flex flex-col flex-grow">
                                <h3 className="mt-1 text-xl/8 font-medium tracking-tight text-gray-950 group-data-dark:text-white">Corporate & reuniones</h3>
                                <p className="mt-2 max-w-[600px] text-base/6 text-gray-600 group-data-dark:text-gray-400">Eventos corporativos y vacaciones grupales.</p>
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>
            <Section>
                <Container>
                    <SectionTitle title="Inversión público-privada en marcha" description="Topocoro avanza como destino lacustre prioritario en Santander. Diversas iniciativas públicas y privadas se proyectan para fortalecer accesos, infraestructura náutica, servicios y promoción turística, creando las condiciones para convertirse en un destino de gran atractivo para el turismo nacional e internacional." />
                    <p className="text-2xl text-center max-w-[600px] mx-auto">+ 1 Billón de COP en inversión público/privada proyectados para los próximos 5 años</p>
                    <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 mt-16">
                        <div className="lg:col-span-2">
                            <p className="text-2xl font-bold">¿Qué se proyecta?</p>
                            <ul className="list-disc mt-4 text-lg">
                                <li>Mejoras de conectividad y accesos</li>
                                <li>Infraestructura náutica y ribereña</li>
                                <li>Creación de infraestructura de servicios:</li>
                                <ul className="list-disc list-inside">
                                    <li>Parque Acuáticos</li>
                                    <li>Parques Naturales</li>
                                    <li>Centros de convenciones</li>
                                    <li>Hoteles</li>
                                    <li>Restaurantes</li>
                                </ul>
                                <li>Campañas públicas y privadas de promoción del destino</li>
                            </ul>
                        </div>
                        <div className="col-span-0 hidden xl:flex xl:col-span-4 justify-center items-center bg-[url('/topocoro/3.jpg')] bg-cover bg-center rounded-2xl">
                        </div>
                    </div>
                </Container>
            </Section>
            <Footer />
        </div>
    )
}