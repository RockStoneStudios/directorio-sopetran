'use client';

import { BusinessState } from "@/utils/types/business";
import { Clock, Globe, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";

// Componentes personalizados para los íconos
const NequiIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    className={`w-full h-full ${className}`}
  >
    {/* Fondo transparente */}
    <rect width="100" height="100" fill="none" />

    {/* Punto rosado arriba a la izquierda */}
    <rect x="-75" y="18" width="100" height="24" rx="2" fill="#ff007a" />

    {/* Letra N */}
    <text
      x="62%"
      y="67%"
      textAnchor="middle"
      dominantBaseline="middle"
      fontSize="89"
      fontWeight="bold"
      fill="#ffffff"
      fontFamily="sans-serif"
    >
      N
    </text>
  </svg>
);

const BancolombiaIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 120 120"
    className={`w-full h-full ${className}`}
  >
    {/* Fondo transparente */}
    <rect width="120" height="120" fill="none" />

    {/* Franja azul */}
    <rect
      x="20"
      y="25"
      width="120"
      height="20"
      rx="4"
      fill="#0033A0"
      transform="rotate(-8 20 25)"
    />

    {/* Franja amarilla */}
    <rect
      x="20"
      y="58"
      width="305"
      height="20"
      rx="4"
      fill="#FFD100"
      transform="rotate(-6 20 50)"
    />

    {/* Franja roja */}
    <rect
      x="25"
      y="83"
      width="120"
      height="20"
      rx="4"
      fill="#D50032"
      transform="rotate(-4 25 75)"
    />
  </svg>
);

export default function BusinessHighlightCard({
  business,
}: {
  business: BusinessState;
}) {
  const iconsContainerRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [pulsingIcon, setPulsingIcon] = useState<number | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${field} copiado al portapapeles`);
  };

  const handleHoursClick = () => {
    if (business.hours) {
      toast.success(`Horario: ${business.hours}`, {
        duration: 4000,
        icon: '🕐',
      });
    }
  };

  // Función para manejar clicks que SOLO copia al portapapeles
  const handleCopyClick = (e: React.MouseEvent, text: string, field: string) => {
    e.preventDefault();
    e.stopPropagation();
    handleCopy(text, field);
  };

  // Función para abrir WhatsApp
  const openWhatsApp = (phone: string) => {
    // Usar setTimeout para asegurar que el clipboard funcione antes de redirigir
    setTimeout(() => {
      window.open(`https://wa.me/57${phone}`, "_blank");
    }, 100);
  };

  // Función para realizar llamada telefónica
  const makePhoneCall = (phone: string) => {
    // Usar setTimeout para asegurar que el clipboard funcione antes de redirigir
    setTimeout(() => {
      window.open(`tel:+57${phone}`, "_self");
    }, 80);
  };

  // Función para abrir enlaces externos
  const openExternalLink = (url: string) => {
    window.open(url, "_blank");
  };

  // Verificar si la categoría es "basicos" (case insensitive)
  const isBasicosCategory = business?.category?.toLowerCase() === 'basicos';

  // Mapeo de íconos usando datos reales de la base de datos - ACTUALIZADO
  const iconConfig = [
    { 
      type: 'phone', 
      color: 'green',
      icon: Phone,
      data: business.phone,
      action: (e: React.MouseEvent) => {
        if (business.phone) {
          // Solo copiar una vez
          handleCopyClick(e, business.phone, "Teléfono");
          
          // Si es categoría "basicos", hacer llamada, sino abrir WhatsApp
          if (isBasicosCategory) {
            makePhoneCall(business.phone);
          } else {
            openWhatsApp(business.phone);
          }
        }
      }
    },
    { 
      type: 'address', 
      color: 'cyan',
      icon: MapPin,
      data: business.address,
      action: (e: React.MouseEvent) => {
        if (business.address) {
          handleCopyClick(e, business.address, "Dirección");
          openExternalLink(
            `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.address)}`
          );
        }
      }
    },
    { 
      type: 'hours', 
      color: 'yellow',
      icon: Clock,
      data: business.hours,
      action: (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        handleHoursClick();
      }
    },
    { 
      type: 'email', 
      color: 'red',
      icon: Mail,
      data: business.email,
      action: (e: React.MouseEvent) => {
        if (business.email) {
          handleCopyClick(e, business.email, "Email");
          openExternalLink(`mailto:${business.email}`);
        }
      }
    },
    { 
      type: 'website', 
      color: 'blue',
      icon: Globe,
      data: business.website,
      action: (e: React.MouseEvent) => {
        if (business.website) {
          handleCopyClick(e, business.website, "Sitio web");
          const websiteUrl = business.website.startsWith('http') 
            ? business.website 
            : `https://${business.website}`;
          openExternalLink(websiteUrl);
        }
      }
    },
    // NUEVOS CAMPOS CON ÍCONOS PERSONALIZADOS
    { 
      type: 'nequi', 
      color: 'purple',
      icon: NequiIcon, // Ícono personalizado "N"
      data: business.nequi,
      action: (e: React.MouseEvent) => {
        if (business.nequi) {
          handleCopyClick(e, business.nequi, "Número de Nequi");
        }
      }
    },
    { 
      type: 'bancolombia', 
      color: 'white',
      icon: BancolombiaIcon, // Ícono personalizado "B"
      data: business.bancolombia,
      action: (e: React.MouseEvent) => {
        if (business.bancolombia) {
          handleCopyClick(e, business.bancolombia, "Cuenta de Bancolombia");
        }
      }
    },
  ];

  // Clases predefinidas para cada color - ACTUALIZADO con nuevos colores
  const getPredefinedStyles = (index: number, colorType: string) => {
    const isPulsing = pulsingIcon === index;
    
    const baseStyles = {
      green: {
        container: `border rounded-full backdrop-blur-md transition-all duration-300 bg-gray-800/20 dark:bg-transparent ${
          isPulsing 
            ? 'border-green-600 dark:border-green-500/80 bg-green-500/40 dark:bg-green-500/30 dark:shadow-[0_0_20px_#00FF66] shadow-[0_0_8px_#00FF66] scale-125' 
            : 'border-green-500 dark:border-green-500/40 bg-green-500/20 dark:bg-green-500/10 dark:shadow-[0_0_8px_#00FF66] shadow-[0_0_4px_#00FF66]'
        } hover:shadow-[0_0_12px_#00FF66] dark:hover:shadow-[0_0_25px_#00FF66] hover:scale-110 hover:border-green-600 dark:hover:border-green-500/60`,
        button: `rounded-full w-10 h-10 bg-transparent ${
          isPulsing 
            ? 'text-green-500 dark:text-green-200 hover:text-green-600 dark:hover:text-green-300' 
            : 'text-green-500 dark:text-green-400 hover:text-green-600 dark:hover:text-green-300'
        } hover:bg-green-500/30 dark:hover:bg-green-500/20`
      },
      cyan: {
        container: `border rounded-full backdrop-blur-md transition-all duration-300 bg-gray-800/20 dark:bg-transparent ${
          isPulsing 
            ? 'border-cyan-600 dark:border-cyan-500/80 bg-cyan-500/40 dark:bg-cyan-500/30 dark:shadow-[0_0_20px_#00FFFF] shadow-[0_0_8px_#00FFFF] scale-125' 
            : 'border-cyan-500 dark:border-cyan-500/40 bg-cyan-500/20 dark:bg-cyan-500/10 dark:shadow-[0_0_8px_#00FFFF] shadow-[0_0_4px_#00FFFF]'
        } hover:shadow-[0_0_12px_#00FFFF] dark:hover:shadow-[0_0_25px_#00FFFF] hover:scale-110 hover:border-cyan-600 dark:hover:border-cyan-500/60`,
        button: `rounded-full w-10 h-10 bg-transparent ${
          isPulsing 
            ? 'text-cyan-500 dark:text-cyan-200 hover:text-cyan-600 dark:hover:text-cyan-300' 
            : 'text-cyan-500 dark:text-cyan-400 hover:text-cyan-600 dark:hover:text-cyan-300'
        } hover:bg-cyan-500/30 dark:hover:bg-cyan-500/20`
      },
      yellow: {
  container: `border rounded-full backdrop-blur-md transition-all duration-300 ${
    isPulsing
      ? 'border-yellow-500 dark:border-yellow-400/80 bg-yellow-100 dark:bg-yellow-900/40 shadow-[0_0_20px_#FACC15] scale-125'
      : 'border-yellow-400 dark:border-yellow-500/50 bg-yellow-50 dark:bg-yellow-900/30 shadow-[0_0_8px_#FACC15]'
  } hover:shadow-[0_0_12px_#FACC15] dark:hover:shadow-[0_0_25px_#FACC15] hover:scale-110 hover:border-yellow-500 dark:hover:border-yellow-400/60`,
  button: `rounded-full w-10 h-10 bg-transparent ${
    isPulsing
      ? 'text-yellow-600 dark:text-yellow-400 hover:text-yellow-700 dark:hover:text-yellow-300'
      : 'text-yellow-500 dark:text-yellow-300 hover:text-yellow-600 dark:hover:text-yellow-200'
  } hover:bg-yellow-100 dark:hover:bg-yellow-200/20`
},

      white: {
  container: `border rounded-full backdrop-blur-md transition-all duration-300 ${
    isPulsing
      ? 'border-yellow-600 dark:border-yellow-500/80 bg-white dark:bg-white/90 shadow-[0_0_20px_#FFD700] scale-125'
      : 'border-yellow-400 dark:border-yellow-400/50 bg-white dark:bg-white/80 shadow-[0_0_8px_#FFD700]'
  } hover:shadow-[0_0_12px_#FFD700] dark:hover:shadow-[0_0_25px_#FFD700] hover:scale-110 hover:border-yellow-600 dark:hover:border-yellow-500/60`,
  button: `rounded-full w-10 h-10 bg-transparent ${
    isPulsing
      ? 'text-yellow-600 dark:text-yellow-500 hover:text-yellow-700 dark:hover:text-yellow-400'
      : 'text-yellow-500 dark:text-yellow-600 hover:text-yellow-600 dark:hover:text-yellow-400'
  } hover:bg-yellow-100 dark:hover:bg-yellow-200/20`
},

      red: {
        container: `border rounded-full backdrop-blur-md transition-all duration-300 bg-gray-800/20 dark:bg-transparent ${
          isPulsing 
            ? 'border-red-600 dark:border-red-500/80 bg-red-500/40 dark:bg-red-500/30 dark:shadow-[0_0_20px_#FF4444] shadow-[0_0_8px_#FF4444] scale-125' 
            : 'border-red-500 dark:border-red-500/40 bg-red-500/20 dark:bg-red-500/10 dark:shadow-[0_0_8px_#FF4444] shadow-[0_0_4px_#FF4444]'
        } hover:shadow-[0_0_12px_#FF4444] dark:hover:shadow-[0_0_25px_#FF4444] hover:scale-110 hover:border-red-600 dark:hover:border-red-500/60`,
        button: `rounded-full w-10 h-10 bg-transparent ${
          isPulsing 
            ? 'text-red-500 dark:text-red-200 hover:text-red-600 dark:hover:text-red-300' 
            : 'text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300'
        } hover:bg-red-500/30 dark:hover:bg-red-500/20`
      },
      blue: {
        container: `border rounded-full backdrop-blur-md transition-all duration-300 bg-gray-800/20 dark:bg-transparent ${
          isPulsing 
            ? 'border-blue-600 dark:border-blue-500/80 bg-blue-500/40 dark:bg-blue-500/30 dark:shadow-[0_0_20px_#4444FF] shadow-[0_0_8px_#4444FF] scale-125' 
            : 'border-blue-500 dark:border-blue-500/40 bg-blue-500/20 dark:bg-blue-500/10 dark:shadow-[0_0_8px_#4444FF] shadow-[0_0_4px_#4444FF]'
        } hover:shadow-[0_0_12px_#4444FF] dark:hover:shadow-[0_0_25px_#4444FF] hover:scale-110 hover:border-blue-600 dark:hover:border-blue-500/60`,
        button: `rounded-full w-10 h-10 bg-transparent ${
          isPulsing 
            ? 'text-blue-500 dark:text-blue-200 hover:text-blue-600 dark:hover:text-blue-300' 
            : 'text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300'
        } hover:bg-blue-500/30 dark:hover:bg-blue-500/20`
      },
      // NUEVOS ESTILOS PARA LOS CAMPOS AGREGADOS
      purple: {
        container: `border rounded-full backdrop-blur-md transition-all duration-300 bg-gray-800/20 dark:bg-transparent ${
          isPulsing 
            ? 'border-purple-600 dark:border-purple-500/80 bg-purple-500/40 dark:bg-purple-500/30 dark:shadow-[0_0_20px_#A855F7] shadow-[0_0_8px_#A855F7] scale-125' 
            : 'border-purple-500 dark:border-purple-500/40 bg-purple-500/20 dark:bg-purple-500/10 dark:shadow-[0_0_8px_#A855F7] shadow-[0_0_4px_#A855F7]'
        } hover:shadow-[0_0_12px_#A855F7] dark:hover:shadow-[0_0_25px_#A855F7] hover:scale-110 hover:border-purple-600 dark:hover:border-purple-500/60`,
        button: `rounded-full w-10 h-10 bg-transparent ${
          isPulsing 
            ? 'text-purple-500 dark:text-purple-200 hover:text-purple-600 dark:hover:text-purple-300' 
            : 'text-purple-500 dark:text-purple-400 hover:text-purple-600 dark:hover:text-purple-300'
        } hover:bg-purple-500/30 dark:hover:bg-purple-500/20`
      }
    };

    return baseStyles[colorType as keyof typeof baseStyles] || baseStyles.green;
  };

  useLayoutEffect(() => {
    setIsMounted(true);
    
    if (!iconsContainerRef.current) return;
    
    const ctx = gsap.context(() => {
      const visibleIcons = iconsRef.current.filter(icon => icon !== null);
      
      if (visibleIcons.length > 0) {
        gsap.from(visibleIcons, {
          y: 50,
          opacity: 0,
          duration: 1,
          stagger: 0.2,
          ease: "back.out(1.7)",
          delay: 0.3
        });

        gsap.to(visibleIcons, {
          y: -8,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          stagger: 0.2
        });
      }
    });

    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    if (!isMounted) return;

    const iconsCount = iconsRef.current.filter(icon => icon !== null).length;
    if (iconsCount === 0) return;

    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * iconsCount);
      setPulsingIcon(randomIndex);

      const pulsingIcon = iconsRef.current[randomIndex];
      if (pulsingIcon) {
        gsap.to(pulsingIcon, {
          scale: 1.2,
          duration: 0.4,
          ease: "power2.out",
          yoyo: true,
          repeat: 1
        });
      }

      setTimeout(() => {
        setPulsingIcon(null);
      }, 800);

    }, 4000);

    return () => clearInterval(interval);
  }, [isMounted]);

  const addToRefs = (el: HTMLDivElement | null, index: number) => {
    iconsRef.current[index] = el;
  };

  // Filtrar íconos que tienen datos en la base de datos
  const visibleIcons = iconConfig.filter(icon => icon.data && icon.data.trim() !== '');

  if (!isMounted) {
    return (
      <div className="fixed right-2 top-1/2 -translate-y-1/2 z-[10000] flex flex-col gap-2">
        {visibleIcons.map((icon, index) => (
          <div key={icon.type} className="border rounded-full bg-gray-500/10 backdrop-blur-md w-10 h-10 animate-pulse" />
        ))}
      </div>
    );
  }

  if (visibleIcons.length === 0) {
    return null;
  }

  return (
    <div 
      className="fixed right-2 top-1/2 -translate-y-1/2 z-[10000] flex flex-col gap-2"
      // Prevenir eventos de click en el contenedor principal
      onClick={(e) => e.stopPropagation()}
    >
      {visibleIcons.map((icon, index) => {
        const IconComponent = icon.icon;
        const styles = getPredefinedStyles(index, icon.color);
        
        // Determinar el título según la categoría para el botón de teléfono
        const getTitle = () => {
          if (icon.type === 'phone') {
            return isBasicosCategory 
              ? `Llamar: ${business.phone}`
              : `Llamar o escribir por WhatsApp: ${business.phone}`;
          }
          return icon.type === 'address' ? `Ver ubicación en Google Maps: ${business.address}` :
                 icon.type === 'hours' ? `Horario: ${business.hours}` :
                 icon.type === 'email' ? `Enviar email: ${business.email}` :
                 icon.type === 'website' ? `Visitar sitio web: ${business.website}` :
                 icon.type === 'nequi' ? `Número de Nequi: ${business.nequi}` :
                 `Cuenta de Bancolombia: ${business.bancolombia}`;
        };

        return (
          <div 
            key={icon.type}
            ref={el => addToRefs(el, index)}
            className={styles.container}
            // Prevenir eventos de click en cada ícono
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              size="icon"
              variant="ghost"
              className={styles.button}
              onClick={icon.action}
              title={getTitle()}
              // Importante: type="button" para evitar submit en formularios
              type="button"
            >
              <IconComponent className="size-4" />
            </Button>
          </div>
        );
      })}
    </div>
  );
}