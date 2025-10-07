"use client";
export const dynamic = "force-dynamic";

import React, { useCallback, useEffect, useState, Suspense } from "react";
import throttle from "lodash/throttle";
import { searchBusinessesFromDb } from "@/actions/business";
import BusinessCard from "@/components/cards/business-card";
import { BusinessState } from "@/utils/types/business";
import Link from "next/link";

const throttledFetchResults = throttle(
  async (
    query: string,
    setResults: React.Dispatch<React.SetStateAction<BusinessState[]>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    if (query) {
      setLoading(true);
      try {
        const data = await searchBusinessesFromDb(query);
        setResults(data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    } else {
      setResults([]);
      setLoading(false);
    }
  },
  1000
);

function SearchContent({ searchParams }: { searchParams: { query?: string } }) {
  const [results, setResults] = useState<BusinessState[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchResults = useCallback(() => {
    throttledFetchResults(searchParams.query || "", setResults, setLoading);
  }, [searchParams.query]);

  useEffect(() => {
    fetchResults();
  }, [fetchResults]);

  useEffect(() => {
    if (!searchParams.query) {
      setResults([]);
      setLoading(false);
    }
  }, [searchParams.query]);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-5 text-center">Buscar Resultados</h1>
      {loading && searchParams.query && <p className="text-center">Loading...</p>}
      {!loading && results.length === 0 && searchParams.query && (
        <p className="text-center">No hay resultados.</p>
      )}
      {results.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {results.map((business) => (
            <Link key={business._id} href={`/business/${business.slug}`}>
              <div className="transform transition duration-300 hover:scale-105 hover:shadow-lg">
                <BusinessCard business={business} />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function SearchPage({ searchParams }: { searchParams: { query?: string } }) {
  return (
    <Suspense fallback={<div className="text-center my-5">Cargando búsqueda...</div>}>
      <SearchContent searchParams={searchParams} />
    </Suspense>
  );
}
