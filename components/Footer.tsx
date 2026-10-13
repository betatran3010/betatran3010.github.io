import React from 'react';
import { Mail, Linkedin, Github } from 'lucide-react';
import { SectionId } from '../types';

const Footer: React.FC = () => (
  <footer id={SectionId.FOOTER} className="sf compact">
    <div className="sf-row">
      <h2>
        Thanks for visiting my portfolio!
        <svg viewBox="0 0 64 64" aria-hidden="true"><use href="#heart" /></svg>
      </h2>
      <div className="soc">
        {[
          { href: 'mailto:tnl22@cornell.edu', label: 'Email', Icon: Mail },
          { href: 'https://www.linkedin.com/in/tranle3010/', label: 'LinkedIn', Icon: Linkedin },
          { href: 'https://github.com/betatran3010', label: 'GitHub', Icon: Github },
        ].map(({ href, label, Icon }) => (
          <a key={label} href={href} aria-label={label} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
            <Icon className="i" />
          </a>
        ))}
      </div>
    </div>
    <div className="sf-row sf-sub">
      <p>Let’s connect at <span className="em">tnl22@cornell.edu</span>!</p>
      <p>© 2026 Tran Le</p>
    </div>
  </footer>
);

export default Footer;
