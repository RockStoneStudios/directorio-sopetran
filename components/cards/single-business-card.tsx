"use client";

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
      // Animación de entrada automática
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

      // Animación de respiración continua más sutil
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


// Dentro de tu componente
useEffect(() => {
  // Animación de respiración para el texto "Sígueme"
  gsap.to("#sigueme-text", {
    scale: 1.2,
    duration: 1.5,
    repeat: -1, // Repetir infinitamente
    yoyo: true, // Ir y volver
    ease: "power1.inOut"
  });
}, []);

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="flex flex-row items-center space-x-4 pb-2">
        <div className="w-26 h-26 relative overflow-hidden rounded-md">
          {business?.logo ? (
            <Image 
              src={business?.logo}
              alt={`${business?.name}`}
              width={152}
              height={172}
              className="rounded-xl object-contain max-w-full max-h-full"
              

            />
          ) : (
            <div className="w-full h-full bg-gray-300 flex items-center justify-center">
              <span className="text-gray-500 text-sm">No Logo</span>
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <CardTitle className="text-xl line-clamp-1">{business?.name || "Nombre de Negocio"} </CardTitle>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mt-1">
            <p className="text-sm text-muted-foreground line-clamp-1">{business?.category || "Categoria"}</p>
            
            {/* Horario a la derecha */}
            {business?.hours && (
              <div className="flex items-center space-x-1">
                <Clock className="w-3 h-3 text-muted-foreground" />
                <p
                  ref={hoursRef}
                  className="text-xs text-muted-foreground font-medium"
                >
                  {business.hours}
                </p>
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <DescriptionCard description={business?.description} />

        {/* Información de contacto */}
       
{/* Redes sociales */}
{(business?.instagram || business?.facebook) && (
  <div className="flex flex-col items-end mt-4">
    {/* Texto "Sígueme" - solo aparece si hay redes sociales */}
    <span className="text-sm font-medium text-gray-700 mb-2" id="sigueme-text">
      Sígueme
    </span>
    
    {/* Iconos de redes sociales */}
    <div className="flex space-x-3">
      {business?.instagram && (
        <a
          href={business.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="text-pink-600 text-2xl transition-transform duration-200 hover:scale-110"
        >
          <IoLogoInstagram />
        </a>
      )}
      {business?.facebook && (
        <a
          href={business.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-700 text-2xl transition-transform duration-200 hover:scale-110"
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