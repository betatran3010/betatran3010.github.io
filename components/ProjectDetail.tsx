import React, { useEffect } from 'react';
import { FileText } from 'lucide-react';
import { Project } from '../types';
import Button from './Button';
import SecHead from './SecHead';
import XplainDetail from './XplainDetail';
import XplainProblemSection from './XplainProblemSection';
import XplainSolutionSection from './XplainSolutionSection';
import XplainTranslationSection from './XplainTranslationSection';
import XplainPersonalizationSection from './XplainPersonalizationSection';
import ReposetDetailSection from './ReposetDetailSection';
import PeerReviewDetail from './PeerReviewDetail';
import MemoryDetail from './MemoryDetail';

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
  onNext?: () => void;
}

/**
 * Case-study page. The header (title, cover, meta, question, overview) shares the
 * home page styling. Each project sets its own accent through a theme class:
 * XPLAIN = aqua + pink, Reposet = yellow (see .theme-reposet in mock.css).
 */
const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onBack, onNext }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [project.id]);

  const isXplain = project.id === 1;
  const isReposet = project.id === 3;
  const isReview = project.id === 5;
  const isMemory = project.id === 6;

  if (isXplain) {
    return (
      <div className="wrap wide inner theme-xplainpage">
        <a className="back" href="#projects" onClick={e => { e.preventDefault(); onBack(); }}>← Back to projects</a>
        <XplainDetail />
        <div className="nextrow">
          <Button onClick={onNext || onBack} variant="ink">Back to all projects</Button>
        </div>
      </div>
    );
  }

  if (isMemory) {
    return (
      <div className="wrap wide inner theme-memory">
        <a className="back" href="#projects" onClick={e => { e.preventDefault(); onBack(); }}>← Back to projects</a>
        <MemoryDetail />
        <div className="nextrow">
          <Button onClick={onNext || onBack} variant="ink">Back to all projects</Button>
        </div>
      </div>
    );
  }

  if (isReview) {
    return (
      <div className="wrap wide inner theme-science">
        <a className="back" href="#projects" onClick={e => { e.preventDefault(); onBack(); }}>← Back to projects</a>
        <PeerReviewDetail />
        <div className="nextrow">
          <Button onClick={onNext || onBack} variant="ink">Back to all projects</Button>
        </div>
      </div>
    );
  }

  return (
    <div className={`wrap wide inner ${isReposet ? 'theme-reposet' : 'theme-xplain'}`}>
      <a className="back" href="#projects" onClick={e => { e.preventDefault(); onBack(); }}>← Back to projects</a>

      <div className="ph">
        <div className="top">
          <span className="lab">{project.context}</span>
          {!isReposet && <span className="pill-yr">{project.year}</span>}
        </div>
        <h1>{project.title}</h1>
        {((!isReposet && project.institution) || project.pi) && (
          <ul className="pc-chips">
            {!isReposet && project.institution && <li>{project.institution}</li>}
            {project.pi && <li>PI: {project.pi}</li>}
          </ul>
        )}
      </div>

      <div className="cover"><img src={project.image} alt={`${project.title} cover`} /></div>


      <div className="q"><span className="lab">The question</span><p>{project.problem}</p></div>

      {project.contextOverview && (isReposet ? (
        <div className="rp-ov">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-8 h-8 text-orange-400" aria-hidden="true" />
            <h2 className="text-2xl font-heading font-black text-amber-900">Overview</h2>
          </div>
          <div className="text-base md:text-lg text-stone-600 font-medium leading-relaxed">{project.contextOverview}</div>
        </div>
      ) : (
        <div className="txt">
          <SecHead icon="doc">Overview</SecHead>
          <div className="body">{project.contextOverview}</div>
        </div>
      ))}

      {/* Full case study, kept as is so it can be edited later. */}
      <div className="cs text-ink-light leading-relaxed space-y-24">
        {isXplain && (
          <>
            <section><XplainProblemSection /></section>
            <section><XplainSolutionSection /></section>
            <section><XplainPersonalizationSection /></section>
            <section><XplainTranslationSection /></section>
          </>
        )}
        {isReposet && <ReposetDetailSection />}
      </div>

      <div className="nextrow">
        <Button onClick={onNext || onBack} variant="ink">Back to all projects</Button>
      </div>
    </div>
  );
};

export default ProjectDetail;
