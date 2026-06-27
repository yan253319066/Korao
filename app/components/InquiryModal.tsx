'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, User, Mail, Building, MessageSquare, Send, CheckCircle } from 'lucide-react';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; email: string; offerPrice: string; venture: string; message: string }) => void;
  submitStep: 'idle' | 'validating' | 'escrow' | 'success';
  onViewHistory: () => void;
  initialOfferPrice?: string;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  submitStep,
  onViewHistory,
  initialOfferPrice = '125,000',
}) => {
  // Local Form States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [offerPrice, setOfferPrice] = useState(initialOfferPrice);
  const [venture, setVenture] = useState('');
  const [message, setMessage] = useState('');
  const [emailError, setEmailError] = useState('');
  const [priceError, setPriceError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError('');
    setPriceError('');

    let hasError = false;

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address.');
      hasError = true;
    }

    // Validate offer price
    const cleanPriceStr = offerPrice.replace(/[$,\s]/g, '');
    const priceNum = parseFloat(cleanPriceStr);
    if (isNaN(priceNum) || priceNum <= 0) {
      setPriceError('Please enter a valid positive offer price.');
      hasError = true;
    }

    if (hasError || !name || !email || !offerPrice) return;

    onSubmit({
      name,
      email,
      offerPrice,
      venture: venture || 'Not specified',
      message: message || 'Interested in acquiring korao.ai',
    });
  };

  if (!isOpen) return null;

  return (
    <div 
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
          onClick={onClose}
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

              <form onSubmit={handleSubmit} className="space-y-4">
                
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
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (emailError) setEmailError('');
                      }}
                      placeholder="alex@ventures.com"
                      className={`w-full bg-white/5 border ${emailError ? 'border-red-500/50' : 'border-white/10'} rounded-full py-2.5 pl-10 pr-4 text-sm text-white placeholder-white/35 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all font-body`}
                    />
                  </div>
                  {emailError && (
                    <p className="text-red-400 text-xs mt-1 font-body pl-2">{emailError}</p>
                  )}
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
                        onChange={(e) => {
                          setOfferPrice(e.target.value);
                          if (priceError) setPriceError('');
                        }}
                        placeholder="125,000"
                        className={`w-full bg-white/5 border ${priceError ? 'border-red-500/50' : 'border-white/10'} rounded-full py-2.5 pl-7 pr-4 text-sm text-white placeholder-white/35 font-semibold focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all font-body`}
                      />
                    </div>
                    {priceError && (
                      <p className="text-red-400 text-xs mt-1 font-body pl-2">{priceError}</p>
                    )}
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
                  onClick={onViewHistory}
                  className="flex-1 bg-white/10 border border-white/10 text-white font-medium py-2.5 rounded-full text-xs hover:bg-white/15 transition-all cursor-pointer"
                >
                  View Offer History
                </button>
                <button 
                  onClick={onClose}
                  className="flex-1 bg-white text-black font-semibold py-2.5 rounded-full text-xs hover:bg-white/95 transition-all cursor-pointer"
                >
                  Back to Landing Page
                </button>
              </div>
            </div>
          )}

        </div>
      </motion.div>
    </div>
  );
};
