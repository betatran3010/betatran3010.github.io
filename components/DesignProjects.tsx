import React from 'react';
import SecHead, { SecIcon } from './SecHead';
import { ArrowRight } from 'lucide-react';
import { Project } from '../types';

const items = [
  { id: 3, file: 'reposet.fig', title: 'Reposet', blurb: 'A context-aware wardrobe system that supports outfit planning, clothing rotation, and sustainable reuse in everyday student life.' },
  { id: 4, file: 'duolingo-notes.md', title: 'Duolingo’s Note-Taking Feature Case Study', blurb: 'An in-app note-taking feature in Figma to support vocabulary and grammar retention through active recall and in-context reflection.' },
];

const DesignProjects: React.FC<{ projects: Project[] }> = ({ projects }) => {
  // Design projects are hidden for now; the section returns when any of them is shown again.
  if (!items.some(it => projects.some(x => x.id === it.id))) return null;
  return (
  <section className="design" aria-labelledby="dh">
    <SecHead id="dh" icon="palette">Design <em>Projects</em></SecHead>
    <div className="tiles">
      {items.map(it => {
        const p = projects.find(x => x.id === it.id);
        if (!p) return null;
        const external = !!p.externalUrl;
        return (
          <a key={it.id} className="tile" href={external ? p.externalUrl : `#project/${p.slug}`} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
            
            <div className="tbody">
              <div className="im"><img src={p.image} alt="" loading="lazy" /><span className="pc-lab"><SecIcon icon="palette" className="pcl-ic" />{p.context}</span></div>
              <h3>{it.title}</h3>
              <div className="trow">
                <p>{it.blurb}</p>
                <span className="pc-btn">View Project <ArrowRight aria-hidden="true" /></span>
              </div>
            </div>
          </a>
        );
      })}
    </div>
  </section>
  );
};

export default DesignProjects;
