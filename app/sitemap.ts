import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://media-optimizer.metinas.dev'
  
  const slugs = [
    'png-to-webp',
    'jpg-to-webp',
    'png-to-avif',
    'jpg-to-avif',
    'webp-to-jpg',
    'png-to-jpg',
  ]

  const sitemapEntries = slugs.map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    ...sitemapEntries,
  ]
}