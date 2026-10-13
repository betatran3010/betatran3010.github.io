import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown, Hourglass, Users } from 'lucide-react';
import SecHead, { SecIcon } from './SecHead';

type IconName = React.ComponentProps<typeof SecHead>['icon'];

const IMG = `${import.meta.env.BASE_URL}images/`;
const FIGS = `${import.meta.env.BASE_URL}images/xplain-figs/`;
const VID = `${import.meta.env.BASE_URL}videos/`;
const PAPER_URL = 'https://doi.org/10.1145/3816046.3816235';

type Fig = { src: string; tab?: string; cap: string; alt: string };

/** Feature colors follow the icon colors inside the XPLAIN sidebar itself. Figures are the interface figures from the CUI ’26 paper. */
const FEATURES: { key: string; name: string; color: string; body: React.ReactNode; figs: Fig[] }[] = [
  {
    key: 'clar',
    name: 'Lexical clarifications',
    color: '#EE8B2C',
    body: (
      <>Drawing on psycholinguistic accounts of lexical access and contextual understanding, clarifications provide <strong className="pr-term">brief, context-specific explanations</strong> of complex terms, slang, idioms, acronyms, concepts, and cultural references to address linguistic, cultural, and domain knowledge gaps.</>
    ),
    figs: [
      {
        src: 'cui-fig1.jpg',
        cap: 'Clarifications attach to highlighted words in the caption. Clicking one opens a small popup above the transcript and saves the same content as a minimized tab in the sidebar, with images for concrete items.',
        alt: 'XPLAIN in a Zoom call: the word “call the shots” is highlighted green in the caption, a popup above the caption defines it, and the sidebar lists the clarification in minimized and expanded form',
      },
    ],
  },
  {
    key: 'sug',
    name: 'Response suggestions',
    color: '#6F5FD6',
    body: (
      <>For NNS, slower lexical retrieval and less automatic formulation can compete with conceptualization (deciding what to say), contributing to pauses, hesitations, and repairs. Suggestions provide <strong className="pr-term">relevant ideas and sentence frames</strong> after conversational questions to support response planning and expression.</>
    ),
    figs: [
      {
        src: 'cui-fig2.jpg',
        tab: 'Idea-level',
        cap: 'Idea suggestions live only in the sidebar as separate, titled tabs that expand and minimize the same way each time, with images for concrete items.',
        alt: 'XPLAIN sidebar with an expanded idea suggestion for donburi ideas, including a short description and a photo, after a question in the caption',
      },
      {
        src: 'cui-fig3.jpg',
        tab: 'Sentence-level',
        cap: 'Sentence suggestions open on their own after a question and minimize with a click. They offer both an agreeing and a disagreeing response.',
        alt: 'XPLAIN sidebar with an expanded sentence suggestion showing an agree and a disagree response to a question about USDA-graded beef',
      },
    ],
  },
  {
    key: 'sum',
    name: 'Situational summaries',
    color: '#D94A8C',
    body: (
      <>Effortful comprehension and response planning can leave fewer working-memory resources for retaining earlier discussion. Summaries externalize <strong className="pr-term">key decisions, preferences, and constraints at topic transitions</strong>, helping users retain context while processing new speech.</>
    ),
    figs: [
      {
        src: 'cui-fig4.jpg',
        cap: 'Summaries open after a topic shift and minimize with a click. They appear only in the sidebar as separate, titled tabs.',
        alt: 'XPLAIN sidebar with an expanded summary of the main dishes discussed so far after the conversation moves on to drinks',
      },
    ],
  },
];

const ANALYSIS: [string, string][] = [
  ['Interview analysis', 'We conducted inductive reflexive thematic analysis in ATLAS.ti, examining participants’ backgrounds and communication strategies alongside scaffold usefulness, timing, cognitive effort, and social comfort to identify circumstances that supported participation or introduced distraction and overreliance.'],
  ['Disfluency coding', 'We coded pauses, hesitations, and repairs (restarts, reformulations, and repetitions), recording their timing, duration, and associated scaffold to examine their occurrence during scaffold use.'],
  ['Visual behavioral coding', 'We coded gaze shifts, sustained viewing, clicks, and scaffold uptake around the captions and sidebar, contextualizing disfluencies in relation to reading, response planning, and interface interaction.'],
];

type Adapt = { dim: string; how: string; adj: string; lower: [string, string][]; higher: [string, string][] };
const ADAPT: Adapt[] = [
  {
    dim: 'Language proficiency',
    how: 'LexTALE and idiom-comprehension scores',
    adj: 'Vocabulary and response formulation',
    lower: [
      ['Clarifications', 'Explain a broader range of complex and figurative expressions.'],
      ['Suggestions', 'Pair ideas with sentence frames to ease response planning and formulation.'],
    ],
    higher: [
      ['Clarifications', 'Focus on advanced or unfamiliar expressions.'],
      ['Suggestions', 'Offer compact conceptual prompts without examples or fully worded responses to reduce reading demands and leave users to formulate their own wording.'],
    ],
  },
  {
    dim: 'Domain familiarity',
    how: 'Domain-knowledge questions and self-rated familiarity',
    adj: 'Assumed technical knowledge',
    lower: [['Clarifications', 'Explain foundational domain terms and familiar words with specialized meanings.'], ['Suggestions', 'Use everyday vocabulary or clearly explained technical terms.']],
    higher: [['Clarifications', 'Focus on specialized terminology beyond common domain knowledge.'], ['Suggestions', 'Use more advanced domain vocabulary.']],
  },
  {
    dim: 'Metacognitive awareness',
    how: 'Self-reported listening and monitoring strategies',
    adj: 'Clarification coverage and supporting context',
    lower: [['Clarifications', 'Explain more terms and include relevant background, even when the conversation provides clues to their meaning.']],
    higher: [['Clarifications', 'Focus on terms that remain unclear from context, drawing on earlier discussion without repeating background information.']],
  },
  {
    dim: 'Working memory',
    how: 'Sentence-recall performance, language and listening-strategy assessments',
    adj: 'Sentence structure and summary content',
    lower: [['Suggestions', 'Use short, direct sentences with fewer clauses.'], ['Summaries', 'Favor shorter summaries focused on essential points.']],
    higher: [['Suggestions', 'Allow more complex sentences connecting reasons, contrasts, and conditions.'], ['Summaries', 'Favor summaries with more context and detail.']],
  },
];

const MEASURES: [string, string][] = [
  ['Background assessments', 'We measured English proficiency, prior coursework, domain exposure, and medical-language familiarity to contextualize individual differences.'],
  ['Experience ratings', 'We assessed understanding, mental effort, time pressure, response preparation, expression accuracy, conversational flow, and confidence across conditions through format-specific ratings.'],
  ['Vocabulary recall', 'We assessed retention of clarified terms to examine learning alongside immediate conversational support.'],
  ['Interview analysis', 'We coded explanations of format preferences and trade-offs to understand the reasoning behind ratings and language-switching choices.'],
];

const DISCOVERY: { title: string; items: [string, string][]; design: string }[] = [
  {
    title: 'Differences in knowledge and expression',
    items: [
      ['Existing knowledge', 'Even fluent English speakers needed explanations tailored to their healthcare experience and familiarity with medical and insurance concepts.'],
      ['Describing symptoms', 'Patients struggled to describe symptoms precisely in English despite being able to do so in their L1. Unfamiliar terminologies led to skipped intake questions or incomplete descriptions during appointments.'],
      ['Preferred formats', 'Patients preferred short explanations, pictures, body maps, and sliders to understand information and describe their experiences.'],
      ['Provider knowledge', 'Providers could also be unfamiliar with conditions, medications, or practices from patients’ home countries.'],
    ],
    design: 'Adapt explanations to existing knowledge and offer L1, free-text, and visual options for expressing symptoms and sharing relevant context.',
  },
  {
    title: 'Understanding care and identifying questions',
    items: [
      ['Procedure explanations', 'Patients could understand a translated medical term (e.g., “root canal”) without understanding the procedure, its purpose, effects, or alternatives.'],
      ['Unrecognized information gaps', 'Limited familiarity with U.S. healthcare made relevant questions difficult to identify, contributing to passive acceptance of providers’ recommendations.'],
    ],
    design: 'Pair translated terms with plain-language explanations and help patients identify questions about proposed care.',
  },
  {
    title: 'Support across appointment stages and settings',
    items: [
      ['Preparation', 'Patients wanted help organizing symptoms, timelines, and questions before appointments.'],
      ['Delayed clarification', 'Patients used ChatGPT after visits to interpret information they had received, especially treatment/medication instructions and bills, but opportunities for questions with the provider had passed.'],
      ['Care setting', 'Patients valued preparation, terminology clarification and follow-up support for procedural/physical care. In therapy, some felt an intermediary could disrupt conversational flow and rapport.'],
    ],
    design: 'Provide a pre-visit symptom and question guide, optional in-session explanations, and plain-language summaries of instructions and bills, with live assistance easy to pause or disable.',
  },
];


const FACTORS: { key: 'lang' | 'ctx' | 'dom'; name: string; levels: string[]; why: string[] }[] = [
  {
    key: 'lang',
    name: 'Language format',
    levels: ['L1', 'English', 'Bilingual'],
    why: [
      'Either language can cue existing knowledge, depending on prior learning and use.',
      'English supplies lexical forms for responding in English.',
      'Bilingual presentation offers both but may add reading and comparison demands.',
    ],
  },
  {
    key: 'ctx',
    name: 'Processing context',
    levels: ['Comprehension', 'Response planning/production'],
    why: [
      'Comprehension requires connecting incoming words to meaning.',
      'Production requires retrieving and formulating that meaning into English speech, making conceptual access and available wording jointly important.',
    ],
  },
  {
    key: 'dom',
    name: 'Domain specificity',
    levels: ['Technical', 'General terminology'],
    why: [
      'Technical knowledge may be tied to a particular language of education.',
      'General terms may be accessible across languages or inferred from context.',
    ],
  },
];


const CONTENTS: { id: string; kicker: string; title: string; icon: IconName }[] = [
  { id: 'xp-s1', kicker: 'Study 1', icon: 'chat', title: 'Supporting Comprehension, Response Planning, and Context Tracking' },
  { id: 'xp-s2', kicker: 'Study 2', icon: 'sliders', title: 'Personalizing Support to Different User Needs' },
  { id: 'xp-s3', kicker: 'Study 3', icon: 'languages', title: 'Drawing on Bilingual Resources for Understanding and Expression' },
  { id: 'xp-icorps', kicker: 'NSF I-Corps', icon: 'care', title: 'Customer Discovery for Healthcare Communication' },
];

const jump = (id: string) => (e: React.MouseEvent) => {
  e.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const Sec: React.FC<{ id: string; icon: IconName; kicker?: string; title: string; children: React.ReactNode }> = ({ id, icon, kicker, title, children }) => (
  <section className="pr-sec xp-sec" id={id}>
    {kicker && <p className="xp-kicker">{kicker}</p>}
    <SecHead icon={icon}>{title}</SecHead>
    {children}
    <div className="xp-endmark" aria-hidden="true" />
  </section>
);

const Note: React.FC<{ small?: boolean; icon: React.ReactNode; children: React.ReactNode }> = ({ small, icon, children }) => (
  <div className={`xp-note${small ? ' sm' : ''}`}>
    <span aria-hidden="true">{icon}</span>
    <p>{children}</p>
  </div>
);

const Finding: React.FC<{ n: number; title: string; children: React.ReactNode }> = ({ n, title, children }) => (
  <article className="pr-finding">
    <span className="pr-fn" aria-hidden="true">{n}</span>
    <div className="pr-fbody">
      <h3>{title}</h3>
      {children}
    </div>
  </article>
);

/** Video with a large play button in the middle; native controls take over once it plays. */
const Video: React.FC<{ src: string; label: string }> = ({ src, label }) => {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  return (
    <div className="xp-vwrap">
      <video
        ref={ref}
        controls
        preload="metadata"
        playsInline
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

const LEADS = ['Either language', 'English', 'Bilingual', 'Comprehension', 'Production', 'Technical', 'General'];
const boldLead = (w: string) => {
  const l = LEADS.find(x => w.startsWith(x));
  return l ? <><strong>{l}</strong>{w.slice(l.length)}</> : w;
};
const NAV = [
  { id: 'xp-overview', label: 'Overview' },
  { id: 'xp-s1', label: 'Study 1' },
  { id: 'xp-s2', label: 'Study 2' },
  { id: 'xp-s3', label: 'Study 3' },
  { id: 'xp-icorps', label: 'I-Corps' },
];

/** Section navigation that follows the reader: a quiet rail in the margin on wide screens, a slim bar on narrow ones. */
const SideNav: React.FC = () => {
  const [on, setOn] = useState(false);
  const [active, setActive] = useState(NAV[0].id);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const toc = document.getElementById('xp-contents');
      const last = document.getElementById('xp-icorps');
      const pastToc = !!toc && toc.getBoundingClientRect().bottom < 0;
      const beforeEnd = !!last && last.getBoundingClientRect().bottom > 240;
      setOn(pastToc && beforeEnd);
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

const XplainDetail: React.FC = () => {
  const [ft, setFt] = useState(0);
  const [fg, setFg] = useState(0);
  const [dc, setDc] = useState(0);
  const F = FEATURES[ft];
  const fig = F.figs[Math.min(fg, F.figs.length - 1)];
  const D = DISCOVERY[dc];

  return (
    <div className="pr xp">
      <SideNav />
      {/* ------------------------------------------------------------ header */}
      <header className="pr-head">
        <p className="lab">Communication and Collaborative Technologies Lab</p>
        <h1>XPLAIN - Proactive Meeting AI</h1>
        <ul className="pc-chips pr-chips">
          <li>Cornell University</li>
          <li>PI: Dr. Susan Fussell</li>
        </ul>
      </header>

      <div className="cover pr-cover">
        <img
          src={`${IMG}xplain-cover.png`}
          alt="XPLAIN prototype on a laptop: a video call with captions and a sidebar containing clarifications, a suggestion and a summary"
        />
      </div>

      {/* ------------------------------------------------------------ contents */}
      <nav className="xp-contents" id="xp-contents" aria-label="Studies in this project">
        {CONTENTS.map(c => (
          <a key={c.id} href={`#${c.id}`} onClick={jump(c.id)}>
            <div className="xp-cin"><SecIcon icon={c.icon} className="" /><span>{c.kicker}</span></div>
            <b>{c.title}</b>
            <span className="xp-go" aria-hidden="true">Read <ArrowDown /></span>
          </a>
        ))}
      </nav>

      {/* ------------------------------------------------------------ overview */}
      <section className="pr-sec pr-overview xp-sec" id="xp-overview">
        <SecHead icon="doc">Overview</SecHead>
        <div className="pr-obody">
          <p>
            Non-native speakers (NNS) encounter substantial <strong className="pr-term">cognitive challenges during real-time spoken communication</strong>, including processing unfamiliar vocabulary, predicting upcoming content, and formulating responses simultaneously under conversational time pressure. Seeking clarification or consulting translation tools can add to these demands and interrupt conversational flow. We ask:
          </p>
          <div className="q pr-q2">
            <p><b>RQ</b>How can we support non-native speakers’ comprehension and expression in live conversations while accommodating individual processing needs and preserving control over their contributions?</p>
          </div>
          <p>
            We developed XPLAIN, an AI assistant built with <u className="pr-ul">React/Electron</u> and a <u className="pr-ul">Python backend</u>, integrating <u className="pr-ul">Google Cloud Speech-to-Text</u> and <u className="pr-ul">GPT-4o</u> to <strong className="pr-term">provide proactive, just-in-time cognitive scaffolding</strong> during video meetings. It uses live conversational cues to identify potential gaps in understanding and participation and generate contextual support.
          </p>
          <p>
            Under my PhD mentor’s project leadership, my UX/UI teammates and I developed and evaluated Wizard-of-Oz prototypes, conducted user studies and interviews, and systematically coded and analyzed user data. I shared designs and findings with engineering teammates who built the automated system in parallel. Across studies, we examined assistance’s benefits and costs to guide adaptations to users’ cognitive profiles, support needs, and conversational demands.
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------------ study 1 */}
      <Sec id="xp-s1" icon="chat" kicker="Study 1" title="Supporting Comprehension, Response Planning, and Context Tracking">
        <p>We addressed these processing demands through 3 complementary features:</p>
        <div className="xp-scaf">
          <div className="pr-seg" role="tablist" aria-label="XPLAIN features">
            {FEATURES.map((x, i) => (
              <button
                key={x.key}
                type="button"
                role="tab"
                aria-selected={i === ft}
                className={i === ft ? 'on' : ''}
                style={{ ['--mc' as string]: x.color, ['--fg' as string]: '#fff' } as React.CSSProperties}
                onClick={() => { setFt(i); setFg(0); }}
              >
                <b>{i + 1}. {x.name}</b>
              </button>
            ))}
          </div>
          <div className="xp-stack">
            {FEATURES.map((x, i) => (
              <div className={`xp-pane${i === ft ? ' on' : ''}`} key={x.key} role="tabpanel" aria-hidden={i !== ft}>
                <p>{x.body}</p>
              </div>
            ))}
          </div>
          <div className="xp-figwrap" style={{ ['--mc' as string]: F.color } as React.CSSProperties}>
            <div className="xp-figtabs" role="tablist" aria-label={`${F.name} figures`} style={F.figs.length > 1 ? undefined : { visibility: 'hidden' }}>
              {(F.figs.length > 1 ? F.figs : [{ src: 'x', tab: 'Idea-level', alt: '' }, { src: 'y', tab: 'Sentence-level', alt: '' }]).map((f, i) => (
                <button key={f.src} type="button" role="tab" tabIndex={F.figs.length > 1 ? 0 : -1} aria-selected={i === fg} onClick={() => setFg(i)}>{f.tab}</button>
              ))}
            </div>
            <div className="xp-stack">
              {FEATURES.map((x, i) => x.figs.map((f, j) => (
                <figure className={`xp-fig${i === ft && j === (x.figs.length > 1 ? fg : 0) ? ' on' : ''}`} key={f.src} aria-hidden={!(i === ft && j === fg)}>
                  <div className="xp-pan"><img src={`${FIGS}${f.src}`} alt={f.alt} /></div>
                </figure>
              )))}
            </div>
            <p className="xp-hint">Swipe sideways to see the full figure</p>
            <p className="xp-credit">Interface figures adapted from <a href={PAPER_URL} target="_blank" rel="noopener noreferrer">He and Fussell (2026)</a>.</p>
          </div>
        </div>

        <h3 className="pr-h3">Coding &amp; Analysis</h3>
        <p>We first evaluated XPLAIN with 38 participants, combining different measures to examine scaffold use and experience.</p>
        <dl className="pr-spec">
          {ANALYSIS.map(([t, d]) => (
            <div key={t}><dt>{t}</dt><dd>{d}</dd></div>
          ))}
        </dl>

        <h3 className="pr-h3">Key Findings</h3>
        <div className="xp-findings">
          <Finding n={1} title="Scaffolds supported understanding and confidence">
            <p>Participants used XPLAIN to bridge knowledge gaps and prepare contributions without asking the other speaker for clarification. This “backstage” repair channel reduced the social discomfort of revealing uncertainty.</p>
          </Finding>
          <Finding n={2} title="Assistance introduced trade-offs in attention and authorship">
            <p>Clarifications and summaries facilitated low-friction understanding and context tracking, while suggestions added cognitive demands during response formation. Users either:</p>
            <div className="xp-either">
              <p>paused to read and weigh suggestions against their own ideas, disrupting listening and delaying responses</p>
              <span aria-hidden="true">and/or</span>
              <p>adopted them with minimal modification, masking overreliance behind fluent, homogenized responses.</p>
            </div>
          </Finding>
          <Finding n={3} title="Smoother speech was not always a meaningful outcome">
            <p>Participants retrospectively described accepting brief hesitations and repairs as a cost of making more substantive contributions. This challenges treating reduced disfluency as a sufficient indicator of better support since those disfluencies may reflect useful consideration and integration of assistance.</p>
          </Finding>
        </div>
        <Note icon={<Users />}>
          Across participants, the same assistance could support participation in one situation yet distract, overwhelm, or encourage overreliance in another. These experiences varied with language proficiency, communication style, prior AI experience, and the demands of the conversation.
        </Note>
      </Sec>

      {/* ------------------------------------------------------------ study 2 */}
      <Sec id="xp-s2" icon="sliders" kicker="Study 2" title="Personalizing Support to Different User Needs">
        <p>We subsequently moved beyond one-size-fits-all scaffolding and asked:</p>
        <div className="q pr-q2">
          <p><b>RQ</b>How can we tailor the content, amount, and presentation of scaffolding to users’ cognitive profiles and support needs to effectively support participation and preserve control over their contributions?</p>
        </div>

        <h3 className="pr-h3">Personalization Framework</h3>
        <p>
          We organized interview codes into eight thematic domains covering user backgrounds, communication strategies, and scaffold evaluations. Using <strong className="pr-term">latent class analysis (LCA)</strong>, we compared alternative models to identify profiles within each domain and examined associations with participant characteristics and questionnaire ratings.
        </p>
        <p>
          Limited correspondence across domains suggested that support needs could not be captured by a single user type. Together with disfluency and visual behavioral analyses, these findings informed a developing personalization framework refined across studies.
        </p>

        <h3 className="pr-h3">Adaptive Support</h3>
        <p>User assessments guide four overlapping dimensions of personalization.</p>
        <div className="xp-cmps">
          {ADAPT.map((a, di) => {
            return (
              <section className="xp-cmp" key={a.dim} aria-label={a.dim}>
                <header>
                  <span className="xp-num" aria-hidden="true">{di + 1}</span><h4>{a.dim}</h4><i aria-hidden="true">•</i><p className="as">{a.how}</p>
                </header>
                <p className="aj"><span>Adjusts</span><b>{a.adj}</b></p>
                <div className="xp-scale" aria-hidden="true">
                  <em className="l">Lower</em><em className="r">Higher</em>
                  <b className="bar"><u className="k l" /><u className="k r" /></b>
                </div>
                <div className="xp-cards">
                  <div className="xc lo"><span className="sr-only">Lower scores or ratings</span>
                    {a.lower.map(([k, v]) => <p className="sd" key={v}>{k && <b>{k}: </b>}{v}</p>)}
                  </div>
                  <div className="xc hi"><span className="sr-only">Higher scores or ratings</span>
                    {a.higher.map(([k, v]) => <p className="sd" key={v}>{k && <b>{k}: </b>}{v}</p>)}
                  </div>
                </div>
              </section>
            );
          })}
        </div>

        <p>Different combinations of these needs can lead to different forms of support, as illustrated below:</p>
        <div className="xp-shots">
          <figure className="xp-shot">
            <div className="xp-pan"><img src={`${IMG}low-suggestion.png`} alt="Suggestion with full sentences giving a positive and a negative point about data collection" /></div>
            <p className="xp-hint">Swipe sideways to see the full figure</p>
            <figcaption><b>Example 1:</b> Full-sentence ideas and sample responses.</figcaption>
          </figure>
          <figure className="xp-shot">
            <div className="xp-pan"><img src={`${IMG}high-suggestion.png`} alt="Suggestion with brief phrases about autonomous control and ambiguous management" /></div>
            <p className="xp-hint">Swipe sideways to see the full figure</p>
            <figcaption><b>Example 2:</b> Short idea phrases without sample responses.</figcaption>
          </figure>
        </div>
        <Note small icon={<Hourglass />}>Data collection is complete. Analysis is ongoing.</Note>
      </Sec>

      {/* ------------------------------------------------------------ study 3 */}
      <Sec id="xp-s3" icon="languages" kicker="Study 3" title="Drawing on Bilingual Resources for Understanding and Expression">
        <p>
          Beyond differences in proficiency and cognitive resources, bilingual speakers bring <strong className="pr-term">knowledge acquired and used across languages</strong>. The Complementarity Principle describes how this knowledge is <strong className="pr-term">distributed across domains</strong>. For example, someone may know medical concepts better in their native language (L1) from growing up in their home country, but computing terminology better in English from studying that major in the US. We asked:
        </p>
        <div className="q pr-q2">
          <p><b>RQ</b>How can the language of clarifications help bilingual speakers access their existing knowledge and the English wording needed to understand conversations and express their own ideas?</p>
        </div>
        <p>
          I led the literature review, study and prototype design, integrating psycholinguistic research on bilingual processing, lexical access, memory, and speech production with HCI research on multilingual communication.
        </p>

        <h3 className="pr-h3">Study Design</h3>
        <p>
          We focused on <strong className="pr-term">clarifications</strong> alone to test whether varying one feature’s language presentation could support both comprehension and response planning/production. As suggestions can still steer what users say, we explored whether clarifications could instead help them access their own bilingual knowledge and the wording needed to express it, thereby preserving the substance of their contributions.
        </p>
        <p>
          We designed a counterbalanced <strong className="pr-term">3 × 2 × 2 within-subjects</strong> study with Chinese–English bilinguals. Each participant experienced every combination, allowing us to compare formats across conversational demands:
        </p>
        <div className="xp-eq" role="list" aria-label="Design factors">
          {FACTORS.map((f, i) => (
            <React.Fragment key={f.key}>
              <div role="listitem">
                <span className="xp-n">{f.levels.length}</span>
                <b>{f.name}</b>
                <p className="xp-lv">{f.levels.map((l, k) => <React.Fragment key={l}>{k > 0 && ' · '}<span className="nb">{l}</span></React.Fragment>)}</p>
                <ul className="xp-why">{f.why.map(w => <li key={w}>{boldLead(w)}</li>)}</ul>
              </div>
              {i < FACTORS.length - 1 && <span className="xp-x" aria-hidden="true">×</span>}
            </React.Fragment>
          ))}
        </div>
        <p>
          Drawing on <strong className="pr-term">language-dependent memory and encoding specificity</strong>, we used language and domain-background measures to examine how bilingual history might influence the usefulness of each format beyond overall English proficiency.
        </p>

        <h3 className="pr-h3">Prototyping</h3>
        <p>
          We wrote a dietitian-visit conversation combining medical terminology with everyday food and exercise vocabulary to explore language support in a realistic setting where it could be useful. Our Figma prototype displayed the assigned formats and let participants switch languages for individual clarifications, preserving control and revealing further preferences across terms and conversational demands.
        </p>
        <div id="xp-demo" className="xp-videos">
          <figure>
            <Video src={`${VID}language-switching.mp4`} label="Language-switching interaction" />
            <figcaption>Language-switching interaction</figcaption>
          </figure>
          <figure>
            <Video src={`${VID}translation-conversation.mp4`} label="The conversation with embedded clarifications and counterbalanced items" />
            <figcaption>The conversation with embedded clarifications and counterbalanced items</figcaption>
          </figure>
        </div>

        <h3 className="pr-h3">Measures &amp; Analysis</h3>
        <p>We combined different measures to examine outcomes and participants’ explanations of their experiences.</p>
        <dl className="pr-spec">
          {MEASURES.map(([t, d]) => (
            <div key={t}><dt>{t}</dt><dd>{d}</dd></div>
          ))}
        </dl>
        <Note small icon={<Hourglass />}>Data collection is complete. Analysis is ongoing.</Note>
      </Sec>

      {/* ------------------------------------------------------------ i-corps */}
      <Sec id="xp-icorps" icon="care" kicker="NSF I-Corps" title="Customer Discovery for Healthcare Communication">
        <p>
          Alongside the lab studies, my PhD mentor and I were accepted into the <strong className="pr-term">NSF I-Corps Regional Course</strong> to explore XPLAIN’s translational and entrepreneurial potential. Through <strong className="pr-term">30 customer-discovery interviews</strong> with international and multilingual students, knowledge workers, healthcare professionals, and patients, we examined communication difficulties, unmet needs, existing workarounds, and adoption barriers. These interviews refined our target users, value proposition, and business model toward healthcare communication and navigation for NNS patients and their families.
        </p>

        <h3 className="pr-h3">Customer-Discovery Findings</h3>
        <div className="xp-disc">
          <div className="xp-dtabs" role="tablist" aria-label="Customer-discovery findings">
            {DISCOVERY.map((d, i) => (
              <button
                key={d.title}
                type="button"
                role="tab"
                aria-selected={i === dc}
                onClick={() => setDc(i)}
              >
                <i>{i + 1}</i>
                <b>{d.title}</b>
              </button>
            ))}
          </div>
          <div className="xp-dpane" key={D.title} role="tabpanel">
            <dl>
              {D.items.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
              <div className="dd"><dt>Design direction</dt><dd>{D.design}</dd></div>
            </dl>
          </div>
        </div>
      </Sec>
    </div>
  );
};

export default XplainDetail;
