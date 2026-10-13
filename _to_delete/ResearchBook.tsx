import React from 'react';
import { Project } from '../types';

// One-line blurbs shown on the book pages. Edit freely.
const blurbs: Record<number, string> = {
  1: 'A proactive AI assistant that helps non-native speakers in live video conversations.',
  2: 'International students, interpreters and providers, and where communication breaks down.',
  3: 'A wardrobe companion that helps students re-wear what they already own.',
  4: 'Designing for long-term memory and real recall, not only daily streaks.',
};
const shortTitle: Record<number, string> = {
  2: 'Communication needs in U.S. healthcare',
  4: 'Duolingo’s note-taking feature',
};

const Card: React.FC<{ p: Project }> = ({ p }) => {
  const external = !!p.externalUrl;
  const href = external ? p.externalUrl! : `#project/${p.id}`;
  return (
    <article className="pol">
      <div className="im"><img src={p.image} alt="" loading="lazy" /></div>
      <div className="cap">
        <div className="pmeta"><b>{p.context}</b><span>{p.year}</span></div>
        <h3>
          <a href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{shortTitle[p.id] ?? p.title}</a>
        </h3>
        <p>{blurbs[p.id] ?? p.description}</p>
      </div>
    </article>
  );
};

/** Open-book layout: projects 1-2 on the left page, 3-4 on the right. */
const ResearchBook: React.FC<{ projects: Project[] }> = ({ projects }) => (
  <section className="sec" id="projects" aria-labelledby="ph" style={{ scrollMarginTop: 10 }}>
    <div className="wrap">
      <div className="sh"><h2 id="ph">Research <em>Projects</em></h2></div>
      <div className="bookwrap">
        <div className="book">
          <div className="pw l"><div className="page left">{projects.slice(0, 2).map(p => <Card key={p.id} p={p} />)}</div></div>
          <div className="pw r"><div className="page right">{projects.slice(2, 4).map(p => <Card key={p.id} p={p} />)}</div></div>
          <div className="spine" aria-hidden="true" />
        </div>
      </div>
    </div>
  </section>
);

export default ResearchBook;
