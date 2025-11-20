// app/sitemap.ts
import { MetadataRoute } from 'next';
import { getAllBusinessesFromDb } from '@/actions/business';
import newsData from '@/data/news.json';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.directoriosopetran.com';

  // Páginas estáticas
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/businesses`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/news`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/categories`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ];

  try {
    // Obtener todos los negocios publicados
    const { businesses } = await getAllBusinessesFromDb(1, 1000);
    
    const businessPages: MetadataRoute.Sitemap = businesses
      .filter((business: any) => business.published)
      .map((business: any) => ({
        url: `${baseUrl}/business/${business.slug}`,
        lastModified: new Date(business.updatedAt || business.createdAt),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }));

    // Páginas de noticias
    const newsPages: MetadataRoute.Sitemap = newsData.news.map((news) => ({
      url: `${baseUrl}/news/${news.slug}`,
      lastModified: new Date(news.date),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));

    // Páginas de categorías dinámicas
    const categories = ['comidas', 'compras', 'servicios', 'salud', 'transporte', 'entretenimiento', 'hospedaje', 'tecnologia', 'educacion', 'deportes'];
    const categoryPages: MetadataRoute.Sitemap = categories.map((cat) => ({
      url: `${baseUrl}/search?category=${cat}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.75,
    }));

    return [...staticPages, ...businessPages, ...newsPages, ...categoryPages];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return staticPages;
  }
}

// Configuración de revalidación
export const revalidate = 3600; // Regenerar cada hora