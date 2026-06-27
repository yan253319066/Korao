'use client';

import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { FadingVideo } from './FadingVideo';

const entranceTransition = {
  duration: 0.8,
  ease: [0.16, 1, 0.3, 1] as const,
};

interface DomainValueSectionProps {
  activeDetail: 'brand' | 'vertical' | 'premium';
  onCardClick: (detail: 'brand' | 'vertical' | 'premium') => void;
  domainInfoRef: React.RefObject<HTMLDivElement | null>;
  brandValueRef: React.RefObject<HTMLDivElement | null>;
  aiVerticalRef: React.RefObject<HTMLDivElement | null>;
  valueRef: React.RefObject<HTMLElement | null>;
  detailSectionRef: React.RefObject<HTMLDivElement | null>;
}

export default function DomainValueSection({
  activeDetail, onCardClick,
  domainInfoRef, brandValueRef, aiVerticalRef,
  valueRef, detailSectionRef,
}: DomainValueSectionProps) {
  return (
    <section ref={valueRef} id="value-section" className="relative scroll-mt-[-1px] w-full min-h-screen flex flex-col justify-between bg-[#000] z-10 border-t border-white/5">
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="sticky top-0 left-0 w-full h-screen">
          <FadingVideo
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_094631_d30ab262-45ee-4b7d-99f3-5d5848c8ef13.mp4"
            className="absolute inset-0 w-full h-full object-cover object-center scale-110"
            style={{ width: '100%', height: '100%', minWidth: '100%', minHeight: '100%', objectFit: 'cover' }}
          />
        </div>
      </div>

      <div className="relative z-10 px-6 md:px-16 lg:px-20 pt-24 pb-12 flex flex-col min-h-screen w-full max-w-7xl mx-auto">
        <div ref={domainInfoRef} id="domain-info-header" className="scroll-mt-28 mb-auto max-w-2xl text-left">
          <span className="text-xs md:text-sm font-semibold tracking-[0.2em] uppercase text-white/80 mb-4 block font-body">
            {"// Domain Strength"}
          </span>
          <h2 className="font-heading italic text-white text-5xl md:text-7xl lg:text-[6rem] leading-[0.9] tracking-[-3px]">
            Premium <br className="hidden md:inline" />AI Domain
          </h2>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 md:mt-24 w-full"
        >
          <motion.div
            ref={brandValueRef}
            id="brand-value-card"
            variants={{
              hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
              visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: entranceTransition },
            }}
            onClick={() => onCardClick('brand')}
            className={`scroll-mt-28 rounded-[1.25rem] p-6 min-h-[360px] flex flex-col justify-between hover:scale-[1.02] transition-all duration-300 cursor-pointer border ${activeDetail === 'brand' ? 'border-white bg-white/[0.08] shadow-[0_0_25px_rgba(255,255,255,0.05)]' : 'border-white/10 bg-white/5 hover:bg-white/[0.07] hover:border-white/25'}`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="w-11 h-11 rounded-[0.75rem] liquid-glass flex items-center justify-center flex-shrink-0">
                <svg className="h-6 w-6 text-white fill-current" viewBox="0 0 24 24">
                  <path d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21H5Zm1-4h12l-3.75-5-3 4L9 13l-3 4Z" />
                </svg>
              </div>
              <div className="flex flex-wrap justify-end gap-1.5 max-w-[70%]">
                <span className="rounded-full px-2.5 py-0.5 text-[10px] text-white/90 bg-white/5 border border-white/10 font-body whitespace-nowrap">Short Length</span>
                <span className="rounded-full px-2.5 py-0.5 text-[10px] text-white/90 bg-white/5 border border-white/10 font-body whitespace-nowrap">Easy Pronunciation</span>
                <span className="rounded-full px-2.5 py-0.5 text-[10px] text-white/90 bg-white/5 border border-white/10 font-body whitespace-nowrap">High Recall</span>
                <span className="rounded-full px-2.5 py-0.5 text-[10px] text-white/90 bg-white/5 border border-white/10 font-body whitespace-nowrap">Clean Identity</span>
              </div>
            </div>
            <div className="mt-6">
              <div className="flex items-center gap-1.5 mb-2">
                <span className={`w-1.5 h-1.5 rounded-full ${activeDetail === 'brand' ? 'bg-emerald-400' : 'bg-white/30'}`} />
                <span className="text-[10px] uppercase tracking-wider font-mono text-white/40">Brand Value Card</span>
              </div>
              <h3 className="font-heading italic text-white text-3xl tracking-[-1px] leading-none">Brandable Simplicity</h3>
              <p className="mt-3 text-sm text-white/80 font-body font-light leading-snug max-w-[32ch]">
                Korao delivers a clean, modern, and unique brand name. Short, spellable, and instantly memorable — ideal for building a standalone AI brand identity.
              </p>
              <div className="mt-4 flex items-center gap-1 text-[11px] text-white/50 hover:text-white transition-colors">
                <span>Explore Brand Metrics</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          </motion.div>

          <motion.div
            ref={aiVerticalRef}
            id="ai-vertical-card"
            variants={{
              hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
              visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: entranceTransition },
            }}
            onClick={() => onCardClick('vertical')}
            className={`scroll-mt-28 rounded-[1.25rem] p-6 min-h-[360px] flex flex-col justify-between hover:scale-[1.02] transition-all duration-300 cursor-pointer border ${activeDetail === 'vertical' ? 'border-white bg-white/[0.08] shadow-[0_0_25px_rgba(255,255,255,0.05)]' : 'border-white/10 bg-white/5 hover:bg-white/[0.07] hover:border-white/25'}`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="w-11 h-11 rounded-[0.75rem] liquid-glass flex items-center justify-center flex-shrink-0">
                <svg className="h-6 w-6 text-white fill-current" viewBox="0 0 24 24">
                  <path d="M4 6.47 5.76 10H20v8H4V6.47M22 4h-4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.89-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4Z" />
                </svg>
              </div>
              <div className="flex flex-wrap justify-end gap-1.5 max-w-[70%]">
                <span className="rounded-full px-2.5 py-0.5 text-[10px] text-white/90 bg-white/5 border border-white/10 font-body whitespace-nowrap">AI Niche</span>
                <span className="rounded-full px-2.5 py-0.5 text-[10px] text-white/90 bg-white/5 border border-white/10 font-body whitespace-nowrap">Startup Ready</span>
                <span className="rounded-full px-2.5 py-0.5 text-[10px] text-white/90 bg-white/5 border border-white/10 font-body whitespace-nowrap">Tech Focused</span>
                <span className="rounded-full px-2.5 py-0.5 text-[10px] text-white/90 bg-white/5 border border-white/10 font-body whitespace-nowrap">Product Friendly</span>
              </div>
            </div>
            <div className="mt-6">
              <div className="flex items-center gap-1.5 mb-2">
                <span className={`w-1.5 h-1.5 rounded-full ${activeDetail === 'vertical' ? 'bg-blue-400' : 'bg-white/30'}`} />
                <span className="text-[10px] uppercase tracking-wider font-mono text-white/40">AI Niche Card</span>
              </div>
              <h3 className="font-heading italic text-white text-3xl tracking-[-1px] leading-none">AI Vertical Fit</h3>
              <p className="mt-3 text-sm text-white/80 font-body font-light leading-snug max-w-[32ch]">
                Natively suited for artificial intelligence businesses, large language models, AI tools, automation platforms, and intelligent SaaS products.
              </p>
              <div className="mt-4 flex items-center gap-1 text-[11px] text-white/50 hover:text-white transition-colors">
                <span>Interactive API Sandbox</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
              visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: entranceTransition },
            }}
            onClick={() => onCardClick('premium')}
            className={`rounded-[1.25rem] p-6 min-h-[360px] flex flex-col justify-between hover:scale-[1.02] transition-all duration-300 cursor-pointer border ${activeDetail === 'premium' ? 'border-white bg-white/[0.08] shadow-[0_0_25px_rgba(255,255,255,0.05)]' : 'border-white/10 bg-white/5 hover:bg-white/[0.07] hover:border-white/25'}`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="w-11 h-11 rounded-[0.75rem] liquid-glass flex items-center justify-center flex-shrink-0">
                <svg className="h-6 w-6 text-white fill-current" viewBox="0 0 24 24">
                  <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1Zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7Z" />
                </svg>
              </div>
              <div className="flex flex-wrap justify-end gap-1.5 max-w-[70%]">
                <span className="rounded-full px-2.5 py-0.5 text-[10px] text-white/90 bg-white/5 border border-white/10 font-body whitespace-nowrap">High Value</span>
                <span className="rounded-full px-2.5 py-0.5 text-[10px] text-white/90 bg-white/5 border border-white/10 font-body whitespace-nowrap">Scarcity</span>
                <span className="rounded-full px-2.5 py-0.5 text-[10px] text-white/90 bg-white/5 border border-white/10 font-body whitespace-nowrap">Future Proof</span>
                <span className="rounded-full px-2.5 py-0.5 text-[10px] text-white/90 bg-white/5 border border-white/10 font-body whitespace-nowrap">Industry TLD</span>
              </div>
            </div>
            <div className="mt-6">
              <div className="flex items-center gap-1.5 mb-2">
                <span className={`w-1.5 h-1.5 rounded-full ${activeDetail === 'premium' ? 'bg-purple-400' : 'bg-white/30'}`} />
                <span className="text-[10px] uppercase tracking-wider font-mono text-white/40">Market Premium Card</span>
              </div>
              <h3 className="font-heading italic text-white text-3xl tracking-[-1px] leading-none">Premium .ai Investment</h3>
              <p className="mt-3 text-sm text-white/80 font-body font-light leading-snug max-w-[32ch]">
                .ai is the official top-level domain for the global AI industry. Limited premium short names remain, making Korao.ai a rare long-term digital asset.
              </p>
              <div className="mt-4 flex items-center gap-1 text-[11px] text-white/50 hover:text-white transition-colors">
                <span>Verify Market Valuations</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          </motion.div>
        </motion.div>

        <div className="mt-auto pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40 border-t border-white/5 font-body">
          <span>💡 Click any card above to explore its core features & interact with live API tests below</span>
          <div onClick={() => detailSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })} className="flex items-center gap-1.5 animate-pulse cursor-pointer hover:text-white/80 transition-colors duration-200">
            <span>Scroll down for Explorer</span>
            <span className="font-sans">↓</span>
          </div>
        </div>
      </div>
    </section>
  );
}
