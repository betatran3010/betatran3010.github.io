
import React from 'react';
import { Sparkles, FileText, Activity, Eye, MousePointer, Speech, Search, CheckCircle2, XCircle, AlertCircle, ScanFace, ChevronLeft, ChevronRight } from 'lucide-react';

type CarouselItem = {
  img: string;
  label: string;
};

const ImageCarousel: React.FC<{ items: CarouselItem[] }> = ({ items }) => {
  const [current, setCurrent] = React.useState(0);

  return (
    <div className="mt-8">

      {/* ---------- MOBILE: STACKED ---------- */}
      <div className="flex flex-col gap-6 md:hidden">
        {items.map((item, i) => (
          <div key={i} className="flex flex-col items-center gap-3">
            <img
              src={item.img}
              alt={item.label}
              className="w-full h-auto rounded-xl border border-slate-200 shadow-sm"
            />
            <p className="text-sm font-bold text-ink-light text-center">
              {item.label}
            </p>
          </div>
        ))}
      </div>

      {/* ---------- DESKTOP: CAROUSEL ---------- */}
      <div className="hidden md:flex flex-col items-center gap-4">

        <div className="flex items-center gap-4 w-full max-w-4xl">

          {/* Left Arrow */}
          <button
            onClick={() =>
              setCurrent((current - 1 + items.length) % items.length)
            }
            className="bg-white border border-primary/40 text-primary rounded-full p-2.5 shadow-sm"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Image */}
          <div className="w-full">
            <img
              src={items[current].img}
              alt={items[current].label}
              className="w-full h-auto rounded-xl border border-slate-200 shadow-sm"
            />
          </div>

          {/* Right Arrow */}
          <button
            onClick={() =>
              setCurrent((current + 1) % items.length)
            }
            className="bg-white border border-primary/40 text-primary rounded-full p-2.5 shadow-sm"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex gap-2 mt-2">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2.5 h-2.5 rounded-full ${
                i === current ? "bg-primary" : "bg-slate-300"
              }`}
            />
          ))}
        </div>

        {/* Label */}
        <p className="text-sm font-bold text-ink-light text-center">
          {items[current].label}
        </p>
      </div>

    </div>
  );
};


const clarificationImages = [
  { img: `${import.meta.env.BASE_URL}images/clarifications.png`, label: "First encounter with an unfamiliar term" },
  { img: `${import.meta.env.BASE_URL}images/expanded-clarifications.png`, label: "Revisiting a prior clarification" }
];

const suggestionImages = [
  { img: `${import.meta.env.BASE_URL}images/idea-suggestions.png`, label: "Idea-level suggestion" },
  { img: `${import.meta.env.BASE_URL}images/sentence-suggestions.png`, label: "Sentence-level suggestion (with bidirectional framing to avoid biasing user opinions in agreeing/disagreeing questions)" }
];

const summaryImages = [
  { img: `${import.meta.env.BASE_URL}images/topic-summary.png`, label: "Topic-shift summary" },
  { img: `${import.meta.env.BASE_URL}images/meeting-summary.png`, label: "End-of-meeting summary" }
];

const XplainSolutionSection: React.FC = () => {
  return (
    <div className="space-y-20 animate-[fadeIn_0.5s_ease-out]">

      {/* Header */}
      <div>
        <h2 className="text-2xl md:text-3xl font-heading font-black text-ink mb-6 flex items-center gap-3">
          <span className="text-primary">02.</span> Baseline Study: Designing and Evaluating Proactive Support
        </h2>
        <p className="text-ink-light mb-6 text-base md:text-lg leading-relaxed">
          We developed <span className="text-ink font-bold">XPLAIN</span>, a proactive AI system that supports non-native speakers in real-time video-conferencing by anticipating communication challenges and scaffolding interaction as it unfolds.
        </p>
      </div>

      {/* --- SUBSECTION: XPLAIN FEATURES --- */}
      <section className="space-y-12">
        <div className="flex items-center gap-3 border-b-2 border-slate-100 pb-4">
          <div className="p-2 bg-primary-light rounded-lg">
            <Sparkles className="w-5 h-5 text-primary-dark" />
          </div>
          <h3 className="text-xl font-heading font-bold text-ink">XPLAIN & Its Real-Time Features</h3>
        </div>

        {/* Feature 1: Clarifications */}
        <div className="space-y-6">
          <div>
            <h4 className="text-base md:text-lg font-bold text-ink mb-3 flex items-center gap-2">
              <span className="bg-ink text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span> Clarifications
            </h4>
            <p className="text-ink-light leading-relaxed mb-4 text-base md:text-lg">
              Grounded in psycholinguistic grounding theory, clarifications <span className="text-ink font-bold">address comprehension failures</span> that disrupt predictive processing and cascade into repairs and backtracking. They are brief (≤20 words), context-aware explanations that resolve lexical, cultural, or domain gaps at word onset, supporting early alignment.
            </p>
          </div>

          {/* Visuals */}
          <ImageCarousel items={clarificationImages} />

        </div>

        {/* Feature 2: Suggestions */}
        <div className="space-y-6">
          <div>
            <h4 className="text-base md:text-lg font-bold text-ink mb-3 flex items-center gap-2">
              <span className="bg-ink text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">2</span> Suggestions
            </h4>
            <p className="text-ink-light leading-relaxed mb-4 text-base md:text-lg">
              Disfluencies often emerge during conceptualization and formulation under rapid production demands. Suggestions surface relevant ideas and sentence-level response structures when participants are prompted for input (i.e., after questions), pre-activating semantic and syntactic material to <span className="text-ink font-bold">support response planning</span>.
            </p>
          </div>

          {/* Visuals */}
          <ImageCarousel items={suggestionImages} />
        </div>

        {/* Feature 3: Summaries */}
        <div className="space-y-6">
          <div>
            <h4 className="text-base md:text-lg font-bold text-ink mb-3 flex items-center gap-2">
              <span className="bg-ink text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">3</span> Summaries
            </h4>
            <p className="text-ink-light leading-relaxed mb-4 text-base md:text-lg">
              According to working memory accounts of dialogue processing, as discussions become dense or shift topics, working memory limits can impair alignment. Thus, summaries externalize key contextual information to <span className="text-ink font-bold">reduce memory demands</span> and <span className="text-ink font-bold">reinforce common ground</span> across turns.
            </p>
          </div>

          {/* Visuals - Stacked */}
          <ImageCarousel items={summaryImages} />
        </div>
      </section>

      {/* --- SUBSECTION: DATA CODING & ANALYSIS --- */}
      <section className="space-y-12">
        <div className="flex items-center gap-3 border-b-2 border-slate-100 pb-4">
          <div className="p-2 bg-primary-light rounded-lg">
            <Activity className="w-5 h-5 text-primary-dark" />
          </div>
          <h3 className="text-xl font-heading font-bold text-ink">Data Coding & Analysis</h3>
        </div>

        {/* Disfluency Coding */}
        <div className="bg-paper border-2 border-slate-100 rounded-3xl p-6 md:p-8">
          <h4 className="text-base md:text-lg font-bold text-ink mb-4 flex items-center gap-2">
            <Speech className="w-5 h-5 text-primary" /> Disfluency Coding
          </h4>
          <p className="text-ink-light mb-8 text-base md:text-lg">
            I analyzed disfluencies to examine how proactive support influenced speech production. Each instance was annotated at the sentence/phrase level with its timing, duration, and associated feature context, followed by a brief interpretive note and then binary coding of disfluency types (see diagram). Coding was validated with a second coder.
          </p>

          {/* Branched Diagram: Disfluencies */}
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm w-full">
            <div className="flex flex-col gap-6">
              <div className="font-bold text-ink bg-slate-100 inline-block px-3 py-1 rounded-md mb-2 self-start">Disfluency Type</div>

              <div className="flex flex-col lg:flex-row gap-8 text-sm">

                {/* Level 1 Simple Types */}
                <div className="flex-1 lg:max-w-[250px]">
                  <div className="flex flex-col gap-3 border-l-4 border-slate-200 pl-4 h-full">
                    <span className="font-bold text-slate-600 py-1">Filled pause</span>
                    <span className="font-bold text-slate-600 py-1">Silent pause</span>
                    <span className="font-bold text-slate-600 py-1">Hesitation</span>
                    <span className="font-bold text-slate-600 py-1">Uncertainty/Delay</span>
                  </div>
                </div>

                {/* Level 1 Complex (Repair) */}
                <div className="flex-[2]">
                  <div className="flex flex-col lg:flex-row items-start gap-4 lg:gap-6">
                    {/* Root of Repair */}
                    <div className="border-l-4 border-primary pl-4 py-1 shrink-0">
                      <span className="font-bold text-primary text-base">Repair</span>
                    </div>

                    {/* Branches & Content Container */}
                    <div className="flex-1 w-full space-y-4">
                      {/* Grid for Branches */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Restart Branch */}
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                          <div className="font-bold text-ink mb-2">Restart</div>
                          <div className="flex items-center gap-2 text-slate-500 text-xs">
                            <span className="text-slate-300">↳</span> Reformulation
                          </div>
                        </div>

                        {/* Repetition Branch */}
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                          <div className="font-bold text-ink mb-2">Repetition</div>
                          <div className="space-y-1 text-slate-500 text-xs">
                            <div className="flex items-center gap-2"><span className="text-slate-300">↳</span> Exact repeat</div>
                            <div className="flex items-center gap-2"><span className="text-slate-300">↳</span> Partial repeat</div>
                          </div>
                        </div>
                      </div>

                      {/* Explanation Text */}
                      <div className="text-xs text-slate-400 italic bg-slate-50 p-3 rounded-lg border border-slate-100">
                        The “Repair” category could encompass a wide range of behaviors with distinct cognitive and communicative implications, so we refined it into further subcategories.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Visual Coding */}
        <div className="bg-paper border-2 border-slate-100 rounded-3xl p-6 md:p-8">
          <h4 className="text-base md:text-lg font-bold text-ink mb-4 flex items-center gap-2">
            <Eye className="w-5 h-5 text-primary" /> Visual Coding
          </h4>
          <p className="text-ink-light mb-8 text-base md:text-lg">
            To contextualize coded disfluencies, I conducted parallel visual coding by analyzing interaction behaviors around the caption box and sidebar (the system’s two primary interaction areas). I then systematically interpreted the observed behaviors to differentiate disfluencies driven by content processing, response formulation, interface timing/design, or individual habits, with cross-coder validation.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Layer 1 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <div className="font-bold text-ink bg-slate-100 inline-block px-3 py-1 rounded-md mb-4 text-sm uppercase tracking-wide">Layer 1: Observable Behaviors</div>

              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-sm font-bold text-primary mb-2">
                    <ScanFace className="w-4 h-4" /> General Visual Behaviors
                  </div>
                  <ul className="text-sm text-ink-light space-y-1.5 pl-6 list-disc marker:text-slate-300">
                    <li>Postural shift (lean forward/backward)</li>
                    <li>Head orientation toward sidebar</li>
                    <li>Head nods / shakes / tilts</li>
                    <li>Self-touch or fidgeting</li>
                    <li>Expressive gesturing</li>
                  </ul>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-sm font-bold text-primary mb-2">
                    <MousePointer className="w-4 h-4" /> Mouse-Clicking Behaviors
                  </div>
                  <ul className="text-sm text-ink-light space-y-1.5 pl-6 list-disc marker:text-slate-300">
                    <li>Expanding on sidebar</li>
                    <li>Multiple repeated clicks</li>
                    <li>Hovering but ended up not clicking</li>
                    <li>Clicking on other unintended places</li>
                  </ul>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-sm font-bold text-primary mb-2">
                    <Eye className="w-4 h-4" /> Eye Gaze Movement
                  </div>
                  <ul className="text-sm text-ink-light space-y-1.5 pl-6 list-disc marker:text-slate-300">
                    <li>Gaze aversion</li>
                    <li>Quick glance</li>
                    <li>Shifting between sidebar and caption box / main area</li>
                    <li>Sustained gaze on caption box / sidebar</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Layer 2 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col justify-center">
              <div className="font-bold text-ink bg-slate-100 inline-block px-3 py-1 rounded-md mb-4 text-sm uppercase tracking-wide self-start">Layer 2: Inferred States</div>

              <div className="flex flex-col gap-3">
                {['Thinking', 'Reading', 'Confusion', 'Curiosity', 'Self-soothing'].map((state, i) => (
                  <div key={i} className="bg-primary-light/30 border-l-4 border-primary p-3 rounded-r-lg font-bold text-ink-light text-sm">
                    {state}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Data Analysis Contribution - Updated to "Normal" style */}
        <div className="bg-paper border-2 border-slate-100 rounded-3xl p-6 md:p-8">
          <h4 className="text-base md:text-lg font-bold text-ink mb-4 flex items-center gap-2">
            <Search className="w-5 h-5 text-primary" /> Data Analysis
          </h4>
          <p className="text-ink-light leading-relaxed mb-0 text-base md:text-lg">
            My contribution was on preprocessing and exploratory analysis of disfluency and survey data in <span className="text-ink font-bold">R</span>. I computed core speech disfluency measures: disfluency length, total duration and count per participant, start ratio (relative timing within a session), and the feature associated with each disfluency. I then cleaned survey data, merged it with behavioral data, visualized patterns, and ran preliminary correlations linking feature-specific disfluencies to perceived usefulness and effort.
          </p>
        </div>
      </section>

      {/* --- SUBSECTION: KEY FINDINGS --- */}
      <section className="space-y-8">
        <div className="flex items-center gap-3 border-b-2 border-slate-100 pb-4">
          <div className="p-2 bg-primary-light rounded-lg">
            <FileText className="w-5 h-5 text-primary-dark" />
          </div>
          <h3 className="text-xl font-heading font-bold text-ink">Key Findings</h3>
        </div>

        <p className="text-ink-light mb-6 text-base md:text-lg">
          Combined with the thematic analyis of interview data from my labmates and my own behavioral and survey analysis, we extracted these key findings:
        </p>

        <div className="flex flex-col gap-6">

          {/* Green Box: Worked Well */}
          <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6 md:p-8">
            <h4 className="text-base md:text-lg font-bold text-green-900 mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-green-600" /> What Worked Well
            </h4>
            <ul className="space-y-3">
              {[
                "Confidence and engagement increased even when disfluencies were moderate/high.",
                "Clarifications reduced backtracking and disruptive disfluencies by resolving comprehension and prediction gaps early.",
                "Suggestions increased readiness to respond despite added hesitation, with higher efficiency for lower-proficiency speakers.",
                "Disfluencies often reflected active evaluation and integration of AI support, not conversational failure.",
                "Users reported 30%-80% efficiency boost over pausing or multitasking with web searching.",
                "Images sped up understanding of concrete concepts (e.g., food items)."
              ].map((item, i) => (
                <li key={i} className="flex gap-3 text-green-800 leading-snug text-base md:text-lg">
                  <span className="block w-1.5 h-1.5 mt-2 bg-green-400 rounded-full shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Red Box: Trade-offs */}
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 md:p-8">
            <h4 className="text-base md:text-lg font-bold text-red-900 mb-4 flex items-center gap-2">
              <XCircle className="w-6 h-6 text-red-600" /> Trade-offs & Limitations
            </h4>
            <ul className="space-y-3">
              {[
                "Reading pop-ups competed with listening and turn-taking.",
                "Users frequently stared at the sidebar to compare AI suggestions with their own ideas, increasing pauses, hesitation, and repairs.",
                "Higher-proficiency users ignored more clarifications as they already know most of the clarified terms and felt suggestions biased or replaced their reasoning.",
                "Real-time summaries were often ignored as users lacked time to read them during ongoing conversations.",
                "Second language anxiety, proficiency, and communication style affected whether users tolerated or avoided disfluency-inducing features."
              ].map((item, i) => (
                <li key={i} className="flex gap-3 text-red-900 leading-snug text-base md:text-lg">
                  <span className="block w-1.5 h-1.5 mt-2 bg-red-400 rounded-full shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Yellow Box: Implications */}
          <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-6 md:p-8">
            <h4 className="text-base md:text-lg font-bold text-amber-900 mb-4 flex items-center gap-2">
              <AlertCircle className="w-6 h-6 text-amber-600" /> Design Implications
            </h4>
            <ul className="space-y-3">
              {[
                "Disfluency trajectories can indicate rising uncertainty and guide adaptive intervention timing.",
                "Avoid introducing content during active response to prevent competing formulation.",
                "Adapt feature timing, density, and format based on user profiles and communication contexts.",
                "Delay suggestions (~3-5s after questions) or offer multi-option, confidence-tagged outputs to preserve user agency.",
                "Deliver explanatory content in L1 (native language) to reduce parsing cost, and producible content in L2 (second language) to support fluent uptake."
              ].map((item, i) => (
                <li key={i} className="flex gap-3 text-amber-900 leading-snug text-base md:text-lg">
                  <span className="block w-1.5 h-1.5 mt-2 bg-amber-400 rounded-full shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-primary/10 border-l-4 border-primary/50 p-4 rounded-r-xl mb-6">
            <p className="text-ink text-base md:text-lg leading-relaxed">
              <span className="text-ink font-bold">
                This study is mentioned in this paper:
              </span>{" "}
              <a
                href="https://dl.acm.org/doi/10.1145/3715070.3749273"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline hover:text-primary-dark"
              >
                https://dl.acm.org/doi/10.1145/3715070.3749273
              </a>{" "}
              <span className="text-ink font-semibold">(CSCW Companion ’25)</span>
            </p>
          </div>

        </div>
      </section>

    </div >
  );
};

export default XplainSolutionSection;
