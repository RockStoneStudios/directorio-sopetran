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

  // Datos de ejemplo basados en la información proporcionada
  const businessData = {
    phone: "3133398095",
    address: "Sopetrán - Parque Principal", 
    hours: "Lunes a Domingo: 10:00 AM - 9:00 PM",
    website: "",
    email: ""
  };

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${field} copiado al portapapeles`);
  };

  const handleHoursClick = () => {
    if (businessData.hours) {
      toast.success(`Horario: ${businessData.hours}`, {
        duration: 4000,
        icon: '🕐',
      });
    }
  };

  // Mapeo de colores para evitar clases dinámicas
  const iconConfig = [
    { 
      type: 'phone', 
      color: 'green',
      icon: Phone,
      data: businessData.phone 
    },
    { 
      type: 'address', 
      color: 'cyan',
      icon: MapPin,
      data: businessData.address 
    },
    { 
      type: 'hours', 
      color: 'yellow',
      icon: Clock,
      data: businessData.hours 
    },
  ];

  // Clases predefinidas para cada color
  const getPredefinedStyles = (index: number, colorType: string) => {
    const isPulsing = pulsingIcon === index;
    
    const baseStyles = {
      green: {
        container: `border rounded-full backdrop-blur-md transition-all duration-300 ${
          isPulsing 
            ? 'border-green-500/80 bg-green-500/30 shadow-[0_0_20px_#00FF66] scale-125' 
            : 'border-green-500/40 bg-green-500/10 shadow-[0_0_8px_#00FF66]'
        } hover:shadow-[0_0_25px_#00FF66] hover:scale-110 hover:border-green-500/60`,
        button: `rounded-full w-10 h-10 bg-transparent ${
          isPulsing 
            ? 'text-green-200 hover:text-green-300' 
            : 'text-green-400 hover:text-green-300'
        } hover:bg-green-500/20`
      },
      cyan: {
        container: `border rounded-full backdrop-blur-md transition-all duration-300 ${
          isPulsing 
            ? 'border-cyan-500/80 bg-cyan-500/30 shadow-[0_0_20px_#00FFFF] scale-125' 
            : 'border-cyan-500/40 bg-cyan-500/10 shadow-[0_0_8px_#00FFFF]'
        } hover:shadow-[0_0_25px_#00FFFF] hover:scale-110 hover:border-cyan-500/60`,
        button: `rounded-full w-10 h-10 bg-transparent ${
          isPulsing 
            ? 'text-cyan-200 hover:text-cyan-300' 
            : 'text-cyan-400 hover:text-cyan-300'
        } hover:bg-cyan-500/20`
      },
      yellow: {
        container: `border rounded-full backdrop-blur-md transition-all duration-300 ${
          isPulsing 
            ? 'border-yellow-500/80 bg-yellow-500/30 shadow-[0_0_20px_#FFD700] scale-125' 
            : 'border-yellow-500/40 bg-yellow-500/10 shadow-[0_0_8px_#FFD700]'
        } hover:shadow-[0_0_25px_#FFD700] hover:scale-110 hover:border-yellow-500/60`,
        button: `rounded-full w-10 h-10 bg-transparent ${
          isPulsing 
            ? 'text-yellow-200 hover:text-yellow-300' 
            : 'text-yellow-400 hover:text-yellow-300'
        } hover:bg-yellow-500/20`
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
        // Animación de entrada simplificada
        gsap.from(visibleIcons, {
          y: 50,
          opacity: 0,
          duration: 1,
          stagger: 0.2,
          ease: "back.out(1.7)",
          delay: 0.3
        });

        // Solo una animación de flotación para evitar conflictos
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

  // Efecto de pulso simplificado
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

    }, 4000); // Reducido a 4 segundos

    return () => clearInterval(interval);
  }, [isMounted]);

  const addToRefs = (el: HTMLDivElement | null, index: number) => {
    iconsRef.current[index] = el;
  };

  // Filtrar íconos que tienen datos
  const visibleIcons = iconConfig.filter(icon => icon.data);

  if (!isMounted) {
    return (
      <div className="fixed right-2 top-1/2 -translate-y-1/2 z-[10000] flex flex-col gap-2">
        {visibleIcons.map((icon, index) => (
          <div key={icon.type} className="border rounded-full bg-gray-500/10 backdrop-blur-md w-10 h-10 animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="fixed right-2 top-1/2 -translate-y-1/2 z-[10000] flex flex-col gap-2">
      
      {/* Teléfono / WhatsApp */}
      {businessData.phone && (
        <div 
          ref={el => addToRefs(el, 0)}
          className={getPredefinedStyles(0, 'green').container}
        >
          <Button
            size="icon"
            variant="ghost"
            className={getPredefinedStyles(0, 'green').button}
            onClick={() => {
              handleCopy(businessData.phone, "Teléfono");
              window.open(`https://wa.me/57${businessData.phone}`, "_blank");
            }}
          >
            <Phone className="size-4" />
          </Button>
        </div>
      )}

      {/* Dirección */}
      {businessData.address && (
        <div 
          ref={el => addToRefs(el, 1)}
          className={getPredefinedStyles(1, 'cyan').container}
        >
          <Button
            size="icon"
            variant="ghost"
            className={getPredefinedStyles(1, 'cyan').button}
            onClick={() =>
              window.open(
                `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(businessData.address)}`,
                "_blank"
              )
            }
          >
            <MapPin className="size-4" />
          </Button>
        </div>
      )}

      {/* Horario */}
      {businessData.hours && (
        <div 
          ref={el => addToRefs(el, 2)}
          className={getPredefinedStyles(2, 'yellow').container}
        >
          <Button
            size="icon"
            variant="ghost"
            className={getPredefinedStyles(2, 'yellow').button}
            onClick={handleHoursClick}
          >
            <Clock className="size-4" />
          </Button>
        </div>
      )}

    </div>
  );
}