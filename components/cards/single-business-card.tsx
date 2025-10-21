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
      // Animación de entrada
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

      // Animación de respiración continua - AUMENTAR y DISMINUIR tamaño
      gsap.to(hoursRef.current, {
        scale: 1.05, // Aumenta a 105%
        duration: 2,  // 2 segundos para aumentar
        repeat: -1,   // Repetir infinitamente
        yoyo: true,   // Ir y volver (aumentar y disminuir)
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
    <Card className="w-full max-w-4xl mx-auto shadow-lg border-0">
      {/* Header SOLO con logo, título, categoría y horario */}
      <CardHeader className="flex flex-col lg:flex-row items-start gap-6 pb-6 px-6 pt-6">
        {/* Logo */}
        <div className="w-full lg:w-64 h-48 lg:h-40 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100 border">
          {business?.logo ? (
            <Image
              src={business.logo}
              alt={business.name || "Logo del negocio"}
              width={286}
              height={180}
              className="w-full h-full object-cover"
              priority={true}
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500 text-sm">No Logo</span>
            </div>
          )}
        </div>

        {/* SOLO título, categoría y horario */}
        <div className="flex-1 min-w-0 w-full space-y-4">
          {/* Nombre y categoría */}
          <div>
            <CardTitle className="text-2xl lg:text-3xl font-bold text-gray-200 line-clamp-2">
              {business?.name || "Nombre de Negocio"}
            </CardTitle>
            <p className="text-lg text-blue-600 font-semibold mt-2">
              {business?.category || "Categoria"}
            </p>
          </div>
          
          {/* Horario con animación GSAP */}
          {business?.hours && (
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-white-600" />
              <p
                ref={hoursRef}
                className="text-sm text-gray-300 font-semibold inline-block" // inline-block para que la animación funcione mejor
              >
                {business.hours}
              </p>
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="px-6 pb-6 space-y-6">
        {/* Descripción */}
        <DescriptionCard description={business?.description} />


        {/* Redes sociales */}
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