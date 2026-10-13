
import React from 'react';
import {
  Goal,
  Search,
  Layout,
  Monitor,
  ClipboardCheck,
  MessageSquare,
  BookOpen,
  Eye,
  FileText,
  Activity,
  ArrowRight,
  Users,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

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

const proficiencyClarificationImages = [
  { label: "Low Proficiency Clarification", img: `${import.meta.env.BASE_URL}images/low-clarification.png` },
  { label: "Medium Proficiency Clarification", img: `${import.meta.env.BASE_URL}images/medium-clarification.png` },
  { label: "High Proficiency Clarification", img: `${import.meta.env.BASE_URL}images/high-clarification.png` }
];

const proficiencySuggestionImages = [
  { img: `${import.meta.env.BASE_URL}images/low-suggestion.png`, label: "Low Proficiency Suggestion" },
  { img: `${import.meta.env.BASE_URL}images/medium-suggestion.png`, label: "Medium Proficiency Suggestion" },
  { img: `${import.meta.env.BASE_URL}images/high-suggestion.png`, label: "High Proficiency Suggestion" }
];

const XplainPersonalizationSection: React.FC = () => {

  return (
    <div className="space-y-20 animate-[fadeIn_0.5s_ease-out]">
      {/* Header */}
      <div>
        <h2 className="text-2xl md:text-3xl font-heading font-black text-ink mb-6 flex items-center gap-3">
          <span className="text-primary">03.</span> Personalization Study: Adapting Proactive Support Across Proficiency Levels
        </h2>

        {/* Motivation / Context */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 border-b-2 border-slate-100 pb-4">
            <div className="p-2 bg-primary-light rounded-lg">
              <Goal className="w-5 h-5 text-primary-dark" />
            </div>
            <h3 className="text-xl font-heading font-bold text-ink">Motivation & Study Goal</h3>
          </div>

          <p className="text-ink-light mb-6 text-base md:text-lg">
            Baseline analyses revealed <span className="text-ink font-bold">proficiency-related differences</span> in clarification uptake, suggestion integration/reliance, and reading time and perceived usefulness of these features, motivating an investigation into <span className="text-ink font-bold">proficiency-aware</span> rather than uniform proactive support.
          </p>

          {/* Research Question */}
          <div className="mt-8 bg-ink text-white p-6 md:p-10 rounded-3xl shadow-card relative overflow-hidden">
            {/* Decorative background element */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary opacity-20 rounded-full blur-3xl"></div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4 text-primary font-bold uppercase tracking-widest text-xs">
                <Search className="w-4 h-4" /> Research Question
              </div>
              <h3 className="text-lg md:text-2xl font-heading font-bold leading-relaxed">
                Can proactively tailoring clarification targets and suggestion framing to users’ language proficiency improve perceived usefulness and preserve self-agency where over-scaffolding becomes costly in real-time conversations?
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* 3.1 Scenario & Design */}
      <section className="space-y-12">
        <div className="flex items-center gap-3 border-b-2 border-slate-100 pb-4">
          <div className="p-2 bg-primary-light rounded-lg">
            <Layout className="w-5 h-5 text-primary-dark" />
          </div>
          <h3 className="text-xl font-heading font-bold text-ink">Conversational Scenario & Feature Design</h3>
        </div>

        {/* Scenario Script */}
        <div>
          <h4 className="text-base md:text-lg font-bold text-ink mb-4">General Conversational Scenario</h4>
          <p className="text-ink-light mb-6 text-base md:text-lg">
            We chose <span className="text-ink font-bold">data privacy</span> as it involves abstract concepts, institutional language, and culturally specific terminology that vary widely across proficiency levels while still eliciting participants’ values and perspectives easily.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border-2 border-slate-100 shadow-sm">
              <div className="text-xs font-black text-primary uppercase tracking-widest mb-3">Low Proficiency</div>
              <ul className="space-y-2 text-base text-ink-light list-disc pl-4 marker:text-primary">
                <li>Shorter turns, explicit framing of questions</li>
                <li>Topics introduced with concrete examples</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-2xl border-2 border-slate-100 shadow-sm">
              <div className="text-xs font-black text-primary uppercase tracking-widest mb-3">Medium Proficiency</div>
              <ul className="space-y-2 text-base text-ink-light list-disc pl-4 marker:text-primary">
                <li>Moderately complex discourse</li>
                <li>Balanced abstract + concrete framing</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-2xl border-2 border-slate-100 shadow-sm">
              <div className="text-xs font-black text-primary uppercase tracking-widest mb-3">High Proficiency</div>
              <ul className="space-y-2 text-base text-ink-light list-disc pl-4 marker:text-primary">
                <li>Conceptually dense, abstract framing</li>
                <li>Longer turns, implicit structure</li>
                <li>Assumes strong linguistic competence</li>
              </ul>
            </div>
          </div>

          <p className="text-ink-light mb-6 mt-8 text-base md:text-lg">
            While real conversations vary in difficulty regardless of proficiency, each script’s overall style was tuned to naturally support the clarification targets and suggestion needs that followed. Differences in framing, turn length, and conceptual density ensured that clarification and suggestion behaviors felt appropriate rather than forced.
          </p>
        </div>

        {/* Feature Design: Clarifications */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row gap-6 md:items-start">
            <div className="flex-1">
              <h4 className="text-base md:text-lg font-bold text-ink mb-3 flex items-center gap-2">
                <span className="bg-ink text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span> Clarifications
              </h4>
              <p className="text-ink-light mb-4 text-base md:text-lg">
                Clarifications spanned 5 categories—slang, initialism, idiom, complex word, and cultural reference—with 6 target terms per category across proficiency conditions. Initialisms and cultural references were held constant, as they primarily reflect cultural rather than proficiency knowledge. To preserve naturalism, all terms were validated as common in spoken English using the Corpus of Contemporary American English (COCA) and pre-tested with a separate participant group to ensure low prior familiarity relative to proficiency assessed by LEXTALE.
              </p>

              {/* Logic Box */}
              <div className="bg-paper border border-slate-200 p-6 rounded-xl space-y-6">
                <div>
                  <div className="text-base font-bold text-ink mb-2">Slang & Idioms</div>
                  <p className="text-sm text-slate-500 mb-3">Although they are culturally specific, they are also sometimes taught in L2 education and therefore interact with proficiency, as higher-proficiency speakers are more likely to have prior exposure. Therefore:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div className="bg-white px-4 py-4 rounded-lg border border-slate-100 text-ink-light">
                      <div className="text-xs font-black text-primary uppercase tracking-widest mb-2">Low Proficiency</div>
                      Clarifies both direct/literal and figurative expressions
                    </div>
                    <div className="bg-white px-4 py-4 rounded-lg border border-slate-100 text-ink-light">
                      <div className="text-xs font-black text-primary uppercase tracking-widest mb-2">Medium/High Proficiency</div>
                      Clarifies more abstract or figurative expressions and ignores direct/literal ones likely already known
                    </div>
                  </div>
                </div>

                <div className="w-full h-px bg-slate-100"></div>

                <div>
                  <div className="text-base font-bold text-ink mb-2">Complex Words</div>
                  <p className="text-sm text-slate-500 mb-3">They are strongly tied to proficiency. Words were drawn from the Barron GRE list. As participants were undergraduate students with prior English proficiency test scores rather than limited-English-proficiency speakers, the manipulation did not rely on basic or everyday vocabulary. Therefore:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                    <div className="bg-white px-4 py-4 rounded-lg border border-slate-100 text-ink-light">
                      <div className="text-xs font-black text-primary uppercase tracking-widest mb-2">Low Proficiency</div>
                      Clarification covers all selected complex words
                    </div>
                    <div className="bg-white px-4 py-4 rounded-lg border border-slate-100 text-ink-light">
                      <div className="text-xs font-black text-primary uppercase tracking-widest mb-2">Medium Proficiency</div>
                      Focuses on medium- and higher-difficulty words
                    </div>
                    <div className="bg-white px-4 py-4 rounded-lg border border-slate-100 text-ink-light">
                      <div className="text-xs font-black text-primary uppercase tracking-widest mb-2">High Proficiency</div>
                      Focuses only on higher-difficulty words
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Visuals */}
          <ImageCarousel items={proficiencyClarificationImages} />
        </div>

        {/* Feature Design: Suggestions */}
        <div className="space-y-6">
          <h4 className="text-base md:text-lg font-bold text-ink mb-3 flex items-center gap-2">
            <span className="bg-ink text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">2</span> Suggestions
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <div className="bg-white p-6 rounded-2xl border-2 border-slate-100 shadow-sm h-full">
                <div className="text-xs font-black text-primary uppercase tracking-widest mb-3">Low Proficiency</div>
                <ul className="space-y-2 text-base text-ink-light list-disc pl-4 marker:text-primary">
                  <li>Idea-level + sentence-level</li>
                  <li>Explicit agree/disagree framing to lower production pressure and sentence construction effort</li>
                </ul>
              </div>
            </div>

            <div className="space-y-3">
              <div className="bg-white p-6 rounded-2xl border-2 border-slate-100 shadow-sm h-full">
                <div className="text-xs font-black text-primary uppercase tracking-widest mb-3">Medium Proficiency</div>
                <ul className="space-y-2 text-base text-ink-light list-disc pl-4 marker:text-primary">
                  <li>Hybrid support that blends idea-level guidance with sentence-level clarity</li>
                  <li>Suggestions are written as complete sentences, but express ideas rather than ready-made responses</li>
                  <li>Designed to support comprehension and response planning while still requiring users to formulate their own wording</li>
                </ul>
              </div>
            </div>

            <div className="space-y-3">
              <div className="bg-white p-6 rounded-2xl border-2 border-slate-100 shadow-sm h-full">
                <div className="text-xs font-black text-primary uppercase tracking-widest mb-3">High Proficiency</div>
                <ul className="space-y-2 text-base text-ink-light list-disc pl-4 marker:text-primary">
                  <li>Uses compact, abstract, conceptual descriptors</li>
                  <li>Avoids examples or full language to preserve user agency and reduce reading time</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-primary/10 border-l-4 border-primary/50 p-6 rounded-r-xl mb-6">
            <p className="text-ink text-base md:text-lg leading-relaxed">
              <span className="font-bold">UI Change:</span> Replaced the original generic label “Sentence/Idea Suggestions” with the actual question being asked, helping users quickly orient and refer back to relevant prompts.
            </p>
          </div>

          {/* Visuals */}
          <ImageCarousel items={proficiencySuggestionImages} />
        </div>

        {/* Feature Design: Summaries */}
        <div className="space-y-8">
          <div>
            <h4 className="text-base md:text-lg font-bold text-ink mb-3 flex items-center gap-2">
              <span className="bg-ink text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">3</span> Summaries
            </h4>

            <p className="text-ink-light mb-6 text-base md:text-lg">
              Summaries showed no clear proficiency differences, but baseline findings revealed they were often ignored mid-conversation due to time pressure.
            </p>

            <div className="bg-primary/10 border-l-4 border-primary/50 p-6 rounded-r-xl mb-6 mt-8">
              <p className="text-ink text-base md:text-lg leading-relaxed">
                <span className="font-bold text-ink">UI Change:</span> Summaries were displayed in a minimized form with a brief 3-5 word descriptor, allowing users to quickly reference key context without reading the full summary and preserving access even when the panel auto-minimized for subsequent support.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3">
            <img
              src={`${import.meta.env.BASE_URL}images/all-summary.png`}
              alt="Iterated Summary Design"
              className="w-full max-w-3xl h-auto rounded-xl border border-slate-200 shadow-sm"
            />
            <p className="text-sm font-bold text-ink-light text-center">
              Iterated Summary Design
            </p>
          </div>
        </div>
      </section>

      {/* 3.2 User Study */}
      <section className="space-y-12">
        <div className="flex items-center gap-3 border-b-2 border-slate-100 pb-4">
          <div className="p-2 bg-primary-light rounded-lg">
            <Users className="w-5 h-5 text-primary-dark" />
          </div>
          <h3 className="text-xl font-heading font-bold text-ink">User Study Protocol</h3>
        </div>

        {/* Flowchart Visualization */}
        <div className="bg-white p-8 rounded-[2rem] border-2 border-slate-100 shadow-sm">
          <div className="flex flex-wrap gap-4 justify-center items-center">

            {[
              { icon: Monitor, label: "Multi-Device Setup", sub: "Picture-in-Picture on Zoom, TeamViewer remote control, Figma prototypes" },
              { icon: ClipboardCheck, label: "Consent & Study Overview" },
              { icon: MessageSquare, label: "Pre-study Interview", sub: "Meeting habits, communication difficulties, coping strategies" },
              { icon: BookOpen, label: "LexTALE Language Assessment", sub: "Assign low/mid/high proficiency conditions" },
              { icon: Eye, label: "Guided Demo", sub: "Introduce XPLAIN features" },
              { icon: MessageSquare, label: "Live Zoom Conversation with XPLAIN Support", sub: "Proficiency-matched data privacy Figma flow, Wizard-of-Oz with confederate", highlight: true },
              { icon: MessageSquare, label: "Post-study Interview", sub: "Experience, perceptions, design feedback" },
              { icon: FileText, label: "Post-Study Survey & Sentence Recall Task" }
            ].map((step, i, arr) => (
              <React.Fragment key={i}>
                <div className={`flex flex-col items-center text-center p-4 rounded-xl border-2 w-40 md:w-48 shrink-0 ${step.highlight ? 'bg-primary-light/30 border-primary' : 'bg-paper border-slate-100'}`}>
                  <step.icon className={`w-6 h-6 mb-2 ${step.highlight ? 'text-primary-dark' : 'text-slate-400'}`} />
                  <div className="text-sm font-bold text-ink leading-tight">{step.label}</div>
                  {step.sub && <div className="text-xs text-slate-500 mt-1">{step.sub}</div>}
                </div>
                {i < arr.length - 1 && (
                  <ArrowRight className="w-5 h-5 text-slate-300 hidden md:block" />
                )}
                {/* Mobile Down Arrow */}
                <div className="w-full flex justify-center md:hidden">
                  {i < arr.length - 1 && <div className="h-6 w-0.5 bg-slate-200 my-2"></div>}
                </div>
              </React.Fragment>
            ))}

          </div>
        </div>

        <p className="text-ink-light mb-6 text-base md:text-lg">
          I ran <span className="text-ink font-bold">11 user studies</span> for this study.
        </p>

        {/* Note: Ongoing Data Collection & Analysis */}
        <div className="border-2 border-dashed border-slate-300 bg-slate-50 p-6 md:p-8 rounded-3xl flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
          <div className="p-4 bg-white rounded-full shadow-sm border border-slate-100 shrink-0">
            <Activity className="w-6 h-6 text-slate-400 animate-pulse" />
          </div>
          <div>
            <div className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Project Status</div>
            <p className="text-ink font-bold text-base md:text-lg md:text-xl leading-relaxed">
              Data collection and analysis for this study is still ongoing. I am currently responsible for the thematic analysis of interview data in ATLAS.ti.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default XplainPersonalizationSection;
