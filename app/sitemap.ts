import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.directoriosopetran.com'

  try {
    // 🔹 Obtiene la lista de negocios desde tu API (ajusta esta ruta si es diferente)
    const response = await fetch(`${baseUrl}/api/businesses`, {
      // Evita que Next.js cachee la respuesta
      next: { revalidate: 0 },
    })
    const businesses = await response.json()

    // 🔹 Mapea los negocios al formato del sitemap
    const businessUrls = businesses.map((business: any) => ({
      url: `${baseUrl}/business/${business.slug}`,
      lastModified: new Date(business.updatedAt || Date.now()),
      changeFrequency: 'weekly',
      priority: 0.8,
    }))

    // 🔹 Retorna las rutas principales + dinámicas
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 1,
      },
      {
        url: `${baseUrl}/businesses`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
      },
      {
        url: `${baseUrl}/news`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.8,
      },
      {
        url: `${baseUrl}/search`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      },
      ...businessUrls, // agrega automáticamente todos los negocios
    ]
  } catch (error) {
    console.error('Error generando el sitemap:', error)
    // En caso de fallo en la API, al menos devuelve las rutas principales
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 1,
      },
    ]
  }
}
