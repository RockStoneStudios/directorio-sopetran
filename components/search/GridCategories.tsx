"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Category {
  name: string;
  icon: string;
}

interface GridCategoriesProps {
  categories: Category[];
}

const GridCategories: React.FC<GridCategoriesProps> = ({ categories }) => {
  const router = useRouter();

  const handleClick = (name: string) => {
    router.push(`/search?query=${encodeURIComponent(name)}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white py-12">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-3xl font-bold mb-8 text-center">Categorías</h1>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-6">
          {categories.map((cat, index) => (
            <button
              key={index}
              onClick={() => handleClick(cat.name)}
              className="flex flex-col items-center justify-center bg-gray-800 rounded-2xl p-4 hover:bg-indigo-600 transition-all shadow-lg hover:shadow-indigo-500/30"
            >
              <div className="w-16 h-16 mb-3 relative">
                <Image
                  src={cat.icon}
                  alt={cat.name}
                  fill
                  className="object-contain drop-shadow-md"
                />
              </div>
              <p className="text-sm font-medium text-center">{cat.name}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GridCategories;
