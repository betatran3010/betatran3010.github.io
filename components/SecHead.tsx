import React from 'react';
import { Languages, MessageSquareText, SlidersHorizontal, Stethoscope } from 'lucide-react';

type IconName = 'chat' | 'sliders' | 'languages' | 'care' | 'research' | 'palette' | 'news' | 'doc' | 'flask' | 'ruler' | 'chart' | 'bulb' | 'clipboard';

const LUCIDE: Partial<Record<IconName, React.ComponentType<React.SVGProps<SVGSVGElement>>>> = {
  chat: MessageSquareText,
  sliders: SlidersHorizontal,
  languages: Languages,
  care: Stethoscope,
};

const ICONS: Partial<Record<IconName, React.ReactNode>> = {
  flask: <><path d="M10 2v7.5a2 2 0 0 1-.2.9L4.7 20.5a1 1 0 0 0 .9 1.5h12.8a1 1 0 0 0 .9-1.5l-5.1-10.1a2 2 0 0 1-.2-.9V2" /><path d="M8.5 2h7M7 16h10" /></>,
  ruler: <><path d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.4 2.4 0 0 1 0-3.4l2.6-2.6a2.4 2.4 0 0 1 3.4 0z" /><path d="m14.5 12.5 2-2M11.5 9.5l2-2M8.5 6.5l2-2M17.5 15.5l2-2" /></>,
  chart: <><path d="M3 3v18h18" /><path d="M18 17V9M13 17V5M8 17v-3" /></>,
  bulb: <><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" /><path d="M9 18h6M10 22h4" /></>,
  research: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h6" /><path d="M14 2v6h6M20 8v3" /><circle cx="16.5" cy="16.5" r="3.5" /><path d="m21 21-2-2" /><path d="M8 13h2M8 17h2" /></>,
  palette: <><path d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.3a1.8 1.8 0 0 0-1.4 2.8l.3.4A1.8 1.8 0 0 1 12 22z" /><circle cx="13.5" cy="6.5" r=".6" /><circle cx="17.5" cy="10.5" r=".6" /><circle cx="6.5" cy="12.5" r=".6" /><circle cx="8.5" cy="7.5" r=".6" /></>,
  news: <><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" /><path d="M18 14h-8M15 18h-5M10 6h8v4h-8z" /></>,
  clipboard: <><rect x="8" y="2" width="8" height="4" rx="1" /><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><path d="M12 11h4M12 16h4M8 11h.01M8 16h.01" /></>,
  doc: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M8 13h8M8 17h5" /></>,
};

/** Section heading: neon aqua-violet-pink icon, black title, soft divider line. */
export const SecIcon: React.FC<{ icon: IconName; className?: string }> = ({ icon, className = 'neon' }) => {
  const L = LUCIDE[icon];
  if (L) return <L className={className} aria-hidden="true" strokeWidth={1.9} />;
  return <svg className={className} viewBox="0 0 24 24" aria-hidden="true" fill="none" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">{ICONS[icon]}</svg>;
};

const SecHead: React.FC<{ id?: string; icon: IconName; children: React.ReactNode }> = ({ id, icon, children }) => (
  <div className="sech">
    <SecIcon icon={icon} />
    <h2 id={id}>{children}</h2>
    <span className="sline" aria-hidden="true" />
  </div>
);

export default SecHead;
