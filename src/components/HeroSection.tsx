import React from 'react';
import { useCMS } from '../context/CMSContext';
import { Download, ArrowRight, Code2, GraduationCap, MapPin, Mail } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { data, setIsResumeModalOpen } = useCMS();
  const { profile } = data;

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative pt-28 sm:pt-40 pb-16 sm:pb-28 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center space-y-6 sm:space-y-8">
          {/* Status Badge */}
          {profile.statusBadge && (
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#E7E2D6] text-xs sm:text-sm font-medium text-stone-700 shadow-xs hover:border-amber-400 transition-colors">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
              </span>
              <span className="font-bold text-stone-800">{profile.statusBadge}</span>
            </div>
          )}

          {/* Title & Name */}
          <div className="space-y-4 max-w-4xl">
            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-black text-stone-900 tracking-tight leading-tight">
              {profile.headlinePrefix || "Hi, I'm"}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-700 via-orange-600 to-amber-600 uppercase">
                {profile.name}
              </span>
            </h1>

            {/* Sub-badge role & degree */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-amber-50 border border-amber-200/80 rounded-xl text-amber-800 text-sm sm:text-base font-bold shadow-xs">
                <Code2 className="w-4 h-4 text-amber-600" />
                <span>Software Developer</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white/90 border border-[#E7E2D6] rounded-xl text-stone-700 text-sm sm:text-base font-semibold shadow-xs">
                <GraduationCap className="w-4 h-4 text-amber-600" />
                <span>B.E. ECE (2023 – 2027)</span>
              </span>
              {profile.socials.location && (
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white/90 border border-[#E7E2D6] rounded-xl text-stone-700 text-sm sm:text-base font-semibold shadow-xs">
                  <MapPin className="w-4 h-4 text-amber-600" />
                  <span>{profile.socials.location}</span>
                </span>
              )}
            </div>
          </div>

          {/* Bio Paragraph */}
          <p className="text-base sm:text-lg lg:text-xl text-stone-600 leading-relaxed max-w-3xl font-normal">
            {profile.bio}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-4 pt-4 w-full">
            <button
              id="hero-view-projects-button"
              onClick={() => scrollToSection('projects')}
              className="inline-flex items-center justify-center gap-2.5 w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold text-sm sm:text-base shadow-lg shadow-amber-600/20 active:scale-98 transition-all cursor-pointer"
            >
              <span>View Projects</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              id="hero-download-resume-button"
              onClick={() => setIsResumeModalOpen(true)}
              className="inline-flex items-center justify-center gap-2.5 w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white hover:bg-[#FAF7F2] text-stone-800 font-bold text-sm sm:text-base border border-[#E7E2D6] active:scale-98 transition-all cursor-pointer shadow-xs hover:border-amber-300"
            >
              <Download className="w-4 h-4 text-amber-600" />
              <span>Download Resume</span>
            </button>

            <button
              id="hero-contact-button"
              onClick={() => scrollToSection('contact')}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white/80 hover:bg-[#FAF7F2] text-stone-700 font-bold text-sm sm:text-base border border-[#E7E2D6] hover:border-amber-400 active:scale-98 transition-all cursor-pointer shadow-xs"
            >
              <Mail className="w-4 h-4 text-amber-600" />
              <span>Contact Me</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
