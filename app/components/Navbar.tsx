'use client';

import React from 'react';
import { History } from 'lucide-react';
import { ArrowUpRightIcon } from './Icons';
import { usePageContext } from './PageContext';

interface NavbarProps {
  activeNav: 'home' | 'domain-info' | 'brand-value' | 'ai-vertical';
  onNavClick: (section: 'home' | 'domain-info' | 'brand-value' | 'ai-vertical') => void;
}

export default function Navbar({ activeNav, onNavClick }: NavbarProps) {
  const { isInquiryOpen, openInquiry, openOfferHistory, submissions } = usePageContext();

  return (
    <nav id="app-navbar" className="fixed top-4 left-0 right-0 z-50 px-4 md:px-8 lg:px-16 flex items-center justify-between w-full max-w-7xl mx-auto">
      <button
        onClick={() => onNavClick('home')}
        className="w-12 h-12 rounded-full liquid-glass flex items-center justify-center cursor-pointer group hover:scale-105 transition-transform duration-300"
        title="Korao.ai"
      >
        <span className="font-heading italic text-2xl text-white tracking-wider font-normal translate-y-[-1px]">k</span>
      </button>

      <div className="hidden md:flex items-center gap-1 py-1.5 px-2 rounded-full liquid-glass">
        <button
          onClick={() => onNavClick('home')}
          className={`px-4 py-2 text-xs lg:text-sm font-medium transition-all duration-300 font-body cursor-pointer rounded-full ${activeNav === 'home' && !isInquiryOpen ? 'bg-white/10 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] font-semibold' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
        >
          Home
        </button>
        <button
          onClick={() => onNavClick('domain-info')}
          className={`px-4 py-2 text-xs lg:text-sm font-medium transition-all duration-300 font-body cursor-pointer rounded-full ${activeNav === 'domain-info' && !isInquiryOpen ? 'bg-white/10 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] font-semibold' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
        >
          Domain Info
        </button>
        <button
          onClick={openInquiry}
          className={`px-4 py-2 text-xs lg:text-sm font-medium transition-all duration-300 font-body cursor-pointer rounded-full ${isInquiryOpen ? 'bg-white/10 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] font-semibold' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
        >
          Inquiry
        </button>

        <button
          onClick={openInquiry}
          className={`ml-2 bg-white text-black text-xs font-semibold px-4 py-2 rounded-full flex items-center gap-1.5 hover:bg-white/95 hover:scale-102 transition-all duration-300 whitespace-nowrap cursor-pointer ${isInquiryOpen ? 'ring-2 ring-white/50' : ''}`}
        >
          Secure This Domain
          <ArrowUpRightIcon className="w-3.5 h-3.5 stroke-[2.5]" />
        </button>
      </div>

      <div className="flex items-center gap-2">
        {submissions.length > 0 && (
          <button
            onClick={openOfferHistory}
            className="w-12 h-12 rounded-full liquid-glass flex items-center justify-center text-white/90 hover:text-white hover:scale-105 transition-all duration-300 cursor-pointer relative"
            title="View your offer history"
          >
            <History className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 bg-white text-black text-[9px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-black">
              {submissions.length}
            </span>
          </button>
        )}

        <button
          onClick={openInquiry}
          className="md:hidden rounded-full liquid-glass px-4 py-2.5 text-xs font-medium text-white/90 font-body flex items-center gap-1"
        >
          Secure Domain
          <ArrowUpRightIcon className="w-3 h-3" />
        </button>
      </div>
    </nav>
  );
}
