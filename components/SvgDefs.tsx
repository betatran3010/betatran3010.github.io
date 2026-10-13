import React from 'react';

/** Hidden shared SVG pieces: curved book-page clip paths, sparkle and heart symbols. */
const SvgDefs: React.FC = () => (
  <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
    <defs>
      <clipPath id="clipL" clipPathUnits="objectBoundingBox"><path d="M0,0.012C0.3,-0.004 0.7,0.006 1,0.04L1,1C0.7,0.965 0.3,0.985 0,0.985Z" /></clipPath>
      <clipPath id="clipR" clipPathUnits="objectBoundingBox"><path d="M1,0.012C0.7,-0.004 0.3,0.006 0,0.04L0,1C0.3,0.965 0.7,0.985 1,0.985Z" /></clipPath>
      <linearGradient id="neonGrad" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="24" y2="0" spreadMethod="repeat">
        <stop offset="0" style={{ stopColor: 'var(--n1)' }} /><stop offset=".33" style={{ stopColor: 'var(--n2)' }} /><stop offset=".66" style={{ stopColor: 'var(--n3)' }} /><stop offset="1" style={{ stopColor: 'var(--n1)' }} />
        <animateTransform attributeName="gradientTransform" type="translate" from="0 0" to="24 0" dur="6s" repeatCount="indefinite" />
      </linearGradient>
      <symbol id="spark" viewBox="-10 -10 20 20"><path d="M0-9C1-3 3-1 9 0 3 1 1 3 0 9-1 3-3 1-9 0-3-1-1-3 0-9Z" /></symbol>
      <symbol id="heart" viewBox="0 0 64 64"><path d="M32 56S6 40 6 22c0-9 7-15 14-15 5 0 9 3 12 8 3-5 7-8 12-8 7 0 14 6 14 15 0 18-26 34-26 34z" /></symbol>
    </defs>
  </svg>
);

export default SvgDefs;
