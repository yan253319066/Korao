'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

interface InquirySubmission {
  id: string;
  name: string;
  email: string;
  offerPrice: string;
  venture: string;
  message: string;
  submittedAt: string;
}

interface PageContextValue {
  isInquiryOpen: boolean;
  openInquiry: () => void;
  closeInquiry: () => void;
  isOfferHistoryOpen: boolean;
  openOfferHistory: () => void;
  closeOfferHistory: () => void;
  submissions: InquirySubmission[];
  setSubmissions: React.Dispatch<React.SetStateAction<InquirySubmission[]>>;
}

const PageContext = createContext<PageContextValue | null>(null);

export function PageProvider({ children }: { children: React.ReactNode }) {
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [isOfferHistoryOpen, setIsOfferHistoryOpen] = useState(false);
  const [submissions, setSubmissions] = useState<InquirySubmission[]>([]);

  const openInquiry = useCallback(() => setIsInquiryOpen(true), []);
  const closeInquiry = useCallback(() => setIsInquiryOpen(false), []);
  const openOfferHistory = useCallback(() => setIsOfferHistoryOpen(true), []);
  const closeOfferHistory = useCallback(() => setIsOfferHistoryOpen(false), []);

  return (
    <PageContext.Provider value={{ isInquiryOpen, openInquiry, closeInquiry, isOfferHistoryOpen, openOfferHistory, closeOfferHistory, submissions, setSubmissions }}>
      {children}
    </PageContext.Provider>
  );
}

export function usePageContext() {
  const ctx = useContext(PageContext);
  if (!ctx) throw new Error('usePageContext must be used within PageProvider');
  return ctx;
}
