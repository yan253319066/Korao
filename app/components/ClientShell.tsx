'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AnimatePresence } from 'motion/react';
import { suppressConsoleErrors } from '@/lib/suppress-console-errors';
import { PageProvider, usePageContext } from './PageContext';
import Navbar from './Navbar';
import HeroSection from './HeroSection';
import DomainValueSection from './DomainValueSection';
import ExplorerSection from './ExplorerSection';
import { InquiryModal } from './InquiryModal';
import { OfferHistoryDrawer } from './OfferHistoryDrawer';

suppressConsoleErrors();

interface InquirySubmission {
  id: string;
  name: string;
  email: string;
  offerPrice: string;
  venture: string;
  message: string;
  submittedAt: string;
}

function ShellInner() {
  const [activeNav, setActiveNav] = useState<'home' | 'domain-info' | 'brand-value' | 'ai-vertical'>('home');
  const [activeDetail, setActiveDetail] = useState<'brand' | 'vertical' | 'premium'>('brand');
  const [previewSuffix, setPreviewSuffix] = useState('Labs');
  const [apiRoute, setApiRoute] = useState<'agents' | 'models' | 'chat'>('agents');
  const [submitStep, setSubmitStep] = useState<'idle' | 'validating' | 'escrow' | 'success'>('idle');

  const { isInquiryOpen, closeInquiry, openOfferHistory, isOfferHistoryOpen, closeOfferHistory, submissions, setSubmissions } = usePageContext();

  const heroRef = useRef<HTMLElement | null>(null);
  const valueRef = useRef<HTMLElement | null>(null);
  const domainInfoRef = useRef<HTMLDivElement | null>(null);
  const brandValueRef = useRef<HTMLDivElement | null>(null);
  const aiVerticalRef = useRef<HTMLDivElement | null>(null);
  const detailSectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('korao_offers');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.length > 0) {
          setTimeout(() => setSubmissions(parsed), 0);
        }
      } catch {
        // ignore
      }
    }
  }, [setSubmissions]);

  useEffect(() => {
    const observerOptions = { root: null, rootMargin: '-30% 0px -40% 0px', threshold: 0.05 };
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        if (entry.target.id === 'hero-section') setActiveNav('home');
        else if (entry.target.id === 'domain-info-header') setActiveNav('domain-info');
        else if (entry.target.id === 'brand-value-card') setActiveNav('brand-value');
        else if (entry.target.id === 'ai-vertical-card') setActiveNav('ai-vertical');
      });
    };
    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    const refs = [heroRef, domainInfoRef, brandValueRef, aiVerticalRef];
    refs.forEach((ref) => { if (ref.current) observer.observe(ref.current); });
    return () => observer.disconnect();
  }, []);

  const handleScroll = useCallback((ref: React.RefObject<HTMLElement | HTMLDivElement | null>, block: ScrollIntoViewOptions['block'] = 'start') => {
    if (ref.current) ref.current.scrollIntoView({ behavior: 'smooth', block });
  }, []);

  const handleNavClick = useCallback((section: 'home' | 'domain-info' | 'brand-value' | 'ai-vertical') => {
    if (section === 'home') handleScroll(heroRef);
    else if (section === 'domain-info') { setActiveDetail('premium'); handleScroll(valueRef, 'start'); }
    else if (section === 'brand-value') { setActiveDetail('brand'); handleScroll(detailSectionRef, 'start'); }
    else if (section === 'ai-vertical') { setActiveDetail('vertical'); handleScroll(detailSectionRef, 'start'); }
  }, [handleScroll]);

  const handleCardClick = useCallback((detail: 'brand' | 'vertical' | 'premium') => {
    setActiveDetail(detail);
    handleScroll(detailSectionRef, 'start');
  }, [handleScroll]);

  const handleInquirySubmit = async (data: { name: string; email: string; offerPrice: string; venture: string; message: string }) => {
    setSubmitStep('validating');
    try {
      const res = await fetch('/api/offers', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Submission failed');
      const result = await res.json() as { id: string; submittedAt: string };
      setSubmitStep('escrow');
      await new Promise(resolve => setTimeout(resolve, 800));
      const newSubmission: InquirySubmission = {
        id: result.id, name: data.name, email: data.email, offerPrice: data.offerPrice,
        venture: data.venture, message: data.message,
        submittedAt: new Date(result.submittedAt).toLocaleDateString('en-US', {
          month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit',
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

  return (
    <main className="w-full relative bg-[#000] selection:bg-white selection:text-black">
      <Navbar activeNav={activeNav} onNavClick={handleNavClick} />

      <HeroSection heroRef={heroRef} onScrollToValue={() => handleScroll(valueRef)} />

      <DomainValueSection
        activeDetail={activeDetail}
        onCardClick={handleCardClick}
        domainInfoRef={domainInfoRef}
        brandValueRef={brandValueRef}
        aiVerticalRef={aiVerticalRef}
        valueRef={valueRef}
        detailSectionRef={detailSectionRef}
      />

      <ExplorerSection
        activeDetail={activeDetail}
        setActiveDetail={setActiveDetail}
        previewSuffix={previewSuffix}
        setPreviewSuffix={setPreviewSuffix}
        apiRoute={apiRoute}
        setApiRoute={setApiRoute}
        detailSectionRef={detailSectionRef}
      />

      <AnimatePresence>
        {isInquiryOpen && (
          <InquiryModal
            isOpen={isInquiryOpen}
            onClose={() => { closeInquiry(); setSubmitStep('idle'); }}
            onSubmit={handleInquirySubmit}
            submitStep={submitStep}
            onViewHistory={() => { closeInquiry(); openOfferHistory(); }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOfferHistoryOpen && (
          <OfferHistoryDrawer
            isOpen={isOfferHistoryOpen}
            onClose={closeOfferHistory}
            submissions={submissions}
            onDeleteSubmission={(id: string, e: React.MouseEvent) => {
              e.stopPropagation();
              setSubmissions(submissions.filter(s => s.id !== id));
              localStorage.setItem('korao_offers', JSON.stringify(submissions.filter(s => s.id !== id)));
            }}
          />
        )}
      </AnimatePresence>
    </main>
  );
}

export default function ClientShell() {
  return (
    <PageProvider>
      <ShellInner />
    </PageProvider>
  );
}
