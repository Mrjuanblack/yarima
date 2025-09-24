import Container from "@/components/Container";
import Footer from "@/components/Footer";
import ParallaxImage from "@/components/ParallaxImage";
import Section from "@/components/Section";
import SectionTitle from "@/components/SectionTitle";
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
        {
            title: "Acción Fiduciaria",
            subtitle: "Estructura Fiduciaria vigilada por SFC",
            description: "Entidad vigilada por la Superintendencia Financiera de Colombia, con más de 25 años estructurando y administrando negocios fiduciarios (inmobiliarios, de inversión y patrimoniales). Ofrece portafolios de fondos, administración de patrimonios autónomos y educación financiera para sus clientes. ",
            image: "/logos/slider/accion.svg",
            link: "https://www.accion.com.co/#",
        },
        {
            title: "Oscar Mogollón",
            subtitle: "Diseño Arquitectónico",
            image: "/logos/slider/oscar.png",
        }
    ]
    return (<div>

        <Section overrideClassName="w-full">
            <ParallaxImage imageUrl={["/renders/beach/1.jpeg", "/renders/beach/2.jpeg", "/renders/beach/3.jpeg"]} height="h-160" speed={0.5} overlay={true} overlayColor="black" overlayOpacity={0.75} >
                <Container>
                    <div className="text-theme-background-200 text-center">
                        <h1 className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 font-semibold">
                            <span>Aliados Estratégicos</span>
                        </h1>
                    </div>
                </Container>
            </ParallaxImage>
        </Section>
        <Section>
            <Container>
                <SectionTitle title="Aliados Estratégicos" description="Detrás de Yarima Resort & Club de Playa hay un equipo con gran trayectoria en desarrollo, arquitectura, operación hotelera y estructura fiduciaria. Cada aliado cumple un rol clave en la solidez del proyecto." />
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
                            {ally.link && (
                                <Link href={ally.link} className="inline-flex items-center gap-2 text-base/6 font-semibold text-theme-gold hover:text-theme-background-600">Ver detalles <ArrowRightIcon className="size-4" /></Link>
                            )}
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