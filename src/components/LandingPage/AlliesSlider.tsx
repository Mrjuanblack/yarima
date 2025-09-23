"use client";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { useScreenSize, type ScreenSize } from "@/hooks/useScreenSize";

const Slider = dynamic(() => import("react-slick"), { ssr: false });

export const AlliesSlider: React.FC = () => {
    const screenSize = useScreenSize();

    const slidesFor = (size: ScreenSize): number => {
        if (size === 'base' || size === 'sm') return 1;
        if (size === 'md') return 2;
        return 3; // lg, xl, 2xl
    };
    const allies = [
        {
            name: "Vimarsa",
            title: "Vimarsa",
            description: "Desarrollo Inmobiliario",
            image: "/logos/slider/vimarsa.svg",
            link: "/lounge-flotante",
            invert: false
        },
        {
            name: "Oscar Mogollón",
            title: "Oscar Mogollón",
            description: "Diseño Arquitectónico",
            image: "/logos/slider/oscar.png",
            invert: true
        },
        {
            name: "Black Room",
            title: "Black Room",
            description: "Consultoría estratégica de operación hotelera",
            image: "/logos/slider/blackroom.png",
            link: "/lounge-flotante",
            invert: false
        },
        {
            name: "Acción Fiduciaria",
            title: "Acción Fiduciaria",
            description: "Estructura Fiduciaria vigilada por SFC",
            image: "/logos/slider/accion.svg",
            link: "/lounge-flotante",
            invert: true
        }
    ]
    return (<div>
        <Slider
            key={screenSize}
            infinite={true}
            speed={3000}
            // autoplay={true}
            autoplaySpeed={5000}
            slidesToShow={slidesFor(screenSize)}
            arrows={false}
            dots={false}
        >
            {allies.map((ally, index) => (
                <div className="h-full px-2" key={index}>
                    <div data-dark={true} className="group relative flex h-full flex-col overflow-hidden rounded-lg bg-white shadow-xs ring-1 ring-black/5 data-dark:bg-theme-background-dark-900 data-dark:ring-white/15">
                        <div className="relative p-10 flex h-full flex-col flex-grow">
                            <img src={ally.image} alt={ally.name} className={`w-auto h-50 object-contain ${ally.invert ? 'brightness-0 invert' : ''}`} />
                            <div className="mt-auto">
                                <h3 className="mt-1 text-xl md:text-2xl sm:text-xl font-medium tracking-tight text-gray-950 group-data-dark:text-theme-background-200 leading-[1.2]">{ally.title}</h3>
                                <p className="text-base/6 mt-2 max-w-[600px] text-gray-600 group-data-dark:text-gray-400">{ally.description}</p>
                                {ally.link && (
                                    <Link href={ally.link} className="inline-flex items-center gap-2 text-base/6 font-semibold text-theme-gold hover:text-theme-background-600">Ver detalles <ArrowRightIcon className="size-4" /></Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </Slider>

    </div>);
}

export default AlliesSlider;