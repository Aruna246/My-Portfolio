import React from 'react';
import { useCMS } from '../context/CMSContext';
import { Download, Briefcase } from 'lucide-react';

export const CtaSection: React.FC = () => {
  const { data, setIsResumeModalOpen } = useCMS();
  const { cta } = data;

  return (
    <section className="py-16 sm:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-tr from-stone-900 via-stone-900 to-amber-950/90 border border-amber-900/40 p-8 sm:p-14 lg:p-16 text-center space-y-8 shadow-2xl">
          {/* Ambient Glowing Blobs */}
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-orange-500/15 rounded-full blur-3xl pointer-events-none" />

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-950/80 border border-amber-500/40 text-xs font-bold tracking-widest text-amber-300 uppercase shadow-xs backdrop-blur-md mx-auto">
            <Briefcase className="w-3.5 h-3.5 text-amber-400" />
            <span>OPEN FOR OPPORTUNITIES</span>
          </div>

          {/* Heading */}
          <div className="max-w-3xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              {cta.title || 'Ready to collaborate or build something impactful?'}
            </h2>
            <p className="text-base sm:text-lg text-stone-300 leading-relaxed max-w-2xl mx-auto font-normal">
              {cta.subtitle ||
                'Looking for a passionate Software Developer ready to write clean code, solve technical challenges, and build reliable web systems.'}
            </p>
          </div>

          {/* Action Button: Download Resume */}
          <div className="flex items-center justify-center pt-2">
            <button
              onClick={() => setIsResumeModalOpen(true)}
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-stone-950 font-extrabold text-sm sm:text-base shadow-xl shadow-amber-500/30 active:scale-98 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4 text-stone-950" />
              <span>Download Resume</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
