'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Coins } from 'lucide-react';

interface ValueExplorerProps {
  activeDetail: 'brand' | 'vertical' | 'premium';
  setActiveDetail: (val: 'brand' | 'vertical' | 'premium') => void;
  previewSuffix: string;
  setPreviewSuffix: (val: string) => void;
  apiRoute: 'agents' | 'models' | 'chat';
  setApiRoute: (val: 'agents' | 'models' | 'chat') => void;
  detailSectionRef: React.RefObject<HTMLDivElement | null>;
}

const entranceTransition = {
  duration: 0.8,
  ease: [0.16, 1, 0.3, 1] as const,
};

export const ValueExplorer: React.FC<ValueExplorerProps> = ({
  activeDetail,
  setActiveDetail,
  previewSuffix,
  setPreviewSuffix,
  apiRoute,
  setApiRoute,
  detailSectionRef,
}) => {
  return (
    <motion.div 
      ref={detailSectionRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={entranceTransition}
      className="scroll-mt-28 w-full rounded-[1.5rem] bg-gradient-to-b from-white/[0.06] to-white/[0.02] backdrop-blur-md border border-white/10 p-6 md:p-10 flex flex-col gap-8 relative overflow-hidden"
    >
      {/* Subtle glow effect behind */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-white/[0.02] rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 w-full flex flex-col gap-8">

      {/* Header / Tabs switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/5">
        <div>
          <span className="text-[10px] md:text-xs font-semibold tracking-[0.2em] uppercase text-white/50 font-body block mb-1">
            {"// Interactive Domain analysis"}
          </span>
          <h3 className="font-heading italic text-white text-3xl tracking-[-1px]">
            Value & Utility Explorer
          </h3>
        </div>
        
        {/* Tabs */}
        <div className="flex p-1 rounded-full bg-white/5 border border-white/10 self-start md:self-auto">
          <button
            onClick={() => setActiveDetail('brand')}
            className={`px-4 py-2 rounded-full text-xs font-body font-medium transition-all cursor-pointer ${activeDetail === 'brand' ? 'bg-white text-black font-semibold shadow-md' : 'text-white/60 hover:text-white'}`}
          >
            Brand Value
          </button>
          <button
            onClick={() => setActiveDetail('vertical')}
            className={`px-4 py-2 rounded-full text-xs font-body font-medium transition-all cursor-pointer ${activeDetail === 'vertical' ? 'bg-white text-black font-semibold shadow-md' : 'text-white/60 hover:text-white'}`}
          >
            AI Vertical
          </button>
          <button
            onClick={() => setActiveDetail('premium')}
            className={`px-4 py-2 rounded-full text-xs font-body font-medium transition-all cursor-pointer ${activeDetail === 'premium' ? 'bg-white text-black font-semibold shadow-md' : 'text-white/60 hover:text-white'}`}
          >
            Premium Assets
          </button>
        </div>
      </div>

      {/* Tab Contents */}
      <AnimatePresence mode="wait">
        {activeDetail === 'brand' && (
          <motion.div 
            key="brand-detail"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            {/* Left Column: Typographic branding playground */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div className="p-6 md:p-8 rounded-[1rem] bg-black/40 border border-white/5 flex flex-col items-center justify-center min-h-[220px] relative">
                <span className="absolute top-3 left-4 text-[9px] text-white/30 font-mono">Live Branding Playground</span>
                
                {/* Dynamic Typography renders */}
                <div className="flex flex-col items-center gap-6 text-center w-full">
                  <div className="w-full">
                    <p className="text-[10px] text-white/40 font-mono mb-2">Modern Tech Brand</p>
                    <span className="text-3xl md:text-4xl font-sans font-extrabold tracking-tight text-white uppercase block">
                      KORAO<span className="text-white/40 font-light">.{previewSuffix.toLowerCase()}</span>
                    </span>
                  </div>

                  <div className="w-full border-t border-white/5 pt-4">
                    <p className="text-[10px] text-white/40 font-mono mb-2">Clean Developer Niche</p>
                    <span className="text-2xl md:text-3xl font-mono tracking-wider text-white">
                      korao<span className="text-white/50">-{previewSuffix.toLowerCase()}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Suffix selector */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs text-white/50 font-body mr-1">Combine prefix with suffix:</span>
                {['Labs', 'Intelligent', 'Agents', 'Systems', 'Search'].map((suffix) => (
                  <button
                    key={suffix}
                    onClick={() => setPreviewSuffix(suffix)}
                    className={`px-3 py-1.5 rounded-full text-xs font-body border transition-all cursor-pointer ${previewSuffix === suffix ? 'bg-white/15 text-white border-white/35 font-medium' : 'bg-white/5 text-white/60 border-white/5 hover:text-white hover:border-white/20'}`}
                  >
                    +{suffix}
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column: Key evaluation indices */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <h4 className="text-white font-heading italic text-xl">Linguistic & Brand Strength</h4>
              <p className="text-sm text-white/70 font-body leading-relaxed font-light">
                Five-letter brandable domain names ending in `.ai` represent the absolute pinnacle of technology branding. Korao offers frictionless pronunciation across multiple languages.
              </p>
              
              {/* Scorecard grids */}
              <div className="grid grid-cols-2 gap-3 mt-2 font-body">
                <div className="p-3.5 rounded-[0.75rem] bg-white/5 border border-white/5">
                  <div className="text-xs text-white/40">Syllable Count</div>
                  <div className="text-xl font-bold text-white mt-1">2 Syllables</div>
                  <div className="text-[10px] text-white/50 mt-0.5">Ultra-short pacing</div>
                </div>
                <div className="p-3.5 rounded-[0.75rem] bg-white/5 border border-white/5">
                  <div className="text-xs text-white/40">Linguistic Harmony</div>
                  <div className="text-xl font-bold text-white mt-1">Vowel Accord</div>
                  <div className="text-[10px] text-white/50 mt-0.5">Dual-o-vowel symmetry</div>
                </div>
                <div className="p-3.5 rounded-[0.75rem] bg-white/5 border border-white/5">
                  <div className="text-xs text-white/40">Memorability Rate</div>
                  <div className="text-xl font-bold text-white mt-1">99.2% Score</div>
                  <div className="text-[10px] text-white/50 mt-0.5">Near-zero spelling error</div>
                </div>
                <div className="p-3.5 rounded-[0.75rem] bg-white/5 border border-white/5">
                  <div className="text-xs text-white/40">Search Index</div>
                  <div className="text-xl font-bold text-white mt-1">A+ Strength</div>
                  <div className="text-[10px] text-white/50 mt-0.5">No trademark collisions</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeDetail === 'vertical' && (
          <motion.div 
            key="vertical-detail"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            {/* Left Column: Interactive code terminal sandbox */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="rounded-[1rem] bg-black/60 border border-white/10 overflow-hidden font-mono shadow-2xl">
                {/* Terminal bar */}
                <div className="bg-white/5 px-4 py-3 border-b border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500/60" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
                    <span className="w-3 h-3 rounded-full bg-green-500/60" />
                  </div>
                  <span className="text-xs text-white/40">api.korao.ai</span>
                  <div className="w-12" />
                </div>
                
                {/* Interactive Route selectors */}
                <div className="flex border-b border-white/5 bg-white/[0.02]">
                  <button
                    onClick={() => setApiRoute('agents')}
                    className={`px-4 py-2.5 text-xs transition-all border-r border-white/5 cursor-pointer ${apiRoute === 'agents' ? 'bg-white/5 text-white font-medium border-b-2 border-b-white' : 'text-white/40 hover:text-white/70'}`}
                  >
                    POST /v1/agents
                  </button>
                  <button
                    onClick={() => setApiRoute('models')}
                    className={`px-4 py-2.5 text-xs transition-all border-r border-white/5 cursor-pointer ${apiRoute === 'models' ? 'bg-white/5 text-white font-medium border-b-2 border-b-white' : 'text-white/40 hover:text-white/70'}`}
                  >
                    GET /v1/models
                  </button>
                  <button
                    onClick={() => setApiRoute('chat')}
                    className={`px-4 py-2.5 text-xs transition-all cursor-pointer ${apiRoute === 'chat' ? 'bg-white/5 text-white font-medium border-b-2 border-b-white' : 'text-white/40 hover:text-white/70'}`}
                  >
                    POST /v1/completions
                  </button>
                </div>

                {/* Code Output panel */}
                <div className="p-5 text-xs md:text-sm text-white/80 leading-relaxed overflow-x-auto min-h-[180px]">
                  {apiRoute === 'agents' && (
                    <pre className="text-emerald-400">
{`{
  "object": "agent.deployment",
  "id": "agent_korao_9aa595",
  "created_at": 1782415200,
  "endpoint": "https://api.korao.ai/v1/agents",
  "status": "active",
  "spec": {
    "model": "korao-reasoning-pro",
    "memory_retrieval": true,
    "max_tokens_per_turn": 8192
  }
}`}
                    </pre>
                  )}
                  {apiRoute === 'models' && (
                    <pre className="text-blue-400">
{`{
  "object": "list",
  "data": [
    {
      "id": "korao-vision-v2",
      "owner": "korao-labs",
      "context_window": 1048576,
      "capabilities": ["multimodal", "fine-tuning"]
    },
    {
      "id": "korao-reasoning-pro",
      "owner": "korao-labs",
      "context_window": 2097152,
      "capabilities": ["logic", "code-gen"]
    }
  ]
}`}
                    </pre>
                  )}
                  {apiRoute === 'chat' && (
                    <pre className="text-purple-400">
{`{
  "id": "chat_cmpl_971e",
  "object": "chat.completion",
  "model": "korao-reasoning-pro",
  "choices": [{
    "index": 0,
    "message": {
      "role": "assistant",
      "content": "Deploying intelligent systems under Korao.ai brand..."
    },
    "finish_reason": "stop"
  }]
}`}
                    </pre>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: AI Vertical Niche Details */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <h4 className="text-white font-heading italic text-xl">Developer & API Trust</h4>
              <p className="text-sm text-white/70 font-body leading-relaxed font-light">
                Startups and enterprise teams identify best with short, developer-friendly brand prefixes. Establish instantaneous credibility inside the developer ecosystem with an elegant endpoint prefix.
              </p>
              
              <ul className="space-y-2 mt-2 text-xs font-body text-white/80">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-white rounded-full flex-shrink-0" />
                  <span>Perfect for developer tooling, LLMs, and neural network registries.</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-white rounded-full flex-shrink-0" />
                  <span>Outstanding branding for subdomains (e.g. `api.korao.ai`, `console.korao.ai`).</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-white rounded-full flex-shrink-0" />
                  <span>Highly suited for autonomous agent networks and intelligent automation frameworks.</span>
                </li>
              </ul>
            </div>
          </motion.div>
        )}

        {activeDetail === 'premium' && (
          <motion.div 
            key="premium-detail"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            {/* Left Column: Domain Valuation stats / Comparable sales list */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="p-6 md:p-8 rounded-[1rem] bg-black/40 border border-white/5 flex flex-col gap-4">
                <div className="flex items-center justify-between text-xs font-mono text-white/40 pb-2 border-b border-white/5">
                  <span>Comparable .ai Domain Sales</span>
                  <span>Valuation</span>
                </div>
                
                <div className="flex flex-col gap-3 font-body">
                  {[
                    { name: 'ko.ai', price: '$120,000', status: 'Verifiable Sale' },
                    { name: 'ora.ai', price: '$95,000', status: 'Premium Brand' },
                    { name: 'kor.ai', price: '$65,000', status: '3-Letter Asset' },
                    { name: 'korao.ai', price: 'Negotiable', status: 'Present Offering', current: true },
                  ].map((comparable) => (
                    <div 
                      key={comparable.name} 
                      className={`flex items-center justify-between py-2 px-3 rounded-lg text-sm transition-all ${comparable.current ? 'bg-white/10 text-white font-semibold border border-white/20' : 'text-white/70 hover:text-white bg-white/[0.02]'}`}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${comparable.current ? 'bg-yellow-400 animate-pulse' : 'bg-white/40'}`} />
                        <span className="font-mono">{comparable.name}</span>
                        <span className="text-[10px] text-white/40 ml-1">({comparable.status})</span>
                      </div>
                      <span className="font-mono font-medium">{comparable.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Investment metrics & protection */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <h4 className="text-white font-heading italic text-xl">Investment Protection & Trust</h4>
              <p className="text-sm text-white/70 font-body leading-relaxed font-light">
                Secure a timeless internet asset. High-value .ai domain assets have shown rapid and resilient market growth, serving as highly liquid collateral for funded deep-tech startups.
              </p>
              
              <div className="flex items-center gap-3 p-4 rounded-[0.75rem] bg-white/5 border border-white/5 mt-2">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 text-white">
                  <Coins className="w-5 h-5" />
                </div>
                <div className="font-body text-xs text-white/80 leading-snug">
                  <span className="font-semibold block text-white mb-0.5">Escrow Transaction Protection</span>
                  Every transaction is processed through premier licensed escrow networks like Escrow.com or Dan.com to secure instant domain release.
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </motion.div>
  );
};
