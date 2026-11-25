import React, { useState } from 'react';
import {
  Compass,
  Code2,
  Rocket,
  Briefcase,
  Trophy,
  Layers,
  Sparkles,
  Calendar,
  Terminal,
  Globe,
  TrendingUp
} from 'lucide-react';

interface JourneyMilestone {
  id: string;
  year: string;
  period: string;
  title: string;
  category: 'Frontend' | 'Internship' | 'Hackathon' | 'Full Stack' | 'MERN';
  icon: typeof Code2;
  gradient: string;
  glow: string;
  techStack: string[];
}

export const JourneySection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('ALL');

  const milestones: JourneyMilestone[] = [
    {
      id: 'm-frontend',
      year: '2024',
      period: 'Jan – Feb 2024',
      title: 'Frontend Development & Industry Internship',
      category: 'Frontend',
      icon: Globe,
      gradient: 'from-cyan-500 to-blue-600',
      glow: 'shadow-cyan-500/20 border-cyan-500/40',
      techStack: ['HTML5', 'CSS3', 'JavaScript', 'Responsive UI', 'Git']
    },
    {
      id: 'm-hackathon-1',
      year: '2024',
      period: 'Spring 2024',
      title: 'Code Whizz Hackathon – 2nd Runner-Up',
      category: 'Hackathon',
      icon: Trophy,
      gradient: 'from-amber-500 to-orange-600',
      glow: 'shadow-amber-500/20 border-amber-500/40',
      techStack: ['Data Structures', 'Algorithms', 'Rapid Prototyping', 'Java']
    },
    {
      id: 'm-wordpress',
      year: '2025',
      period: 'June – July 2025',
      title: 'E-Commerce & WordPress Engineering (Skeneticdigital)',
      category: 'Internship',
      icon: Briefcase,
      gradient: 'from-violet-500 to-purple-600',
      glow: 'shadow-violet-500/20 border-violet-500/40',
      techStack: ['WordPress', 'WooCommerce', 'Elementor', 'SEO', 'Web Performance']
    },
    {
      id: 'm-mern-transition',
      year: '2025',
      period: 'Late 2025',
      title: 'Full Stack & Modern MERN Stack Transition',
      category: 'Full Stack',
      icon: Layers,
      gradient: 'from-emerald-500 to-teal-600',
      glow: 'shadow-emerald-500/20 border-emerald-500/40',
      techStack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS']
    },
    {
      id: 'm-hackathon-2',
      year: '2026',
      period: 'Spring 2026',
      title: 'Code Whizz 2026 Hackathon – 1st Runner-Up',
      category: 'Hackathon',
      icon: Trophy,
      gradient: 'from-amber-400 to-yellow-500',
      glow: 'shadow-amber-500/20 border-amber-500/40',
      techStack: ['React.js', 'Node.js', 'REST APIs', 'Full Stack System']
    },
    {
      id: 'm-codingrim',
      year: '2026',
      period: 'June – July 2026',
      title: 'MERN Stack Developer Internship (Codingrim Technology)',
      category: 'MERN',
      icon: Rocket,
      gradient: 'from-indigo-500 to-cyan-500',
      glow: 'shadow-indigo-500/20 border-indigo-500/40',
      techStack: ['MERN Stack', 'React.js', 'Express.js', 'MongoDB', 'REST APIs']
    },
    {
      id: 'm-present',
      year: 'Present',
      period: '2026 – Present',
      title: 'Building Scalable Full-Stack Web Applications',
      category: 'Full Stack',
      icon: TrendingUp,
      gradient: 'from-amber-500 via-orange-500 to-amber-600',
      glow: 'shadow-amber-500/25 border-amber-400/50',
      techStack: ['TypeScript', 'Full-Stack Engineering', 'System Design', 'Production Software']
    }
  ];

  const categories = ['ALL', 'Frontend', 'Full Stack', 'MERN', 'Internship', 'Hackathon'];

  const filteredMilestones =
    activeFilter === 'ALL'
      ? milestones
      : milestones.filter((m) => m.category.toLowerCase() === activeFilter.toLowerCase());

  return (
    <section id="journey" className="py-20 sm:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Label */}
        <div className="mb-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-50 border border-amber-200/80 text-xs font-bold tracking-widest text-amber-800 uppercase shadow-2xs backdrop-blur-md">
            <Compass className="w-3.5 h-3.5 text-amber-600" />
            <span>DEVELOPER JOURNEY</span>
          </div>
        </div>

        {/* Section Heading & Filter */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl space-y-3">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight">
              Journey from Frontend to{' '}
              <span className="text-amber-700">
                Software Developer
              </span>
            </h2>
            <p className="text-base sm:text-lg text-stone-600 leading-relaxed font-normal">
              Chronological milestones from modern frontend foundations to production full-stack systems.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeFilter === cat
                    ? 'bg-amber-600 text-white shadow-md shadow-amber-600/25'
                    : 'bg-white text-stone-600 hover:text-stone-900 hover:bg-[#FAF7F2] border border-[#E7E2D6]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Streamlined Minimalist Timeline */}
        <div className="relative">
          {/* Vertical Spine Line */}
          <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-0.5 -translate-x-1/2 bg-amber-300/40 pointer-events-none" />

          <div className="space-y-6 md:space-y-8">
            {filteredMilestones.map((item, idx) => {
              const isEven = idx % 2 === 0;
              const IconComp = item.icon;

              return (
                <div
                  key={item.id}
                  className={`relative flex flex-col md:flex-row items-center gap-6 ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Compact Milestone Card */}
                  <div className="w-full md:w-[calc(50%-2rem)]">
                    <div
                      className={`group relative bg-white/85 backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-[#E7E2D6] hover:border-amber-400 shadow-sm hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5 overflow-hidden`}
                    >
                      {/* Top Accent Line */}
                      <div
                        className="absolute top-0 left-0 right-0 h-1 bg-amber-500 group-hover:bg-amber-400 transition-colors"
                      />

                      {/* Header */}
                      <div className="flex items-center justify-between gap-3 mb-2.5">
                        <div className="flex items-center gap-2">
                          <span
                            className="px-2.5 py-0.5 rounded-md text-xs font-bold text-white bg-amber-600"
                          >
                            {item.year}
                          </span>
                          <span className="text-xs font-semibold text-stone-500">
                            {item.period}
                          </span>
                        </div>

                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60">
                          {item.category}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-base sm:text-lg font-bold text-stone-900 leading-snug group-hover:text-amber-700 transition-colors mb-3">
                        {item.title}
                      </h3>

                      {/* Tech Stack Badges */}
                      <div className="flex flex-wrap gap-1.5">
                        {item.techStack.map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2 py-0.5 rounded-md text-xs font-medium text-stone-700 bg-[#FBF9F5] border border-[#E7E2D6]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Center Node Icon Bubble */}
                  <div className="hidden md:flex shrink-0 w-11 h-11 rounded-xl bg-white border border-amber-200 shadow-sm items-center justify-center text-amber-700 z-10 group-hover:scale-105 transition-transform">
                    <IconComp className="w-5 h-5 text-amber-700" />
                  </div>

                  {/* Spacer */}
                  <div className="hidden md:block w-full md:w-[calc(50%-2rem)]" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
