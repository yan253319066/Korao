'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Clock, 
  Globe, 
  History,
  ArrowRight
} from 'lucide-react';

import { ArrowUpRightIcon, PlayIcon } from './components/Icons';
import { FadingVideo } from './components/FadingVideo';
import { BlurText } from './components/BlurText';
import { ValueExplorer } from './components/ValueExplorer';
import { InquiryModal } from './components/InquiryModal';
import { OfferHistoryDrawer } from './components/OfferHistoryDrawer';

// Suppress benign Framer Motion, key, and hydration warnings in developer console
if (typeof window !== 'undefined') {
  const originalError = console.error;
  console.error = (...args) => {
    if (args[0] && typeof args[0] === 'string' && (
      args[0].includes('Framer Motion') ||
      args[0].includes('componentKey') ||
      args[0].includes('lucide') ||
      args[0].includes('Extra attributes from the server')
    )) {
      return;
    }
    originalError(...args);
  };
}

// Types for inquiry persistence
interface InquirySubmission {
  id: string;
  name: string;
  email: string;
  offerPrice: string;
  venture: string;
  message: string;
  submittedAt: string;
}

export default function Home() {
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [isOfferHistoryOpen, setIsOfferHistoryOpen] = useState(false);
  const [activeNav, setActiveNav] = useState<'home' | 'domain-info' | 'brand-value' | 'ai-vertical'>('home');
  const [activeDetail, setActiveDetail] = useState<'brand' | 'vertical' | 'premium'>('brand');
  const [previewSuffix, setPreviewSuffix] = useState('Labs');
  const [apiRoute, setApiRoute] = useState<'agents' | 'models' | 'chat'>('agents');
  
  // Submit state flow
  const [submitStep, setSubmitStep] = useState<'idle' | 'validating' | 'escrow' | 'success'>('idle');
  const [submissions, setSubmissions] = useState<InquirySubmission[]>([]);

  // Refs for smooth scroll & active tracking
  const heroRef = useRef<HTMLElement | null>(null);
  const valueRef = useRef<HTMLElement | null>(null);
  const domainInfoRef = useRef<HTMLDivElement | null>(null);
  const brandValueRef = useRef<HTMLDivElement | null>(null);
  const aiVerticalRef = useRef<HTMLDivElement | null>(null);
  const detailSectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Load existing offers from local storage
    const stored = localStorage.getItem('korao_offers');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.length > 0) {
          setTimeout(() => {
            setSubmissions(parsed);
          }, 0);
        }
      } catch (e) {
        console.error("Failed to parse offers", e);
      }
    }
  }, []);

  // Track active scroll sections
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -40% 0px', // Focused center region
      threshold: 0.05,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target.id === 'hero-section') {
            setActiveNav('home');
          } else if (entry.target.id === 'domain-info-header') {
            setActiveNav('domain-info');
          } else if (entry.target.id === 'brand-value-card') {
            setActiveNav('brand-value');
          } else if (entry.target.id === 'ai-vertical-card') {
            setActiveNav('ai-vertical');
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    if (heroRef.current) observer.observe(heroRef.current);
    if (domainInfoRef.current) observer.observe(domainInfoRef.current);
    if (brandValueRef.current) observer.observe(brandValueRef.current);
    if (aiVerticalRef.current) observer.observe(aiVerticalRef.current);

    return () => observer.disconnect();
  }, []);

  const handleScroll = (
    ref: React.RefObject<HTMLElement | HTMLDivElement | null>,
    block: ScrollIntoViewOptions['block'] = 'start'
  ) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block });
    }
  };

  const handleInquirySubmit = async (data: {
    name: string;
    email: string;
    offerPrice: string;
    venture: string;
    message: string;
  }) => {
    setSubmitStep('validating');

    try {
      const res = await fetch('/api/offers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error('Submission failed');

      const result = await res.json() as { id: string; submittedAt: string };

      setSubmitStep('escrow');

      await new Promise(resolve => setTimeout(resolve, 800));

      const newSubmission: InquirySubmission = {
        id: result.id,
        name: data.name,
        email: data.email,
        offerPrice: data.offerPrice,
        venture: data.venture,
        message: data.message,
        submittedAt: new Date(result.submittedAt).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
      };

      const updated = [newSubmission, ...submissions];
      setSubmissions(updated);
      localStorage.setItem('korao_offers', JSON.stringify(updated));

      setSubmitStep('success');
    } catch {
      setSubmitStep('idle');
      alert('Failed to submit offer. Please try again.');
    }
  };

  const deleteSubmission = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = submissions.filter(sub => sub.id !== id);
    setSubmissions(updated);
    localStorage.setItem('korao_offers', JSON.stringify(updated));
  };

  const openInquiryModal = () => {
    setSubmitStep('idle');
    setIsInquiryOpen(true);
  };

  const entranceTransition = {
    duration: 0.8,
    ease: [0.16, 1, 0.3, 1] as const,
  };

  return (
    <main className="w-full relative bg-[#000] selection:bg-white selection:text-black">
      
      {/* Navbar */}
      <nav id="app-navbar" className="fixed top-4 left-0 right-0 z-50 px-4 md:px-8 lg:px-16 flex items-center justify-between w-full max-w-7xl mx-auto">
        {/* Left Logo Circle */}
        <button 
          onClick={() => handleScroll(heroRef)}
          className="w-12 h-12 rounded-full liquid-glass flex items-center justify-center cursor-pointer group hover:scale-105 transition-transform duration-300"
          title="Korao.ai"
        >
          <span className="font-heading italic text-2xl text-white tracking-wider font-normal translate-y-[-1px]">k</span>
        </button>

        {/* Center Links (Desktop Only) */}
        <div className="hidden md:flex items-center gap-1 py-1.5 px-2 rounded-full liquid-glass">
          <button 
            onClick={() => handleScroll(heroRef)} 
            className={`px-4 py-2 text-xs lg:text-sm font-medium transition-all duration-300 font-body cursor-pointer rounded-full ${activeNav === 'home' && !isInquiryOpen ? 'bg-white/10 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] font-semibold' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
          >
            Home
          </button>
          <button 
            onClick={() => { setActiveDetail('premium'); handleScroll(valueRef, 'start'); }} 
            className={`px-4 py-2 text-xs lg:text-sm font-medium transition-all duration-300 font-body cursor-pointer rounded-full ${activeNav === 'domain-info' && !isInquiryOpen ? 'bg-white/10 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] font-semibold' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
          >
            Domain Info
          </button>
          <button 
            onClick={openInquiryModal} 
            className={`px-4 py-2 text-xs lg:text-sm font-medium transition-all duration-300 font-body cursor-pointer rounded-full ${isInquiryOpen ? 'bg-white/10 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] font-semibold' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
          >
            Inquiry
          </button>
          
          <button 
            onClick={openInquiryModal} 
            className={`ml-2 bg-white text-black text-xs font-semibold px-4 py-2 rounded-full flex items-center gap-1.5 hover:bg-white/95 hover:scale-102 transition-all duration-300 whitespace-nowrap cursor-pointer ${isInquiryOpen ? 'ring-2 ring-white/50' : ''}`}
          >
            Secure This Domain
            <ArrowUpRightIcon className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>
        </div>

        {/* Right Spacers / Inquiry History Trigger */}
        <div className="flex items-center gap-2">
          {submissions.length > 0 && (
            <button
              onClick={() => setIsOfferHistoryOpen(true)}
              className="w-12 h-12 rounded-full liquid-glass flex items-center justify-center text-white/90 hover:text-white hover:scale-105 transition-all duration-300 cursor-pointer relative"
              title="View your offer history"
            >
              <History className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-white text-black text-[9px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-black">
                {submissions.length}
              </span>
            </button>
          )}

          {/* Contact Button for Mobile only */}
          <button 
            onClick={openInquiryModal} 
            className="md:hidden rounded-full liquid-glass px-4 py-2.5 text-xs font-medium text-white/90 font-body flex items-center gap-1"
          >
            Secure Domain
            <ArrowUpRightIcon className="w-3 h-3" />
          </button>
        </div>
      </nav>

      {/* SECTION 1 - HERO */}
      <section 
        ref={heroRef}
        id="hero-section" 
        className="scroll-mt-28 relative w-full min-h-screen md:h-screen md:min-h-0 flex flex-col justify-between bg-[#000] z-10 overflow-hidden"
      >
        {/* Background Video */}
        <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
          <FadingVideo 
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_080021_d598092b-c4c2-4e53-8e46-94cf9064cd50.mp4"
            className="absolute inset-0 w-full h-full object-cover object-center scale-110"
            style={{ width: '100%', height: '100%', minWidth: '100%', minHeight: '100%', objectFit: 'cover' }}
          />
        </div>

        {/* Padding for fixed Nav */}
        <div className="w-full h-16 md:h-20" />

        {/* Hero Main Content */}
        <div className="flex-1 w-full max-w-4xl mx-auto flex flex-col items-center justify-center text-center px-4 md:px-8 py-4 md:py-6 z-10">
          
          {/* Badge */}
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

          {/* Headline (BlurText) */}
          <div className="mb-3 md:mb-4">
            <BlurText 
              as="h1"
              text="Korao.ai — Define Your AI Future" 
              className="text-4xl md:text-6xl lg:text-[5rem] font-heading italic text-white leading-[0.95] max-w-3xl justify-center tracking-[-4px]"
            />
          </div>

          {/* Subheading */}
          <motion.p 
            initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
            animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
            transition={{ ...entranceTransition, delay: 0.8 }}
            className="text-sm md:text-base lg:text-lg text-white/90 max-w-2xl font-body font-light leading-relaxed mb-6 md:mb-8 px-4"
          >
            A concise, brandable, and future-ready .ai domain. Perfect for artificial intelligence startups, AI agencies, model labs, and next-generation tech products.
          </motion.p>

          {/* CTAs */}
          <motion.div 
            initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
            animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
            transition={{ ...entranceTransition, delay: 1.1 }}
            className="flex flex-col sm:flex-row items-center gap-4 md:gap-6"
          >
            <button 
              onClick={openInquiryModal}
              className="liquid-glass-strong hover:scale-103 active:scale-98 text-white rounded-full px-8 py-3 text-sm font-semibold tracking-wide flex items-center gap-2 cursor-pointer transition-all duration-300 group"
            >
              Start Domain Inquiry
              <ArrowUpRightIcon className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </button>
            <button 
              onClick={() => handleScroll(valueRef)}
              className="text-white/80 hover:text-white text-sm font-medium flex items-center gap-2.5 group cursor-pointer"
            >
              <span className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-105 transition-all duration-300">
                <PlayIcon className="w-3.5 h-3.5 fill-white translate-x-[1px]" />
              </span>
              View Domain Value
            </button>
          </motion.div>

          {/* Stats Row */}
          <motion.div 
            initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
            animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
            transition={{ ...entranceTransition, delay: 1.3 }}
            className="flex flex-wrap justify-center gap-4 md:gap-6 mt-6 md:mt-8 w-full"
          >
            {/* Card 1 */}
            <div className="liquid-glass p-4 md:p-5 w-[180px] md:w-[220px] rounded-[1.25rem] text-left flex flex-col justify-between h-32 md:h-36 hover:translate-y-[-2px] transition-transform duration-300">
              <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                <Clock className="w-3.5 h-3.5 md:w-4 md:h-4 text-white/90" />
              </div>
              <div>
                <h4 className="font-heading italic text-white text-2xl md:text-3xl tracking-[-1px] leading-none">Ultra Rare</h4>
                <p className="text-[10px] md:text-[11px] text-white/70 font-body font-light mt-1.5 md:mt-2 tracking-wide">Short Memorable AI Brand</p>
              </div>
            </div>

            {/* Card 2 */}
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

        {/* Brand Credibility Footer */}
        <motion.div 
          initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
          animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          transition={{ ...entranceTransition, delay: 1.4 }}
          className="w-full flex flex-col items-center gap-3 md:gap-4 pb-6 md:pb-8 z-10 px-4"
        >
          {/* Tagline Badge */}
          <div className="liquid-glass rounded-full px-4 md:px-5 py-1.5 md:py-2 text-[10px] md:text-xs font-medium text-white/80 tracking-wide font-body">
            Ideal for AI Startups, Model Developers & Tech Venture Brands
          </div>

          {/* Row of Industry Tags */}
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

      {/* SECTION 2 - DOMAIN VALUE CAPABILITIES */}
      <section 
        ref={valueRef}
        id="value-section" 
        className="relative scroll-mt-[-1px] w-full min-h-screen flex flex-col justify-between bg-[#000] z-10 border-t border-white/5"
      >
        {/* Background Video */}
        <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
          <div className="sticky top-0 left-0 w-full h-screen">
            <FadingVideo 
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_094631_d30ab262-45ee-4b7d-99f3-5d5848c8ef13.mp4"
              className="absolute inset-0 w-full h-full object-cover object-center scale-110"
              style={{ width: '100%', height: '100%', minWidth: '100%', minHeight: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>

        {/* Content Wrapper */}
        <div className="relative z-10 px-6 md:px-16 lg:px-20 pt-24 pb-12 flex flex-col min-h-screen w-full max-w-7xl mx-auto">
          
          {/* Header Section */}
          <div ref={domainInfoRef} id="domain-info-header" className="scroll-mt-28 mb-auto max-w-2xl text-left">
            <span className="text-xs md:text-sm font-semibold tracking-[0.2em] uppercase text-white/80 mb-4 block font-body">
              {"// Domain Strength"}
            </span>
            <h2 className="font-heading italic text-white text-5xl md:text-7xl lg:text-[6rem] leading-[0.9] tracking-[-3px]">
              Premium <br className="hidden md:inline" />AI Domain
            </h2>
          </div>

          {/* Cards Grid */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.15,
                }
              }
            }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 md:mt-24 w-full"
          >
            {/* Card 1 */}
            <motion.div 
              ref={brandValueRef}
              id="brand-value-card"
              variants={{
                hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
                visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: entranceTransition }
              }}
              onClick={() => { setActiveDetail('brand'); handleScroll(detailSectionRef, 'start'); }}
              className={`scroll-mt-28 rounded-[1.25rem] p-6 min-h-[360px] flex flex-col justify-between hover:scale-[1.02] transition-all duration-300 cursor-pointer border ${activeDetail === 'brand' ? 'border-white bg-white/[0.08] shadow-[0_0_25px_rgba(255,255,255,0.05)]' : 'border-white/10 bg-white/5 hover:bg-white/[0.07] hover:border-white/25'}`}
            >
              {/* Card Top Row */}
              <div className="flex items-start justify-between gap-4">
                {/* Left Icon Square */}
                <div className="w-11 h-11 rounded-[0.75rem] liquid-glass flex items-center justify-center flex-shrink-0">
                  <svg className="h-6 w-6 text-white fill-current" viewBox="0 0 24 24">
                    <path d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21H5Zm1-4h12l-3.75-5-3 4L9 13l-3 4Z" />
                  </svg>
                </div>
                {/* Right Tags */}
                <div className="flex flex-wrap justify-end gap-1.5 max-w-[70%]">
                  <span className="rounded-full px-2.5 py-0.5 text-[10px] text-white/90 bg-white/5 border border-white/10 font-body whitespace-nowrap">Short Length</span>
                  <span className="rounded-full px-2.5 py-0.5 text-[10px] text-white/90 bg-white/5 border border-white/10 font-body whitespace-nowrap">Easy Pronunciation</span>
                  <span className="rounded-full px-2.5 py-0.5 text-[10px] text-white/90 bg-white/5 border border-white/10 font-body whitespace-nowrap">High Recall</span>
                  <span className="rounded-full px-2.5 py-0.5 text-[10px] text-white/90 bg-white/5 border border-white/10 font-body whitespace-nowrap">Clean Identity</span>
                </div>
              </div>

              {/* Card Bottom Row */}
              <div className="mt-6">
                <div className="flex items-center gap-1.5 mb-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${activeDetail === 'brand' ? 'bg-emerald-400' : 'bg-white/30'}`} />
                  <span className="text-[10px] uppercase tracking-wider font-mono text-white/40">Brand Value Card</span>
                </div>
                <h3 className="font-heading italic text-white text-3xl tracking-[-1px] leading-none">
                  Brandable Simplicity
                </h3>
                <p className="mt-3 text-sm text-white/80 font-body font-light leading-snug max-w-[32ch]">
                  Korao delivers a clean, modern, and unique brand name. Short, spellable, and instantly memorable — ideal for building a standalone AI brand identity.
                </p>
                <div className="mt-4 flex items-center gap-1 text-[11px] text-white/50 group-hover:text-white transition-colors">
                  <span>Explore Brand Metrics</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div 
              ref={aiVerticalRef}
              id="ai-vertical-card"
              variants={{
                hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
                visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: entranceTransition }
              }}
              onClick={() => { setActiveDetail('vertical'); handleScroll(detailSectionRef, 'start'); }}
              className={`scroll-mt-28 rounded-[1.25rem] p-6 min-h-[360px] flex flex-col justify-between hover:scale-[1.02] transition-all duration-300 cursor-pointer border ${activeDetail === 'vertical' ? 'border-white bg-white/[0.08] shadow-[0_0_25px_rgba(255,255,255,0.05)]' : 'border-white/10 bg-white/5 hover:bg-white/[0.07] hover:border-white/25'}`}
            >
              {/* Card Top Row */}
              <div className="flex items-start justify-between gap-4">
                {/* Left Icon Square */}
                <div className="w-11 h-11 rounded-[0.75rem] liquid-glass flex items-center justify-center flex-shrink-0">
                  <svg className="h-6 w-6 text-white fill-current" viewBox="0 0 24 24">
                    <path d="M4 6.47 5.76 10H20v8H4V6.47M22 4h-4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.89-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4Z" />
                  </svg>
                </div>
                {/* Right Tags */}
                <div className="flex flex-wrap justify-end gap-1.5 max-w-[70%]">
                  <span className="rounded-full px-2.5 py-0.5 text-[10px] text-white/90 bg-white/5 border border-white/10 font-body whitespace-nowrap">AI Niche</span>
                  <span className="rounded-full px-2.5 py-0.5 text-[10px] text-white/90 bg-white/5 border border-white/10 font-body whitespace-nowrap">Startup Ready</span>
                  <span className="rounded-full px-2.5 py-0.5 text-[10px] text-white/90 bg-white/5 border border-white/10 font-body whitespace-nowrap">Tech Focused</span>
                  <span className="rounded-full px-2.5 py-0.5 text-[10px] text-white/90 bg-white/5 border border-white/10 font-body whitespace-nowrap">Product Friendly</span>
                </div>
              </div>

              {/* Card Bottom Row */}
              <div className="mt-6">
                <div className="flex items-center gap-1.5 mb-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${activeDetail === 'vertical' ? 'bg-blue-400' : 'bg-white/30'}`} />
                  <span className="text-[10px] uppercase tracking-wider font-mono text-white/40">AI Niche Card</span>
                </div>
                <h3 className="font-heading italic text-white text-3xl tracking-[-1px] leading-none">
                  AI Vertical Fit
                </h3>
                <p className="mt-3 text-sm text-white/80 font-body font-light leading-snug max-w-[32ch]">
                  Natively suited for artificial intelligence businesses, large language models, AI tools, automation platforms, and intelligent SaaS products.
                </p>
                <div className="mt-4 flex items-center gap-1 text-[11px] text-white/50 group-hover:text-white transition-colors">
                  <span>Interactive API Sandbox</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </motion.div>

            {/* Card 3 */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
                visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: entranceTransition }
              }}
              onClick={() => { setActiveDetail('premium'); handleScroll(detailSectionRef, 'start'); }}
              className={`rounded-[1.25rem] p-6 min-h-[360px] flex flex-col justify-between hover:scale-[1.02] transition-all duration-300 cursor-pointer border ${activeDetail === 'premium' ? 'border-white bg-white/[0.08] shadow-[0_0_25px_rgba(255,255,255,0.05)]' : 'border-white/10 bg-white/5 hover:bg-white/[0.07] hover:border-white/25'}`}
            >
              {/* Card Top Row */}
              <div className="flex items-start justify-between gap-4">
                {/* Left Icon Square */}
                <div className="w-11 h-11 rounded-[0.75rem] liquid-glass flex items-center justify-center flex-shrink-0">
                  <svg className="h-6 w-6 text-white fill-current" viewBox="0 0 24 24">
                    <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1Zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7Z" />
                  </svg>
                </div>
                {/* Right Tags */}
                <div className="flex flex-wrap justify-end gap-1.5 max-w-[70%]">
                  <span className="rounded-full px-2.5 py-0.5 text-[10px] text-white/90 bg-white/5 border border-white/10 font-body whitespace-nowrap">High Value</span>
                  <span className="rounded-full px-2.5 py-0.5 text-[10px] text-white/90 bg-white/5 border border-white/10 font-body whitespace-nowrap">Scarcity</span>
                  <span className="rounded-full px-2.5 py-0.5 text-[10px] text-white/90 bg-white/5 border border-white/10 font-body whitespace-nowrap">Future Proof</span>
                  <span className="rounded-full px-2.5 py-0.5 text-[10px] text-white/90 bg-white/5 border border-white/10 font-body whitespace-nowrap">Industry TLD</span>
                </div>
              </div>

              {/* Card Bottom Row */}
              <div className="mt-6">
                <div className="flex items-center gap-1.5 mb-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${activeDetail === 'premium' ? 'bg-purple-400' : 'bg-white/30'}`} />
                  <span className="text-[10px] uppercase tracking-wider font-mono text-white/40">Market Premium Card</span>
                </div>
                <h3 className="font-heading italic text-white text-3xl tracking-[-1px] leading-none">
                  Premium .ai Investment
                </h3>
                <p className="mt-3 text-sm text-white/80 font-body font-light leading-snug max-w-[32ch]">
                  .ai is the official top-level domain for the global AI industry. Limited premium short names remain, making Korao.ai a rare long-term digital asset.
                </p>
                <div className="mt-4 flex items-center gap-1 text-[11px] text-white/50 group-hover:text-white transition-colors">
                  <span>Verify Market Valuations</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Minimalist interactive guide at bottom of Section 2 */}
          <div className="mt-auto pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40 border-t border-white/5 font-body">
            <span>💡 Click any card above to explore its core features & interact with live API tests below</span>
            <div 
              onClick={() => handleScroll(detailSectionRef, 'start')}
              className="flex items-center gap-1.5 animate-pulse cursor-pointer hover:text-white/80 transition-colors duration-200"
            >
              <span>Scroll down for Explorer</span>
              <span className="font-sans">↓</span>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 3 - INTERACTIVE EXPLORER */}
      <section 
        ref={detailSectionRef}
        id="detail-section" 
        className="relative scroll-mt-[-1px] w-full min-h-screen flex flex-col justify-between bg-[#000] z-10 border-t border-white/5"
      >
        {/* Background Video */}
        <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
          <div className="sticky top-0 left-0 w-full h-screen">
            <FadingVideo 
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_094631_d30ab262-45ee-4b7d-99f3-5d5848c8ef13.mp4"
              className="absolute inset-0 w-full h-full object-cover object-center scale-110"
              style={{ width: '100%', height: '100%', minWidth: '100%', minHeight: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>

        {/* Content Wrapper */}
        <div className="relative z-10 px-6 md:px-16 lg:px-20 pt-24 pb-12 flex flex-col min-h-screen w-full max-w-7xl mx-auto justify-between">
          
          {/* Centered ValueExplorer Card */}
          <div className="flex-grow flex flex-col justify-center my-auto w-full">
            <ValueExplorer 
              activeDetail={activeDetail}
              setActiveDetail={setActiveDetail}
              previewSuffix={previewSuffix}
              setPreviewSuffix={setPreviewSuffix}
              apiRoute={apiRoute}
              setApiRoute={setApiRoute}
              detailSectionRef={detailSectionRef}
            />
          </div>

          {/* Minimalist section footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 mt-12 pt-8 text-xs text-white/50 font-body">
            <span>© {new Date().getFullYear()} Korao.ai Premium Domain Registry. All rights reserved.</span>
            <div className="flex items-center gap-6">
              <span className="text-white/30 font-serif text-xs italic">Escrow secured by Escrow.com or Dan.com</span>
              <button 
                onClick={openInquiryModal}
                className="text-white/70 hover:text-white transition-colors duration-200 flex items-center gap-1 font-semibold cursor-pointer"
              >
                Acquire Domain Now
                <ArrowUpRightIcon className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* MODAL - DOMAIN INQUIRY */}
      <AnimatePresence>
        {isInquiryOpen && (
          <InquiryModal 
            isOpen={isInquiryOpen}
            onClose={() => setIsInquiryOpen(false)}
            onSubmit={handleInquirySubmit}
            submitStep={submitStep}
            onViewHistory={() => {
              setIsInquiryOpen(false);
              setIsOfferHistoryOpen(true);
            }}
          />
        )}
      </AnimatePresence>

      {/* OFFERS HISTORY SIDE DRAWER */}
      <AnimatePresence>
        {isOfferHistoryOpen && (
          <OfferHistoryDrawer 
            isOpen={isOfferHistoryOpen}
            onClose={() => setIsOfferHistoryOpen(false)}
            submissions={submissions}
            onDeleteSubmission={deleteSubmission}
          />
        )}
      </AnimatePresence>

    </main>
  );
}
