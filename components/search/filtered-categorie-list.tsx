"use client";

import { ReactNode, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input';
import { getCategoryInfo } from "@/helper/Categories";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";

interface FilteredListProps {
  icon?: ReactNode;
  title?: string;
  data: string[];
  showAll?: boolean;
}

export default function FilteredListCategorie({ icon: Icon, title, data, showAll = false }: FilteredListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const filteredData = data.filter((item) =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const hasMoreItems = filteredData.length > 3;

  const handleViewAll = () => {
    router.push('/categories');
  };

  // Función para formatear el texto con "&"
  const formatCategoryName = (name: string) => {
    if (name.includes(' & ')) {
      const parts = name.split(' & ');
      return (
        <span className="flex flex-col leading-tight">
          <span>{parts[0]}</span>
          <span>& {parts[1]}</span>
        </span>
      );
    }
    return name;
  };

  const handleCategoryClick = (item: string) => {
    router.push(`/search?query=${encodeURIComponent(item)}`);
  };

  // Mostrar máximo 3 categorías + botón "Ver más" en móvil, 5 en desktop
  const displayDataMobile = filteredData.slice(0, 3);
  const displayDataDesktop = filteredData.slice(0, 5);

  return (
    <div className="space-y-4">
      {/* Header con título y buscador */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        {title && (
          <h2 className="flex items-center text-lg font-semibold">
            {Icon && <span className="mr-2">{Icon}</span>}
            {title}
          </h2>
        )}

        <Input
          type="search"
          placeholder="Buscar..."
          className="w-full sm:w-48 text-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* MOBILE: Grid de 4 columnas (3 categorías + 1 botón) */}
      <div className="w-full sm:hidden">
        <div className="grid grid-cols-4 gap-3">
          {/* 3 categorías para móvil */}
          {displayDataMobile.map((item, index) => {
            const categoryInfo = getCategoryInfo(item);
            const isImageIcon = categoryInfo?.icon?.startsWith('/');

            return (
              <div 
                key={index} 
                className="flex flex-col items-center"
              >
                <div 
                  className="flex flex-col items-center space-y-2 w-full hover:scale-105 transition-transform duration-200 cursor-pointer"
                  onClick={() => handleCategoryClick(item)}
                >
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow ${categoryInfo?.color || 'bg-gray-200'}`}>
                    {isImageIcon ? (
                      <Image
                        src={categoryInfo!.icon}
                        alt={categoryInfo!.name}
                        width={28}
                        height={28}
                        className="object-contain"
                      />
                    ) : (
                      <span className="text-xl">{categoryInfo?.icon || "📁"}</span>
                    )}
                  </div>
                </div>

                <span className="text-xs font-medium text-gray-700 dark:text-gray-300 text-center leading-tight max-w-[75px] break-words mt-2 block px-1">
                  {formatCategoryName(categoryInfo?.name || item)}
                </span>
              </div>
            );
          })}

          {/* Botón "Ver más" para móvil */}
          {hasMoreItems && (
            <div className="flex flex-col items-center">
              <Button
                variant="ghost"
                className="flex flex-col items-center space-y-2 w-full hover:scale-105 transition-transform duration-200 p-0 h-auto"
                onClick={handleViewAll}
              >
                <div className="w-14 h-14 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-300">
                  <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </div>
                <span className="text-xs font-medium text-gray-600 dark:text-gray-400 text-center leading-tight max-w-[75px] break-words mt-1">
                  Ver más
                </span>
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* DESKTOP: Grid de 5 columnas */}
      <div className="hidden sm:block w-full">
        <div className="grid grid-cols-5 gap-4">
          {displayDataDesktop.map((item, index) => {
            const categoryInfo = getCategoryInfo(item);
            const isImageIcon = categoryInfo?.icon?.startsWith('/');

            return (
              <div 
                key={index} 
                className="flex flex-col items-center"
              >
                <div 
                  className="flex flex-col items-center space-y-2 w-full hover:scale-105 transition-transform duration-200 cursor-pointer"
                  onClick={() => handleCategoryClick(item)}
                >
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow ${categoryInfo?.color || 'bg-gray-200'}`}>
                    {isImageIcon ? (
                      <Image
                        src={categoryInfo!.icon}
                        alt={categoryInfo!.name}
                        width={32}
                        height={32}
                        className="object-contain"
                      />
                    ) : (
                      <span className="text-2xl">{categoryInfo?.icon || "📁"}</span>
                    )}
                  </div>
                </div>

                <span className="text-xs font-medium text-gray-700 dark:text-gray-300 text-center leading-tight max-w-20 break-words mt-2 block px-1">
                  {formatCategoryName(categoryInfo?.name || item)}
                </span>
              </div>
            );
          })}
        </div>

        {/* Botón "Ver todas" para desktop cuando hay más de 5 categorías */}
        {filteredData.length > 5 && (
          <div className="flex justify-center pt-4">
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={handleViewAll}
            >
              Ver todas las categorías
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}