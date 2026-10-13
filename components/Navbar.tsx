import React, { useEffect, useState } from 'react';
import { View } from '../types';

interface NavbarProps {
  currentView: View;
  go: (hash: string) => void;
}

const CV_URL = `${import.meta.env.BASE_URL}documents/tran-le-cv.pdf`;
const LINKEDIN = 'https://www.linkedin.com/in/tranle3010/';

type Theme = 'light' | 'dark';

const readTheme = (): Theme =>
  typeof document !== 'undefined' && document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';

const Navbar: React.FC<NavbarProps> = ({ currentView, go }) => {
  const [theme, setTheme] = useState<Theme>(readTheme);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem('theme', theme); } catch { /* storage can be blocked */ }
  }, [theme]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const click = (hash: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    go(hash);
  };
  const onFun = currentView === 'funfacts';

  return (
    <div className="wrap">
      <div className="navbar">
        <nav className={`pill${open ? ' menu-open' : ''}`} aria-label="Main">
          <a className="logo" href="#home" onClick={click('#home')} aria-label="Tran Le, home">
            <i aria-hidden="true" />Tran Le
          </a>
          <span className="vsep" aria-hidden="true" />
          <div className="links" id="nav-links">
          <a className={`l ${onFun ? '' : 'on'}`} href="#projects" onClick={click('#projects')} aria-current={onFun ? undefined : 'page'}>Projects</a>
          {/* Fun facts page is paused for now; restore this link to bring it back.
          <a className={`l ${onFun ? 'on' : ''}`} href="#fun-facts" onClick={click('#fun-facts')} aria-current={onFun ? 'page' : undefined}>Fun facts</a>
          */}
          <a className="l" onClick={() => setOpen(false)} href={CV_URL} target="_blank" rel="noopener noreferrer">CV</a>
          <a className="l" onClick={() => setOpen(false)} href={LINKEDIN} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
          <button
            type="button"
            className="sw"
            role="switch"
            aria-checked={theme === 'dark'}
            aria-label="Dark mode"
            onClick={() => setTheme(t => (t === 'dark' ? 'light' : 'dark'))}
          >
            <span className="tr">
              <span className="kn">
                <svg className="sun" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
                <svg className="moon" viewBox="0 0 24 24"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg>
              </span>
            </span>
          </button>
          <button
            type="button"
            className="burger"
            aria-expanded={open}
            aria-controls="nav-links"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen(o => !o)}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
