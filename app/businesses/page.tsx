export const dynamic = "force-dynamic"; // 🔥 Google podrá indexarla correctamente

import { getLatestBusinessesFromDb, getUniqueCategoriesAndAddresses } from "@/actions/business";
import { BusinessState } from "@/utils/types/business";
import BusinessCard from "@/components/cards/business-card";
import Pagination from "@/components/nav/pagination";
import CategoryAddressCard from "@/components/cards/category-address-card";
import FilteredListCategorie from "@/components/search/filtered-categorie-list";
import { LayoutList } from "lucide-react";

// 🔥 SEO Metadata
export const metadata = {
  title: "Negocios en Sopetrán | Directorio Sopetrán",
  description: "Encuentra negocios, servicios, restaurantes y comercios locales en Sopetrán Antioquia.",
  robots: {
    index: true,
    follow: true,
  },
};

interface BusinessesPageProps {
  searchParams: { page?: number };
}

export default async function Home({ searchParams }: BusinessesPageProps) {
  const page =
    searchParams?.page
      ? parseInt(searchParams.page as unknown as string, 10)
      : 1;

  const { uniqueCategories, uniqueAddresses } =
    await getUniqueCategoriesAndAddresses();

  const categories = Array.isArray(uniqueCategories)
    ? uniqueCategories
    : [];

  const addresses = Array.isArray(uniqueAddresses)
    ? uniqueAddresses
    : [];

  const limit = 6;
  const { businesses, totalCount } = await getLatestBusinessesFromDb(
    page,
    limit
  );
  const totalPages = Math.ceil(totalCount / limit);

  return (
    <div>
      <div className="p-5">
        <h1 className="text-2xl font-bold mb-3 text-center">
          Negocios & Categorías
        </h1>
      </div>

      <div className="px-5 mb-8">
        <FilteredListCategorie
          data={categories}
          title="Categorías"
          icon={<LayoutList />}
        />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 ml-1">
        {businesses.map((business: BusinessState) => (
          <div key={business._id}>
            <BusinessCard business={business} />
          </div>
        ))}
      </div>

      <Pagination page={page} totalPages={totalPages} />
      <CategoryAddressCard />
    </div>
  );
}
