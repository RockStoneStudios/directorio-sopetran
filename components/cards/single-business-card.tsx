"use client";

import { BusinessState } from "@/utils/types/business";
import { MapPin, Phone, Mail, Globe, Clock } from 'lucide-react';
import { DescriptionCard } from "./description-card";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { IoLogoInstagram } from "react-icons/io5";
import { FaFacebookSquare } from "react-icons/fa";
import { useLayoutEffect, useRef } from "react";
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

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="flex flex-row items-center space-x-4 pb-2">
        <div className="w-16 h-16 relative overflow-hidden rounded-md">
          {business?.logo ? (
            <Image 
              src={business?.logo}
              alt={`${business?.name}`}
              layout="fill"
              objectFit="cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-300 flex items-center justify-center">
              <span className="text-gray-500 text-sm">No Logo</span>
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <CardTitle className="text-lg line-clamp-1">{business?.name || "Nombre de Negocio"} </CardTitle>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {business?.address && (
            <div className="flex items-center space-x-2 text-sm">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <span>{business.address}</span>
            </div>
          )}
          
          {business?.phone && (
            <div className="flex items-center space-x-2 text-sm">
              <Phone className="w-4 h-4 text-muted-foreground" />
              <a 
                href={`tel:${business.phone}`}
                className="hover:text-primary transition-colors"
              >
                {business.phone}
              </a>
            </div>
          )}
          
          {business?.email && (
            <div className="flex items-center space-x-2 text-sm">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <a 
                href={`mailto:${business.email}`}
                className="hover:text-primary transition-colors"
              >
                {business.email}
              </a>
            </div>
          )}
          
          {business?.website && (
            <div className="flex items-center space-x-2 text-sm">
              <Globe className="w-4 h-4 text-muted-foreground" />
              <a 
                href={business.website.startsWith('http') ? business.website : `https://${business.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                Sitio web
              </a>
            </div>
          )}
        </div>

        {/* Redes sociales */}
        <div className="flex justify-end space-x-3 mt-4">
          {business?.instagram && (
            <a
              href={business.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-600 text-2xl transition-transform duration-200 hover:scale-110"
            >
              <IoLogoInstagram />
            </a>
          )}
          {business?.facebook && (
            <a
              href={business.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-700 text-2xl transition-transform duration-200 hover:scale-110"
            >
              <FaFacebookSquare />
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );
}