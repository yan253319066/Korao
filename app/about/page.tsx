import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About korao.ai',
  description: 'Learn about korao.ai — a premium .ai domain name for artificial intelligence startups and tech ventures.',
  openGraph: {
    title: 'About korao.ai | Premium AI Domain',
    description: 'Learn about korao.ai — a premium .ai domain for AI ventures.',
  },
};

export default function AboutPage() {
  return (
    <main className="w-full min-h-screen bg-[#000] text-white selection:bg-white selection:text-black">
      <div className="max-w-3xl mx-auto px-6 md:px-8 pt-32 pb-24">
        <span className="text-xs md:text-sm font-semibold tracking-[0.2em] uppercase text-white/60 mb-4 block font-body">
          {"// About"}
        </span>

        <h1 className="font-heading italic text-white text-5xl md:text-7xl leading-[0.95] tracking-[-3px] mb-8">
          About korao.ai
        </h1>

        <div className="space-y-6 font-body text-sm md:text-base text-white/80 leading-relaxed">
          <p>
            korao.ai is a premium .ai domain name positioned at the intersection of brandability and AI industry relevance. It offers a concise, memorable, and modern brand identity for artificial intelligence companies, model developers, and next-generation technology ventures.
          </p>

          <p>
            As the AI industry continues to expand, short and pronounceable .ai domain names have become increasingly scarce. korao.ai represents a rare opportunity to acquire a brandable digital asset that is natively aligned with the artificial intelligence sector.
          </p>

          <h2 className="font-heading italic text-white text-2xl md:text-3xl tracking-[-1px] mt-12 mb-4">Why .ai?</h2>

          <p>
            The .ai top-level domain (country code for Anguilla) has become the de facto standard for AI companies worldwide. Major AI labs, startups, and tools use .ai domains as their primary brand URL. This widespread adoption has driven scarcity of quality short-form .ai names, making available premium names increasingly valuable.
          </p>

          <h2 className="font-heading italic text-white text-2xl md:text-3xl tracking-[-1px] mt-12 mb-4">Domain Characteristics</h2>

          <ul className="list-disc pl-6 space-y-2 text-white/70">
            <li><strong className="text-white">Name:</strong> korao.ai — short, one-word brandable</li>
            <li><strong className="text-white">Length:</strong> 7 characters before TLD, highly memorable</li>
            <li><strong className="text-white">Pronunciation:</strong> Intuitive, globally accessible</li>
            <li><strong className="text-white">TLD:</strong> .ai — the AI industry standard</li>
            <li><strong className="text-white">Category:</strong> Premium domain acquisition (digital asset)</li>
          </ul>

          <h2 className="font-heading italic text-white text-2xl md:text-3xl tracking-[-1px] mt-12 mb-4">Acquisition</h2>

          <p>
            Interested parties may submit an inquiry through the on-site form. All transactions are secured via established domain escrow services (Escrow.com or Dan.com) to protect both buyer and seller.
          </p>
        </div>
      </div>

      <div className="border-t border-white/10 max-w-3xl mx-auto px-6 md:px-8 pb-16">
        <div className="flex items-center gap-6 pt-8 text-xs text-white/40 font-body">
          <a href="/" className="text-white/60 hover:text-white transition-colors">Home</a>
          <span>·</span>
          <a href="/faq" className="text-white/60 hover:text-white transition-colors">FAQ</a>
          <span>·</span>
          <span>© {new Date().getFullYear()} Korao.ai</span>
        </div>
      </div>
    </main>
  );
}
