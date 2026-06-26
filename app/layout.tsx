import type {Metadata} from 'next';
import { Instrument_Serif, Barlow } from 'next/font/google';
import './globals.css'; // Global styles

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

export const metadata: Metadata = {
  title: 'korao.ai | Premium AI Domain For Sale',
  description: 'Acquire korao.ai - The ultimate premium domain for artificial intelligence startups, AI labs, model developers, and next-generation tech products.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${instrumentSerif.variable} ${barlow.variable}`}>
      <body className="bg-[#000] text-white min-h-screen" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
