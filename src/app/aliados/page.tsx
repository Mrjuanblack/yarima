import Container from "@/components/Container";
import Footer from "@/components/Footer";
import ParallaxImage from "@/components/ParallaxImage";
import Section from "@/components/Section";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function Aliados() {
    const allies = [
        {
            title: "Grupo Empresarial Vimarsa",
            subtitle: "Desarrollo Inmobiliario",
            description: "Empresa con más de 14 años de experiencia desarrollando proyectos inmobiliarios en el Área Metropolitana de Bucaramanga, desde centros comerciales hasta condominios de lujo. Compañía fundada por Alvaro Villagrasa, empresario español con una trayectoria de más de 35 años años en el sector construcción, quien vio en Bucaramanga un territorio de alto potencial para crear valor y proyectar ciudad.",
            image: "/logos/slider/vimarsa.svg",
            link: "https://www.grupoempresarialvimarsa.com/",
        },
        {
            title: "Black Room",
            subtitle: "Consultoría estratégica de operación hotelera",
            description: "Firma colombiana, con base en Medellín, especializada en operación hotelera “marca blanca” (white label), enfocada en maximizar ingresos, reputación y ocupación para hoteles en Colombia, LATAM y el Caribe. Operan con estándares de revenue y servicio orientados a rentabilidad sostenible. En sus activos operados cuentan con ocupación promedio ~72–73%, un plan de 15 operaciones y ~650 habitaciones para 2025, además de una meta de +27 operaciones y ~1.400 llaves para 2027.",
            image: "/logos/slider/blackroom.png",
            link: "https://blackroom.com.co/",
        },
        // {
        //     title: "Acción Fiduciaria",
        //     subtitle: "Estructura Fiduciaria vigilada por SFC",
        //     description: "Entidad vigilada por la Superintendencia Financiera de Colombia, con más de 25 años estructurando y administrando negocios fiduciarios (inmobiliarios, de inversión y patrimoniales). Ofrece portafolios de fondos, administración de patrimonios autónomos y educación financiera para sus clientes. ",
        //     image: "/logos/slider/accion.svg",
        //     link: "https://www.accion.com.co/#",
        // },
        {
            title: "Oscar Mogollón",
            subtitle: "Diseño Arquitectónico",
            description: "Bajo la dirección del arquitecto especialista Óscar Mogollón. Con una sólida trayectoria en el diseño residencial, turístico y hotelero, su equipo ha desarrollado más de 50 proyectos de alto nivel en ciudades referentes como Cartagena, Barranquilla, Bogotá, Bucaramanga y Ciudad de Panamá. Una experiencia que hoy se refleja en la creación de Yarima Resort & Club de Playa, un proyecto pensado para elevar el turismo de lujo en Santander.",
            image: "/logos/slider/oscar.png",
        }
    ]
    return (<div>

        <Section overrideClassName="w-full">
            <ParallaxImage imageUrl={["/renders/beach/1.jpg", "/renders/beach/2.jpg", "/renders/beach/4.jpg"]} height="h-160" speed={0.5} overlay={true} overlayColor="black" overlayOpacity={0.75} >
                <Container>
                    <div className="text-theme-background-200 text-center">
                        <h1 className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 font-semibold">
                            <span>Aliados Estratégicos</span>
                        </h1>
                        <div className="mt-6 font-medium">
                            <div className="flex flex-col items-center justify-center gap-2 sm:gap-4 mt-6 border-t border-theme-gold pt-4 max-w-[1200px] mx-auto">
                                <p>Detrás de Yarima Resort & Club de Playa hay un equipo con gran trayectoria en desarrollo, arquitectura, operación hotelera y estructura fiduciaria. Cada aliado cumple un rol clave en la solidez del proyecto.</p>
                            </div>
                        </div>
                    </div>
                </Container>
            </ParallaxImage>
        </Section>
        <Section>
            <Container>
                <div className="grid grid-cols-12 gap-6">
                    {allies.map((ally, index) => (
                        <div className="col-span-12 xl:col-span-6 flex flex-col gap-4 items-start bg-gray-50 p-4 rounded-lg ring-1 ring-gray-200" key={index}>
                            <img src={ally.image} alt={ally.title} className="w-auto h-20 object-contain" style={{ filter: 'brightness(0) saturate(100%) invert(35%)' }} />
                            <div>
                                <p className="text-lg font-medium">{ally.title}</p>
                                <p className="text-base">{ally.subtitle}</p>
                            </div>
                            {ally.description && (
                                <p className="text-base text-gray-600 max-w-[600px]">{ally.description}</p>
                            )}
                            <div className="mt-auto ml-auto">
                                {ally.link && (
                                    <Link href={ally.link} className="mt-2 inline-flex items-center gap-2 text-base/6 font-semibold text-theme-gold hover:text-theme-background-600">Ver detalles <ArrowRightIcon className="size-4" /></Link>
                                )}
                            </div>
                        </div>
                    ))}
                    {/* <div className="col-span-12 xl:col-span-6 flex flex-col gap-4 items-start">
                        <img src="/logos/slider/vimarsa.svg" alt="Vimarsa" className="w-auto h-16 object-contain" style={{ filter: 'brightness(0) saturate(100%) invert(35%)' }} />
                        <div>
                            <p className="text-lg font-medium">Grupo Empresarial Vimarsa</p>
                            <p className="text-base">Desarrollo Inmobiliario</p>
                        </div>
                        <p className="text-base text-gray-600">Empresa con más de 14 años de experiencia desarrollando proyectos inmobiliarios en el Área Metropolitana de Bucaramanga, desde centros comerciales hasta condominios de lujo. Compañía fundada por Alvaro Villagrasa, empresario español con una trayectoria de más de 35 años años en el sector construcción, quien vio en Bucaramanga un territorio de alto potencial para crear valor y proyectar ciudad.</p>
                    </div> */}
                </div>
            </Container>
        </Section>
        <Footer />
    </div>)
}