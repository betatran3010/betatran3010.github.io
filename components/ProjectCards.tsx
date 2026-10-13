import React from 'react';
import SecHead, { SecIcon } from './SecHead';
import { ArrowRight } from 'lucide-react';
import { Project } from '../types';

/** One stacked card per project: image + lab, title, question, button. */
const Card: React.FC<{ p: Project }> = ({ p }) => {
  const external = !!p.externalUrl;
  const href = external ? p.externalUrl! : `#project/${p.slug}`;
  return (
    <a className="pc" href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
      <div className="pc-bg" aria-hidden="true" />
      <div className="pc-main">
        <div className="pc-img">
          <img src={p.image} alt="" loading="lazy" />
          <span className="pc-lab"><SecIcon icon="research" className="pcl-ic" />{p.context}</span>
        </div>
        <div className="pc-body">
          <div>
            <div className="pc-head">
              <h3>{p.title.includes('? ') ? <>{p.title.split('? ')[0]}?<br />{p.title.split('? ').slice(1).join('? ')}</> : p.title}</h3>
            </div>
            {(p.institution || p.pi) && (
              <ul className="pc-chips">
                {p.institution && <li>{p.institution}</li>}
                {p.pi && <li>PI: {p.pi}</li>}
              </ul>
            )}
            {p.venues && (
              <ul className="pc-venues">
                {p.venues.map(v => <li key={v}>{v}</li>)}
              </ul>
            )}
            {p.rq ? (
              <div className="pc-q pc-rq"><b>RQ</b><ol>{p.rq.map((q, i) => <li key={i}><span>({i + 1})</span> {q}</li>)}</ol></div>
            ) : (
              <div className="pc-q"><b>RQ</b> “{p.problem}”</div>
            )}
          </div>
          <div className="pc-foot">
            <span className="pc-btn">View Project <ArrowRight aria-hidden="true" /></span>
          </div>
        </div>
      </div>
    </a>
  );
};

const ProjectCards: React.FC<{ projects: Project[] }> = ({ projects }) => (
  <section className="sec" id="projects" aria-labelledby="ph" style={{ scrollMarginTop: 10 }}>
    <div className="wrap">
      <SecHead id="ph" icon="research">Highlighted Research <em>Projects</em></SecHead>
      <div className="pcs">
        {projects.filter(p => p.id !== 3 && p.id !== 4).map(p => <Card key={p.id} p={p} />)}
      </div>
    </div>
  </section>
);

export default ProjectCards;
