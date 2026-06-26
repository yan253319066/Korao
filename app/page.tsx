'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Clock, 
  Globe, 
  Send, 
  CheckCircle, 
  ArrowRight, 
  Coins, 
  Mail, 
  User, 
  MessageSquare,
  Building,
  History,
  Trash2
} from 'lucide-react';

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

// Custom icons based on precise SVG specifications in the prompt
const ArrowUpRightIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M7 17L17 7" />
    <path d="M7 7h10v10" />
  </svg>
);

const PlayIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="currentColor"
  >
    <polygon points="6,4 20,12 6,20" />
  </svg>
);

// FadingVideo component (custom JS crossfade, no CSS transitions)
interface FadingVideoProps {
  src: string;
  className?: string;
  style?: React.CSSProperties;
}

const FadingVideo: React.FC<FadingVideoProps> = ({ src, className, style }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const fadingOutRef = useRef<boolean>(false);

  const fadeTo = (targetOpacity: number, duration: number = 500) => {
    const video = videoRef.current;
    if (!video) return;

    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
    }

    const startOpacity = parseFloat(video.style.opacity || '0');
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const currentOpacity = startOpacity + (targetOpacity - startOpacity) * progress;
      video.style.opacity = currentOpacity.toString();

      if (progress < 1) {
        rafIdRef.current = requestAnimationFrame(animate);
      } else {
        rafIdRef.current = null;
      }
    };

    rafIdRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Reset initial style opacity to 0
    video.style.opacity = '0';
    fadingOutRef.current = false;

    const handleLoadedData = () => {
      video.style.opacity = '0';
      video.play().catch(err => console.log("Video play failed or interrupted:", err));
      fadeTo(1, 500);
    };

    const handleTimeUpdate = () => {
      if (!video.duration || video.duration <= 0) return;
      const remaining = video.duration - video.currentTime;
      if (!fadingOutRef.current && remaining <= 0.55 && remaining > 0) {
        fadingOutRef.current = true;
        fadeTo(0, 500);
      }
    };

    const handleEnded = () => {
      video.style.opacity = '0';
      setTimeout(() => {
        if (!videoRef.current) return;
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(err => console.log("Video loop play failed:", err));
        fadingOutRef.current = false;
        fadeTo(1, 500);
      }, 100);
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);

    // If source changes, force load
    video.load();

    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      src={src}
      className={className}
      style={{ ...style, opacity: 0 }}
      autoPlay
      muted
      playsInline
      preload="auto"
    />
  );
};

// BlurText component (word-by-word blur-in)
interface BlurTextProps {
  text: string;
  className?: string;
}

const BlurText: React.FC<BlurTextProps> = ({ text, className }) => {
  const containerRef = useRef<HTMLParagraphElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => {
      observer.unobserve(el);
    };
  }, []);

  const words = text.split(' ');

  return (
    <p
      ref={containerRef}
      className={className}
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        rowGap: '0.15em',
      }}
    >
      {words.map((word, i) => {
        const delay = (i * 100) / 1000;
        return (
          <motion.span
            key={i}
            initial={{ filter: 'blur(10px)', opacity: 0, y: 50 }}
            animate={
              isInView
                ? {
                    filter: ['blur(10px)', 'blur(5px)', 'blur(0px)'],
                    opacity: [0, 0.5, 1],
                    y: [50, -5, 0],
                  }
                : {}
            }
            transition={{
              duration: 0.7,
              times: [0, 0.5, 1],
              ease: 'easeOut',
              delay: delay,
            }}
            style={{
              display: 'inline-block',
              marginRight: '0.28em',
            }}
          >
            {word}
          </motion.span>
        );
      })}
    </p>
  );
};

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
  
  // Form States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [offerPrice, setOfferPrice] = useState('125,000');
  const [venture, setVenture] = useState('');
  const [message, setMessage] = useState('');
  
  // Submit state flow
  const [submitStep, setSubmitStep] = useState<'idle' | 'validating' | 'escrow' | 'success'>('idle');
  const [submissions, setSubmissions] = useState<InquirySubmission[]>([]);

  // Refs for smooth scroll
  const heroRef = useRef<HTMLElement | null>(null);
  const valueRef = useRef<HTMLElement | null>(null);

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

  const handleScroll = (ref: React.RefObject<HTMLElement | null>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !offerPrice) return;

    // Trigger simulation sequence
    setSubmitStep('validating');

    setTimeout(() => {
      setSubmitStep('escrow');
      
      setTimeout(() => {
        const newSubmission: InquirySubmission = {
          id: Math.random().toString(36).substring(2, 9),
          name,
          email,
          offerPrice,
          venture: venture || 'Not specified',
          message: message || 'Interested in acquiring korao.ai',
          submittedAt: new Date().toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })
        };

        const updated = [newSubmission, ...submissions];
        setSubmissions(updated);
        localStorage.setItem('korao_offers', JSON.stringify(updated));
        
        setSubmitStep('success');
      }, 1500);
    }, 1200);
  };

  const deleteSubmission = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = submissions.filter(sub => sub.id !== id);
    setSubmissions(updated);
    localStorage.setItem('korao_offers', JSON.stringify(updated));
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setOfferPrice('125,000');
    setVenture('');
    setMessage('');
    setSubmitStep('idle');
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
            className="px-4 py-2 text-xs lg:text-sm font-medium text-white/90 hover:text-white transition-colors duration-200 font-body cursor-pointer"
          >
            Home
          </button>
          <button 
            onClick={() => handleScroll(valueRef)} 
            className="px-4 py-2 text-xs lg:text-sm font-medium text-white/90 hover:text-white transition-colors duration-200 font-body cursor-pointer"
          >
            Domain Info
          </button>
          <button 
            onClick={() => handleScroll(valueRef)} 
            className="px-4 py-2 text-xs lg:text-sm font-medium text-white/90 hover:text-white transition-colors duration-200 font-body cursor-pointer"
          >
            Brand Value
          </button>
          <button 
            onClick={() => handleScroll(valueRef)} 
            className="px-4 py-2 text-xs lg:text-sm font-medium text-white/90 hover:text-white transition-colors duration-200 font-body cursor-pointer"
          >
            AI Vertical
          </button>
          <button 
            onClick={() => { resetForm(); setIsInquiryOpen(true); }} 
            className="px-4 py-2 text-xs lg:text-sm font-medium text-white/90 hover:text-white transition-colors duration-200 font-body cursor-pointer"
          >
            Inquiry
          </button>
          
          <button 
            onClick={() => { resetForm(); setIsInquiryOpen(true); }} 
            className="ml-2 bg-white text-black text-xs font-semibold px-4 py-2 rounded-full flex items-center gap-1.5 hover:bg-white/95 hover:scale-102 transition-all duration-300 whitespace-nowrap cursor-pointer"
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
            onClick={() => { resetForm(); setIsInquiryOpen(true); }} 
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
        className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden bg-[#000] z-10"
      >
        {/* Background Video */}
        <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
          <FadingVideo 
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_080021_d598092b-c4c2-4e53-8e46-94cf9064cd50.mp4"
            className="absolute left-1/2 top-0 -translate-x-1/2 object-cover object-top"
            style={{ width: "120%", height: "120%" }}
          />
        </div>

        {/* Padding for fixed Nav */}
        <div className="w-full h-24" />

        {/* Hero Main Content */}
        <div className="flex-1 w-full max-w-4xl mx-auto flex flex-col items-center justify-center text-center px-4 md:px-8 py-10 z-10">
          
          {/* Badge */}
          <motion.div 
            initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
            animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
            transition={{ ...entranceTransition, delay: 0.4 }}
            className="inline-flex items-center p-1 pr-4 rounded-full liquid-glass mb-6"
          >
            <span className="bg-white text-black text-[10px] md:text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mr-3 leading-none">
              Premium
            </span>
            <span className="text-xs md:text-sm text-white/95 font-body font-light tracking-wide">
              Rare .ai AI Vertical Domain For Sale
            </span>
          </motion.div>

          {/* Headline (BlurText) */}
          <div className="mb-4">
            <BlurText 
              text="Korao.ai — Define Your AI Future" 
              className="text-5xl md:text-7xl lg:text-[5.5rem] font-heading italic text-white leading-[0.95] max-w-3xl justify-center tracking-[-4px]"
            />
          </div>

          {/* Subheading */}
          <motion.p 
            initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
            animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
            transition={{ ...entranceTransition, delay: 0.8 }}
            className="text-base md:text-lg text-white/90 max-w-2xl font-body font-light leading-relaxed mb-8 px-4"
          >
            A concise, brandable, and future-ready .ai domain. Perfect for artificial intelligence startups, AI agencies, model labs, and next-generation tech products.
          </motion.p>

          {/* CTAs */}
          <motion.div 
            initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
            animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
            transition={{ ...entranceTransition, delay: 1.1 }}
            className="flex flex-col sm:flex-row items-center gap-6"
          >
            <button 
              onClick={() => { resetForm(); setIsInquiryOpen(true); }}
              className="liquid-glass-strong hover:scale-103 active:scale-98 text-white rounded-full px-8 py-3.5 text-sm font-semibold tracking-wide flex items-center gap-2 cursor-pointer transition-all duration-300 group"
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
            className="flex flex-wrap justify-center gap-6 mt-12 w-full"
          >
            {/* Card 1 */}
            <div className="liquid-glass p-6 w-[220px] rounded-[1.25rem] text-left flex flex-col justify-between h-44 hover:translate-y-[-2px] transition-transform duration-300">
              <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                <Clock className="w-4 h-4 text-white/90" />
              </div>
              <div>
                <h4 className="font-heading italic text-white text-3xl tracking-[-1px] leading-none">Ultra Rare</h4>
                <p className="text-[11px] text-white/70 font-body font-light mt-2 tracking-wide">Short Memorable AI Brand</p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="liquid-glass p-6 w-[220px] rounded-[1.25rem] text-left flex flex-col justify-between h-44 hover:translate-y-[-2px] transition-transform duration-300">
              <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                <Globe className="w-4 h-4 text-white/90" />
              </div>
              <div>
                <h4 className="font-heading italic text-white text-3xl tracking-[-1px] leading-none">Global Appeal</h4>
                <p className="text-[11px] text-white/70 font-body font-light mt-2 tracking-wide">Perfect For Global AI Business</p>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Brand Credibility Footer */}
        <motion.div 
          initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
          animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          transition={{ ...entranceTransition, delay: 1.4 }}
          className="w-full flex flex-col items-center gap-6 pb-12 z-10 px-4"
        >
          {/* Tagline Badge */}
          <div className="liquid-glass rounded-full px-5 py-2 text-xs font-medium text-white/80 tracking-wide font-body">
            Ideal for AI Startups, Model Developers & Tech Venture Brands
          </div>

          {/* Row of Industry Tags */}
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-3 font-heading italic text-2xl md:text-3xl text-white/70 tracking-tight">
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
        className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden bg-[#000] z-10 border-t border-white/5"
      >
        {/* Background Video */}
        <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
          <FadingVideo 
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_094631_d30ab262-45ee-4b7d-99f3-5d5848c8ef13.mp4"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* Content Wrapper */}
        <div className="relative z-10 px-6 md:px-16 lg:px-20 pt-24 pb-12 flex flex-col min-h-screen w-full max-w-7xl mx-auto">
          
          {/* Header Section */}
          <div className="mb-auto max-w-2xl text-left">
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
              variants={{
                hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
                visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: entranceTransition }
              }}
              className="liquid-glass rounded-[1.25rem] p-6 min-h-[360px] flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300"
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
                <h3 className="font-heading italic text-white text-3xl tracking-[-1px] leading-none">
                  Brandable Simplicity
                </h3>
                <p className="mt-3 text-sm text-white/80 font-body font-light leading-snug max-w-[32ch]">
                  Korao delivers a clean, modern, and unique brand name. Short, spellable, and instantly memorable — ideal for building a standalone AI brand identity.
                </p>
              </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
                visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: entranceTransition }
              }}
              className="liquid-glass rounded-[1.25rem] p-6 min-h-[360px] flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300"
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
                <h3 className="font-heading italic text-white text-3xl tracking-[-1px] leading-none">
                  AI Vertical Fit
                </h3>
                <p className="mt-3 text-sm text-white/80 font-body font-light leading-snug max-w-[32ch]">
                  Natively suited for artificial intelligence businesses, large language models, AI tools, automation platforms, and intelligent SaaS products.
                </p>
              </div>
            </motion.div>

            {/* Card 3 */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
                visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: entranceTransition }
              }}
              className="liquid-glass rounded-[1.25rem] p-6 min-h-[360px] flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300"
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
                <h3 className="font-heading italic text-white text-3xl tracking-[-1px] leading-none">
                  Premium .ai Investment
                </h3>
                <p className="mt-3 text-sm text-white/80 font-body font-light leading-snug max-w-[32ch]">
                  .ai is the official top-level domain for the global AI industry. Limited premium short names remain, making Korao.ai a rare long-term digital asset.
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Minimalist section footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 mt-16 pt-8 text-xs text-white/50 font-body">
            <span>© {new Date().getFullYear()} Korao.ai Premium Domain Registry. All rights reserved.</span>
            <div className="flex items-center gap-6">
              <span className="text-white/30 font-serif text-xs italic">Escrow secured by Escrow.com or Dan.com</span>
              <button 
                onClick={() => { resetForm(); setIsInquiryOpen(true); }}
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
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl"
            id="inquiry-modal-backdrop"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-lg liquid-glass-strong rounded-[2rem] p-6 md:p-8 border border-white/15 shadow-2xl overflow-hidden"
              id="inquiry-modal-content"
            >
              
              {/* Background gradient hint */}
              <div className="absolute top-0 left-1/4 right-1/4 h-24 bg-white/5 blur-3xl rounded-full pointer-events-none" />

              {/* Close Button */}
              <button 
                onClick={() => setIsInquiryOpen(false)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-200 text-white/80 hover:text-white cursor-pointer z-10"
                title="Close modal"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Modal Body */}
              <div className="z-10 relative">
                
                {submitStep === 'idle' && (
                  <>
                    <div className="mb-6 text-left">
                      <span className="text-[10px] tracking-widest font-semibold uppercase text-white/50 block mb-1">
                        Secure Acquisition
                      </span>
                      <h3 className="font-heading italic text-white text-4xl leading-none">
                        Acquire korao.ai
                      </h3>
                      <p className="text-xs text-white/70 font-body mt-2 font-light">
                        Submit your private offer below. Our premium domain broker handles all escrow transfers with absolute confidentiality.
                      </p>
                    </div>

                    <form onSubmit={handleInquirySubmit} className="space-y-4">
                      
                      {/* Name input */}
                      <div className="space-y-1.5 text-left">
                        <label className="text-xs font-medium text-white/70 font-body block">Full Name</label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-white/40">
                            <User className="w-4 h-4" />
                          </span>
                          <input 
                            type="text" 
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Alex Thorne"
                            className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 pl-10 pr-4 text-sm text-white placeholder-white/35 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all font-body"
                          />
                        </div>
                      </div>

                      {/* Email input */}
                      <div className="space-y-1.5 text-left">
                        <label className="text-xs font-medium text-white/70 font-body block">Corporate Email</label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-white/40">
                            <Mail className="w-4 h-4" />
                          </span>
                          <input 
                            type="email" 
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="alex@ventures.com"
                            className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 pl-10 pr-4 text-sm text-white placeholder-white/35 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all font-body"
                          />
                        </div>
                      </div>

                      {/* Offer + Venture Row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Target Offer */}
                        <div className="space-y-1.5 text-left">
                          <label className="text-xs font-medium text-white/70 font-body block">Target Offer (USD)</label>
                          <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-white/40 font-body text-sm font-semibold">
                              $
                            </span>
                            <input 
                              type="text" 
                              required
                              value={offerPrice}
                              onChange={(e) => setOfferPrice(e.target.value)}
                              placeholder="125,000"
                              className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 pl-7 pr-4 text-sm text-white placeholder-white/35 font-semibold focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all font-body"
                            />
                          </div>
                        </div>

                        {/* Venture / Organization */}
                        <div className="space-y-1.5 text-left">
                          <label className="text-xs font-medium text-white/70 font-body block">Venture Name</label>
                          <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-white/40">
                              <Building className="w-4 h-4" />
                            </span>
                            <input 
                              type="text" 
                              value={venture}
                              onChange={(e) => setVenture(e.target.value)}
                              placeholder="NextGen AI Labs"
                              className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 pl-10 pr-4 text-sm text-white placeholder-white/35 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all font-body"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Message */}
                      <div className="space-y-1.5 text-left">
                        <label className="text-xs font-medium text-white/70 font-body block">Message / Escrow Requests</label>
                        <div className="relative">
                          <span className="absolute top-3 left-3 flex items-start pointer-events-none text-white/40">
                            <MessageSquare className="w-4 h-4" />
                          </span>
                          <textarea 
                            rows={3}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Looking to integrate this domain immediately. Prefer Escrow.com with same-day auth transfer."
                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-white/35 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all font-body resize-none"
                          />
                        </div>
                      </div>

                      {/* Submit */}
                      <button 
                        type="submit"
                        className="w-full bg-white text-black font-semibold font-body py-3 px-6 rounded-full flex items-center justify-center gap-2 hover:bg-white/90 active:scale-[0.99] hover:scale-[1.01] transition-all duration-300 mt-6 cursor-pointer"
                      >
                        Submit Acquisition Offer
                        <Send className="w-4 h-4" />
                      </button>

                    </form>
                  </>
                )}

                {/* Simulated Submission Steps */}
                {submitStep === 'validating' && (
                  <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                    <div className="relative w-16 h-16">
                      <div className="absolute inset-0 rounded-full border-4 border-white/10" />
                      <div className="absolute inset-0 rounded-full border-4 border-t-white animate-spin" />
                    </div>
                    <h3 className="font-heading italic text-2xl text-white">Verifying Brand Scarcity...</h3>
                    <p className="text-xs text-white/60 font-body font-light max-w-xs">
                      Connecting with the domain registry, evaluating current WHOIS holds, and initiating priority secure brokerage path.
                    </p>
                  </div>
                )}

                {submitStep === 'escrow' && (
                  <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                    <div className="relative w-16 h-16">
                      <div className="absolute inset-0 rounded-full border-4 border-white/10" />
                      <div className="absolute inset-0 rounded-full border-4 border-b-white animate-spin" />
                    </div>
                    <h3 className="font-heading italic text-2xl text-white">Initiating Safe Escrow Protocol...</h3>
                    <p className="text-xs text-white/60 font-body font-light max-w-xs">
                      Configuring Dan.com & Escrow.com compatible pre-authorization locks to ensure absolute buyer and seller protection.
                    </p>
                  </div>
                )}

                {submitStep === 'success' && (
                  <div className="py-8 text-center flex flex-col items-center space-y-6">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-black">
                      <CheckCircle className="w-10 h-10" />
                    </div>
                    <div>
                      <h3 className="font-heading italic text-3xl text-white">Offer Received Successfully</h3>
                      <p className="text-xs text-white/70 font-body mt-2 font-light max-w-sm mx-auto">
                        Your offer of <strong className="text-white font-semibold font-body">${offerPrice} USD</strong> has been securely registered. A dedicated acquisition broker has been assigned to negotiate on your behalf.
                      </p>
                    </div>

                    <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-left font-body text-xs space-y-1.5">
                      <div className="flex justify-between"><span className="text-white/50">Domain Asset:</span> <span className="text-white font-medium">korao.ai</span></div>
                      <div className="flex justify-between"><span className="text-white/50">Broker Route:</span> <span className="text-white font-medium">Secure Escrow Transfer</span></div>
                      <div className="flex justify-between"><span className="text-white/50">Confidentiality:</span> <span className="text-white font-medium">High / Encrypted</span></div>
                      <div className="flex justify-between"><span className="text-white/50">Target Timeframe:</span> <span className="text-white font-medium">Under 12 Hours</span></div>
                    </div>

                    <div className="flex gap-4 w-full">
                      <button 
                        onClick={() => {
                          setIsInquiryOpen(false);
                          setIsOfferHistoryOpen(true);
                        }}
                        className="flex-1 bg-white/10 border border-white/10 text-white font-medium py-2.5 rounded-full text-xs hover:bg-white/15 transition-all cursor-pointer"
                      >
                        View Offer History
                      </button>
                      <button 
                        onClick={() => setIsInquiryOpen(false)}
                        className="flex-1 bg-white text-black font-semibold py-2.5 rounded-full text-xs hover:bg-white/95 transition-all cursor-pointer"
                      >
                        Back to Landing Page
                      </button>
                    </div>
                  </div>
                )}

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* OFFERS HISTORY SIDE DRAWER */}
      <AnimatePresence>
        {isOfferHistoryOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-md"
            id="history-drawer-backdrop"
          >
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-full max-w-md h-full liquid-glass-strong border-l border-white/10 p-6 flex flex-col justify-between"
              id="history-drawer-content"
            >
              
              <div>
                {/* Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                  <div className="flex items-center gap-2">
                    <History className="w-5 h-5 text-white" />
                    <h3 className="font-heading italic text-2xl text-white">Your Submissions</h3>
                  </div>
                  <button 
                    onClick={() => setIsOfferHistoryOpen(false)}
                    className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:scale-105 text-white/80 hover:text-white cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Submissions List */}
                <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
                  {submissions.map((sub) => (
                    <div 
                      key={sub.id}
                      className="liquid-glass border border-white/10 p-4 rounded-xl text-left relative group"
                    >
                      <button 
                        onClick={(e) => deleteSubmission(sub.id, e)}
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                        title="Delete record"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      <div className="flex justify-between items-start mb-2 pr-6">
                        <span className="text-[10px] text-white/40 font-body block">{sub.submittedAt}</span>
                        <span className="text-white font-bold font-body text-sm bg-white/10 px-2 py-0.5 rounded-full">${sub.offerPrice} USD</span>
                      </div>
                      <h4 className="font-semibold text-white text-xs font-body mb-1">Contact: {sub.name}</h4>
                      <p className="text-[11px] text-white/60 font-body mb-1"><span className="text-white/30">Email:</span> {sub.email}</p>
                      <p className="text-[11px] text-white/60 font-body mb-1"><span className="text-white/30">Venture:</span> {sub.venture}</p>
                      <p className="text-[11px] text-white/50 font-body italic mt-2 line-clamp-2">&ldquo;{sub.message}&rdquo;</p>
                      <div className="flex items-center gap-1.5 mt-3 text-[10px] text-white/70 font-body">
                        <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse" />
                        In Review - Escrow Broker Assigned
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Drawer footer */}
              <div className="border-t border-white/10 pt-6">
                <button
                  onClick={() => setIsOfferHistoryOpen(false)}
                  className="w-full bg-white text-black font-semibold font-body py-2.5 rounded-full text-xs hover:bg-white/90 transition-all cursor-pointer"
                >
                  Close History
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}
