'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Clock, Globe } from 'lucide-react';
import { FadingVideo } from './FadingVideo';
import { BlurText } from './BlurText';
import { ArrowUpRightIcon, PlayIcon } from './Icons';
import { usePageContext } from './PageContext';

const entranceTransition = {
  duration: 0.8,
  ease: [0.16, 1, 0.3, 1] as const,
};

interface HeroSectionProps {
  heroRef?: React.RefObject<HTMLElement | null>;
  onScrollToValue?: () => void;
}

export default function HeroSection({ heroRef, onScrollToValue }: HeroSectionProps) {
  const { openInquiry } = usePageContext();

  return (
    <section ref={heroRef} id="hero-section" className="scroll-mt-28 relative w-full min-h-screen md:h-screen md:min-h-0 flex flex-col justify-between bg-[#000] z-10 overflow-hidden">
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <FadingVideo
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_080021_d598092b-c4c2-4e53-8e46-94cf9064cd50.mp4"
          className="absolute inset-0 w-full h-full object-cover object-center scale-110"
          style={{ width: '100%', height: '100%', minWidth: '100%', minHeight: '100%', objectFit: 'cover' }}
        />
      </div>

      <div className="w-full h-16 md:h-20" />

      <div className="flex-1 w-full max-w-4xl mx-auto flex flex-col items-center justify-center text-center px-4 md:px-8 py-4 md:py-6 z-10">
        <motion.div
          initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
          animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          transition={{ ...entranceTransition, delay: 0.4 }}
          className="inline-flex items-center p-1 pr-4 rounded-full liquid-glass mb-4 md:mb-5"
        >
          <span className="bg-white text-black text-[10px] md:text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mr-3 leading-none">
            Premium
          </span>
          <span className="text-xs md:text-sm text-white/95 font-body font-light tracking-wide">
            Rare .ai AI Vertical Domain For Sale
          </span>
        </motion.div>

        <div className="mb-3 md:mb-4">
          <BlurText
            as="h1"
            text="Korao.ai — Define Your AI Future"
            className="text-4xl md:text-6xl lg:text-[5rem] font-heading italic text-white leading-[0.95] max-w-3xl justify-center tracking-[-4px]"
          />
        </div>

        <motion.p
          initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
          animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          transition={{ ...entranceTransition, delay: 0.8 }}
          className="text-sm md:text-base lg:text-lg text-white/90 max-w-2xl font-body font-light leading-relaxed mb-6 md:mb-8 px-4"
        >
          A concise, brandable, and future-ready .ai domain. Perfect for artificial intelligence startups, AI agencies, model labs, and next-generation tech products.
        </motion.p>

        <motion.div
          initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
          animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          transition={{ ...entranceTransition, delay: 1.1 }}
          className="flex flex-col sm:flex-row items-center gap-4 md:gap-6"
        >
          <button
            onClick={openInquiry}
            className="liquid-glass-strong hover:scale-103 active:scale-98 text-white rounded-full px-8 py-3 text-sm font-semibold tracking-wide flex items-center gap-2 cursor-pointer transition-all duration-300 group"
          >
            Start Domain Inquiry
            <ArrowUpRightIcon className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </button>
          <button onClick={onScrollToValue} className="text-white/80 hover:text-white text-sm font-medium flex items-center gap-2.5 group cursor-pointer">
            <span className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-105 transition-all duration-300">
              <PlayIcon className="w-3.5 h-3.5 fill-white translate-x-[1px]" />
            </span>
            View Domain Value
          </button>
        </motion.div>

        <motion.div
          initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
          animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          transition={{ ...entranceTransition, delay: 1.3 }}
          className="flex flex-wrap justify-center gap-4 md:gap-6 mt-6 md:mt-8 w-full"
        >
          <div className="liquid-glass p-4 md:p-5 w-[180px] md:w-[220px] rounded-[1.25rem] text-left flex flex-col justify-between h-32 md:h-36 hover:translate-y-[-2px] transition-transform duration-300">
            <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
              <Clock className="w-3.5 h-3.5 md:w-4 md:h-4 text-white/90" />
            </div>
            <div>
              <h4 className="font-heading italic text-white text-2xl md:text-3xl tracking-[-1px] leading-none">Ultra Rare</h4>
              <p className="text-[10px] md:text-[11px] text-white/70 font-body font-light mt-1.5 md:mt-2 tracking-wide">Short Memorable AI Brand</p>
            </div>
          </div>

          <div className="liquid-glass p-4 md:p-5 w-[180px] md:w-[220px] rounded-[1.25rem] text-left flex flex-col justify-between h-32 md:h-36 hover:translate-y-[-2px] transition-transform duration-300">
            <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
              <Globe className="w-3.5 h-3.5 md:w-4 md:h-4 text-white/90" />
            </div>
            <div>
              <h4 className="font-heading italic text-white text-2xl md:text-3xl tracking-[-1px] leading-none">Global Appeal</h4>
              <p className="text-[10px] md:text-[11px] text-white/70 font-body font-light mt-1.5 md:mt-2 tracking-wide">Perfect For Global AI Business</p>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
        animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
        transition={{ ...entranceTransition, delay: 1.4 }}
        className="w-full flex flex-col items-center gap-3 md:gap-4 pb-6 md:pb-8 z-10 px-4"
      >
        <div className="liquid-glass rounded-full px-4 md:px-5 py-1.5 md:py-2 text-[10px] md:text-xs font-medium text-white/80 tracking-wide font-body">
          Ideal for AI Startups, Model Developers & Tech Venture Brands
        </div>
        <div className="flex flex-wrap justify-center items-center gap-x-8 md:gap-x-12 gap-y-1.5 font-heading italic text-xl md:text-2xl lg:text-3xl text-white/70 tracking-tight">
          <span>AI</span>
          <span className="text-white/20 font-sans text-xs font-light">·</span>
          <span>Tech</span>
          <span className="text-white/20 font-sans text-xs font-light">·</span>
          <span>Innovation</span>
          <span className="text-white/20 font-sans text-xs font-light">·</span>
          <span>Future</span>
          <span className="text-white/20 font-sans text-xs font-light">·</span>
          <span>Venture</span>
        </div>
      </motion.div>
    </section>
  );
}
