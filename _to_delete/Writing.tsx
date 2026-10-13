import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const items = [
  {
    kind: "CSCW Companion '25",
    title: 'A paper that mentions XPLAIN',
    note: 'The project I work on in the Communication & Collaborative Technologies Lab is mentioned in this paper.',
    href: 'https://dl.acm.org/doi/10.1145/3715070.3749273',
    cta: 'View on the ACM Digital Library',
  },
  {
    kind: 'Medium',
    title: "Write it down, remember it later: designing Duolingo's note-taking experience",
    note: 'A write-up of my Duolingo note-taking feature case study.',
    href: 'https://medium.com/@trannble/write-it-down-remember-it-later-designing-duolingos-note-taking-experience-9f8f5ce9a174',
    cta: 'Read on Medium',
  },
];

const Writing: React.FC = () => (
  <section id="writing" aria-labelledby="writing-title" className="pt-20 scroll-mt-20">
    <p className="label-mono text-ink-light flex items-center gap-3">
      <span className="w-7 border-t-2 border-dashed border-primary" aria-hidden="true" /> Writing
    </p>
    <h2 id="writing-title" className="mt-3 font-heading font-bold text-3xl sm:text-4xl tracking-tight text-ink">
      Writing and mentions
    </h2>
    <ul className="mt-8 grid md:grid-cols-2 gap-5">
      {items.map(i => (
        <li key={i.href} className="rounded-2xl bg-paper p-6 shadow-card flex flex-col gap-3">
          <p className="label-mono text-maroon">{i.kind}</p>
          <h3 className="font-heading font-bold text-xl leading-snug text-ink">{i.title}</h3>
          <p className="text-ink-light">{i.note}</p>
          <a href={i.href} target="_blank" rel="noopener noreferrer" className="mt-auto inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:text-primary-dark">
            {i.cta} <ArrowUpRight className="w-4 h-4" />
          </a>
        </li>
      ))}
    </ul>
  </section>
);

export default Writing;
