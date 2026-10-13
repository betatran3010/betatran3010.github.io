import React, { useState } from 'react';
import { ArrowUpRight, FileText, Github, Link2, SearchCheck, Users } from 'lucide-react';
import SecHead from './SecHead';

const IMG = `${import.meta.env.BASE_URL}images/whos-reviewing/`;
const PAPER_URL = 'https://drive.google.com/file/d/19O_PQcD6m0puKJSQw917t5fyKHBn4ntn/view';
const REPO_URL = 'https://anonymous.4open.science/r/study_builder_peer_review_process_trace_repo';

/** Group colors follow the paper's Figure 3 so the page and the figures read as one system. */
const GROUPS = [
  { key: 'none', label: 'Did not use AI', n: 41, color: '#7A7F87', def: 'sent no AI queries related to reading the assigned paper or writing the review' },
  { key: 'other', label: 'Used AI for other purposes', n: 17, color: '#7D98B8', def: 'used AI for comprehension support or idea refinement, but did not request review generation' },
  { key: 'gen', label: 'Requested reviews from AI', n: 25, color: '#E39A9A', def: 'requested AI-generated review content, but did not paste it into their review' },
  { key: 'copy', label: 'Requested and copy-pasted reviews from AI', n: 21, color: '#C8453F', def: 'requested AI-generated review content and additionally had a verified AI-to-review paste' },
];

const STEPS = [
  {
    img: 'step1-review.png',
    title: 'Review with optional AI',
    text: 'Participants reviewed an assigned paper using a structured review form and an optional AI assistant.',
    alt: 'Interface for step 1: the paper on the left, the review form in the middle and an AI assistant chat on the right',
  },
  {
    img: 'step2-select.png',
    title: 'Select a point from the submitted reviews',
    text: 'Upon submitting the reviews, participants selected spans from four evaluative fields: Strengths, Weaknesses, Limitations, and Questions for the Authors, to define individual evaluative points.',
    alt: 'Interface for step 2: a review sentence is highlighted as a point to trace back to the paper',
  },
  {
    img: 'step3-locate.png',
    title: 'Locate evidence in the paper',
    text: 'For each point, participants marked all relevant supporting locations in the source manuscript, including text passages, figure regions, and table content, or indicated that no relevant support could be found. Matching colors linked each point to its selected evidence, and the procedure was repeated for additional points across the four fields.',
    alt: 'Interface for step 3: the participant highlights text and figures in the paper that support the selected point',
  },
];


const STEP_Y = [11, 44.4, 81.4];

const MODES = [
  {
    name: 'Review generation',
    share: 54.1,
    color: '#C9483F',
    fg: '#fff',
    def: 'Asking the AI to produce content that directly addressed a component of the evaluation',
    ex: [
      ['P2', 'Weaknesses Identify key weaknesses in the paper’s design, evidence, analysis, or argument. Suggest ways to improve them.', 'copied directly from the review instructions'],
      ['P90', 'What are the main limitations of what can be concluded from this study? Focus on scope and generalizability. Keep it simple.'],
      ['P49', 'List 3 questions i should be asking the author'],
    ],
  },
  {
    name: 'Comprehension support',
    share: 32.5,
    color: '#2B7A78',
    fg: '#fff',
    def: 'Asking the AI to explain, summarize, locate, or clarify information from the paper',
    ex: [
      ['P100', 'I don’t completly understand what "Audit-coded listings" are. Or what are "audits". Give me a large explanation.'],
      ['P106', 'Why do the author say reputation ad accuracy are "related but separable"'],
      ['P107', 'Does the paper provide any post-hoc power analysis or discuss whether the achieved sample size (236) met the 80% power target from the preregistration?'],
    ],
  },
  {
    name: 'Idea refinement',
    share: 13.4,
    color: '#E39A33',
    fg: '#1B1B1B',
    def: 'Providing an initial idea or draft and asking the AI to improve, revise, or respond to it',
    ex: [
      ['P26', 'This study examined whether changing the physical form of a meal, while keeping its ingredients, calories, and macronutrient content constant, alters short -term metabolic responses and subsequent food intake. Using a crossover design, participants consumed whole and blended 100-kcal meals. Blended meals produced a faster gulcose rise, higher peak, lower later glucode and greater snack intake. This finding suggest that food form may affect short ter, metabolic and behavioral responses independedntlty of nutrient composition. proofread and validate'],
      ['P32', 'If i resume very simply that the study aims to verify if star rating are enough to "testify" for the non-discrepedency between an item listing and the actual item received by comparing two models : one based only on star ratings and the other based on a audit verification then am i right ?'],
      ['P67', 'Is it fair to say the paper doesn’t really acknowledge that severity of incidents is very subjective as is the apology, for example based on a person’s personal experiences and if the offence has been comited in the past by the person etc.'],
    ],
  },
];


const Fig: React.FC<{ src: string; alt: string; className?: string }> = ({ src, alt, className }) => (
  <figure className={`pr-fig ${className || ''}`}>
    <div className="pr-figbox"><img src={`${IMG}${src}`} alt={alt} /></div>
  </figure>
);

const Sec: React.FC<{ icon: React.ComponentProps<typeof SecHead>['icon']; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
  <section className="pr-sec">
    <SecHead icon={icon}>{title}</SecHead>
    {children}
  </section>
);

const Finding: React.FC<{ n: number; title: string; children: React.ReactNode; fig: React.ReactNode }> = ({ n, title, children, fig }) => (
  <article className="pr-finding">
    <span className="pr-fn" aria-hidden="true">{n}</span>
    <div className="pr-fbody">
      <h3>{title}</h3>
      {children}
      {fig}
    </div>
  </article>
);

const PeerReviewDetail: React.FC = () => {
  const [mode, setMode] = useState(0);
  const m = MODES[mode];

  return (
    <div className="pr">
      <header className="pr-head">
        <p className="lab">Cognitive Development and Learning Lab</p>
        <h1>Who’s Doing the Reviewing?<br />Tracing AI Delegation in Scientific Peer Review</h1>
        <ul className="pc-chips pr-chips">
          <li>UC Berkeley</li>
          <li>PI: Dr. Alison Gopnik</li>
        </ul>
        <p className="pr-auth"><b>Tran Le</b><sup>1</sup>, <b>Eunice Yiu</b><sup>2</sup></p>
        <p className="pr-aff"><sup>1</sup> Cornell University · <sup>2</sup> University of California, Berkeley</p>
        <ul className="pr-venues">
          <li>Accepted at AI-Native Academia and AI &amp; Science - Evolution or Extinction? @ NeurIPS 2026</li>
          <li>Submitted to CHI 2027</li>
        </ul>
        <div className="pr-btns">
          <a className="pr-btn" href={PAPER_URL} target="_blank" rel="noopener noreferrer"><FileText aria-hidden="true" />Paper<ArrowUpRight aria-hidden="true" /></a>
          <a className="pr-btn alt" href={REPO_URL} target="_blank" rel="noopener noreferrer"><Github aria-hidden="true" />Open-source repo<ArrowUpRight aria-hidden="true" /></a>
        </div>
      </header>

      <div className="cover pr-cover">
        <img
          src={`${IMG}fig1-process.png`}
          alt="Four-step overview: paper engagement, review construction, review content analysis, evidence localization"
        />
      </div>

      {/* ------------------------------------------------------------ overview */}
      <section className="pr-sec pr-overview">
        <SecHead icon="doc">Overview</SecHead>
        <div className="pr-obody">
          <p>
            Grounded in expert judgment and epistemic responsibility, peer review requires reviewers to assess manuscript evidence, contribute distinct perspectives, and make judgments that shape publication and scientific recognition. LLMs, however, can generate fluent summaries, criticisms, and recommendations resembling human reviews, and their use is increasingly prevalent across conference and journal peer review. Recent studies associate estimated AI involvement with reduced participation in author rebuttals, more favorable scores and acceptance outcomes, and a narrower evaluative range. Nevertheless, little is known about <strong className="pr-term">how reviewers allocate evaluative work between themselves and AI</strong>. We asked:
          </p>
          <div className="q pr-q2">
            <p><b>RQ1</b>How do researchers use AI while reviewing a scientific paper?</p>
            <p><b>RQ2</b>When AI generates evaluative content, what distinguishes reviewers who incorporate that content into their submitted review from those who do not?</p>
          </div>
          <p>
            We built a custom <u className="pr-ul">JavaScript</u> research platform with a <u className="pr-ul">Node.js/Express</u> backend and an embedded <u className="pr-ul">GPT-4o-mini</u> assistant to trace the reviewing process itself. Using this platform, we studied 104 researchers with prior peer-review experience, linking AI queries, source-paper engagement, AI-to-review content transfers, and revisions to their subsequent ability to locate evidence for their own claims. We identified delegation patterns that may <strong className="pr-term">compromise evidence verification and independent expert judgment</strong>, highlighting the need to preserve both alongside useful AI assistance.
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------------ study design */}
      <Sec icon="clipboard" title="Study Design">
        <p>
          We recruited 104 participants on Prolific across disciplines and career stages, including master’s and PhD students, postbaccalaureate lab managers, and postdoctoral scholars. Each was assigned one of three artificial papers matched in length and structure, with embedded methodological and interpretive weaknesses. We generated initial drafts with Claude Opus 5 and figures with GPT-5.5, then substantially edited their content and flaws to improve naturalness, internal consistency, and comparability across papers. Before beginning, participants were told that the highest-quality reviews and evidence localizations would receive bonuses to make the task more consequential and encourage substantive effort. The interface guided them through three steps:
        </p>
        <div className="pr-proc">
          <ol className="pr-psteps" aria-label="Study procedure">
            {STEPS.map((x, i) => (
              <li key={x.title} style={{ ['--y' as string]: `${STEP_Y[i]}%` }}>
                <div className="pr-pnum"><i>{i + 1}</i><span>{x.title}</span></div>
                <p>{x.text}</p>
              </li>
            ))}
          </ol>
          <img className="pr-pfig" width="1300" height="1873" src={`${IMG}fig2-steps.png`} alt="Full interface walkthrough: review with optional AI, select a point from the submitted review, then locate evidence in the paper, with orange connectors linking the steps" />
        </div>
      </Sec>

      {/* ------------------------------------------------------------ measures */}
      <Sec icon="ruler" title="Measures">
        <dl className="pr-spec">
          <div>
            <dt>AI query coding</dt>
            <dd>
              We coded valid AI queries into three functions.
              <div className="pr-qm">
                <div className="pr-seg" role="tablist" aria-label="AI query modes">
                  {MODES.map((x, i) => (
                    <button
                      key={x.name}
                      type="button"
                      role="tab"
                      aria-selected={i === mode}
                      className={i === mode ? 'on' : ''}
                      style={{ ['--mc' as string]: x.color, ['--fg' as string]: x.fg, flexGrow: x.share } as React.CSSProperties}
                      onClick={() => setMode(i)}
                    >
                      <b>{x.name}</b>
                      <small>{x.share}%</small>
                    </button>
                  ))}
                </div>
                <div className="pr-qbody" style={{ ['--mc' as string]: m.color } as React.CSSProperties} key={m.name}>
                  <p className="def">{m.def}</p>
                  {m.ex.map(([id, q, note]) => (
                    <blockquote key={id}><b>{id}</b>“{q}”{note ? <em className="qn"> [{note}]</em> : null}</blockquote>
                  ))}
                </div>
              </div>
            </dd>
          </div>
          <div>
            <dt>Content transfer and editing</dt>
            <dd>The interface logged keystrokes, revisions, and copy-and-paste events to trace review construction. We classified transfers by source and destination—paper, review instructions and fields, AI responses, or external content—and primarily tracked AI-to-review pasting across the review fields. Subsequent editing was measured using normalized Levenshtein distance between each field’s text immediately after its final verified AI paste and its submitted version.</dd>
          </div>
          <div>
            <dt>Source-paper exposure</dt>
            <dd>We measured source-paper exposure as cumulative time the manuscript was displayed while the study page was visible and the browser window was in focus. We also logged viewing time across manuscript sections, returns to earlier passages, text selections, and in-paper searches to examine whether reviewers still consult and inspect the manuscript while using AI.</dd>
          </div>
          <div>
            <dt>Review similarity</dt>
            <dd>We compared each submitted review with the participant’s own AI responses and with other reviews of the same paper, using lexical similarity (Jaccard similarity) and semantic similarity (cosine similarity between sentence-transformer embeddings, all-mpnet-base-v2).</dd>
          </div>
          <div>
            <dt>Evidence localization</dt>
            <dd>We recorded each participant’s number of review points, the proportion with selected supporting evidence, and the proportion marked “Cannot find.” For this analysis, we calculated the “Cannot find” rate across review points within each AI-use group, capturing whether reviewers could locate manuscript support for claims in their own submitted reviews.</dd>
          </div>
          <div>
            <dt>Analysis groups</dt>
            <dd>
              To relate AI-use and adoption behaviors to review outcomes, we grouped participants into four mutually exclusive categories, colored as in the figures below.
              <ul className="pr-groups">
                {GROUPS.map(g => (
                  <li key={g.key}>
                    <i style={{ background: g.color }} />
                    <span><b>{g.label}</b> <em>n = {g.n}</em><small>Participants who {g.def}.</small></span>
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        </dl>
      </Sec>

      {/* ------------------------------------------------------------ findings */}
      <Sec icon="chart" title="Key Findings">
        <Finding n={1} title="AI use was common, but direct generation did not always lead to copying."
          fig={<Fig src="fig3a-usage.png" alt="Stacked bars showing each AI user's share of review generation, comprehension support and idea refinement prompts" />}>
          <p>63 of 104 researchers used the AI assistant. Review generation was the most common mode, followed by comprehension support and idea refinement.</p>
        </Finding>

        <Finding n={2} title="When participants copied AI-generated text, they adopted most of it with little editing."
          fig={<Fig className="mid" src="fig3b-copying.png" alt="Copying AI-generated text: 25 did not copy, 21 copied; AI text by review field; subsequent editing per reviewer" />}>
          <p>Among the 21 reviewers who requested and copied AI-generated content, pasting spanned a median of all five review fields, with just 2.0% median subsequent editing. Reviewers typically incorporated AI-generated evaluations broadly and left them largely unchanged.</p>
        </Finding>

        <Finding n={3} title="Copying AI-generated review content was associated with substantially less time inspecting the paper."
          fig={<Fig className="narrow" src="fig3c-time.png" alt="Minutes with the paper visible by AI-use group" />}>
          <p>Among reviewers who requested generation, those who did not paste kept the paper in view for 37.2 minutes, similar to reviewers who used AI for other purposes. Those who pasted spent only 18.5 minutes, roughly half as long (adjusted difference −19.2 minutes, 95% CI [−29.4, −9.1], <i>p</i> &lt; .001).</p>
        </Finding>

        <Finding n={4} title="Copied reviews bore a substantially stronger imprint of the AI’s generated content, and were more alike."
          fig={<Fig className="narrow" src="fig3d-similarity.png" alt="Mean similarity of each review to other reviews of the same paper, by AI-use group" />}>
          <p><b>Versus the AI’s own output:</b> copied reviews had a Jaccard similarity of .673 to the participant’s AI responses, compared with .273 for reviewers who requested generation but did not paste. <b>Across reviewers:</b> reviews that incorporated AI text also converged with one another, with a same-paper semantic similarity of .856 compared with .798–.810 in the other groups.</p>
        </Finding>

        <Finding n={5} title="Review generation was associated with greater difficulty localizing evidence for one’s own review points."
          fig={<Fig className="narrow" src="fig3e-evidence.png" alt="Share of review points marked Cannot find, by AI-use group" />}>
          <p>Across 646 participant-defined review points, “Cannot find” rates were roughly 14–15% for reviewers who did not request generation and 27–28% for those who did, whether or not they pasted the generated text.</p>
        </Finding>

        <p className="pr-after">
          Participants generally regarded the task as reasonably similar to their usual peer-review work (mean 4.76 on a seven-point scale; 68.3% rated it 5–7), and ratings were similar among the 21 reviewers who copied AI-generated content.
        </p>
      </Sec>

      {/* ------------------------------------------------------------ discussion */}
      <Sec icon="bulb" title="Discussion">
        <p className="pr-lead">
          The key distinction was not AI use itself, but the extent to which reviewers delegated evaluative work to it. Asking AI for help can coexist with substantial paper engagement, while generating review content is associated with weaker evidence localization, and directly adopting it is associated with less engagement and greater convergence. These patterns motivate systems that support reviewers’ reasoning and expertise while making delegation and evidential responsibility more visible.
        </p>
        <div className="pr-tiles">
          <div className="t1">
            <SearchCheck aria-hidden="true" />
            <h4>Evidence grounding and human judgment</h4>
            <p>Seemingly well-formed reviews may conceal differences in the reasoning and verification behind them. Interfaces could prompt reviewers to substantiate consequential claims against manuscript evidence, supporting useful forms of AI assistance, such as comprehension support and idea refinement, while preserving independent inspection and judgment.</p>
          </div>
          <div className="t2">
            <Link2 aria-hidden="true" />
            <h4>Provenance of AI-generated text</h4>
            <p>Retaining the provenance of inserted AI text and linking generated criticisms to relevant passages or results could help reviewers inspect, assess, and take responsibility for the contributions they adopt.</p>
          </div>
          <div className="t3">
            <Users aria-hidden="true" />
            <h4>Diversity of perspectives</h4>
            <p>Peer review draws on reviewers’ distinct expertise, concerns, and interpretations. Greater review convergence raises the possibility that reliance on similar AI-generated representations could narrow these perspectives. An important design goal is to help reviewers develop and articulate their own assessments alongside AI suggestions.</p>
          </div>
        </div>

        <h3 className="pr-h3">Limitations</h3>
        <p>
          AI use was self-selected rather than experimentally assigned, so the associations do not establish causation, and reviewers already inclined to spend less time with the paper may have been more likely to delegate. Participants reviewed artificial rather than real submitted papers, and the generation-and-paste group was small (21 participants).
        </p>

        <h3 className="pr-h3">Future work</h3>
        <p>
          A natural next step is to study conference or journal reviewing in the wild using this process-tracing approach, examining whether the same patterns of assistance and delegation emerge under real editorial timelines, review norms, and publication stakes.
        </p>

        <h3 className="pr-h3">Open resources</h3>
        <p>We released the de-identified study materials, process-trace dataset, raw analysis inputs, and reproducibility scripts as a resource for future studies of AI-mediated peer review.</p>
        <div className="pr-btns">
          <a className="pr-btn" href={PAPER_URL} target="_blank" rel="noopener noreferrer"><FileText aria-hidden="true" />Paper<ArrowUpRight aria-hidden="true" /></a>
          <a className="pr-btn alt" href={REPO_URL} target="_blank" rel="noopener noreferrer"><Github aria-hidden="true" />Open-source repo<ArrowUpRight aria-hidden="true" /></a>
        </div>
      </Sec>
    </div>
  );
};

export default PeerReviewDetail;
