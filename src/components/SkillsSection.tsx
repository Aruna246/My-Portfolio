import React, { useState, useMemo } from 'react';
import { useCMS } from '../context/CMSContext';
import {
  Code2,
  Terminal,
  Globe,
  Database,
  Cpu,
  Layers,
  Search,
  FolderGit2,
  Sparkles,
  CheckCircle2,
  Zap,
  Boxes,
  Server
} from 'lucide-react';

interface CategoryTheme {
  icon: typeof Code2;
  gradient: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  glowColor: string;
  dotColor: string;
  tagBg: string;
  tagHover: string;
}

const UNIFIED_THEME: CategoryTheme = {
  icon: Code2,
  gradient: 'from-amber-600 to-orange-600',
  badgeBg: 'bg-amber-50',
  badgeBorder: 'border-amber-200/80',
  badgeText: 'text-amber-800',
  glowColor: 'group-hover:border-amber-400/60',
  dotColor: 'bg-amber-600',
  tagBg: 'bg-[#FBF9F5] border-[#E7E2D6] text-stone-800',
  tagHover: 'hover:border-amber-300 hover:bg-amber-50/80 hover:text-amber-950'
};

const CATEGORY_THEMES: Record<string, CategoryTheme> = {
  languages: {
    ...UNIFIED_THEME,
    icon: Code2,
  },
  frontend: {
    ...UNIFIED_THEME,
    icon: Globe,
  },
  backend: {
    ...UNIFIED_THEME,
    icon: Server,
  },
  databases: {
    ...UNIFIED_THEME,
    icon: Database,
  },
  database: {
    ...UNIFIED_THEME,
    icon: Database,
  },
  core: {
    ...UNIFIED_THEME,
    icon: Cpu,
  },
  tools: {
    ...UNIFIED_THEME,
    icon: FolderGit2,
  },
  cms: {
    ...UNIFIED_THEME,
    icon: Layers,
  },
  default: {
    ...UNIFIED_THEME,
    icon: Boxes,
  }
};

export const SkillsSection: React.FC = () => {
  const { data } = useCMS();
  const { skillsCategories } = data;

  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const totalSkillsCount = useMemo(() => {
    return skillsCategories.reduce((acc, cat) => acc + cat.skills.length, 0);
  }, [skillsCategories]);

  const filteredCategories = useMemo(() => {
    return skillsCategories
      .filter((cat) => (activeFilter === 'all' ? true : cat.id === activeFilter))
      .map((cat) => ({
        ...cat,
        skills: cat.skills.filter((skill) =>
          skill.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      }))
      .filter((cat) => cat.skills.length > 0);
  }, [skillsCategories, activeFilter, searchTerm]);

  return (
    <section id="skills" className="py-20 sm:py-28 relative overflow-hidden">
      {/* Background Subtle Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[700px] h-[500px] bg-indigo-600/5 blur-[120px] pointer-events-none -z-10 rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Pill Badge */}
        <div className="mb-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-50 border border-amber-200/80 text-xs font-bold tracking-widest text-amber-800 uppercase shadow-2xs backdrop-blur-md">
            <Zap className="w-3.5 h-3.5 text-amber-600" />
            <span>TECHNICAL PROFICIENCY</span>
          </div>
        </div>

        {/* Section Heading & Interactive Search */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="max-w-3xl space-y-3">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight">
              Technical Stack &{' '}
              <span className="text-amber-700">
                Technologies
              </span>
            </h2>
            <p className="text-base sm:text-lg text-stone-600 leading-relaxed font-normal">
              A structured overview of core programming languages, modern web frameworks, developer tooling, and database systems.
            </p>
          </div>

          {/* Quick Search with Counter */}
          <div className="flex items-center gap-3">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search any skill or tool (e.g. React, Java)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-white border border-[#E7E2D6] rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/25 focus:border-amber-500 text-stone-800 placeholder-stone-400 transition-all shadow-xs"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-500 hover:text-stone-800 px-1.5 py-0.5 rounded bg-stone-100"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Category Pills Filter Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-thin">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer flex items-center gap-2 ${activeFilter === 'all'
                ? 'bg-amber-600 text-white shadow-md shadow-amber-600/25 font-bold'
                : 'bg-white text-stone-600 hover:text-stone-900 hover:bg-[#FAF7F2] border border-[#E7E2D6]'
              }`}
          >
            <span>All Domains</span>
            <span
              className={`px-2 py-0.5 rounded-md text-[11px] font-bold ${activeFilter === 'all' ? 'bg-white/20 text-white' : 'bg-stone-100 text-stone-600'
                }`}
            >
              {totalSkillsCount}
            </span>
          </button>

          {skillsCategories.map((cat) => {
            const theme = CATEGORY_THEMES[cat.id] || CATEGORY_THEMES.default;
            const IconComp = theme.icon;
            const isActive = activeFilter === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer flex items-center gap-2 ${isActive
                    ? 'bg-amber-600 text-white shadow-md shadow-amber-600/25 font-bold'
                    : 'bg-white text-stone-600 hover:text-stone-900 hover:bg-[#FAF7F2] border border-[#E7E2D6]'
                  }`}
              >
                <IconComp className="w-3.5 h-3.5" />
                <span>{cat.categoryName}</span>
                <span
                  className={`px-2 py-0.5 rounded-md text-[11px] font-bold ${isActive ? 'bg-white/20 text-white' : 'bg-stone-100 text-stone-600'
                    }`}
                >
                  {cat.skills.length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Modern Bento-Style Category Cards */}
        {filteredCategories.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-[#E7E2D6] p-8 shadow-sm">
            <p className="text-stone-500 text-base">No technologies found matching &quot;{searchTerm}&quot;.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setActiveFilter('all');
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold transition-all cursor-pointer shadow-xs"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCategories.map((category) => {
              const theme = CATEGORY_THEMES[category.id] || CATEGORY_THEMES.default;
              const IconComp = theme.icon;

              return (
                <div
                  key={category.id}
                  className={`group relative bg-white/85 backdrop-blur-md rounded-2xl p-6 sm:p-7 border border-[#E7E2D6] hover:border-amber-400 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden hover:-translate-y-1`}
                >
                  {/* Neon Top Bar with Category Gradient */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${theme.gradient} opacity-80 group-hover:opacity-100 transition-opacity`}
                  />

                  <div>
                    {/* Header: Icon, Category Name, Total Count */}
                    <div className="flex items-center justify-between gap-3 pb-5 mb-5 border-b border-[#E7E2D6]">
                      <div className="flex items-center gap-3.5">
                        <div
                          className={`w-11 h-11 rounded-xl ${theme.badgeBg} border ${theme.badgeBorder} flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform`}
                        >
                          <IconComp className={`w-5 h-5 ${theme.badgeText}`} />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-stone-900 group-hover:text-amber-700 transition-colors">
                            {category.categoryName}
                          </h3>
                          <span className="text-xs text-stone-500 font-medium">
                            {category.skills.length} core {category.skills.length === 1 ? 'technology' : 'technologies'}
                          </span>
                        </div>
                      </div>

                      <span
                        className={`text-[11px] font-bold px-2.5 py-1 rounded-lg ${theme.badgeBg} ${theme.badgeText} border ${theme.badgeBorder}`}
                      >
                        {category.id.toUpperCase()}
                      </span>
                    </div>

                    {/* Skill Pills (Technology Names with Glow Accents) */}
                    <div className="flex flex-wrap gap-2.5">
                      {category.skills.map((skill) => (
                        <div
                          key={skill.id}
                          className={`group/pill relative px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 border cursor-default flex items-center gap-2 shadow-2xs ${theme.tagBg} ${theme.tagHover}`}
                        >
                          <span
                            className={`w-2 h-2 rounded-full ${theme.dotColor} shrink-0 ring-2 ring-white`}
                          />
                          <span>{skill.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Clean Bottom Status Indicator */}
                  <div className="mt-6 pt-4 border-t border-[#E7E2D6] flex items-center justify-between text-xs text-stone-500">
                    <span className="inline-flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Ready for production</span>
                    </span>
                    <span className="font-mono text-[11px] text-stone-400">
                      {category.skills.length} items
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Highlight Summary Card at bottom */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-indigo-950/40 via-slate-900/70 to-slate-950/80 border border-indigo-500/20 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center md:text-left">
            <h4 className="text-lg font-bold text-white flex items-center justify-center md:justify-start gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>Software Engineering & Clean Code</span>
            </h4>
            <p className="text-sm text-slate-400 max-w-2xl">
              Specialized in robust software architecture, RESTful APIs, modern reactive frontend interfaces, and object-oriented Java programming.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <div className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300">
              ⚡ Production Ready
            </div>
            <div className="px-3.5 py-2 rounded-xl bg-indigo-950/80 border border-indigo-500/40 text-xs font-bold text-indigo-300">
              🛠️ Modern Tooling
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
