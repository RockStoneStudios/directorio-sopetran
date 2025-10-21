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
      <CardHeader className="flex flex-row items-start space-x-4 pb-4">
        <div className="w-15 h-20 mt-2 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100 border">
          {business?.logo ? (
            <Image 
              src={business.logo}
              alt={business.name || "Logo del negocio"}
              width={200}
              height={120}
              className= " h-full object-cover rounded-lg"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500 text-xs">No Logo</span>
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0 flex flex-col justify-center">
          <CardTitle className="text-2xl font-semibold line-clamp-1 mb-1">
            {business?.name || "Nombre de Negocio"}
          </CardTitle>
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <p className="text-sm text-muted-foreground line-clamp-1">
              {business?.category || "Categoria"}
            </p>
            
            {business?.hours && (
              <div className="flex items-center space-x-1  px-2 py-1 rounded-md">
                <Clock className="w-4 h-4 text-blue-600" />
                <p
                  ref={hoursRef}
                  className="text-xs text-blue-700 font-medium"
                >
                  {business.hours}
                </p>
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <DescriptionCard description={business?.description} />

      
       

        {/* Redes sociales */}
        {(business?.instagram || business?.facebook) && (
          <div className="flex flex-col items-end pt-2">
            <span className="text-sm font-medium text-gray-700 mb-2" id="sigueme-text">
              Síguenos
            </span>
            
            <div className="flex space-x-3">
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