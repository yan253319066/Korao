import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ — korao.ai Premium Domain',
  description: 'Frequently asked questions about acquiring korao.ai, the .ai TLD, premium domain valuation, and the acquisition process.',
  openGraph: {
    title: 'FAQ | korao.ai Premium AI Domain',
    description: 'Frequently asked questions about acquiring korao.ai.',
  },
};

const faqs = [
  {
    q: 'What is korao.ai?',
    a: 'korao.ai is a premium .ai domain name for sale. It is a short, brandable, and memorable domain ideal for AI startups, LLM developers, and next-gen tech products.',
  },
  {
    q: 'Why is the .ai TLD valuable for AI companies?',
    a: '.ai has become the de facto domain extension for the global AI industry. Short, pronounceable .ai names are increasingly scarce, making quality names valuable long-term digital assets.',
  },
  {
    q: 'How do I inquire about purchasing korao.ai?',
    a: 'Visit korao.ai and submit an offer via the on-site inquiry form. The process includes verification, escrow preparation via Escrow.com or Dan.com, and domain transfer confirmation.',
  },
  {
    q: 'What makes a .ai domain premium?',
    a: 'Premium .ai domains are short, memorable, brandable names with high commercial value. Key factors include length, pronounceability, AI/tech relevance, brand potential, and TLD authority.',
  },
  {
    q: 'Is korao.ai a good domain for a startup?',
    a: 'Yes. korao.ai is short, easy to spell, globally pronounceable, and naturally aligned with AI. It is ideal for AI startups, model labs, AI tools, and intelligent SaaS brands.',
  },
  {
    q: 'How is the transaction secured?',
    a: 'All transactions use established domain escrow services (Escrow.com or Dan.com). These services protect both buyer and seller by holding funds until the domain transfer is confirmed.',
  },
  {
    q: 'Can I use korao.ai for any type of AI business?',
    a: 'Absolutely. korao.ai works for AI startups, LLM labs, AI tool platforms, automation services, intelligent SaaS products, and AI venture brands.',
  },
];

export default function FAQPage() {
  return (
    <main className="w-full min-h-screen bg-[#000] text-white selection:bg-white selection:text-black">
      <div className="max-w-3xl mx-auto px-6 md:px-8 pt-32 pb-24">
        <span className="text-xs md:text-sm font-semibold tracking-[0.2em] uppercase text-white/60 mb-4 block font-body">
          {"// FAQ"}
        </span>

        <h1 className="font-heading italic text-white text-5xl md:text-7xl leading-[0.95] tracking-[-3px] mb-12">
          Frequently Asked Questions
        </h1>

        <div className="space-y-8 font-body">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-white/10 pb-6">
              <h2 className="text-base md:text-lg text-white font-medium mb-2">{faq.q}</h2>
              <p className="text-sm md:text-base text-white/70 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-sm text-white/50 font-body">
            Have more questions? Submit an inquiry at{' '}
            <a href="/" className="text-white/80 hover:text-white underline underline-offset-4 transition-colors">korao.ai</a>.
          </p>
        </div>
      </div>

      <div className="border-t border-white/10 max-w-3xl mx-auto px-6 md:px-8 pb-16">
        <div className="flex items-center gap-6 pt-8 text-xs text-white/40 font-body">
          <a href="/" className="text-white/60 hover:text-white transition-colors">Home</a>
          <span>·</span>
          <a href="/about" className="text-white/60 hover:text-white transition-colors">About</a>
          <span>·</span>
          <span>© {new Date().getFullYear()} Korao.ai</span>
        </div>
      </div>
    </main>
  );
}
