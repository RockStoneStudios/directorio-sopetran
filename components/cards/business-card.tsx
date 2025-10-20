'use client';
import { BusinessState } from "@/utils/types/business";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Mail, Globe, Clock } from "lucide-react";
import Image from "next/image";
import { useBusiness } from "@/context/business";
import DescriptionModal from "@/components/modals/description-modal";
import { isBusinessOpen } from "@/helper/Helper";
import { IoLogoInstagram } from "react-icons/io5";
import { FaFacebookSquare } from "react-icons/fa";

const BusinessCard = ({ business }: { business: BusinessState }) => {
  const open = business?.hours ? isBusinessOpen(business.hours) : false;

  const {
    openDescriptionModal,
    setOpenDescriptionModal,
    isEditPage,
    loading,
    isDashboardPage,
    togglePublished,
  } = useBusiness();

  return (
    <Card className="w-full max-w-2xl mx-auto" style={{ height: "326px" }}>
      <CardHeader className="flex flex-row items-center space-x-4 pb-2">
    <div className="rounded-xl overflow-hidden">
  {business?.logo ? (
    <Image
      src={business?.logo}
      alt={business?.name}
      width={96}
      height={96}
      className="rounded-xl object-contain"
    />
  ) : (
    <div className="w-24 h-24 bg-gray-300 flex items-center justify-center rounded-xl">
      <span className="text-gray-500 text-xs">No logo</span>
    </div>
  )}
</div>
        <div className="flex-1 min-w-0">
          <CardTitle className="text-lg line-clamp-1">
            {business?.name || "Nombre Negocio"}
          </CardTitle>
          <p className="text-sm text-muted-foreground line-clamp-1">
            {business?.category || "Categoria"}
          </p>
        </div>
        <span
          className={`font-semibold text-xs ${
            open ? "text-green-600" : "text-red-600"
          }`}
        >
          {open ? "Abierto" : "Cerrado"}
        </span>
      </CardHeader>

      <CardContent>
        <DescriptionModal />

        <div className="text-sm mb-4 line-clamp-1">
          {business?.description && (
            <div
              className="text-sm"
              dangerouslySetInnerHTML={{ __html: business.description }}
            />
          )}
        </div>

        <div className="flex flex-col justify-between h-full">
          <div className="space-y-3 flex-1">
            <InfoItem icon={MapPin} text={business?.address || "Dirección"} />
            <InfoItem icon={Phone} text={business?.phone || "Número telefónico"} />
            <InfoItem icon={Mail} text={business?.email || "Email"} />

            {/* ✅ Website tratado como enlace externo */}
            {business?.website ? (
              <div className="flex items-center text-sm">
                <Globe className="mr-2 h-4 w-4 text-muted-foreground flex-shrink-0" />
                <a
                  href={business.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline line-clamp-1"
                >
                  {business.website}
                </a>
              </div>
            ) : (
              <InfoItem icon={Globe} text="Website" />
            )}

            <InfoItem icon={Clock} text={business?.hours || "Abierto - Cerrado"} />
          </div>

          <div className="flex justify-end mb-5 space-x-3 -mt-7">
            {business?.instagram && (
              <a
                href={business.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-600 text-xl"
              >
                <IoLogoInstagram />
              </a>
            )}
            {business?.facebook && (
              <a
                href={business.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 text-xl"
              >
                <FaFacebookSquare />
              </a>
            )}
          </div>
        </div>
      </CardContent>

      <DescriptionModal />
    </Card>
  );
};

function InfoItem({ icon: Icon, text }: { icon: any; text: string }) {
  return (
    <div className="flex items-center text-sm">
      <Icon className="mr-2 h-4 w-4 text-muted-foreground flex-shrink-0" />
      <span className="line-clamp-1">{text}</span>
    </div>
  );
}

export default BusinessCard;
