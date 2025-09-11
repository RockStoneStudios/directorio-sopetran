"use client";
import React, { useCallback, useEffect, useState } from 'react'
import throttle from 'lodash/throttle';
import { searchBusinessesFromDb } from '@/actions/business';
import BusinessCard from '@/components/cards/business-card';
import { BusinessState } from '@/utils/types/business';
import Link from 'next/link';


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
            setResults([]); // Clear results if query is empty
            setLoading(false);
        }
    },
    1000
);


export default function SearchPage({searchParams} : {searchParams :{query?:string}

}){
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const fetchResults = useCallback(() => {
        throttledFetchResults(searchParams.query || "", setResults,
            setLoading);
    }, [searchParams.query]);


    useEffect(() => {
        fetchResults();
    }, [fetchResults]);


    useEffect(() => {
        // Clear results and loading state if query is empty
        if (!searchParams.query) {
            setResults([]);
            setLoading(false);
        }
    }, [searchParams.query]);

    return (
        <div>
            <div className="p-5">
                <h1 className="text-2xl font-bold mb-5 text-center">Buscar
                    Resultados</h1>
                {loading && searchParams.query && (
                    <p className="text-center">Loading...</p>
                )}
                {!loading && results.length === 0 && searchParams.query && (
                    <p className="text-center">No hay resultados.</p>
                )}
                {results.length > 0 && (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {results.map((business: BusinessState) => (
                            <Link key={business._id} href=
                                {`/business/${business.slug}`}>
                                <div className="transform transition duration-300 hover:scale-105 hover:shadow-lg">
                                    <BusinessCard business={business} />
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );

}
