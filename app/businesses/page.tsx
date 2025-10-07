export const dynamic = "force-dynamic";

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
  const page = searchParams?.page
    ? parseInt(searchParams.page as unknown as string, 10)
    : 1;

  const limit = 6;
  const { businesses, totalCount } = await getLatestBusinessesFromDb(page, limit);
  const totalPages = Math.ceil(totalCount / limit);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-5 text-center">
        Agregados recientemente
      </h1>

      {businesses.length === 0 ? (
        <p className="text-center my-10 text-gray-500">
          No hay negocios disponibles aún.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {businesses.map((business: BusinessState) => (
            <Link
              key={business._id}
              href={`/business/${business.slug}`}
              className="block"
            >
              <div className="transform transition duration-300 hover:scale-105 hover:shadow-lg">
                <BusinessCard business={business} />
              </div>
            </Link>
          ))}
        </div>
      )}

      <div className="mt-10">
        <Pagination page={page} totalPages={totalPages} />
      </div>

      <div className="mt-10">
        <CategoryAddressCard />
      </div>
    </div>
  );
}
