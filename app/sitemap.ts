import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.directoriosopetran.com'
  
  // Fecha de última modificación
  const lastModified = new Date()
  
  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/businesses`,
      lastModified,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/news`,
      lastModified,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/search`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/categories`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    // Agrega aquí más rutas estáticas que tengas
  ]
}