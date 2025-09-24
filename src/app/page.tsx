"use client";

import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect } from 'react';
import Button from "@/components/Button";
import Container from "@/components/Container";
import ParallaxImage from "@/components/ParallaxImage";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import SectionTitle from "@/components/SectionTitle";
import AlliesSlider from '@/components/LandingPage/AlliesSlider';
import Footer from '@/components/Footer';
import CTAButtonBase from '@/components/CTAButtons.tsx/CTAButton';
import { useNavigateWithScroll } from '@/hooks/useNavigateWithScroll';
import Calculator from '@/components/LandingPage/Calculator';
import Section from '@/components/Section';
import CTA_WhatsApp from '@/components/CTAButtons.tsx/CTA_WhatsApp';

const cardResponsiveValues_3cols = "bg-[length:250%] sm:bg-[length:150%] md:bg-[length:150%] lg:bg-[length:225%]"
const cardResponsiveValues_2cols = "bg-[length:250%] sm:bg-[length:130%] md:bg-[length:130%] lg:bg-[length:155%]"

const NumberCounter = ({ from, to, duration = 3, prefix = "", suffix = "", ease = "easeOut" }: {
  from: number;
  to: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  ease?: "linear" | "easeIn" | "easeOut" | "easeInOut" | "circIn" | "circOut" | "circInOut" | "backIn" | "backOut" | "backInOut" | "anticipate" | number[];
}) => {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const formatted = useTransform(rounded, (latest) =>
    latest.toLocaleString('es-CO', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
  );

  useEffect(() => {
    const controls = animate(count, to, {
      duration,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ease: ease as any
    });
    return controls.stop;
  }, [count, to, duration, ease]);

  return (
    <motion.span className="text-4xl sm:text-6xl font-bold text-black text-shadow-lg">
      {prefix}
      <motion.span>{formatted}</motion.span>
      {suffix}
    </motion.span>
  );
};

export default function Home() {
  const { navigateToElement } = useNavigateWithScroll();

  return (
    <div className="w-full">
      <Section overrideClassName="w-full">
        <ParallaxImage imageUrl={["/renders/beach/1.jpeg", "/renders/beach/2.jpeg", "/renders/beach/3.jpeg"]} height="h-screen" speed={0.5} overlay={true} overlayColor="black" overlayOpacity={0.75} >
          <Container>
            <div className="text-theme-background-200 text-center">
              <h1 className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 font-semibold">
                <span className="whitespace-nowrap">Yarima Resort &</span><wbr /><span className="whitespace-nowrap"> Club de Playa</span>
              </h1>
              <p className="text-base font-medium md:text-lg">Bienestar, Descanso y Entretenimiento en el Embalse de Topocoro.</p>
              <div className="mt-6 font-medium">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mt-6 text-lg border-t border-theme-gold pt-4">
                  <span><span className="inline sm:hidden mr-1 text-theme-gold">·</span>52 suites con vista al embalse</span>
                  <span className="hidden sm:inline text-theme-gold">·</span>
                  <span><span className="inline sm:hidden mr-1 text-theme-gold">·</span>Club de Playa</span>
                  <span className="hidden sm:inline text-theme-gold">·</span>
                  <span><span className="inline sm:hidden mr-1 text-theme-gold">·</span>Lounge Flotante</span>
                </div>
              </div>
              <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4 sm:px-0 px-8">
                <Button text="Ver Vídeo" outline onClick={() => { }} />
                <Button text="Hablar por WhatsApp" outline onClick={() => { }} />
                <Button text="Descargar Brochure" outline onClick={() => { }} />
              </div>
            </div>
          </Container>
        </ParallaxImage>
      </Section>
      <Section>
        <Container>
          <SectionTitle title="Ecosistema Yarima" description="Un destino, tres experiencias complementarias en el embalse: el Resort (hospitalidad y wellness), el Club de Playa (acceso exclusivo con playa artificial, piscinas y deportes náuticos) y el Lounge Flotante Yarima (plataforma modular sobre el agua con solárium, lounge y deck de música)." />
          <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6">
            {/* Card 1 - Suites */}
            <div className="lg:col-span-2 lg:rounded-tl-4xl lg:rounded-bl-4xl group relative flex flex-col overflow-hidden rounded-lg bg-white shadow-xs ring-1 ring-black/5 data-dark:bg-gray-800 data-dark:ring-white/15">
              <div className="relative h-80 shrink-0">
                <div className={`h-80 bg-[url(/renders/v2/2.jpg)] ${cardResponsiveValues_3cols} bg-center bg-no-repeat`} />
                {/* <div className="absolute inset-0 bg-linear-to-t from-white to-50% group-data-dark:from-gray-800 group-data-dark:from-[-25%]" /> */}
              </div>
              <div className="relative p-10 flex flex-col flex-grow">
                <h3 className="mt-1 text-3xl/8 font-medium tracking-tight text-gray-950 group-data-dark:text-white">Resort</h3>
                <p className="mt-2 max-w-[600px] text-base/6 text-gray-600 group-data-dark:text-gray-400">52 suites con vista panorámica al embalse y jacuzzi privado en terraza, piscina infinita, spa & circuito wellness, restaurante de autor y salones de eventos.</p>
                <div onClick={() => navigateToElement('/ecosistema', 'ecosistema-yarima')} className="cursor-pointer inline-flex items-center gap-2 text-base/6 font-semibold text-theme-gold hover:text-theme-background-600 mt-auto">Ver detalles <ArrowRightIcon className="size-4" /></div>
              </div>
            </div>

            {/* Card 2 - Club de Playa */}
            <div className="lg:col-span-2 group relative flex flex-col overflow-hidden rounded-lg bg-white shadow-xs ring-1 ring-black/5 data-dark:bg-gray-800 data-dark:ring-white/15">
              <div className="relative h-80 shrink-0">
                <div className={`h-80 bg-[url(/renders/beach/6.jpeg)] ${cardResponsiveValues_3cols} bg-center bg-no-repeat`} />
                {/* <div className="absolute inset-0 bg-linear-to-t from-white to-50% group-data-dark:from-gray-800 group-data-dark:from-[-25%]" /> */}
              </div>
              <div className="relative p-10 flex flex-col flex-grow">
                <h3 className="mt-1 text-3xl/8 font-medium tracking-tight text-gray-950 group-data-dark:text-white">Club de Playa</h3>
                <p className="mt-2 max-w-[600px] text-base/6 text-gray-600 group-data-dark:text-gray-400">Playa artificial, piscinas, restaurantes, bar, muelle, marina y deportes náuticos.</p>
                <div onClick={() => navigateToElement('/ecosistema', 'ecosistema-club-de-playa')} className="cursor-pointer inline-flex items-center gap-2 text-base/6 font-semibold text-theme-gold hover:text-theme-background-600 mt-auto">Ver detalles <ArrowRightIcon className="size-4" /></div>
              </div>
            </div>

            {/* Card 3 - Lounge Flotante */}
            <div className="lg:col-span-2 lg:rounded-tr-4xl lg:rounded-br-4xl group relative flex flex-col overflow-hidden rounded-lg bg-white shadow-xs ring-1 ring-black/5 data-dark:bg-gray-800 data-dark:ring-white/15">
              <div className="relative h-80 shrink-0">
                <div className={`h-80 bg-[url(/renders/beach/1.jpeg)] ${cardResponsiveValues_3cols} bg-center bg-no-repeat`} />
                {/* <div className="absolute inset-0 bg-linear-to-t from-white to-50% group-data-dark:from-gray-800 group-data-dark:from-[-25%]" /> */}
              </div>
              <div className="relative p-10 flex flex-col flex-grow">
                <h3 className="mt-1 text-3xl/8 font-medium tracking-tight text-gray-950 group-data-dark:text-white">Lounge Flotante</h3>
                <p className="mt-2 max-w-[600px] text-base/6 text-gray-600 group-data-dark:text-gray-400">Deck flotante en el embalse, solárium, lounge con servicio de bebidas y snacks, parque acuático, deck de música y zona central segura para bañistas.</p>
                <div onClick={() => navigateToElement('/ecosistema', 'ecosistema-lounge-flotante')} className="cursor-pointer inline-flex items-center gap-2 text-base/6 font-semibold text-theme-gold hover:text-theme-background-600 mt-auto">Ver detalles <ArrowRightIcon className="size-4" /></div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
      <Section>
        <Container>
          <div>
            <div className="relative h-full flex flex-col items-center justify-center">
              <h2 className=" font-bold mb-4 text-lg md:text-3xl lg:text-4xl text-center text-theme-gold">
                <span>Hazte socio de Yarima Resort &</span><wbr /><span className="whitespace-nowrap"> Club de Playa</span>
              </h2>
              <div className="flex flex-col items-center justify-center">
                <p className="text-4xl sm:text-5xl font-medium tracking-tight text-black">Reserva con</p>
              </div>
              <NumberCounter
                from={2000000}
                to={3000000}
                duration={1}
                prefix="$ "
                suffix=" COP"
                ease={[0.25, 0.1, 0.25, 1]}
              />
              <p className="mt-8 lg:mt-10 max-w-[700px] text-lg text-gray-600 group-data-dark:text-black">Invierte a través de derechos fiduciarios y separa tu reserva con sólo $3.000.000 COP.</p>
              {/* <div className="absolute inset-0 bg-linear-to-t from-theme-background-200 to-25% group-data-dark:from-theme-gold" /> */}
            </div>
            <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6">
              <div className="lg:col-span-3 lg:rounded-bl-4xl group relative flex flex-col overflow-hidden rounded-lg bg-white shadow-xs ring-1 ring-black/5 data-dark:bg-theme-background-200 data-dark:ring-black/5">
                <div className="relative h-80 shrink-0">
                  <div className={`h-80 bg-[url(/renders/v2/2.jpg)] ${cardResponsiveValues_2cols} bg-center bg-no-repeat`} />
                </div>
                <div className="relative p-10 flex flex-col flex-grow">
                  <h3 className="mt-1 text-3xl/8 font-medium tracking-tight text-gray-950">Beneficios</h3>
                  <ul className="list-disc list-inside">
                    <li className="text-base/6 font-normal text-gray-600 group-data-dark:text-black">Rentabilidad mensual derivada de la operación del resort.</li>
                    <li className="text-base/6 font-normal text-gray-600 group-data-dark:text-black">5 noches anuales gratis y uso ilimitado de las zonas sociales.</li>
                    <li className="text-base/6 font-normal text-gray-600 group-data-dark:text-black">Membresía vitalicia al Club de Playa (puedes llevar invitados).</li>
                    <li className="text-base/6 font-normal text-gray-600 group-data-dark:text-black">Acceso preferente a experiencias y futuros proyectos.</li>
                  </ul>
                </div>
              </div>

              <div className="lg:col-span-3 lg:rounded-br-4xl group relative flex flex-col overflow-hidden rounded-lg bg-white shadow-xs ring-1 ring-black/5 data-dark:bg-theme-background-200 data-dark:ring-black/5">
                <div className="relative h-80 shrink-0">
                  <div className={`h-80 bg-[url(/renders/v2/2.jpg)] ${cardResponsiveValues_2cols} bg-center bg-no-repeat`} />
                </div>
                <div className="relative p-10 flex flex-col flex-grow">
                  <h3 className="mt-1 text-3xl/8 font-medium tracking-tight text-gray-950 group-data-dark:text-text-primary">Formas de pago (3)</h3>
                  <ul className="list-disc list-inside">
                    <li className="text-base/6 font-normal text-gray-600 group-data-dark:text-black">Reserva: $3.000.000</li>
                    <li className="text-base/6 font-normal text-gray-600 group-data-dark:text-black">Paga en 24 cuotas (sin intereses)</li>
                    <li className="text-base/6 font-normal text-gray-600 group-data-dark:text-black">Fináncialo a 60 cuotas(1% E.M.)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <Calculator />
          <div className="mt-10 flex flex-col lg:flex-row justify-center items-center gap-4">
            <CTAButtonBase text="Ver detalles de inversión" onClick={() => { }} />
            <CTAButtonBase text="Descargar Brochure" onClick={() => { }} />
            <CTA_WhatsApp />
          </div>
        </Container>
      </Section >

      <Section>
        <Container>
          <SectionTitle title="Aliados Estratégicos" />
          <AlliesSlider />
          <div className="mt-20 flex flex-col justify-center items-center gap-4">
            <p className="text-lg font-normal">¿Quieres conocer más de Yarima Resort & Club de Playa?</p>
          </div>
          <div className="mt-10 flex flex-col lg:flex-row justify-center items-center gap-4">
            <CTAButtonBase text="Ver detalles de inversión" onClick={() => { }} />
            <CTAButtonBase text="Descargar Brochure" onClick={() => { }} />
            <CTA_WhatsApp />
          </div>
        </Container>
      </Section>

      <Footer />
    </div >
  );
}
