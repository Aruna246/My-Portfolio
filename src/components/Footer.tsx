import React from 'react';
import { useCMS } from '../context/CMSContext';
import { ArrowUp, Code2 } from 'lucide-react';

export const Footer: React.FC = () => {
  const { data } = useCMS();
  const { profile } = data;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#FAF7F2] border-t border-[#E7E2D6] py-10 sm:py-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6 pb-8 border-b border-[#E7E2D6]">
          <div className="space-y-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-extrabold text-stone-900 text-lg">
                {profile.name}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
              <span className="text-xs font-bold text-amber-700">
                {profile.title}
              </span>
            </div>
            <p className="text-xs text-stone-500">
              Building modern, accessible, and high-performance digital systems.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-stone-700 hover:text-amber-800 bg-white hover:bg-amber-50/50 border border-[#E7E2D6] hover:border-amber-300 transition-all cursor-pointer shadow-2xs"
              title="Scroll to top"
            >
              <span>Back to top</span>
              <ArrowUp className="w-4 h-4 text-amber-700" />
            </button>
          </div>
        </div>

        <div className="pt-8 flex items-center justify-center text-center text-xs text-stone-500">
          <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
