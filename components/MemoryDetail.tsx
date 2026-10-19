import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown, Hourglass, Pause, Play } from 'lucide-react';
import SecHead from './SecHead';

type IconName = React.ComponentProps<typeof SecHead>['icon'];

const IMG = `${import.meta.env.BASE_URL}images/memory/`;
const VID = `${import.meta.env.BASE_URL}videos/`;

/* ------------------------------------------------------------------ references
   Every in-text citation links out from here. Swap a link in this one place if a DOI changes. */
const scholar = (q: string) => `https://scholar.google.com/scholar?q=${encodeURIComponent(q)}`;
const REFS: Record<string, string> = {
  hamilton: 'https://doi.org/10.1016/j.jarmac.2019.01.001',
  nestojko: 'https://doi.org/10.1080/1047840X.2013.844056',
  lu: 'https://doi.org/10.1016/j.cognition.2020.104428',
  brainerdReyna: 'https://academic.oup.com/book/32740',
  brainerd2021: 'https://doi.org/10.1016/j.cogpsych.2021.101386',
  brainerd2024: 'https://doi.org/10.1037/xge0001535',
  pew: 'https://www.pewresearch.org/short-reads/2025/07/22/google-users-are-less-likely-to-click-on-links-when-an-ai-summary-appears-in-the-results/',
  bechara: 'https://doi.org/10.1016/0010-0277(94)90018-3',
  deese: 'https://doi.org/10.1037/h0046671',
  roediger: 'https://doi.org/10.1037/0278-7393.21.4.803',
};

const Cite: React.FC<{ k: keyof typeof REFS; children: React.ReactNode }> = ({ k, children }) => (
  <a className="mm-cite" href={REFS[k]} target="_blank" rel="noopener noreferrer">{children}</a>
);

/* ------------------------------------------------------------------ small pieces */
const Note: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="mm-schem">{children}</p>
);

/** Video with a large play button in the middle; native controls take over once it plays. */
const Video: React.FC<{ src: string; label: string; poster?: string }> = ({ src, label, poster }) => {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  return (
    <div className="xp-vwrap">
      <video
        ref={ref}
        controls
        preload="metadata"
        playsInline
        poster={poster}
        src={`${src}#t=0.1`}
        aria-label={label}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
      />
      {!playing && (
        <button type="button" className="xp-play" aria-label={`Play: ${label}`} onClick={() => ref.current?.play()}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4.5v15a1 1 0 0 0 1.5.86l12.5-7.5a1 1 0 0 0 0-1.72L8.5 3.64A1 1 0 0 0 7 4.5z" /></svg>
        </button>
      )}
    </div>
  );
};

/** Looping, silent clip that behaves like a GIF but plays smoothly. Always autoplays (muted); a visible button pauses it. */
const LoopClip: React.FC<{ src: string; poster: string; label: string }> = ({ src, poster, label }) => {
  const ref = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (paused) v.pause(); else v.play().catch(() => {});
  }, [paused]);
  return (
    <div className="mm-loop">
      <video ref={ref} src={src} poster={poster} muted loop playsInline autoPlay preload="auto" role="img" aria-label={label} />
      <button type="button" className="mm-loopbtn" onClick={() => setPaused(p => !p)} aria-label={paused ? 'Play animation' : 'Pause animation'}>
        {paused ? <Play aria-hidden="true" /> : <Pause aria-hidden="true" />}
      </button>
    </div>
  );
};

const Tabs: React.FC<{ label: string; items: { name: string; node: React.ReactNode }[] }> = ({ label, items }) => {
  const [i, setI] = useState(0);
  return (
    <div className="mm-tabs">
      <div className="pr-seg" role="tablist" aria-label={label}>
        {items.map((x, n) => (
          <button key={x.name} type="button" role="tab" aria-selected={n === i} className={n === i ? 'on' : ''} onClick={() => setI(n)}>
            <b>{x.name}</b>
          </button>
        ))}
      </div>
      <div className="xp-stack">
        {items.map((x, n) => (
          <div key={x.name} className={`xp-pane${n === i ? ' on' : ''}`} role="tabpanel" aria-hidden={n !== i}>{x.node}</div>
        ))}
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ Background visuals */
/* ------------------------------------------------------------------ DRM judgment table */
const DRM_STATEMENTS: [string, string, string, boolean][] = [
  ['Studied/Verbatim (V)', 'This word was presented during the study phase.', 'No', false],
  ['New but related/Gist (G)', 'This word was not presented, but it was similar in meaning to studied words.', 'Yes', true],
  ['Either/Verbatim or gist (VG)', 'This word was either presented, or it was not presented but similar in meaning to studied words.', 'Yes', true],
  ['New and unrelated (ND)', 'This word was not presented and was not similar in meaning to studied words.', 'No', false],
];

const DRM_WORDS = ['bed', 'rest', 'awake', 'tired', 'dream', 'snooze', 'blanket', 'doze', 'slumber', 'snore', 'nap', 'peace', 'yawn'];

/* ------------------------------------------------------------------ distortion glyphs (schematic) */
const C = { v: 'var(--mm-v)', g: 'var(--mm-g2)', n: 'var(--mm-n)', vg: 'var(--mm-ink2)' };

const Col: React.FC<{ x: number; parts: [number, string][]; w?: number }> = ({ x, parts, w = 26 }) => {
  let y = 72;
  return (
    <>
      {parts.map(([h, c], i) => {
        y -= h * 60;
        return <rect key={i} x={x} y={y} width={w} height={h * 60} rx="2" fill={c} />;
      })}
    </>
  );
};

const Lbl: React.FC<{ x: number; t: string }> = ({ x, t }) => (
  <text x={x} y="86" textAnchor="middle" className="mm-gt">{t}</text>
);

const Glyph: React.FC<{ kind: string; dem?: boolean }> = ({ kind, dem }) => {
  const frame = (children: React.ReactNode, label: string) => (
    <svg viewBox="0 0 150 94" role="img" aria-label={label} className="mm-glyph">
      <line x1="8" y1="72" x2="142" y2="72" className="mm-axis" />
      {children}
    </svg>
  );
  switch (kind) {
    case 'over':
      return frame(<>
        <Col x={22} parts={[[0.38, C.v], [0.42, C.g]]} /><Lbl x={35} t={dem ? 'A + B' : 'V + G'} />
        <Col x={92} parts={[[0.6, C.vg]]} /><Lbl x={105} t={dem ? 'AB' : 'VG'} />
        <line x1="14" y1="36" x2="146" y2="36" className="mm-ref" />
      </>, 'Stacked support for V and G is taller than support for VG');
    case 'super':
      return frame(<>
        <Col x={22} parts={[[0.72, C.v]]} /><Lbl x={35} t="V" />
        <Col x={92} parts={[[0.6, C.vg]]} /><Lbl x={105} t="VG" />
        <line x1="14" y1="36" x2="146" y2="36" className="mm-ref" />
      </>, 'Support for V is taller than support for the broader VG');
    case 'non':
      return frame(<>
        <Col x={46} parts={[[0.4, C.v], [0.4, C.g], [0.35, C.n]]} w={34} />
        <line x1="14" y1="12" x2="146" y2="12" className="mm-ref" />
        <text x="146" y="8" textAnchor="end" className="mm-gt mm-gp">100%</text>
        <Lbl x={63} t={dem ? 'A + B + C' : 'V + G + ND'} />
      </>, 'Stacked support for V, G and ND is taller than 100 percent');
    case 'imp':
      return (
        <div className="mm-glyph mm-conj" role="img" aria-label="Test 1: Yes to V for the word sleep. Test 2: Yes to G for the same word">
          <div><em>Test 1</em><span>sleep → <b>V</b>: Yes</span></div>
          <ArrowDown aria-hidden="true" />
          <div><em>Test 2</em><span>sleep → <b>G</b>: Yes</span></div>
        </div>
      );
    case 'cnt':
      return frame(<>
        <Col x={20} parts={[[0.34, C.v], [0.32, C.g], [0.26, C.n]]} w={30} /><Lbl x={35} t="A + B + C" />
        <Col x={92} parts={[[0.5, C.vg]]} /><text x="105" y="82" textAnchor="middle" className="mm-gt">Combined</text><text x="105" y="90" textAnchor="middle" className="mm-gt">alternatives</text>
        <line x1="14" y1="30" x2="136" y2="30" className="mm-ref" />
      </>, 'Stacked support for A, B and C is taller than the bound implied by the either-or judgments');
    case 'comp':
      return (
        <svg viewBox="0 0 150 94" role="img" aria-label="Expected: support for one answer rises as support for rivals falls. Failed compensation: the rivals stay flat or rise" className="mm-glyph">
          <line x1="14" y1="76" x2="142" y2="76" className="mm-axis" /><line x1="14" y1="10" x2="14" y2="76" className="mm-axis" />
          <line x1="22" y1="22" x2="132" y2="64" stroke={C.v} strokeWidth="2.4" strokeDasharray="5 4" />
          <line x1="22" y1="50" x2="132" y2="40" stroke={C.g} strokeWidth="2.6" />
          <text x="136" y="72" textAnchor="end" className="mm-gt" fill={C.v}>expected</text>
          <text x="136" y="33" textAnchor="end" className="mm-gt" fill={C.g}>observed</text>
          <text x="78" y="90" textAnchor="middle" className="mm-gt">support for A →</text>
        </svg>
      );
    default:
      return null;
  }
};

type Distortion = { name: string; alt?: string; what: string; crit: string; kind: string; note?: string };

const DRM_DIST: Distortion[] = [
  { name: 'Overdistribution', alt: 'additivity violation', kind: 'over', what: 'Separate judgments of “studied” and “new but related” receive more combined support than the broader “either” possibility.', crit: 'p(V) + p(G) > p(VG)' },
  { name: 'Super-overdistribution', kind: 'super', what: 'One possibility receives more support than the broader “either” possibility that includes it.', crit: 'p(V) > p(VG) or p(G) > p(VG)' },
  { name: 'Non-additivity', alt: 'universal-event violation', kind: 'non', what: 'Combined support for the three mutually exclusive possibilities exceeds 100%.', crit: 'p(V) + p(G) + p(ND) > 1' },
  { name: 'Impossible conjunctions', kind: 'imp', what: 'The same participant endorses incompatible descriptions of the same word across repeated judgments.', crit: 'V: Yes ∧ G: Yes (same word)' },
];

const DEM_DIST: Distortion[] = [
  { name: 'Overdistribution', alt: 'additivity violation', kind: 'over', what: 'Separate judgments of A and B receive more combined support than the broader “A or B” possibility.', crit: 'p(A) + p(B) > p(AB)' },
  { name: 'Countable-additivity violation', kind: 'cnt', what: 'The combined support for three individual alternatives exceeds what is implied by overlapping “either-or” judgments.', crit: 'p(A) + p(B) + p(C) > p(AB) + p(BC) − p(B)' },
  { name: 'Universal-event violation', kind: 'non', what: 'The combined support for three mutually exclusive answers exceeds 100%, even though they cannot all be correct.', crit: 'p(A) + p(B) + p(C) > 1' },
  { name: 'Failed compensation', kind: 'comp', what: 'Stronger support for one alternative is not accompanied by the expected decrease in support for incompatible alternatives.', crit: 'No strong negative correlation' },
];

const Distortions: React.FC<{ items: Distortion[]; label: string; dem?: boolean }> = ({ items, label, dem }) => (
  <div className="mm-dgrid" role="list" aria-label={label}>
    {items.map(d => (
      <article className="mm-dcard" role="listitem" key={d.name}>
        <Glyph kind={d.kind} dem={dem} />
        <h4>{d.name}{d.alt && <span> ({d.alt})</span>}</h4>
        <p>{d.what}</p>
        {d.note && <p className="mm-gnote">{d.note}</p>}
        <code>{d.crit}</code>
      </article>
    ))}
  </div>
);

/* ------------------------------------------------------------------ MPT diagram, Study 1 */
const T = {
  tgt: 'var(--mm-v)', rel: 'var(--mm-g)', neu: 'var(--mm-n)',
};

type Kind = 'tgt' | 'rel' | 'neu' | 'yes';
type Spec = { t?: string; s?: string; leaf?: Kind; lt?: string; tint?: 'v' | 'g' | 'n'; kids?: [string, Spec][] };
type Pos = { spec: Spec; depth: number; y: number; kids: Pos[] };

const ROW = 38;
const GROUP_GAP = 34;
const ROOT_W = 130;
const BOX_W = 122;
const X1 = 178;
const STEP = 160;
const PILL_X = 942;
const PILL_W = 108;
const boxX = (d: number) => (d === 0 ? 8 : X1 + (d - 1) * STEP);
const boxW = (d: number) => (d === 0 ? ROOT_W : BOX_W);

const build = (spec: Spec, depth: number, ctr: { y: number }): Pos => {
  if (!spec.kids || spec.leaf) {
    const y = ctr.y;
    ctr.y += ROW;
    return { spec, depth, y, kids: [] };
  }
  const kids = spec.kids.map(([, k]) => build(k, depth + 1, ctr));
  return { spec, depth, y: (kids[0].y + kids[kids.length - 1].y) / 2, kids };
};

const TINT: Record<string, [string, string]> = { v: ['#FBE4E4', '#6E1010'], g: ['#FBF0D0', '#5C4000'], n: ['#E8ECF2', '#2C3748'] };

const TreeParts: React.FC<{ pos: Pos; spec: Spec; edge: string; parent?: Pos }> = ({ pos, spec, edge, parent }) => {
  const x = boxX(pos.depth);
  const w = boxW(pos.depth);
  const out: React.ReactNode[] = [];
  if (parent) {
    const px = boxX(parent.depth) + boxW(parent.depth);
    const mx = (px + x) / 2;
    out.push(<path key="e" d={`M${px} ${parent.y} C${mx} ${parent.y} ${mx} ${pos.y} ${x} ${pos.y}`} fill="none" stroke="var(--mm-line)" strokeWidth="1.6" />);
    if (edge) out.push(spec.leaf
      ? <text key="l" x={x + 6} y={pos.y - 6} textAnchor="start" className="mm-el">{edge}</text>
      : <text key="l" x={x - 20} y={pos.y - 9} textAnchor="middle" className="mm-el">{edge}</text>);
  }
  if (spec.leaf) {
    const col = { tgt: 'var(--mm-v)', rel: 'var(--mm-g)', neu: 'var(--mm-n)', yes: 'var(--mm-ink2)' }[spec.leaf];
    out.push(<line key="h" x1={x} y1={pos.y} x2={PILL_X} y2={pos.y} stroke="var(--mm-line)" strokeWidth="1.6" strokeDasharray="2 5" />);
    out.push(<rect key="p" x={PILL_X} y={pos.y - 15} width={PILL_W} height={30} rx="15" fill={col} />);
    out.push(<text key="pt" x={PILL_X + PILL_W / 2} y={pos.y + 4.5} textAnchor="middle" className="mm-et">{spec.lt}</text>);
  } else {
    const [f, i] = spec.tint ? TINT[spec.tint] : ['var(--mm-nodef)', 'var(--mm-nodei)'];
    out.push(<rect key="r" x={x} y={pos.y - 18} width={w} height={36} rx="10" fill={f} stroke="var(--mm-line)" strokeWidth="1.2" />);
    out.push(<text key="t" x={x + w / 2} y={spec.s ? pos.y - 3 : pos.y + 4.5} textAnchor="middle" className="mm-nt" fill={i}>{spec.t}</text>);
    if (spec.s) out.push(<text key="s" x={x + w / 2} y={pos.y + 10} textAnchor="middle" className="mm-ns" fill={i}>{spec.s}</text>);
  }
  return (
    <>
      {out}
      {pos.kids.map((k, n) => <TreeParts key={n} pos={k} spec={k.spec} edge={spec.kids![n][0]} parent={pos} />)}
    </>
  );
};

const MptTree: React.FC<{ groups: Spec[]; heads: [string, string, string]; title: string; desc: string; id: string }> = ({ groups, heads, title, desc, id }) => {
  const ctr = { y: 58 };
  const trees: Pos[] = [];
  const seps: number[] = [];
  groups.forEach((g, i) => {
    trees.push(build(g, 0, ctr));
    if (i < groups.length - 1) { seps.push(ctr.y - ROW / 2 + GROUP_GAP / 2); ctr.y += GROUP_GAP; }
  });
  const H = ctr.y - ROW / 2 + 16;
  return (
    <svg viewBox={`0 0 1060 ${H}`} className="mm-svg" role="img" aria-labelledby={`${id}-t ${id}-d`}>
      <title id={`${id}-t`}>{title}</title>
      <desc id={`${id}-d`}>{desc}</desc>
      <text x="8" y="22" className="mm-col">{heads[0]}</text>
      <text x={X1} y="22" className="mm-col">{heads[1]}</text>
      <text x={PILL_X + PILL_W} y="22" textAnchor="end" className="mm-col">{heads[2]}</text>
      {seps.map(y => <line key={y} x1="8" y1={y} x2="1052" y2={y} className="mm-sep" />)}
      {trees.map((t, i) => <TreeParts key={i} pos={t} spec={t.spec} edge="" />)}
    </svg>
  );
};

const L = (k: Kind, lt: string): Spec => ({ leaf: k, lt });
const guess = (): [string, Spec][] => [['a', L('tgt', 'Studied')], ['1 − a', L('rel', 'Related')]];

const DRM_TREES: Spec[] = [
  {
    t: 'Studied word', s: 'e.g. “bed”',
    kids: [
      ['Vt', { t: 'Identity recollection', s: 'knows this exact word', kids: [['', L('tgt', 'Studied')]] }],
      ['1 − Vt', {
        t: 'No exact memory',
        kids: [
          ['Gt', { t: 'Gist feels similar', s: 'to the list', kids: guess() }],
          ['1 − Gt', {
            t: 'No evidence',
            kids: [
              ['b', { t: 'Guess “old”', kids: guess() }],
              ['1 − b', L('neu', 'New')],
            ],
          }],
        ],
      }],
    ],
  },
  {
    t: 'Related lure', s: 'e.g. “sleep”',
    kids: [
      ['Vr', { t: 'Recollection rejection', s: 'knows it was not studied', kids: [['', L('rel', 'Related')]] }],
      ['1 − Vr', {
        t: 'No rejection',
        kids: [
          ['Pr', { t: 'Phantom recollection', s: 'vivid false “I studied it”', kids: [['', L('tgt', 'Studied')]] }],
          ['1 − Pr', {
            t: 'No phantom',
            kids: [
              ['Gr', { t: 'Gist feels similar', s: 'to the list', kids: guess() }],
              ['1 − Gr', {
                t: 'No evidence',
                kids: [
                  ['b', { t: 'Guess “old”', kids: guess() }],
                  ['1 − b', L('neu', 'New')],
                ],
              }],
            ],
          }],
        ],
      }],
    ],
  },
  {
    t: 'Unrelated word', s: 'e.g. “anchor”',
    kids: [
      ['', {
        t: 'No evidence',
        kids: [
          ['b', { t: 'Guess “old”', kids: guess() }],
          ['1 − b', L('neu', 'New')],
        ],
      }],
    ],
  },
];

const noEvidence = (yes: Spec): Spec => ({ t: 'No evidence', kids: [['b', yes], ['1 − b', L('neu', 'No')]] });
const DEM_TREES: Spec[] = [
  {
    t: 'Statement names A', s: 'the correct answer',
    kids: [
      ['Va', { t: 'Verbatim retrieval', s: 'knows A is correct', kids: [['', L('yes', 'Yes')]] }],
      ['1 − Va', {
        t: 'No verbatim',
        kids: [
          ['Ga', { t: 'Gist of A feels right', kids: [['', L('yes', 'Yes')]] }],
          ['1 − Ga', noEvidence(L('yes', 'Yes'))],
        ],
      }],
    ],
  },
  {
    t: 'Statement names B', s: 'a plausible wrong answer',
    kids: [
      ['Va', { t: 'Verbatim retrieval', s: 'knows A, rejects B', kids: [['', L('neu', 'No')]] }],
      ['1 − Va', {
        t: 'No verbatim',
        kids: [
          ['Gb', { t: 'Gist of B feels right', kids: [['', L('tgt', 'Yes (false)')]] }],
          ['1 − Gb', noEvidence(L('tgt', 'Yes (false)'))],
        ],
      }],
    ],
  },
];

const MptDrm: React.FC = () => (
  <figure className="mm-fig mm-mpt">
    <div className="mm-scroll" tabIndex={0} role="group" aria-label="Conjoint-recognition processing tree for Study 1. Scroll sideways on a narrow screen.">
      <MptTree id="mpt1" groups={DRM_TREES} heads={['PROBE', 'WHAT HAPPENS IN MEMORY', 'WHAT THE PERSON EXPERIENCES']} title="Conjoint-recognition multinomial processing tree for the DRM study" desc="Three trees, one per kind of test word. Studied words end as recognized through identity recollection or gist, or are guessed. Related lures end as related through recollection rejection, as studied through phantom recollection, or by similarity and guessing. Unrelated words are new unless guessed old." />
    </div>
    <p className="xp-hint mm-hint">Swipe sideways to see the full tree</p>

    <div className="mm-legend">
      <h4>Parameters</h4>
      <dl>
        <div><dt><span className="mm-chip v">Vt</span></dt><dd><b>Identity recollection.</b> Remembering exactly which words appeared.</dd></div>
        <div><dt><span className="mm-chip v">Vr</span></dt><dd><b>Recollection rejection.</b> Using memory of the list to reject a related lure.</dd></div>
        <div><dt><span className="mm-chip g">Gt · Gr</span></dt><dd><b>Similarity judgment.</b> Recognizing a word through shared meaning with studied words.</dd></div>
        <div><dt><span className="mm-chip g">Pr</span></dt><dd><b>Phantom recollection.</b> A vivid but false memory of having studied a related lure.</dd></div>
        <div><dt><span className="mm-chip b">a · b</span></dt><dd><b>Response bias.</b> Guessing when memory evidence is uncertain.</dd></div>
      </dl>
    </div>

    <div className="mm-scroll mm-maptab" tabIndex={0} role="group" aria-label="How each experience maps onto the four statements">
      <table className="mm-table mm-map">
        <caption>What each experience means for the four statements (Yes/No)</caption>
        <thead><tr><th scope="col">Experience</th><th scope="col">V</th><th scope="col">G</th><th scope="col">VG</th><th scope="col">ND</th></tr></thead>
        <tbody>
          <tr><th scope="row"><span className="mm-dot" style={{ background: T.tgt }} />“Studied”</th><td className="y">Yes</td><td>No</td><td className="y">Yes</td><td>No</td></tr>
          <tr><th scope="row"><span className="mm-dot" style={{ background: T.rel }} />“Related”</th><td>No</td><td className="y">Yes</td><td className="y">Yes</td><td>No</td></tr>
          <tr><th scope="row"><span className="mm-dot" style={{ background: T.neu }} />“New”</th><td>No</td><td>No</td><td>No</td><td className="y">Yes</td></tr>
        </tbody>
      </table>
    </div>
    <figcaption>Simplified from the validated conjoint-recognition model. Because every word is judged under only one statement, the model uses the Yes/No pattern across V, G, and VG questions to estimate each parameter.</figcaption>
  </figure>
);

/* ------------------------------------------------------------------ Study 2 pieces */
const SEARCH_AVAILABLE_TRIALS = (() => {
  // Schematic only: 36 of 96 trials with search, the first guaranteed and availability thinning out.
  let s = 7;
  const rnd = () => { s = (s * 1664525 + 1013904223) % 4294967296; return s / 4294967296; };
  const scores = Array.from({ length: 96 }, (_, i) => ({ i, v: rnd() * (0.35 + (i / 95) * 1.3) }));
  const pick = new Set(scores.sort((a, b) => a.v - b.v).slice(0, 36).map(x => x.i));
  pick.delete(0);
  if (pick.size >= 36) { const worst = [...pick].sort((a, b) => b - a)[0]; pick.delete(worst); }
  pick.add(0);
  return Array.from({ length: 96 }, (_, i) => pick.has(i));
})();

const Procedure2: React.FC = () => (
  <figure className="mm-fig">
    <div className="mm-blocks">
      <section className="mm-block" aria-label="No-offloading block">
        <header><b>No-offloading condition</b><span>96 trials</span></header>
        <p>Participants answer using their existing knowledge without a search tool.</p>
        <div className="mm-strip ctl" aria-hidden="true">{Array.from({ length: 96 }, (_, i) => <i key={i} />)}</div>
        <p className="mm-key"><i className="k ctl" />60 matched control trials</p>
      </section>
      <section className="mm-block off" aria-label="Offloading block">
        <header><b>Offloading condition</b><span>96 trials</span></header>
        <p>Participants can click an embedded Google Search button.</p>
        <div className="mm-strip" aria-hidden="true">{SEARCH_AVAILABLE_TRIALS.map((a, i) => <i key={i} className={a ? 'on' : ''} />)}</div>
        <p className="mm-key"><i className="k on" />36 search available <i className="k off" />60 search unavailable</p>
      </section>
    </div>
    <p className="mm-schem">Schematic trial order: the first trial is guaranteed to work, then search succeeds less often and less predictably.</p>
    <ol className="mm-flow" aria-label="Order of tasks">
      <li><b>2 blocks</b><i>order counterbalanced</i></li>
      <li><b>192 factual judgments</b><i>10-second limit</i></li>
      <li><b>NCS-6</b><i>after the task</i></li>
    </ol>
  </figure>
);

const DEM_ITEMS = [
  {
    topic: 'Popular culture',
    q: 'The city in which Starbucks opened its first store',
    cand: ['Seattle', 'Portland', 'Los Angeles'],
    probes: [
      'Starbucks opened its first store in Seattle',
      'Starbucks opened its first store in Portland',
      'Starbucks opened its first store in Los Angeles',
      'Starbucks opened its first store in Seattle or Portland',
      'Starbucks opened its first store in Portland or Los Angeles',
      'Starbucks opened its first store in Los Angeles or Seattle',
    ],
  },
  {
    topic: 'Historical events',
    q: 'The first United States president to face impeachment',
    cand: ['Andrew Johnson', 'Richard Nixon', 'Bill Clinton'],
    probes: [
      'The first United States president to face impeachment was Andrew Johnson',
      'The first United States president to face impeachment was Richard Nixon',
      'The first United States president to face impeachment was Bill Clinton',
      'The first United States president to face impeachment was Andrew Johnson or Richard Nixon',
      'The first United States president to face impeachment was Richard Nixon or Bill Clinton',
      'The first United States president to face impeachment was Bill Clinton or Andrew Johnson',
    ],
  },
  {
    topic: 'Science',
    q: 'The largest planet in the solar system',
    cand: ['Jupiter', 'Earth', 'Saturn'],
    probes: [
      'Jupiter is the largest planet in our solar system',
      'Earth is the largest planet in our solar system',
      'Saturn is the largest planet in our solar system',
      'Jupiter or Earth is the largest planet in our solar system',
      'Earth or Saturn is the largest planet in our solar system',
      'Saturn or Jupiter is the largest planet in our solar system',
    ],
  },
];
const PROBE_LABELS = ['A?', 'B?', 'C?', 'A or B?', 'B or C?', 'C or A?'];

const Instrument: React.FC = () => (
  <Tabs
    label="Illustrative items from the DEM instrument"
    items={DEM_ITEMS.map((it, n) => ({
      name: `Item ${n + 1}`,
      node: (
        <div className="mm-item">
          <p className="mm-iq"><span>{it.topic}</span>{it.q}</p>
          <ul className="mm-cands" aria-label="Candidates">
            {it.cand.map((c, i) => <li key={c}><b>{'ABC'[i]}</b> {c}</li>)}
          </ul>
          <ol className="mm-probes" aria-label="Memory probes">
            {it.probes.map((p, i) => <li key={p}><b>{PROBE_LABELS[i]}</b><span>{p}</span></li>)}
          </ol>
        </div>
      ),
    }))}
  />
);

/* ------------------------------------------------------------------ MPT diagram, Study 2 */
const MptDem: React.FC = () => (
  <figure className="mm-fig mm-mpt">
    <div className="mm-scroll" tabIndex={0} role="group" aria-label="Processing tree for Study 2. Scroll sideways on a narrow screen.">
      <MptTree id="mpt2" groups={DEM_TREES} heads={['PROBE', 'WHAT HAPPENS IN MEMORY', 'RESPONSE']} title="Five-parameter processing tree for the DEM study" desc="For a statement about a fact, the person either retrieves the verbatim correct answer, retrieves gist plausibility for the named alternative, or has no evidence and uses response bias. Verbatim retrieval accepts statements naming the correct answer and rejects statements naming only wrong answers." />
    </div>
    <p className="xp-hint mm-hint">Swipe sideways to see the full tree</p>
    <div className="mm-legend">
      <h4>Parameters</h4>
      <dl>
        <div><dt><span className="mm-chip v">V<sub>a</sub></span></dt><dd><b>Verbatim retrieval.</b> Retrieving precise factual knowledge to identify the correct answer and reject incompatible alternatives.</dd></div>
        <div><dt><span className="mm-chip g">G<sub>a</sub> G<sub>b</sub> G<sub>c</sub></span></dt><dd><b>Gist retrieval.</b> Retrieving broader knowledge or plausibility associated with each alternative, potentially supporting both correct and incorrect answers.</dd></div>
        <div><dt><span className="mm-chip b">b</span></dt><dd><b>Response bias.</b> A tendency to respond Yes when memory evidence is insufficient.</dd></div>
      </dl>
    </div>
    <figcaption>Either-or statements (A or B, B or C, C or A) are answered Yes when any alternative they name is supported. The same five parameters are estimated across all 6 judgment types.</figcaption>
  </figure>
);

/* ------------------------------------------------------------------ page */
const NAV = [
  { id: 'mm-overview', label: 'Overview' },
  { id: 'mm-bg', label: 'Background' },
  { id: 'mm-s1', label: 'Study 1' },
  { id: 'mm-s2', label: 'Study 2' },
];

const jump = (id: string) => (e: React.MouseEvent) => {
  e.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const SideNav: React.FC = () => {
  const [on, setOn] = useState(false);
  const [active, setActive] = useState(NAV[0].id);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const toc = document.getElementById('mm-overview');
      const last = document.getElementById('mm-endmark');
      setOn(!!toc && toc.getBoundingClientRect().bottom < 0 && !!last && last.getBoundingClientRect().top > 240);
      let cur = NAV[0].id;
      for (const n of NAV) {
        const el = document.getElementById(n.id);
        if (el && el.getBoundingClientRect().top <= 220) cur = n.id;
      }
      setActive(cur);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <nav className={`xp-nav${on ? ' on' : ''}`} aria-label="Jump to a section">
      {NAV.map(n => (
        <a key={n.id} href={`#${n.id}`} aria-current={active === n.id} tabIndex={on ? 0 : -1} onClick={jump(n.id)}>{n.label}</a>
      ))}
    </nav>
  );
};

const Sec: React.FC<{ id: string; icon: IconName; kicker?: string; title: string; children: React.ReactNode }> = ({ id, icon, kicker, title, children }) => (
  <section className="pr-sec xp-sec" id={id}>
    {kicker && <p className="xp-kicker">{kicker}</p>}
    <SecHead icon={icon}>{title}</SecHead>
    {children}
  </section>
);

const MemoryDetail: React.FC = () => {
  return (
    <div className="pr xp mm">
      <SideNav />
      <header className="pr-head">
        <p className="lab">Memory and Neuroscience Lab</p>
        <h1>Cognitive Offloading and Deep Distortions in Episodic and Semantic Memory</h1>
        <ul className="pc-chips pr-chips">
          <li>Cornell University</li>
          <li>PI: Dr. Charles Brainerd</li>
        </ul>
      </header>

      <div className="cover pr-cover">
        <img
          src={`${IMG}hero.jpg`}
          alt="Two study interfaces: a word-recognition trial with a saved word file for Study 1, and a trivia question beside a Google AI Overview for Study 2"
        />
      </div>

      {/* ------------------------------------------------------------ overview */}
      <section className="pr-sec pr-overview xp-sec" id="mm-overview">
        <SecHead icon="doc">Overview</SecHead>
        <div className="pr-obody">
          <p>
            From written records and mechanical aids to search engines and generative AI, humans have long distributed the work of remembering and thinking between their own minds and external resources. What has changed is the scale and scope of <strong className="pr-term">cognitive offloading</strong>. For example, AI can now synthesize information across sources, provide context-sensitive explanations, and build upon retrieved knowledge to support complex intellectual tasks. These capabilities make <strong className="pr-term">external storage and retrieval</strong> increasingly attractive, as stored information can serve far more than future lookup.
          </p>
          <p>
            This deepening partnership invites us to view ourselves as a “<strong className="pr-term">human–machine extended organism</strong>” (<Cite k="hamilton">Hamilton &amp; Benjamin, 2019</Cite>), whose cognitive capabilities emerge from the coordination of internal and external resources. Yet these resources are not interchangeable. While external memory can free cognitive resources for other meaningful activities, internally accessible knowledge remains valuable for flexible reasoning, problem-solving, and knowledge transfer (<Cite k="nestojko">Nestojko et al., 2013</Cite>). The question, then, is not whether offloading should be avoided, but how it may influence the memory processes people draw upon to interpret and evaluate information. Therefore, I ask:
          </p>
          <div className="q pr-q2">
            <p><b>RQ1</b>When people expect technology to store or retrieve information for them, does that expectation change the precision of their own memory and the consistency of their memory-based judgments?</p>
            <p><b>RQ2</b>Do any effects differ across episodic and semantic memory?</p>
          </div>
          <p>
            In my honors thesis with Professor Charles Brainerd, I conduct 2 complementary experiments using controlled simulations of digital storage and search to investigate these questions. Drawing on <u className="pr-ul">Fuzzy-Trace Theory</u>, I develop <u className="pr-ul">conjoint-recognition tasks</u> to quantify <strong className="pr-term">deep memory distortions</strong> and use <u className="pr-ul">multinomial processing tree models</u> to test whether any observed differences reflect changes in <strong className="pr-term">verbatim memory</strong> for precise, literal details and <strong className="pr-term">gist memory</strong> for coarse-grained, general meaning.
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------------ background */}
      <Sec id="mm-bg" icon="book" title="Background">
        <p>
          Prior research suggests that cognitive offloading can influence not only forgetting but also false memory. <Cite k="lu">Lu et al. (2020)</Cite> found that participants expecting access to externally stored word lists recalled fewer studied words but more related words that had never appeared. They proposed an explanation based on <strong className="pr-term">Fuzzy-Trace Theory (FTT)</strong>, which distinguishes <strong className="pr-term">verbatim memory</strong> for precise details from <strong className="pr-term">gist memory</strong> for general meaning (<Cite k="brainerdReyna">Brainerd &amp; Reyna, 2005</Cite>). While gist can make related information feel familiar, verbatim retrieval can help reject false memories by recalling what actually occurred (recollection rejection). Lu et al. proposed that anticipated support may reduce top-down mnemonic processing, such as deliberate encoding and rehearsal, weakening verbatim memory while leaving gist relatively intact and thereby making false memories harder to reject. However, two questions remain:
        </p>
        <div className="mm-gaps">
          <article>
            <span className="mm-cn" aria-hidden="true">1</span>
            <p>First, Lu et al. inferred these processes from recall performance without directly estimating their contributions.</p>
          </article>
          <article>
            <span className="mm-cn" aria-hidden="true">2</span>
            <p>Second, previous offloading research has focused on surface distortions, such as falsely recalling individual words, rather than <strong className="pr-term">deep memory distortions</strong>: patterns of judgments that violate basic logical or probability rules (<Cite k="brainerd2021">Brainerd, 2021</Cite>).</p>
          </article>
        </div>
        <p>
          Deep distortions are <strong className="pr-term">more fundamental</strong> than individual false memories as they reveal logical inconsistencies that <strong className="pr-term">necessarily imply false memories</strong>, whereas false memories can occur without such inconsistencies. FTT suggests that <strong className="pr-term">gist memory</strong> can support incompatible possibilities through shared meaning without one suppressing another. Combined with Lu et al.’s proposed mechanism, this raises the untested possibility that offloading amplifies not only individual false memories but also these deeper inconsistencies.
        </p>

        <p className="mm-lead">These questions may also have different answers across episodic and semantic memory.</p>
        <div className="mm-vs">
          <article className="epi">
            <h3>Episodic memory</h3>
            <p>Concerns particular experiences: <strong className="pr-term">verbatim</strong> retrieval supports vivid recollection of what occurred and rejection of similar but unexperienced information, while strong <strong className="pr-term">gist</strong> can sometimes produce vivid false recollections.</p>
          </article>
          <article className="sem">
            <h3>Semantic memory</h3>
            <p>Concerns previously acquired factual knowledge. Here, <strong className="pr-term">verbatim</strong> retrieval supports precise factual judgments and rejection of incorrect alternatives, while <strong className="pr-term">gist</strong> contributes broader familiarity or plausibility.</p>
          </article>
        </div>
        <p>
          <Cite k="brainerd2024">Brainerd et al. (2024)</Cite> also found that everyday factual memory exhibits stronger deep distortions and greater reliance on gist, with weaker verbatim retrieval, than typically observed in episodic-memory tasks. These findings suggest that the relative contributions of verbatim and gist differ across memory systems, opening up questions about how offloading may affect them differently as well.
        </p>
        <div className="xp-note mm-note">
          <span aria-hidden="true"><Hourglass /></span>
          <div className="mm-nb">
            <p>Together, these findings motivate my investigation of whether offloading increases deep distortions and whether these effects generalize across episodic and semantic memory or differ in magnitude and mechanism.</p>
          </div>
        </div>
      </Sec>

      {/* ------------------------------------------------------------ study 1 */}
      <Sec id="mm-s1" icon="brain" kicker="Study 1" title="Episodic Memory">
        <h3 className="pr-h3">Paradigm</h3>
        <p>
          I adapt the well-established <strong className="pr-term">Deese–Roediger–McDermott (DRM)</strong> false-memory paradigm (<Cite k="deese">Deese, 1959</Cite>; <Cite k="roediger">Roediger &amp; McDermott, 1995</Cite>). Participants study lists of related words while a strongly associated word is deliberately omitted. Later, they must distinguish words they actually encountered from related but unstudied words.
        </p>
        <p>
          This task examines episodic memory because participants must remember what they actually encountered during a specific study experience. It also resembles everyday situations such as recalling a lecture: we may remember its main ideas but mistakenly believe a related concept, example, or point was mentioned because it fits the discussion. With lecture recordings, searchable notes, and AI-generated summaries making information easier to revisit, an important question is whether expecting such external support changes how precisely we remember what we encountered. DRM provides a controlled setting to investigate this distinction between memory for which words actually appeared (<strong className="pr-term">verbatim memory</strong>) and what the list was generally about (<strong className="pr-term">gist memory</strong>).
        </p>

        <h3 className="pr-h3">Study Phase</h3>
        <p>
          Participants study <strong className="pr-term">5 DRM word lists</strong>, with each word visibly and automatically saved into an external folder. Automatic saving makes storage apparent without introducing additional actions, such as typing or manually saving, that could confound encoding.
        </p>
        <figure className="mm-gif">
          <LoopClip src={`${VID}memory-save-effect.mp4`} poster={`${IMG}save-effect-poster.jpg`} label="A studied word moves automatically into the saved folder" />
          
        </figure>
        <p>
          The first 3 lists serve as <strong className="pr-term">trust-building</strong> trials. Participants are told that their saved files will be accessible during recognition, while repeatedly seeing words enter the folder is intended to build confidence that the system preserves information for later retrieval. These files are subsequently available at the memory test, as promised.
        </p>
        <p>The final 2 lists form the <strong className="pr-term">critical</strong> experimental comparison:</p>
        <div className="mm-vs">
          <article>
            <h3>No-offloading condition</h3>
            <p>Participants are told before studying that their saved file will <strong className="pr-term">NOT</strong> be available during recognition, encouraging them to remember the words themselves rather than rely on external storage. At recognition, they must retrieve the words from their own memory, as expected.</p>
          </article>
          <article>
            <h3>Offloading condition</h3>
            <p>Participants are told that their saved file will be accessible during recognition, allowing them to rely on external storage rather than memorizing all the words themselves. However, access is unexpectedly withheld at recognition, allowing me to test what they remember internally after having expected external support.</p>
          </article>
        </div>
        <p>
          Thus, both conditions require <strong className="pr-term">unaided recognition</strong> but differ in the expectations under which the memories were formed. The saving process remains identical, and I counterbalance list assignments and condition order.
        </p>

        <h3 className="pr-h3">Main Recognition Test</h3>
        <p>
          After studying all 5 lists, participants complete an arithmetic distractor task followed by a <strong className="pr-term">120-trial conjoint-recognition test</strong>. Test items include studied words, deliberately omitted strongly associated words (<strong className="pr-term">critical lures</strong>), other related lures, and unrelated new words.
        </p>
        <p>For example, consider the studied list:</p>
        <ul className="mm-words" aria-label="Studied list">
          {DRM_WORDS.map(w => <li key={w}><em>{w}</em></li>)}
        </ul>
        <p>
          The strongly associated word <em><strong>sleep</strong></em> was never presented. Rather than simply judging whether a word appeared, participants respond <strong className="pr-term">Yes or No</strong> to one of these following 4 statements:
        </p>
        <div className="mm-scroll" tabIndex={0} role="group" aria-label="The four recognition statements. Scroll sideways on a narrow screen.">
          <table className="mm-table mm-stm">
            <thead><tr><th scope="col">Judgment</th><th scope="col">Statement</th><th scope="col">Correct response for “<em>sleep</em>”</th></tr></thead>
            <tbody>
              {DRM_STATEMENTS.map(([j, s, r, y]) => (
                <tr key={j}><th scope="row">{j}</th><td>{s}</td><td className={y ? 'y' : ''}>{r}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          Each word receives one statement during the main test, with judgment types rotated across words and participant assignments. Comparing response patterns allows me to examine both <strong className="pr-term">individual memory errors</strong> and <strong className="pr-term">logical inconsistencies across memory judgments</strong> (illustrated in “Planned Analyses”).
        </p>
        <Tabs
          label="Study 1 test screens"
          items={[
            { name: 'Trust trials · test phase', node: <figure className="mm-shot"><img src={`${IMG}trust-test.png`} alt="Test screen on a trust-building trial: the word “blanket” with the statement that it was not presented but was similar in meaning, and the saved word file shown beside it" /></figure> },
            { name: 'Critical trials · offloading & no-offloading', node: <figure className="mm-shot"><img src={`${IMG}critical-test.png`} alt="Test screen on a critical trial, where the saved word file is not available" /></figure> },
          ]}
        />

        <h3 className="pr-h3">Delayed Recognition Test</h3>
        <p>
          After the main test, participants complete additional arithmetic, 3-back working-memory, and picture-memory tasks to reduce memory for their earlier recognition responses before they encounter selected words again in the <strong className="pr-term">delayed repeated-probe test</strong>. They then evaluate selected words from the two critical lists under different, potentially incompatible statements. This allows me to examine <strong className="pr-term">impossible conjunctions</strong>, where the same participant endorses contradictory memories of the same word, for example, first judging <em>sleep</em> as studied and later judging it as new but related.
        </p>

        <h3 className="pr-h3">Need for Cognition</h3>
        <p>
          After the memory tasks, participants complete the <strong className="pr-term">six-item Need for Cognition Scale (NCS-6)</strong>. I explore whether enjoyment of effortful thinking moderates offloading-related memory effects, as people who enjoy thinking may continue encoding information internally even when external support is expected. The questionnaire is administered afterward to avoid priming cognitive effort during the task.
        </p>

        <h3 className="pr-h3">Planned Analyses</h3>
        <p>I plan to compare the critical conditions at 3 complementary levels.</p>
        <ol className="mm-an">
          <li>
            <h4><span className="mm-cn" aria-hidden="true">1</span><strong>Memory accuracy and false recognition.</strong></h4>
            <p>I compare correct recognition of studied words and false recognition of related but unstudied words across the critical conditions.</p>
          </li>
          <li>
            <h4><span className="mm-cn" aria-hidden="true">2</span><strong>Deep memory distortions.</strong></h4>
            <p>Using the conjoint-recognition responses, I test 4 forms of logical inconsistency:</p>
            <Distortions items={DRM_DIST} label="Four deep distortions in Study 1" />
            <p>p(V), p(G), p(VG), and p(ND) represent the proportions of “Yes” responses to the corresponding statements, calculated for comparable categories of test words within each condition. The first three distortions are measured from <strong>overall response patterns</strong> across different words, while impossible conjunctions involve repeated judgments of the same word by the same participant.</p>
</li>
          <li>
            <h4><span className="mm-cn" aria-hidden="true">3</span><strong>Underlying memory processes.</strong></h4>
            <p>
              Finally, I plan to fit a <strong className="pr-term">conjoint-recognition multinomial processing-tree (MPT) model</strong> to estimate the cognitive processes underlying recognition judgments. By analyzing Yes/No responses across <strong className="pr-term">V (studied), G (new but related), and VG (either)</strong> questions for different word types, the model distinguishes several possible contributors:
            </p>
            <ul className="mm-contrib">
              <li><b aria-hidden="true" /><span><strong className="pr-term">Verbatim-based processes:</strong> Remembering exactly which words appeared (identity recollection) and using those memories to reject related but unstudied words (recollection rejection).</span></li>
              <li><b aria-hidden="true" /><span><strong className="pr-term">Gist-based processes:</strong> Recognizing words through shared meaning (similarity judgment) or experiencing a vivid but false memory of having studied them (phantom recollection).</span></li>
              <li><b aria-hidden="true" /><span><strong className="pr-term">Response bias:</strong> A tendency to answer Yes or No when memory evidence is uncertain.</span></li>
            </ul>
            <p>
              For example, falsely recognizing <em>sleep</em> might reflect meaning-based familiarity, difficulty rejecting a related lure, or response bias. The model estimates these contributions from <strong className="pr-term">overall response patterns</strong> rather than assuming that any single error reveals its underlying cause. Comparing parameters across conditions will help explain any offloading-related differences.
            </p>
          </li>
        </ol>
      </Sec>

      {/* ------------------------------------------------------------ study 2 */}
      <Sec id="mm-s2" icon="brain" kicker="Study 2" title="Semantic Memory">
        <h3 className="pr-h3">Paradigm</h3>
        <p>
          To investigate whether cognitive offloading also influences semantic memory, I adapt the <strong className="pr-term">Distortion in Everyday Memory (DEM) paradigm</strong> developed by <Cite k="brainerd2024">Brainerd et al. (2024)</Cite>. DEM uses <strong className="pr-term">Jeopardy!-style trivia questions</strong> to examine factual knowledge acquired before the experiment. Because participants’ prior knowledge varies widely, trivia provides a practical way to sample facts they may have encountered through education, media, and everyday experiences. The questions span domains such as science, history, geography, and popular culture that sample a broad range of knowledge rather than relying on expertise in any single area, allowing me to compare performance across conditions within each participant.
        </p>
        <p>
          Jeopardy!-style questions are useful because they are moderately challenging: overly easy questions leave little room for memory errors, while obscure ones may encourage guessing. DEM presents <strong className="pr-term">plausible but mutually incompatible answers</strong> to examine whether participants can distinguish precise factual knowledge from broader familiarity. Indeed, similar challenges arise in academic, professional, and research settings, where we may understand the general principles of a concept or theory but struggle to recall specific details needed to distinguish between plausible alternatives. Here, <strong className="pr-term">verbatim memory</strong> supports identifying correct facts and rejecting incorrect ones, while <strong className="pr-term">gist memory</strong> can make multiple alternatives seem reasonable. DEM thus allows me to investigate whether expected external support affects the accuracy and logical consistency of judgments based on existing knowledge.
        </p>

        <h3 className="pr-h3">Experimental Procedure</h3>
        <p>
          Participants complete <strong className="pr-term">192 factual memory trials</strong>, divided into 2 blocks of 96 trials each. Both require Yes/No judgments about everyday facts but differ in access to external support:
        </p>
        <div className="mm-vs">
          <article>
            <h3>No-offloading condition</h3>
            <p>Participants answer using their existing knowledge without a search tool.</p>
          </article>
          <article>
            <h3>Offloading condition</h3>
            <p>Participants can click an embedded Google Search button, which either provides a Google AI Overview or returns a “Search unavailable” message.</p>
          </article>
        </div>
        <p>
          I chose <strong className="pr-term">Google AI Overviews</strong> to reflect the growing role of AI-generated summaries in everyday information seeking. <Cite k="pew">Pew Research Center (2025)</Cite> found that users encountering AI summaries were less likely to follow external links and more likely to end their browsing sessions, suggesting that these summaries increasingly serve as immediate sources of factual information. I use <strong className="pr-term">standardized screenshots</strong> accessible with a single click, avoiding confounds from query formulation, personalization, changing search rankings, and variable retrieval times that could complicate response-time comparisons.
        </p>
        <Tabs
          label="Study 2 trial types"
          items={[
            { name: 'Control trial without search', node: <figure className="mm-shot"><img src={`${IMG}control-trial.png`} alt="A trivia statement, “The national dish of Spain is churros or paella”, with Yes and No answers and no search tool" /></figure> },
            { name: 'Search available · AI Overview', node: <figure className="mm-shot"><LoopClip src={`${VID}memory-search-available.mp4`} poster={`${IMG}search-available-poster.jpg`} label="An offloading trial: the statement “The national dish of Spain is churros or paella”, with a Google Search panel that returns an AI Overview about paella" /></figure> },
            { name: 'Search unavailable', node: <figure className="mm-shot"><LoopClip src={`${VID}memory-search-unavailable-spain.mp4`} poster={`${IMG}search-unavailable-poster.jpg`} label="An offloading trial: the statement “The national dish of Spain is churros or paella”, with a Google Search panel that reads “Search is unavailable.”" /></figure> },
          ]}
        />
        <p>
          Within the offloading block, 36 trials provide search access, while 60 do not. The first trial is guaranteed to be available, and search works relatively often early on before becoming less frequent and unpredictable. Inspired by the <strong className="pr-term">Iowa Gambling Task</strong> (<Cite k="bechara">Bechara et al., 1994</Cite>), where early experiences can shape expectations and subsequent behavior across many trials, this schedule is intended to establish the tool’s usefulness and sustain expectations of external support through occasional successful searches. Thus, participants may continue approaching later trials expecting that external verification could help, even when it is unavailable.
        </p>
        <p>
          The <strong className="pr-term">critical comparison</strong> is between the 60 search-unavailable offloading trials and 60 matched control trials. Both require <strong className="pr-term">unaided factual judgments</strong> under the same 10-second limit, but only the former occur in a context where participants have learned that search may help. The 36 search-available trials primarily establish and sustain this expectation. I also counterbalance block order and factual material assignments to reduce confounds from differences in prior knowledge, question difficulty, practice, and fatigue.
        </p>

        <h3 className="pr-h3">Factual Memory Judgments</h3>
        <p>
          As in DRM, I use conjoint recognition, but here participants evaluate factual alternatives rather than newly studied words. Each fact has 3 mutually incompatible answers: A (correct), B, and C (plausible but incorrect). For example:
        </p>
        <Instrument />
        <p>
          Participants see complete statements rather than the analytical labels. Each evaluates <strong className="pr-term">1 version of each fact</strong>, with the 6 judgment types counterbalanced across participants to avoid responses to one version influencing another.
        </p>

        <h3 className="pr-h3">Need for Cognition</h3>
        <p>
          As in Study 1, participants complete the <strong className="pr-term">NCS-6 afterward</strong>. Here, I also explore whether enjoyment of effortful thinking moderates search behavior and offloading-related effects.
        </p>

        <h3 className="pr-h3">Planned Analyses</h3>
        <p>Following Study 1, I examine accuracy, deep distortions, and underlying memory processes, with additional measures of search behavior.</p>
        <ol className="mm-an">
          <li>
            <h4><span className="mm-cn" aria-hidden="true">1</span><strong>Factual accuracy and search behavior.</strong></h4>
            <p>I compare acceptance of correct and incorrect statements, response times, and search attempts, including whether participants continue consulting the tool as availability declines.</p>
          </li>
          <li>
            <h4><span className="mm-cn" aria-hidden="true">2</span><strong>Deep memory distortions.</strong></h4>
            <p>Beyond individual factual errors, I will examine whether patterns of judgments violate the logical relationships among mutually incompatible alternatives.</p>
            <Distortions items={DEM_DIST} label="Four deep distortions in Study 2" dem />
            <p>Here, p(A), p(B), and p(C) represent Yes-response proportions for individual alternatives, and p(AB), p(BC), and p(CA) for their “either-or” combinations. The first three measures assess probability rule violations, while compensation examines whether support for incompatible answers offsets one another. All are estimated <strong className="pr-term">across questions and participants</strong>. Unlike DRM, DEM omits delayed repeated probes because stable factual knowledge and memory for earlier responses could influence subsequent judgments, even after distractor tasks.</p>
          </li>
          <li>
            <h4><span className="mm-cn" aria-hidden="true">3</span><strong>Underlying memory processes.</strong></h4>
            <p>
              As in Study 1, I use a multinomial processing-tree (MPT) model to estimate underlying memory processes from Yes/No response patterns. The semantic-memory model developed by <Cite k="brainerd2024">Brainerd et al. (2024)</Cite> estimates 5 parameters across the 6 judgment types:
            </p>
            <ul className="mm-contrib">
              <li><b aria-hidden="true" /><span><strong className="pr-term">Verbatim retrieval (V<sub>a</sub>):</strong> Retrieving precise factual knowledge to identify the correct answer and reject incompatible alternatives.</span></li>
              <li><b aria-hidden="true" /><span><strong className="pr-term">Gist retrieval (G<sub>a</sub>, G<sub>b</sub>, G<sub>c</sub>):</strong> Retrieving broader knowledge or plausibility associated with each alternative, potentially supporting both correct and incorrect answers.</span></li>
              <li><b aria-hidden="true" /><span><strong className="pr-term">Response bias (b):</strong> A tendency to respond Yes when memory evidence is insufficient.</span></li>
            </ul>
            <p>
              For example, incorrectly accepting B could reflect gist-based plausibility, failure to retrieve the correct fact, or response bias. Rather than attributing individual responses to specific processes, the model estimates their contributions from <strong className="pr-term">overall response patterns</strong>. Comparing parameters across conditions allows me to investigate whether anticipated external verification affects precise factual retrieval, gist-based judgments, or response bias.
            </p>
          </li>
        </ol>
      </Sec>
      <div className="xp-note mm-note mm-final">
        <span aria-hidden="true"><Hourglass /></span>
        <div className="mm-nb"><p>I am starting to collect data this month!</p></div>
      </div>
      <div className="xp-endmark" id="mm-endmark" aria-hidden="true" />
    </div>
  );
};

export default MemoryDetail;
