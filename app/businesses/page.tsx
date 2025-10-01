import { getLatestBusinessesFromDb } from "@/actions/business";
import { BusinessState } from "@/utils/types/business";
import Link from "next/link";
import BusinessCard from "@/components/cards/business-card";
import Pagination from "@/components/nav/pagination";
import CategoryAddressCard from "@/components/cards/category-address-card";

interface BusinessesPageProps {
  searchParams: { page?: number };
}

export default async function Home({ searchParams }: BusinessesPageProps) {
  const page = searchParams?.page ? parseInt(searchParams.page as unknown as string, 10) : 1;
  
  const limit = 6;
  const { businesses, totalCount } = await getLatestBusinessesFromDb(page, limit);
  const totalPages = Math.ceil(totalCount / limit);

  return (
    <div>
      <div className="p-5">
        <h1 className="text-2xl font-bold mb-3 text-center">
          Agregados recientemente
        </h1>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {businesses.map((business: BusinessState) => (
          // 🔥 Agregar key y mover las clases al div interno
          <Link 
            key={business.id}
            href={`/business/${business.slug}`}
            className="block" // Solo clases necesarias para el link
          >
            <div className="transform transition duration-300 hover:scale-105 hover:shadow-lg">
              <BusinessCard business={business} />
            </div>
          </Link>
        ))}
      </div>

      <Pagination page={page} totalPages={totalPages} />
      <CategoryAddressCard />
    </div>
  );
}