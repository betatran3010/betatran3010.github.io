import React from 'react';

/** The chibi illustration next to the name. Colors come from CSS variables in mock.css. */
const Chibi: React.FC = () => (
<svg className="chibi" viewBox="0 -8 380 300" role="img" aria-label="Illustration of a chibi girl with long hair in a dress, thinking about human plus AI">
  <g className="o cl"><circle cx="150" cy="128" r="6"/><circle cx="165" cy="108" r="8.5"/><circle cx="182" cy="90" r="10"/></g>
  <g fill="var(--outline)" stroke="var(--outline)" strokeWidth="5" strokeLinejoin="round"><circle cx="204" cy="80" r="28"/><circle cx="232" cy="48" r="32"/><circle cx="274" cy="34" r="34"/><circle cx="316" cy="48" r="31"/><circle cx="342" cy="80" r="26"/><circle cx="318" cy="114" r="30"/><circle cx="272" cy="124" r="31"/><circle cx="228" cy="114" r="27"/><rect x="212" y="52" width="128" height="68"/></g>
  <g className="cl"><circle cx="204" cy="80" r="28"/><circle cx="232" cy="48" r="32"/><circle cx="274" cy="34" r="34"/><circle cx="316" cy="48" r="31"/><circle cx="342" cy="80" r="26"/><circle cx="318" cy="114" r="30"/><circle cx="272" cy="124" r="31"/><circle cx="228" cy="114" r="27"/><rect x="212" y="52" width="128" height="68"/></g>
  <g transform="translate(222 86) scale(.95)" className="o pks"><circle cx="0" cy="-10" r="9.5"/><path d="M-17 18C-17 4-9 2 0 2C9 2 17 4 17 18Z"/></g>
  <g transform="translate(273 80) scale(1.05)" strokeLinecap="round" strokeLinejoin="round">
    <path d="M0-23V-27M-14-18L-17-21M14-18L17-21" fill="none" stroke="var(--outline)" strokeWidth="2.2"/>
    <path className="o" strokeWidth="2.2" d="M-6 13C-6 8-13 5-13-4A13 13 0 1 1 13-4C13 5 6 8 6 13Z" fill="#FFE8A3"/>
    <path d="M-3.5 12V4L0 0L3.5 4V12" fill="none" stroke="#E8A21C" strokeWidth="1.8"/>
    <path d="M-8-8A9 9 0 0 1-3-13" fill="none" stroke="#fff" strokeWidth="2.2"/>
    <rect className="o" strokeWidth="2.2" x="-6" y="13" width="12" height="4" rx="1.5" fill="#fff"/>
    <rect className="o" strokeWidth="2.2" x="-4.2" y="17" width="8.4" height="3.6" rx="1.6" fill="#fff"/>
  </g>
  <path d="M245 83H252M294 83H301" fill="none" stroke="var(--outline)" strokeWidth="3.4" strokeLinecap="round" strokeDasharray="0 6.5"/>
  <path transform="translate(243 52) scale(.6)" d="M0-9C1-3 3-1 9 0 3 1 1 3 0 9-1 3-3 1-9 0-3-1-1-3 0-9Z" fill="var(--b)"/><path transform="translate(304 52) scale(.6)" d="M0-9C1-3 3-1 9 0 3 1 1 3 0 9-1 3-3 1-9 0-3-1-1-3 0-9Z" fill="var(--a)"/>
  <g transform="translate(326 84) scale(.82)" className="o" strokeWidth="2.2"><g fill="none"><path d="M-8 -13V-21"/><circle cx="-8" cy="-24" r="2.6" fill="var(--card)"/><path d="M-8 13V21"/><circle cx="-8" cy="24" r="2.6" fill="var(--card)"/><path d="M0 -13V-21"/><circle cx="0" cy="-24" r="2.6" fill="var(--card)"/><path d="M0 13V21"/><circle cx="0" cy="24" r="2.6" fill="var(--card)"/><path d="M8 -13V-21"/><circle cx="8" cy="-24" r="2.6" fill="var(--card)"/><path d="M8 13V21"/><circle cx="8" cy="24" r="2.6" fill="var(--card)"/><path d="M-13 -8H-21"/><circle cx="-24" cy="-8" r="2.6" fill="var(--card)"/><path d="M13 -8H21"/><circle cx="24" cy="-8" r="2.6" fill="var(--card)"/><path d="M-13 0H-21"/><circle cx="-24" cy="0" r="2.6" fill="var(--card)"/><path d="M13 0H21"/><circle cx="24" cy="0" r="2.6" fill="var(--card)"/><path d="M-13 8H-21"/><circle cx="-24" cy="8" r="2.6" fill="var(--card)"/><path d="M13 8H21"/><circle cx="24" cy="8" r="2.6" fill="var(--card)"/></g><rect x="-13" y="-13" width="26" height="26" rx="6" fill="#BDEFF7"/><text x="0" y="5" textAnchor="middle" fontFamily="var(--f-head)" fontWeight="700" fontSize="14" fill="#101828" stroke="none">AI</text></g>
  <path className="o hr" d="M46 150C40 100 66 86 96 86C126 86 152 100 146 150C154 196 156 244 140 290C128 282 118 270 96 272C74 270 64 282 52 290C36 244 40 196 46 150Z"/>
  <path d="M60 168C56 210 58 246 62 270M132 168C138 210 136 246 130 270M96 122C92 160 94 200 96 262" fill="none" stroke="#5E4655" strokeWidth="3" strokeLinecap="round" opacity=".6"/>
  <path className="o tp" d="M70 208Q96 198 122 208L142 288Q96 300 50 288Z"/>
  <path d="M74 232Q96 240 118 232M66 262Q96 272 126 262" fill="none" stroke="rgba(255,255,255,.55)" strokeWidth="2.4" strokeLinecap="round"/>
  <path className="o" d="M84 202L96 216L108 202" fill="#fff"/>
  <path className="o hr" d="M58 160C50 200 50 238 60 276C70 262 72 224 70 186Z"/>
  <path className="o hr" d="M134 160C142 200 142 238 132 276C122 262 120 224 122 186Z"/>
  <rect x="88" y="188" width="16" height="16" rx="5" className="o sk"/>
  <circle cx="96" cy="150" r="47" className="o sk"/>
  <path className="o hr" d="M48 152C42 106 74 92 100 94C130 96 148 120 144 154C140 134 128 124 114 122C106 134 86 144 68 148C60 150 54 152 48 152Z"/>
  <g transform="translate(66 116) rotate(-32)"><path className="o pk" d="M-17 0C-17-8-5-9 15-3C18-2 18 2 15 3C-5 9-17 8-17 0Z"/><path d="M-10 0C-4-3 4-3 11 0C4 3-4 3-10 0Z" fill="#FFC857" stroke="none"/><path d="M-12-4.5C-6-6.5 2-6 7-4.5" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round"/></g>
  <ellipse cx="79" cy="158" rx="7.4" ry="10.4" className="eye"/><ellipse cx="113" cy="158" rx="7.4" ry="10.4" className="eye"/>
  <circle cx="76.8" cy="153" r="3" fill="#fff"/><circle cx="110.8" cy="153" r="3" fill="#fff"/><circle cx="81.5" cy="163" r="1.4" fill="#fff"/><circle cx="115.5" cy="163" r="1.4" fill="#fff"/>
  <path d="M71 148Q66 150 65 156M121 148Q126 150 127 156" fill="none" stroke="#2A1E2B" strokeWidth="2.4" strokeLinecap="round"/>
  <path d="M72 142Q79 138 86 142M106 142Q113 138 120 142" fill="none" stroke="#5E4655" strokeWidth="2" strokeLinecap="round"/>
  <ellipse cx="66" cy="174" rx="8" ry="5" className="bl"/><ellipse cx="126" cy="174" rx="8" ry="5" className="bl"/>
  <path d="M90 176Q96 182 102 176" fill="none" stroke="#2A1E2B" strokeWidth="2.4" strokeLinecap="round"/>
</svg>
);

export default Chibi;
