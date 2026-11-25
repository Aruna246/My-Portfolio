import React from 'react';
import { useCMS } from '../context/CMSContext';
import {
  GraduationCap,
  BookOpen,
  Wrench,
  Target,
  Code2,
  Sparkles,
  Cpu,
  Briefcase,
  Flame
} from 'lucide-react';

const renderIcon = (name: string) => {
  const iconProps = { className: 'w-6 h-6 text-indigo-400' };
  switch (name) {
    case 'graduation-cap':
      return <GraduationCap {...iconProps} />;
    case 'book-open':
      return <BookOpen {...iconProps} />;
    case 'wrench':
      return <Wrench {...iconProps} />;
    case 'target':
      return <Target {...iconProps} />;
    case 'code':
      return <Code2 {...iconProps} />;
    case 'cpu':
      return <Cpu {...iconProps} />;
    case 'briefcase':
      return <Briefcase {...iconProps} />;
    default:
      return <Sparkles {...iconProps} />;
  }
};

export const AboutSection: React.FC = () => {
  const { data } = useCMS();
  const { about } = data;

  return (
    <section id="about" className="py-20 sm:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Label */}
        <div className="mb-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-50 border border-amber-200/80 text-xs font-bold tracking-widest text-amber-800 uppercase shadow-2xs backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>ABOUT ME</span>
          </div>
        </div>

        {/* Section Heading & Intro */}
        <div className="max-w-4xl space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight">
            {about.sectionTitle || 'Professional Summary'}
          </h2>
          <p className="text-base sm:text-lg text-stone-600 leading-relaxed font-normal">
            {about.introduction}
          </p>
        </div>

        {/* 4 Highlight Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {about.highlights.map((item) => (
            <div
              key={item.id}
              className="group p-7 sm:p-8 rounded-3xl bg-white/85 backdrop-blur-md border border-[#E7E2D6] shadow-sm hover:shadow-xl hover:border-amber-400/60 transition-all duration-300 flex items-start gap-5 hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200/60 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-amber-600 group-hover:text-white transition-all duration-300">
                <div className="text-amber-700 group-hover:text-white transition-colors">
                  {renderIcon(item.iconName)}
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg sm:text-xl font-bold text-stone-900 group-hover:text-amber-700 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Strengths Row */}
        {about.strengths && about.strengths.length > 0 && (
          <div className="p-6 sm:p-7 rounded-3xl bg-white/85 backdrop-blur-md border border-[#E7E2D6] shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-xs font-extrabold tracking-wider text-amber-800 uppercase">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>CORE STRENGTHS</span>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {about.strengths.map((str, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 text-xs sm:text-sm font-semibold text-stone-700 bg-[#FBF9F5] hover:text-amber-900 hover:border-amber-300 hover:bg-amber-50/70 rounded-xl border border-[#E7E2D6] shadow-2xs transition-all"
                >
                  {str}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
