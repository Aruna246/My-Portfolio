import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import { ProjectItem } from '../types';
import {
  FolderGit2,
  ExternalLink,
  Github,
  Sparkles,
  Layers,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

export const ProjectsSection: React.FC = () => {
  const { data, setActiveProjectModal } = useCMS();
  const { projects } = data;

  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', ...Array.from(new Set(projects.map((p) => p.category)))];

  const filteredProjects =
    selectedCategory === 'all'
      ? projects
      : projects.filter((p) => p.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <section id="projects" className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Tag */}
        <div className="mb-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-50 border border-amber-200/80 text-xs font-bold tracking-widest text-amber-800 uppercase shadow-2xs backdrop-blur-md">
            <FolderGit2 className="w-3.5 h-3.5 text-amber-600" />
            <span>PORTFOLIO SHOWCASE</span>
          </div>
        </div>

        {/* Section Heading & Filter */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl space-y-3">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight">
              Featured Work &{' '}
              <span className="text-amber-700">
                Software Engineering
              </span>
            </h2>
            <p className="text-base sm:text-lg text-stone-600 leading-relaxed font-normal">
              A curated collection of full-stack web applications, REST API backends, and responsive software systems built with production architecture.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-amber-600 text-white shadow-md shadow-amber-600/25'
                    : 'bg-white text-stone-600 hover:text-stone-900 hover:bg-[#FAF7F2] border border-[#E7E2D6]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group bg-white/90 backdrop-blur-md rounded-3xl border border-[#E7E2D6] shadow-sm hover:shadow-xl hover:border-amber-400/60 transition-all duration-300 flex flex-col justify-between overflow-hidden hover:-translate-y-1"
            >
              <div>
                {/* Project Image Preview / Placeholder Banner */}
                <div className="relative aspect-video w-full overflow-hidden bg-[#FAF7F2] flex items-center justify-center border-b border-[#E7E2D6]">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#FAF7F2] via-amber-50/40 to-[#F5EFE6] flex flex-col items-center justify-center p-6 text-center space-y-2">
                      <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200/80 flex items-center justify-center text-amber-700">
                        <Layers className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-bold text-stone-700">
                        {project.title}
                      </span>
                    </div>
                  )}

                  {/* Badges on Top of Image */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wider bg-white/90 text-amber-800 border border-amber-200/80 backdrop-blur-md shadow-2xs">
                      {project.category}
                    </span>
                    {project.featured && (
                      <span className="px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wider bg-amber-600 text-white shadow-xs">
                        Featured
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 sm:p-7 space-y-4">
                  <div className="space-y-1.5">
                    <h3 className="text-xl font-bold text-stone-900 group-hover:text-amber-700 transition-colors leading-snug">
                      {project.title}
                    </h3>
                    {project.completedDate && (
                      <span className="text-xs font-semibold text-stone-500">
                        {project.completedDate}
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-stone-600 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.tags.slice(0, 4).map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg text-xs font-medium text-amber-900 bg-amber-50/80 border border-amber-200/60"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 4 && (
                      <span className="px-2 py-1 rounded-lg text-xs font-semibold text-stone-500 bg-[#FBF9F5] border border-[#E7E2D6]">
                        +{project.tags.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              {(project.githubUrl || project.liveUrl) && (
                <div className="p-6 sm:p-7 pt-0 border-t border-[#E7E2D6] mt-4 flex items-center justify-end gap-2.5">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-stone-700 hover:text-stone-900 bg-[#FBF9F5] hover:bg-stone-100 border border-[#E7E2D6] transition-colors"
                      title="View Source Code"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>Code</span>
                    </a>
                  )}

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 border border-amber-500/40 transition-colors shadow-sm"
                      title="Open Live Preview"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
