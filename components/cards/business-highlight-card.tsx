"use client";

import { BusinessState } from "@/utils/types/business";
import { Clock, Globe, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "../ui/button";
import toast from "react-hot-toast";

export default function BusinessHighlightCard({
  business,
}: {
  business: BusinessState;
}) {
  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${field} copiado al portapapeles`);
  };

  return (
    <div className="relative w-full h-full">
      {/* ÍCONOS flotantes centrados */}
      <div
        className="
          fixed right-3 sm:right-8
          top-1/2 -translate-y-1/2
          flex flex-col gap-4 z-50
        "
      >
        {/* Dirección */}
        {business.address && (
          <div className="icon-container border-cyan-500/20 shadow-[0_0_10px_#00FFFF44]">
            <Button
              size="icon"
              variant="ghost"
              className="text-cyan-400 hover:text-cyan-300 animate-pulse-glow"
              onClick={() =>
                window.open(
                  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    business.address
                  )}`,
                  "_blank",
                  "noopener noreferrer"
                )
              }
            >
              <MapPin className="size-5 drop-shadow-[0_0_6px_#00FFFF]" />
            </Button>
          </div>
        )}

        {/* Sitio Web */}
        {business.website && (
          <div className="icon-container border-pink-500/20 shadow-[0_0_10px_#FF4FD844]">
            <Button
              size="icon"
              variant="ghost"
              className="text-pink-400 hover:text-pink-300 animate-pulse-glow"
              onClick={() =>
                window.open(formatUrl(business.website), "_blank", "noopener noreferrer")
              }
            >
              <Globe className="size-5 drop-shadow-[0_0_6px_#FF4FD8]" />
            </Button>
          </div>
        )}

        {/* Teléfono / WhatsApp */}
        {business.phone && (
          <div className="icon-container border-green-500/20 shadow-[0_0_10px_#00FF6644]">
            <Button
              size="icon"
              variant="ghost"
              className="text-green-400 hover:text-green-300 animate-pulse-glow"
              onClick={() => {
                handleCopy(business.phone, "Teléfono");
                const phoneNumber = business.phone.replace(/\D/g, "");
                window.open(`https://wa.me/${phoneNumber}`, "_blank");
              }}
            >
              <Phone className="size-5 drop-shadow-[0_0_6px_#00FF66]" />
            </Button>
          </div>
        )}

        {/* Email */}
        {business.email && (
          <div className="icon-container border-red-500/20 shadow-[0_0_10px_#FF333344]">
            <Button
              size="icon"
              variant="ghost"
              className="text-red-400 hover:text-red-300 animate-pulse-glow"
              onClick={() =>
                window.open(`mailto:${business.email}`, "_blank", "noopener noreferrer")
              }
            >
              <Mail className="size-5 drop-shadow-[0_0_6px_#FF3333]" />
            </Button>
          </div>
        )}

        {/* Horario */}
        {business.hours && (
          <div className="icon-container border-yellow-500/20 shadow-[0_0_10px_#FFD70044]">
            <Button
              size="icon"
              variant="ghost"
              className="text-yellow-400 hover:text-yellow-300 animate-pulse-glow"
              // onClick={() => toast.info(`Horario: ${business.hours}`)}
            >
              <Clock className="size-5 drop-shadow-[0_0_6px_#FFD700]" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

function formatUrl(url: string): string {
  if (!url) return "";
  if (!/^https?:\/\//i.test(url)) {
    return `http://${url}`;
  }
  return url;
}
