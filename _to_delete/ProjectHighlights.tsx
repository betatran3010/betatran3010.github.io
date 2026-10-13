import React, { useState } from 'react';
import { Project } from '../types';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

interface Props {
  projects: Project[];
}

const ProjectRow: React.FC<{ project: Project; showAI: boolean }> = ({ project: p, showAI }) => {
  const external = !!p.externalUrl;
  const href = external ? p.externalUrl! : `#project/${p.id}`;
  const linkProps = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};
  const label = external ? p.externalLabel ?? 'Open' : 'Read the case study';
  const Icon = external ? ArrowUpRight : ArrowRight;
  const tilt = p.id % 2 === 0 ? 'rotate-[1.2deg]' : '-rotate-[1.2deg]';

  return (
    <li id={`project-${p.id}`} className="relative grid md:grid-cols-[minmax(0,320px)_minmax(0,1fr)] gap-6 md:gap-10 py-10 first:pt-2 border-t border-dashed border-route first:border-t-0">
      <a href={href} {...linkProps} className="group block self-start" aria-label={`${p.title}: ${label}`}>
        <div className={`polaroid relative ${tilt} transition-transform duration-300 group-hover:rotate-0 group-hover:-translate-y-1`}>
          <span className="tape -top-3 left-1/2 -ml-12 rotate-[2deg]" aria-hidden="true" />
          <img src={p.image} alt="" loading="lazy" className="w-full aspect-[4/3] object-cover rounded-[2px] bg-slate-100" />
        </div>
      </a>

      <div className="min-w-0">
        <p className="label-mono text-ink-light">
          {p.context} <span aria-hidden="true">·</span> {p.year}
        </p>
        <h3 className="mt-2 font-heading font-bold text-2xl md:text-[2rem] leading-tight text-ink">
          <a href={href} {...linkProps} className="hover:text-primary transition-colors">{p.title}</a>
        </h3>
        {p.description && <p className="mt-3 text-lg leading-relaxed text-ink">{p.description}</p>}
        <p className="mt-3 font-heading italic text-[1.02rem] leading-snug text-ink-light line-clamp-3 max-w-[62ch]">{p.problem}</p>

        {showAI && (p.humanLine || p.aiLine) && (
          <div className="mt-4 grid sm:grid-cols-2 gap-3 max-w-[62ch]">
            {p.humanLine && <p className="font-hand text-[1.45rem] leading-6 text-maroon">{p.humanLine}</p>}
            {p.aiLine && (
              <p className="font-mono text-[0.78rem] leading-relaxed rounded-lg border border-dashed border-sky-deep bg-sky-mist px-3 py-2 text-ink">
                {p.aiLine}
              </p>
            )}
          </div>
        )}

        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Topics">
          {p.tags.map(t => (
            <li key={t} className="font-mono text-[0.7rem] uppercase tracking-wide rounded-full border border-slate-300 px-2.5 py-0.5 text-ink-light">
              {t}
            </li>
          ))}
        </ul>

        <a href={href} {...linkProps} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-primary-dark group/link">
          {label}
          <Icon className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5" />
        </a>
      </div>
    </li>
  );
};

const ProjectHighlights: React.FC<Props> = ({ projects }) => {
  // The "AI layer" switch only appears once at least one project has its two lines written.
  const hasLayers = projects.some(p => p.humanLine || p.aiLine);
  const [showAI, setShowAI] = useState(false);

  return (
    <section id="projects" aria-labelledby="projects-title" className="pt-20 scroll-mt-20">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
        <div>
          <p className="label-mono text-ink-light flex items-center gap-3">
            <span className="w-7 border-t-2 border-dashed border-primary" aria-hidden="true" /> Selected projects
          </p>
          <h2 id="projects-title" className="mt-3 font-heading font-bold text-4xl sm:text-5xl tracking-tight text-ink">
            What I've been working on
          </h2>
        </div>
        {hasLayers && (
          <button
            type="button"
            aria-pressed={showAI}
            onClick={() => setShowAI(s => !s)}
            className="rounded-full border-2 border-ink px-4 py-2 text-sm font-bold text-ink hover:bg-ink hover:text-paper transition-colors"
          >
            {showAI ? 'Hide AI layer' : 'Show AI layer'}
          </button>
        )}
      </div>
      <ol className="list-none">
        {projects.map(p => (
          <ProjectRow key={p.id} project={p} showAI={showAI} />
        ))}
      </ol>
    </section>
  );
};

export default ProjectHighlights;
