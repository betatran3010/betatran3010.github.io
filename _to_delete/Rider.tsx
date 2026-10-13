import React from 'react';

/** Tiny rider seen from behind. Used as the scroll marker on the road line. */
const Rider: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 26 30" className={className} aria-hidden="true" focusable="false">
    <ellipse cx="13" cy="28" rx="9" ry="1.6" fill="#1F2540" opacity=".25" />
    <rect x="11.2" y="21" width="3.6" height="7" rx="1.6" fill="#1A1A22" />
    <rect x="6" y="15" width="14" height="9" rx="4" fill="#DE5438" />
    <rect x="8" y="9" width="10" height="9" rx="3.4" fill="#1F2540" />
    <rect x="9" y="9.5" width="8" height="7.5" rx="2.4" fill="#F2B84B" />
    <circle cx="13" cy="6" r="4.4" fill="#F6ECD6" />
    <rect x="12.4" y="2" width="1.2" height="4" fill="#DE5438" />
  </svg>
);

export default Rider;
