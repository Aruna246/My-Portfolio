import React from 'react';
import { useCMS } from '../context/CMSContext';
import { Briefcase, Calendar, MapPin, CheckCircle2, Building, Sparkles } from 'lucide-react';

export const ExperienceSection: React.FC = () => {
  const { data } = useCMS();
  const { experience } = data;

  if (!experience || experience.length === 0) return null;

  return (
    <section id="experience" className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header Tag */}
        <div className="mb-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-50 border border-amber-200/80 text-xs font-bold tracking-widest text-amber-800 uppercase shadow-2xs backdrop-blur-md">
            <Briefcase className="w-3.5 h-3.5 text-amber-600" />
            <span>INDUSTRY EXPERIENCE</span>
          </div>
        </div>

        {/* Section Heading */}
        <div className="max-w-3xl space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight">
            Work Experience &{' '}
            <span className="text-amber-700">
              Internships
            </span>
          </h2>
          <p className="text-base sm:text-lg text-stone-600 leading-relaxed font-normal">
            Real-world software engineering experience in MERN stack development, frontend architecture, and client-facing digital systems.
          </p>
        </div>

        {/* Experience Timeline Cards */}
        <div className="space-y-8">
          {experience.map((exp, index) => (
            <div
              key={exp.id}
              className="group relative bg-white/85 backdrop-blur-md rounded-3xl p-7 sm:p-9 border border-[#E7E2D6] shadow-sm hover:shadow-xl hover:border-amber-400/60 transition-all duration-300 overflow-hidden"
            >
              {/* Left Accent Color Strip */}
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-amber-500 via-orange-500 to-amber-600" />

              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 pb-6 mb-6 border-b border-[#E7E2D6]">
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h3 className="text-xl sm:text-2xl font-bold text-stone-900 group-hover:text-amber-700 transition-colors">
                      {exp.role}
                    </h3>
                    <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200/60">
                      Internship
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-sm font-semibold text-stone-700">
                    <span className="flex items-center gap-1.5 text-amber-700 font-bold">
                      <Building className="w-4 h-4 text-amber-600" />
                      <span>{exp.company}</span>
                    </span>
                    <span className="flex items-center gap-1 text-stone-500">
                      <MapPin className="w-3.5 h-3.5 text-rose-500" />
                      <span>{exp.location}</span>
                    </span>
                  </div>
                </div>

                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#FBF9F5] border border-[#E7E2D6] text-xs font-bold text-stone-700 shrink-0 self-start">
                  <Calendar className="w-3.5 h-3.5 text-amber-600" />
                  <span>{exp.duration}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-normal mb-6">
                {exp.description}
              </p>

              {/* Key Highlights / Deliverables */}
              {exp.highlights && exp.highlights.length > 0 && (
                <div className="space-y-2.5 bg-[#FAF7F2] p-5 rounded-2xl border border-[#E7E2D6]">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-800 block">
                    Key Deliverables & Responsibilities:
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                    {exp.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                        <span className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                          {highlight}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
                    {exp.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                        <span className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                          {highlight}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
