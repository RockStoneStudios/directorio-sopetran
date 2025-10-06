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

  useLayoutEffect(() => {
    if (!iconsContainerRef.current) return;
    
    const ctx = gsap.context(() => {
      const visibleIcons = iconsRef.current.filter(icon => icon !== null);
      
      if (visibleIcons.length > 0) {
        // Entrada suave con stagger desde diferentes direcciones
        gsap.from(visibleIcons, {
          x: () => Math.random() * 100 + 50, // Entrada aleatoria en X
          y: () => Math.random() * 100 - 50, // Entrada aleatoria en Y
          rotation: () => Math.random() * 360 - 180, // Rotación aleatoria
          opacity: 0,
          duration: 1.2,
          stagger: 0.2,
          ease: "back.out(1.7)",
          delay: 0.3
        });

        // Flotación principal con movimiento más dinámico
        gsap.to(visibleIcons, {
          y: -8,
          duration: 2.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          stagger: 0.3
        });

        // Movimiento lateral suave
        gsap.to(visibleIcons, {
          x: () => Math.random() * 10 - 5, // Movimiento lateral aleatorio
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          stagger: 0.2
        });

        // Rotación sutil continua
        gsap.to(visibleIcons, {
          rotation: 5,
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          stagger: 0.4
        });

        // Efecto de "respiración" en la escala
        gsap.to(visibleIcons, {
          scale: 1.05,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          stagger: 0.5
        });
      }
    });

    return () => ctx.revert();
  }, []);

  // Efecto para el pulso aleatorio con más movimiento
  useLayoutEffect(() => {
    const iconsCount = iconsRef.current.filter(icon => icon !== null).length;
    if (iconsCount === 0) return;

    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * iconsCount);
      setPulsingIcon(randomIndex);

      // Animación GSAP para el pulso
      const pulsingIcon = iconsRef.current[randomIndex];
      if (pulsingIcon) {
        gsap.to(pulsingIcon, {
          scale: 1.3,
          duration: 0.3,
          ease: "power2.out",
          yoyo: true,
          repeat: 1
        });

        gsap.to(pulsingIcon, {
          rotation: 15,
          duration: 0.6,
          ease: "power2.inOut",
          yoyo: true,
          repeat: 1
        });
      }

      // Quitar el pulso después de 1 segundo
      setTimeout(() => {
        setPulsingIcon(null);
      }, 1000);

    }, 3000); // Cada 3 segundos

    return () => clearInterval(interval);
  }, []);

  const addToRefs = (el: HTMLDivElement | null, index: number) => {
    iconsRef.current[index] = el;
  };

  // Estilos base y de pulso para cada tipo de ícono
  const getIconStyles = (index: number, baseColor: string) => {
    const isPulsing = pulsingIcon === index;
    
    return {
      container: `
        border ${isPulsing ? `border-${baseColor}-500/80` : `border-${baseColor}-500/40`} 
        rounded-full 
        ${isPulsing ? `bg-${baseColor}-500/30` : `bg-${baseColor}-500/10`}
        backdrop-blur-md
        ${isPulsing ? `shadow-[0_0_20px_${getColorHex(baseColor)}]` : `shadow-[0_0_8px_${getColorHex(baseColor)}]`}
        hover:shadow-[0_0_25px_${getColorHex(baseColor)}]
        hover:scale-110
        hover:border-${baseColor}-500/60
        transition-all duration-300
        ${isPulsing ? 'scale-125' : ''}
      `,
      button: `
        text-${baseColor}-${isPulsing ? '200' : '400'} 
        hover:text-${baseColor}-300 
        rounded-full 
        w-10 h-10
        bg-transparent
        hover:bg-${baseColor}-500/20
      `
    };
  };

  // Función helper para obtener el color hex
  const getColorHex = (color: string) => {
    const colors: { [key: string]: string } = {
      green: '#00FF66',
      cyan: '#00FFFF', 
      yellow: '#FFD700'
    };
    return colors[color] || '#FFFFFF';
  };

  return (
    <div className="fixed right-2 top-1/2 -translate-y-1/2 z-[10000] flex flex-col gap-2">
      
      {/* Teléfono / WhatsApp */}
      {businessData.phone && (
        <div 
          ref={el => addToRefs(el, 0)}
          className={getIconStyles(0, 'green').container}
        >
          <Button
            size="icon"
            variant="ghost"
            className={getIconStyles(0, 'green').button}
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
          className={getIconStyles(1, 'cyan').container}
        >
          <Button
            size="icon"
            variant="ghost"
            className={getIconStyles(1, 'cyan').button}
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
          className={getIconStyles(2, 'yellow').container}
        >
          <Button
            size="icon"
            variant="ghost"
            className={getIconStyles(2, 'yellow').button}
            onClick={handleHoursClick}
          >
            <Clock className="size-4" />
          </Button>
        </div>
      )}

    </div>
  );
}