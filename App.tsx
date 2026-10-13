import React, { useEffect, useLayoutEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProjectCards from './components/ProjectCards';
import DesignProjects from './components/DesignProjects';
import News from './components/News';
import FunFacts from './components/FunFacts';
import ProjectDetail from './components/ProjectDetail';
import Footer from './components/Footer';
import SvgDefs from './components/SvgDefs';
import { projects } from './data/projects';
import { View } from './types';

// Hash routes keep this working on GitHub Pages without server rules.
//   #home or empty     home: hero, project cards, design projects, news
//   #projects          home, scrolled to the project cards
//   #fun-facts         fun facts (old #about still works)
//   #project/<slug>    a case study, e.g. #project/xplain or #project/peer-review
const visibleProjects = projects.filter(p => !p.hidden);

const viewFromHash = (hash: string): View => {
  const h = hash.replace('#', '');
  // Fun facts page is paused for now; uncomment to bring it back (also restore the Navbar link).
  // if (h === 'fun-facts' || h === 'about') return 'funfacts';
  if (h.startsWith('project/')) {
    const key = decodeURIComponent(h.split('/')[1] || '').toLowerCase();
    // old numeric links (#project/1) keep working
    const found = visibleProjects.find(p => p.slug === key || String(p.id) === key);
    if (found) return { type: 'project', id: found.id };
  }
  return 'home';
};

const App: React.FC = () => {
  const [hash, setHash] = useState(() => (typeof window === 'undefined' ? '' : window.location.hash));
  const view = viewFromHash(hash);

  useEffect(() => {
    const onHash = () => setHash(window.location.hash);
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const scrollForHash = (h: string) => {
    if (h === '#projects') {
      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 0 });
    }
  };

  // Navigation helper: also scrolls when the hash does not change (e.g. clicking Works twice).
  const go = (target: string) => {
    if (window.location.hash === target) scrollForHash(target);
    else window.location.hash = target;
  };

  // After the view renders, either jump to the projects section or reset to the top.
  useLayoutEffect(() => {
    if (hash === '#projects') {
      requestAnimationFrame(() => document.getElementById('projects')?.scrollIntoView({ block: 'start' }));
    } else {
      window.scrollTo({ top: 0 });
    }
  }, [hash]);

  const project = typeof view === 'object' ? visibleProjects.find(p => p.id === view.id) : undefined;

  return (
    <div className="site">
      <SvgDefs />
      <a href="#main" onClick={e => { e.preventDefault(); document.getElementById('main')?.focus(); }} className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:bg-ink focus:text-white focus:px-4 focus:py-2 focus:rounded-full">
        Skip to content
      </a>
      <Navbar currentView={view} go={go} />

      <main id="main" tabIndex={-1} className="outline-none">
        {project ? (
          <ProjectDetail project={project} onBack={() => go('#projects')} onNext={() => go('#projects')} />
        ) : view === 'funfacts' ? (
          <FunFacts onBack={() => go('#home')} />
        ) : (
          <>
            <Hero go={go} />
            <ProjectCards projects={visibleProjects} />
            <div className="wrap">
              <DesignProjects projects={visibleProjects} />
              <News />
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default App;
