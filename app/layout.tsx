import type {Metadata} from 'next';
import { Instrument_Serif, Barlow } from 'next/font/google';
import './globals.css';

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-heading',
});

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-body',
});

const siteUrl = process.env.APP_URL || 'https://www.korao.ai';

export const metadata: Metadata = {
  title: {
    default: 'korao.ai | Premium AI Domain For Sale',
    template: '%s | korao.ai',
  },
  description: 'Acquire korao.ai — the ultimate premium .ai domain for artificial intelligence startups, AI labs, model developers, and next-generation tech products.',
  keywords: ['premium domain for sale', 'ai domain', 'korao.ai', 'startup domain', 'artificial intelligence domain', '.ai domain', 'tech domain', 'brandable domain'],
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'korao.ai | Premium AI Domain For Sale',
    description: 'Acquire korao.ai — a concise, brandable, and future-ready .ai domain for artificial intelligence startups, AI agencies, model labs, and next-generation tech products.',
    url: 'https://www.korao.ai',
    siteName: 'korao.ai',
    locale: 'en_US',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'korao.ai | Premium AI Domain For Sale',
    description: 'Acquire korao.ai — a concise, brandable, and future-ready .ai domain for artificial intelligence startups.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.svg',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Product',
      name: 'korao.ai Premium Domain',
      description: 'A concise, brandable, and future-ready .ai domain. Perfect for artificial intelligence startups, AI agencies, model labs, and next-generation tech products.',
      url: siteUrl,
      category: 'Digital Asset',
      brand: {
        '@type': 'Brand',
        name: 'korao.ai',
      },
    },
    {
      '@type': 'WebSite',
      name: 'korao.ai',
      url: siteUrl,
      description: 'Premium AI Domain For Sale — acquire korao.ai for your next AI venture.',
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${siteUrl}?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is korao.ai?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'korao.ai is a premium .ai domain for sale. It is short, brandable, and memorable — ideal for AI startups, LLM developers, and next-gen tech products.',
          },
        },
        {
          '@type': 'Question',
          name: 'Why is the .ai TLD valuable for AI companies?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '.ai has become the de facto domain extension for the global AI industry. Short, pronounceable .ai names are increasingly scarce, making quality names valuable long-term digital assets.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do I inquire about purchasing korao.ai?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Visit korao.ai and submit an offer via the on-site inquiry form. The process includes verification, escrow preparation via Escrow.com, and domain transfer confirmation.',
          },
        },
        {
          '@type': 'Question',
          name: 'What makes a .ai domain premium?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Premium .ai domains are short, memorable, brandable names with high commercial value. Key factors: length, pronounceability, AI/tech relevance, brand potential, and TLD authority.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is korao.ai a good domain for a startup?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. korao.ai is short, easy to spell, globally pronounceable, and naturally aligned with AI. It is ideal for AI startups, model labs, AI tools, and intelligent SaaS brands.',
          },
        },
      ],
    },
  ],
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${instrumentSerif.variable} ${barlow.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
        />
      </head>
      <body className="bg-[#000] text-white min-h-screen" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
