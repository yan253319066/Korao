import type {MetadataRoute} from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.APP_URL || 'https://www.korao.ai';

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
  ];
}
