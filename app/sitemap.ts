import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.directoriosopetran.com'
  const lastModified = new Date()

  const staticRoutes = [
    '',
    '/businesses', 
    '/news',
    '/search',
    '/categories',
    
  ]

  return staticRoutes.map(route => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1 : 0.8,
  }))
}