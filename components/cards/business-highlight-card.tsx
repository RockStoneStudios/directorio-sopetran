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
      {/* ÍCONOS FLOTANTES CENTRADOS */}
      <div
        className="
          fixed right-3
          top-1/2 -translate-y-1/2
          flex flex-col gap-4 z-50
          bg-black/50 p-3 rounded-2xl shadow-lg 
          backdrop-blur-md border border-white/10
        "
      >
        {/* Dirección */}
        {business.address && (
          <Button
            size="icon"
            variant="ghost"
            className="neon-blue"
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
            <MapPin className="size-5 text-cyan-400 drop-shadow-[0_0_6px_#00FFFF]" />
          </Button>
        )}

        {/* Sitio Web */}
        {business.website && (
          <Button
            size="icon"
            variant="ghost"
            className="neon-pink"
            onClick={() =>
              window.open(formatUrl(business.website), "_blank", "noopener noreferrer")
            }
          >
            <Globe className="size-5 text-pink-400 drop-shadow-[0_0_6px_#FF4FD8]" />
          </Button>
        )}

        {/* Teléfono / WhatsApp */}
        {business.phone && (
          <Button
            size="icon"
            variant="ghost"
            className="neon-green"
            onClick={() => {
              handleCopy(business.phone, "Teléfono");
              const phoneNumber = business.phone.replace(/\D/g, "");
              window.open(`https://wa.me/${phoneNumber}`, "_blank");
            }}
          >
            <Phone className="size-5 text-green-400 drop-shadow-[0_0_6px_#00FF66]" />
          </Button>
        )}

        {/* Email */}
        {business.email && (
          <Button
            size="icon"
            variant="ghost"
            className="neon-red"
            onClick={() =>
              window.open(`mailto:${business.email}`, "_blank", "noopener noreferrer")
            }
          >
            <Mail className="size-5 text-red-400 drop-shadow-[0_0_6px_#FF3333]" />
          </Button>
        )}

        {/* Horario */}
        {business.hours && (
          <Button
            size="icon"
            variant="ghost"
            // onClick={() => toast.info(`Horario: ${business.hours}`)}
          >
            <Clock className="size-5 text-yellow-400 drop-shadow-[0_0_6px_#FFD700]" />
          </Button>
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
