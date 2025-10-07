"use client";

import { BusinessState } from "@/utils/types/business";
import { Clock, Globe, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";

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

  // Función para abrir WhatsApp que NO previene el comportamiento por defecto
  const openWhatsApp = (phone: string) => {
    handleCopy(phone, "Teléfono");
    // Usar setTimeout para asegurar que el clipboard funcione antes de redirigir
    setTimeout(() => {
      window.open(`https://wa.me/57${phone}`, "_blank");
    }, 100);
  };

  // Función para abrir enlaces externos
  const openExternalLink = (url: string) => {
    window.open(url, "_blank");
  };

  // Mapeo de íconos usando datos reales de la base de datos - CORREGIDO
  const iconConfig = [
    { 
      type: 'phone', 
      color: 'green',
      icon: Phone,
      data: business.phone,
      action: (e: React.MouseEvent) => {
        if (business.phone) {
          // Solo copiar, no prevenir el comportamiento completo
          handleCopyClick(e, business.phone, "Teléfono");
          openWhatsApp(business.phone);
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
  ];

  // Clases predefinidas para cada color - MEJORADO con contenedor oscuro y colores más fuertes
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
        container: `border rounded-full backdrop-blur-md transition-all duration-300 bg-gray-800/20 dark:bg-transparent ${
          isPulsing 
            ? 'border-yellow-600 dark:border-yellow-500/80 bg-yellow-500/40 dark:bg-yellow-500/30 dark:shadow-[0_0_20px_#FFD700] shadow-[0_0_8px_#FFD700] scale-125' 
            : 'border-yellow-500 dark:border-yellow-500/40 bg-yellow-500/20 dark:bg-yellow-500/10 dark:shadow-[0_0_8px_#FFD700] shadow-[0_0_4px_#FFD700]'
        } hover:shadow-[0_0_12px_#FFD700] dark:hover:shadow-[0_0_25px_#FFD700] hover:scale-110 hover:border-yellow-600 dark:hover:border-yellow-500/60`,
        button: `rounded-full w-10 h-10 bg-transparent ${
          isPulsing 
            ? 'text-yellow-500 dark:text-yellow-200 hover:text-yellow-600 dark:hover:text-yellow-300' 
            : 'text-yellow-500 dark:text-yellow-400 hover:text-yellow-600 dark:hover:text-yellow-300'
        } hover:bg-yellow-500/30 dark:hover:bg-yellow-500/20`
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
              title={icon.type === 'phone' ? `Llamar o escribir por WhatsApp: ${business.phone}` : 
                     icon.type === 'address' ? `Ver ubicación en Google Maps: ${business.address}` :
                     icon.type === 'hours' ? `Horario: ${business.hours}` :
                     icon.type === 'email' ? `Enviar email: ${business.email}` :
                     `Visitar sitio web: ${business.website}`}
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