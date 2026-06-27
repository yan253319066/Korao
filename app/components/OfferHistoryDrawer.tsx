'use client';

import React from 'react';
import { motion } from 'motion/react';
import { X, History, Trash2 } from 'lucide-react';

interface InquirySubmission {
  id: string;
  name: string;
  email: string;
  offerPrice: string;
  venture: string;
  message: string;
  submittedAt: string;
}

interface OfferHistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  submissions: InquirySubmission[];
  onDeleteSubmission: (id: string, e: React.MouseEvent) => void;
}

export const OfferHistoryDrawer: React.FC<OfferHistoryDrawerProps> = ({
  isOpen,
  onClose,
  submissions,
  onDeleteSubmission,
}) => {
  if (!isOpen) return null;

  return (
    <div 
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
              onClick={onClose}
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
                  onClick={(e) => onDeleteSubmission(sub.id, e)}
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
            onClick={onClose}
            className="w-full bg-white text-black font-semibold font-body py-2.5 rounded-full text-xs hover:bg-white/90 transition-all cursor-pointer"
          >
            Close History
          </button>
        </div>

      </motion.div>
    </div>
  );
};
