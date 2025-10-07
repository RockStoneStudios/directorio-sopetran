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
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      toast.success(`${field} copiado al portapapeles`);
    }
  };

  const handleHoursClick = () => {
    if (business.hours) {
      toast.success(`Horario: ${business.hours}`, {
        duration: 4000,
        icon: "🕐",
      });
    }
  };

  const handleIconClick = (e: React.MouseEvent, action: () => void) => {
    e.preventDefault();
    e.stopPropagation();
    action();
  };

  const iconConfig = [
    {
      type: "phone",
      color: "green",
      icon: Phone,
      data: business.phone,
      action: () => {
        if (business.phone) {
          handleCopy(business.phone, "Teléfono");
          if (typeof window !== "undefined") {
            window.open(`https://wa.me/57${business.phone}`, "_blank");
          }
        }
      },
    },
    {
      type: "address",
      color: "cyan",
      icon: MapPin,
      data: business.address,
      action: () => {
        if (business.address && typeof window !== "undefined") {
          window.open(
            `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              business.address
            )}`,
            "_blank"
          );
        }
      },
    },
    {
      type: "hours",
      color: "yellow",
      icon: Clock,
      data: business.hours,
      action: handleHoursClick,
    },
    {
      type: "email",
      color: "red",
      icon: Mail,
      data: business.email,
      action: () => {
        if (business.email) {
          handleCopy(business.email, "Email");
          if (typeof window !== "undefined") {
            window.open(`mailto:${business.email}`, "_blank");
          }
        }
      },
    },
    {
      type: "website",
      color: "blue",
      icon: Globe,
      data: business.website,
      action: () => {
        if (business.website) {
          handleCopy(business.website, "Sitio web");
          const websiteUrl = business.website.startsWith("http")
            ? business.website
            : `https://${business.website}`;
          if (typeof window !== "undefined") {
            window.open(websiteUrl, "_blank");
          }
        }
      },
    },
  ];

  const getPredefinedStyles = (index: number, colorType: string) => {
    const isPulsing = pulsingIcon === index;

    const baseStyles = {
      green: {
        container: `border rounded-full backdrop-blur-md transition-all duration-300 ${
          isPulsing
            ? "border-green-500/80 bg-green-500/30 shadow-[0_0_20px_#00FF66] scale-125"
            : "border-green-500/40 bg-green-500/10 shadow-[0_0_8px_#00FF66]"
        } hover:shadow-[0_0_25px_#00FF66] hover:scale-110 hover:border-green-500/60`,
        button: `rounded-full w-10 h-10 bg-transparent ${
          isPulsing
            ? "text-green-200 hover:text-green-300"
            : "text-green-400 hover:text-green-300"
        } hover:bg-green-500/20`,
      },
      cyan: {
        container: `border rounded-full backdrop-blur-md transition-all duration-300 ${
          isPulsing
            ? "border-cyan-500/80 bg-cyan-500/30 shadow-[0_0_20px_#00FFFF] scale-125"
            : "border-cyan-500/40 bg-cyan-500/10 shadow-[0_0_8px_#00FFFF]"
        } hover:shadow-[0_0_25px_#00FFFF] hover:scale-110 hover:border-cyan-500/60`,
        button: `rounded-full w-10 h-10 bg-transparent ${
          isPulsing
            ? "text-cyan-200 hover:text-cyan-300"
            : "text-cyan-400 hover:text-cyan-300"
        } hover:bg-cyan-500/20`,
      },
      yellow: {
        container: `border rounded-full backdrop-blur-md transition-all duration-300 ${
          isPulsing
            ? "border-yellow-500/80 bg-yellow-500/30 shadow-[0_0_20px_#FFD700] scale-125"
            : "border-yellow-500/40 bg-yellow-500/10 shadow-[0_0_8px_#FFD700]"
        } hover:shadow-[0_0_25px_#FFD700] hover:scale-110 hover:border-yellow-500/60`,
        button: `rounded-full w-10 h-10 bg-transparent ${
          isPulsing
            ? "text-yellow-200 hover:text-yellow-300"
            : "text-yellow-400 hover:text-yellow-300"
        } hover:bg-yellow-500/20`,
      },
      red: {
        container: `border rounded-full backdrop-blur-md transition-all duration-300 ${
          isPulsing
            ? "border-red-500/80 bg-red-500/30 shadow-[0_0_20px_#FF4444] scale-125"
            : "border-red-500/40 bg-red-500/10 shadow-[0_0_8px_#FF4444]"
        } hover:shadow-[0_0_25px_#FF4444] hover:scale-110 hover:border-red-500/60`,
        button: `rounded-full w-10 h-10 bg-transparent ${
          isPulsing
            ? "text-red-200 hover:text-red-300"
            : "text-red-400 hover:text-red-300"
        } hover:bg-red-500/20`,
      },
      blue: {
        container: `border rounded-full backdrop-blur-md transition-all duration-300 ${
          isPulsing
            ? "border-blue-500/80 bg-blue-500/30 shadow-[0_0_20px_#4444FF] scale-125"
            : "border-blue-500/40 bg-blue-500/10 shadow-[0_0_8px_#4444FF]"
        } hover:shadow-[0_0_25px_#4444FF] hover:scale-110 hover:border-blue-500/60`,
        button: `rounded-full w-10 h-10 bg-transparent ${
          isPulsing
            ? "text-blue-200 hover:text-blue-300"
            : "text-blue-400 hover:text-blue-300"
        } hover:bg-blue-500/20`,
      },
    };

    return baseStyles[colorType as keyof typeof baseStyles] || baseStyles.green;
  };

  useLayoutEffect(() => {
    setIsMounted(true);

    if (!iconsContainerRef.current) return;

    const ctx = gsap.context(() => {
      const visibleIcons = iconsRef.current.filter((icon) => icon !== null);

      if (visibleIcons.length > 0) {
        gsap.from(visibleIcons, {
          y: 50,
          opacity: 0,
          duration: 1,
          stagger: 0.2,
          ease: "back.out(1.7)",
          delay: 0.3,
        });

        gsap.to(visibleIcons, {
          y: -8,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          stagger: 0.2,
        });
      }
    });

    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    if (!isMounted) return;

    const iconsCount = iconsRef.current.filter((icon) => icon !== null).length;
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
          repeat: 1,
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

  const visibleIcons = iconConfig.filter(
    (icon) => icon.data && icon.data.trim() !== ""
  );

  if (!isMounted) {
    return (
      <div className="fixed right-2 top-1/2 -translate-y-1/2 z-[10000] flex flex-col gap-2">
        {visibleIcons.map((icon) => (
          <div
            key={icon.type}
            className="border rounded-full bg-gray-500/10 backdrop-blur-md w-10 h-10 animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (visibleIcons.length === 0) return null;

  return (
    <div
      className="fixed right-2 top-1/2 -translate-y-1/2 z-[10000] flex flex-col gap-2"
      onClick={(e) => e.stopPropagation()}
    >
      {visibleIcons.map((icon, index) => {
        const IconComponent = icon.icon;
        const styles = getPredefinedStyles(index, icon.color);

        return (
          <div
            key={icon.type}
            ref={(el) => addToRefs(el, index)}
            className={styles.container}
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              size="icon"
              variant="ghost"
              className={styles.button}
              onClick={(e) => handleIconClick(e, icon.action)}
              title={
                icon.type === "phone"
                  ? `Llamar o escribir por WhatsApp: ${business.phone}`
                  : icon.type === "address"
                  ? `Ver ubicación en Google Maps: ${business.address}`
                  : icon.type === "hours"
                  ? `Horario: ${business.hours}`
                  : icon.type === "email"
                  ? `Enviar email: ${business.email}`
                  : `Visitar sitio web: ${business.website}`
              }
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
