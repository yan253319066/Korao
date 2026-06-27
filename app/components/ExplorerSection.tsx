'use client';

import React from 'react';
import { FadingVideo } from './FadingVideo';
import { ValueExplorer } from './ValueExplorer';
import { ArrowUpRightIcon } from './Icons';
import { usePageContext } from './PageContext';

interface ExplorerSectionProps {
  activeDetail: 'brand' | 'vertical' | 'premium';
  setActiveDetail: (d: 'brand' | 'vertical' | 'premium') => void;
  previewSuffix: string;
  setPreviewSuffix: (s: string) => void;
  apiRoute: 'agents' | 'models' | 'chat';
  setApiRoute: (r: 'agents' | 'models' | 'chat') => void;
  detailSectionRef: React.RefObject<HTMLDivElement | null>;
}

export default function ExplorerSection({
  activeDetail, setActiveDetail,
  previewSuffix, setPreviewSuffix,
  apiRoute, setApiRoute,
  detailSectionRef,
}: ExplorerSectionProps) {
  const { openInquiry } = usePageContext();

  return (
    <section ref={detailSectionRef} id="detail-section" className="relative scroll-mt-[-1px] w-full min-h-screen flex flex-col justify-between bg-[#000] z-10 border-t border-white/5">
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="sticky top-0 left-0 w-full h-screen">
          <FadingVideo
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_094631_d30ab262-45ee-4b7d-99f3-5d5848c8ef13.mp4"
            className="absolute inset-0 w-full h-full object-cover object-center scale-110"
            style={{ width: '100%', height: '100%', minWidth: '100%', minHeight: '100%', objectFit: 'cover' }}
          />
        </div>
      </div>

      <div className="relative z-10 px-6 md:px-16 lg:px-20 pt-24 pb-12 flex flex-col min-h-screen w-full max-w-7xl mx-auto justify-between">
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

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 mt-12 pt-8 text-xs text-white/50 font-body">
          <div className="flex items-center gap-4">
            <a href="/about" className="text-white/40 hover:text-white/80 transition-colors">About</a>
            <span className="text-white/20">·</span>
            <a href="/faq" className="text-white/40 hover:text-white/80 transition-colors">FAQ</a>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-white/30 font-serif text-xs italic">Escrow secured by Escrow.com or Dan.com</span>
            <button
              onClick={openInquiry}
              className="text-white/70 hover:text-white transition-colors duration-200 flex items-center gap-1 font-semibold cursor-pointer"
            >
              Acquire Domain Now
              <ArrowUpRightIcon className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
