"use client";

import { useIsMobile } from './useIsMobile';

interface WhatsAppConfig {
  phoneNumber?: string;
  defaultMessage?: string;
}

export const useWhatsApp = (config: WhatsAppConfig = {}) => {
  const isMobile = useIsMobile();
  
  const {
    phoneNumber = "573016656808",
    defaultMessage = "Hola, vi la web de Yarima Resort y estoy interesado en recibir más información"
  } = config;

  const openWhatsApp = (customMessage?: string) => {
    const message = customMessage || defaultMessage;
    const encodedMessage = encodeURIComponent(message);
    
    // Use WhatsApp Web for desktop, WhatsApp app for mobile
    const whatsappUrl = isMobile 
      ? `whatsapp://send?phone=${phoneNumber}&text=${encodedMessage}`
      : `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, "_blank");
  };

  return {
    openWhatsApp,
    isMobile,
    phoneNumber,
    defaultMessage
  };
};
