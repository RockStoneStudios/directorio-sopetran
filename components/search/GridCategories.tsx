"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search, Grid3x3, LayoutGrid, ArrowLeft, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Category {
  name: string;
  icon: string;
}

interface GridCategoriesProps {
  categories: Category[];
}

const GridCategories: React.FC<GridCategoriesProps> = ({ categories }) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "comfortable">("grid");

  const handleClick = (name: string) => {
    router.push(`/search?query=${encodeURIComponent(name)}`);
  };

  const handleBack = () => {
    router.back();
  };

  // Filtrar categorías
  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Formatear nombre si tiene "&"
  const formatCategoryName = (name: string) => {
    if (name.includes(' & ')) {
      const parts = name.split(' & ');
      return (
        <span className="flex flex-col leading-[1.1]">
          <span>{parts[0]}</span>
          <span className="text-[10px] opacity-70">& {parts[1]}</span>
        </span>
      );
    }
    return name;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 dark:from-gray-950 dark:via-blue-950/20 dark:to-purple-950/10">
      {/* Header Premium con Glassmorphism */}
      <div className="sticky top-0 z-40 backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border-b border-gray-200/50 dark:border-gray-800/50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col gap-6">
            {/* Fila superior: Back button + Título + Stats */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* Botón de regreso */}
                <button
                  onClick={handleBack}
                  className="group flex items-center justify-center w-11 h-11 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:-translate-x-0.5 transition-transform" />
                </button>

                {/* Título con gradiente */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
                    <Grid3x3 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-900 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
                      Todas las Categorías
                    </h1>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">
                      Explora nuestro directorio completo
                    </p>
                  </div>
                </div>
              </div>

              {/* Contador de categorías */}
              <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/40 dark:to-purple-950/40 border border-blue-200/50 dark:border-blue-800/50 shadow-sm">
                <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-bold text-blue-700 dark:text-blue-300">
                  {filteredCategories.length} {filteredCategories.length === 1 ? 'categoría' : 'categorías'}
                </span>
              </div>
            </div>

            {/* Barra de búsqueda y controles */}
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Buscador */}
              <div className="relative flex-1 group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors duration-200" />
                  <Input
                    type="search"
                    placeholder="Buscar en categorías..."
                    className="w-full pl-12 pr-4 h-12 text-sm bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 dark:focus:ring-blue-400/50 dark:focus:border-blue-400 transition-all duration-200 shadow-sm hover:shadow-md"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* Toggle de vista (Desktop) */}
              <div className="hidden sm:flex items-center gap-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-inner">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    viewMode === "grid"
                      ? "bg-white dark:bg-gray-700 shadow-sm text-blue-600 dark:text-blue-400 font-semibold"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                  }`}
                >
                  <Grid3x3 className="w-4 h-4" />
                  <span className="text-sm">Compacto</span>
                </button>
                <button
                  onClick={() => setViewMode("comfortable")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    viewMode === "comfortable"
                      ? "bg-white dark:bg-gray-700 shadow-sm text-blue-600 dark:text-blue-400 font-semibold"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                  }`}
                >
                  <LayoutGrid className="w-4 h-4" />
                  <span className="text-sm">Cómodo</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido Principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Estado vacío */}
        {filteredCategories.length === 0 && (
          <div className="text-center py-24">
            <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center shadow-xl">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              No encontramos esa categoría
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Intenta con otro término de búsqueda
            </p>
          </div>
        )}

        {/* Grid de categorías - Vista Compacta */}
        {filteredCategories.length > 0 && viewMode === "grid" && (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 sm:gap-5">
            {filteredCategories.map((cat, index) => (
              <button
                key={index}
                onClick={() => handleClick(cat.name)}
                className="group flex flex-col items-center gap-3 p-4 rounded-2xl bg-white dark:bg-gray-900 hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-950/30 dark:hover:to-purple-950/30 border border-gray-200/50 dark:border-gray-800/50 hover:border-blue-300 dark:hover:border-blue-700 shadow-sm hover:shadow-xl transform hover:scale-105 hover:-translate-y-1 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2"
              >
                {/* Contenedor de ícono */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-90 group-hover:scale-110" />
                  
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center shadow-md group-hover:shadow-xl transition-shadow duration-300">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent rounded-2xl" />
                    <Image
                      src={cat.icon}
                      alt={cat.name}
                      width={48}
                      height={48}
                      className="object-contain drop-shadow-lg relative z-10"
                    />
                  </div>
                </div>

                {/* Nombre */}
                <p className="text-xs sm:text-sm font-bold text-gray-800 dark:text-gray-200 text-center leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                  {formatCategoryName(cat.name)}
                </p>
              </button>
            ))}
          </div>
        )}

        {/* Grid de categorías - Vista Cómoda */}
        {filteredCategories.length > 0 && viewMode === "comfortable" && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 sm:gap-6">
            {filteredCategories.map((cat, index) => (
              <button
                key={index}
                onClick={() => handleClick(cat.name)}
                className="group flex flex-col items-center gap-4 p-6 rounded-3xl bg-white dark:bg-gray-900 hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-950/30 dark:hover:to-purple-950/30 border border-gray-200/50 dark:border-gray-800/50 hover:border-blue-300 dark:hover:border-blue-700 shadow-lg hover:shadow-2xl transform hover:scale-105 hover:-translate-y-2 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2"
              >
                {/* Contenedor de ícono más grande */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400/30 to-purple-400/30 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-90 group-hover:scale-110" />
                  
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-shadow duration-300 border border-white/20 dark:border-gray-600/20">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent rounded-3xl" />
                    <Image
                      src={cat.icon}
                      alt={cat.name}
                      width={64}
                      height={64}
                      className="object-contain drop-shadow-2xl relative z-10"
                    />
                  </div>
                </div>

                {/* Nombre */}
                <p className="text-sm sm:text-base font-bold text-gray-800 dark:text-gray-200 text-center leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                  {formatCategoryName(cat.name)}
                </p>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GridCategories;