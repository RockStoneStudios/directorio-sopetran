'use client';

import { BusinessState } from "@/utils/types/business";
import { MapPin, Phone, Mail, Globe, Clock } from 'lucide-react';
import { DescriptionCard } from "./description-card";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { IoLogoInstagram } from "react-icons/io5";
import { FaFacebookSquare } from "react-icons/fa";
import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";

export default function SingleBusinessPage({ business }: { business: BusinessState }) {
  const hoursRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    if (!hoursRef.current || !business?.hours) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(hoursRef.current,
        {
          scale: 0.8,
          opacity: 0,
          x: 20
        },
        {
          scale: 1,
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "elastic.out(1, 0.5)",
          delay: 0.3
        }
      );

      gsap.to(hoursRef.current, {
        scale: 1.02,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    });

    return () => ctx.revert();
  }, [business?.hours]);

  useEffect(() => {
    gsap.to("#sigueme-text", {
      scale: 1.2,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });
  }, []);

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      {/* Header completamente responsive */}
      <CardHeader className="flex flex-col sm:flex-row items-center sm:items-start gap-4 pb-4 px-4 sm:px-6 pt-4">
        {/* Logo - tamaño responsive */}
        <div className="w-22 h-20 sm:w-24 sm:h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100 border">
          {business?.logo ? (
            <Image 
              src={business.logo}
              alt={business.name || "Logo del negocio"}
              width={150}
              height={100}
              className="w-full h-full object-cover"
              priority={true}
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500 text-xs">No Logo</span>
            </div>
          )}
        </div>

        {/* Contenido textual - layout vertical en móvil */}
        <div className="flex-1 min-w-0 w-full text-center sm:text-left">
          <CardTitle className="text-xl sm:text-2xl font-bold line-clamp-2 mb-2">
            {business?.name || "Nombre de Negocio"}
          </CardTitle>
          
          <div className="flex flex-col gap-2">
            <p className="text-sm sm:text-base text-muted-foreground font-medium">
              {business?.category || "Categoria"}
            </p>
            
            {/* Horario - centrado en móvil, a la derecha en desktop */}
            {business?.hours && (
              <div className="flex justify-center sm:justify-start items-center space-x-2  px-3 py-2 rounded-lg mx-auto sm:mx-0 max-w-xs">
                <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                <p
                  ref={hoursRef}
                  className="text-xs sm:text-sm text-blue-700 font-medium text-center sm:text-left"
                >
                  {business.hours}
                </p>
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="px-4 sm:px-6 pb-6 space-y-4">
        <DescriptionCard description={business?.description} />

        {/* Información de contacto - lista simple en móvil */}
        <div className="space-y-3">
          {business?.address && (
            <div className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg">
              <MapPin className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-gray-700 flex-1">{business.address}</span>
            </div>
          )}
          
          {business?.phone && (
            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
              <Phone className="w-4 h-4 text-gray-500 flex-shrink-0" />
              <span className="text-sm text-gray-700">{business.phone}</span>
            </div>
          )}
          
          {business?.email && (
            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
              <Mail className="w-4 h-4 text-gray-500 flex-shrink-0" />
              <a 
                href={`mailto:${business.email}`}
                className="text-sm text-blue-600 hover:text-blue-800 hover:underline flex-1"
              >
                {business.email}
              </a>
            </div>
          )}
          
          {business?.website && (
            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
              <Globe className="w-4 h-4 text-gray-500 flex-shrink-0" />
              <a 
                href={business.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:text-blue-800 hover:underline flex-1 line-clamp-1"
              >
                {business.website.replace(/^https?:\/\//, '')}
              </a>
            </div>
          )}
        </div>

        {/* Redes sociales - centradas en móvil */}
        {(business?.instagram || business?.facebook) && (
          <div className="flex flex-col items-center pt-4 border-t">
            <span className="text-sm font-medium text-gray-700 mb-3" id="sigueme-text">
              Síguenos
            </span>
            
            <div className="flex space-x-4">
              {business?.instagram && (
                <a
                  href={business.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-600 text-xl transition-transform duration-200 hover:scale-110"
                >
                  <IoLogoInstagram />
                </a>
              )}
              {business?.facebook && (
                <a
                  href={business.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-xl transition-transform duration-200 hover:scale-110"
                >
                  <FaFacebookSquare />
                </a>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}