'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, Building, Newspaper } from "lucide-react";
import { useState, useEffect } from "react";

export default function BottomBar() {
  const pathname = usePathname();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(375);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setViewportWidth(window.innerWidth);
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // BOTONES BASADOS EN TUS CARPETAS EXISTENTES
  const navItems = [
    { icon: Home, label: "Inicio", href: "/" },
    { icon: Building, label: "Negocios", href: "/businesses" },
    { icon: Search, label: "Buscar", href: "/search" },
     { icon: Newspaper, label: "Noticias", href: "/news" },
  ];

  useEffect(() => {
    const currentIndex = navItems.findIndex(
      item => pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/')
    );
    if (currentIndex !== -1) {
      setActiveIndex(currentIndex);
    }
  }, [pathname]);

  if (!isMobile) return null;

  // Calcular posición exacta del bump para cada ícono (3 botones)
  const iconWidth = viewportWidth / 3;
  const centerPosition = iconWidth * activeIndex + (iconWidth / 2);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-[9999] pb-safe">
      <div className="relative">
        {/* SVG con el fondo deformado */}
        <svg
          className="absolute bottom-0 left-0 right-0 w-full"
          height="80"
          viewBox={`0 0 ${viewportWidth} 80`}
          fill="none"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="navGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1a1a1a" stopOpacity="0.98" />
              <stop offset="100%" stopColor="#0a0a0a" stopOpacity="0.95" />
            </linearGradient>
          </defs>
          
          <path
            d={`
              M 0,20
              L ${centerPosition - 40},20
              Q ${centerPosition - 20},20 ${centerPosition - 10},10
              Q ${centerPosition},0 ${centerPosition + 10},10
              Q ${centerPosition + 20},20 ${centerPosition + 40},20
              L ${viewportWidth},20
              L ${viewportWidth},80
              L 0,80
              Z
            `}
            fill="url(#navGradient)"
            className="transition-all duration-700 ease-out"
          />
          
          <path
            d={`
              M 0,20
              L ${centerPosition - 40},20
              Q ${centerPosition - 20},20 ${centerPosition - 10},10
              Q ${centerPosition},0 ${centerPosition + 10},10
              Q ${centerPosition + 20},20 ${centerPosition + 40},20
              L ${viewportWidth},20
            `}
            stroke="#3b82f6"
            strokeWidth="2"
            fill="none"
            opacity="0.5"
            className="transition-all duration-700 ease-out"
          />
        </svg>

        {/* Contenedor de íconos */}
        <div className="relative flex justify-around items-end px-4 pb-4 pt-6">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = index === activeIndex;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setActiveIndex(index)}
                className="relative flex flex-col items-center gap-1.5 min-w-[80px] group z-10"
                aria-label={item.label}
              >
                <div className={`
                  relative transition-all duration-700 ease-out
                  ${isActive ? '-translate-y-2' : 'translate-y-0'}
                `}>
                  {isActive ? (
                    <div className="relative">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 via-blue-600 to-blue-500 flex items-center justify-center shadow-xl shadow-blue-500/60">
                        <Icon 
                          className="w-7 h-7 text-white drop-shadow-lg" 
                          strokeWidth={2.5}
                        />
                      </div>
                      <div className="absolute inset-0 rounded-full bg-blue-500/40 blur-xl animate-pulse" 
                           style={{ animationDuration: '2s' }} />
                    </div>
                  ) : (
                    <div className="w-14 h-14 flex items-center justify-center group-active:scale-90 transition-transform duration-200">
                      <Icon 
                        className="w-6 h-6 text-gray-500 group-hover:text-gray-400 transition-colors duration-300" 
                        strokeWidth={2}
                      />
                    </div>
                  )}
                </div>

                <span className={`
                  text-[11px] font-medium transition-all duration-700 ease-out
                  ${isActive 
                    ? 'text-blue-400 scale-105 opacity-100' 
                    : 'text-gray-500 opacity-70 group-hover:text-gray-400 group-hover:opacity-100'
                  }
                `}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .pb-safe {
          padding-bottom: env(safe-area-inset-bottom);
        }
      `}</style>
    </nav>
  );
}