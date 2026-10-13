
import React from 'react';
import {
  Languages,
  Brain,
  Clock,
  Globe,
  Search,
  Beaker,
  MessageSquare,
  ArrowRight,
  Layout,
  ClipboardCheck,
  FileText,
  Monitor,
  BookOpen,
  Eye,
  Activity,
  Lightbulb,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

type CarouselItem = {
  img: string;
  label: string;
};

const VideoCarousel: React.FC<{ items: CarouselItem[] }> = ({ items }) => {
  const [current, setCurrent] = React.useState(0);

  return (
    <div className="mt-8">

      {/* ---------- MOBILE: STACKED ---------- */}
      <div className="flex flex-col gap-6 md:hidden">
        {items.map((item, i) => (
          <div key={i} className="flex flex-col items-center gap-3">
            <div className="w-full bg-slate-100 rounded-xl overflow-hidden border border-slate-200">
              <video
                src={item.src}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto object-cover"
              />
            </div>
            <p className="text-sm font-bold text-ink-light text-center">
              {item.label}
            </p>
          </div>
        ))}
      </div>

      {/* ---------- DESKTOP: CAROUSEL ---------- */}
      <div className="hidden md:flex flex-col items-center gap-4">
        <div className="flex items-center gap-4 w-full max-w-4xl md:max-w-5xl lg:max-w-6xl">

          {/* Left Arrow */}
          <button
            onClick={() =>
              setCurrent((current - 1 + items.length) % items.length)
            }
            className="bg-white border border-primary/40 text-primary rounded-full p-2.5 shadow-sm"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Video */}
          <div className="w-full bg-slate-100 rounded-xl overflow-hidden border border-slate-200">
            <video
              key={items[current].src}   // forces reload when switching
              src={items[current].src}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto object-cover"
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


const videoItems = [
  {
    src: `${import.meta.env.BASE_URL}videos/language-switching.mp4`,
    label: "Language-switching interaction",
  },
  {
    src: `${import.meta.env.BASE_URL}videos/translation-conversation.mp4`,
    label: "The conversation with embedded clarifications and counterbalanced items",
  },
];

const XplainTranslationSection: React.FC = () => {
  return (
    <div className="space-y-20 animate-[fadeIn_0.5s_ease-out]">

      {/* Header */}
      <div>
        <h2 className="text-2xl md:text-3xl font-heading font-black text-ink mb-6 flex items-center gap-3">
          <span className="text-primary">04.</span> Translation Study: When and How Language Support Helps in Real-Time Conversations
        </h2>
      </div>

      {/* 4.1 Motivation & Study Goal */}
      <section className="space-y-12">
        <div className="flex items-center gap-3 border-b-2 border-slate-100 pb-4">
          <div className="p-2 bg-primary-light rounded-lg">
            <Languages className="w-5 h-5 text-primary-dark" />
          </div>
          <h3 className="text-xl font-heading font-bold text-ink">Motivation & Study Goal</h3>
        </div>

        {/* Vertical Stack: Why Translation first, then Domain/Context */}
        <div className="flex flex-col gap-12">

          {/* Section 1: Why Translation? */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-ink flex items-center gap-2">
              <span className="w-2 h-6 bg-primary rounded-full"></span>
              Why Translation Support?
            </h4>
            <div className="prose text-ink-light leading-relaxed text-base md:text-lg space-y-4">
              <p>
                In the baseline study, some participants suggested translation-based support, reporting that native-language explanations would feel faster and less mentally taxing. This aligns with psycholinguistic findings that bilingual speakers process meaning less automatically in L2 and require more effort to resolve conceptual difficulty, especially under time pressure.
              </p>

              <p>
                However, other participants did not find the need for translation. As the conversation itself was conducted in English, they noted that added processing and integration demands from translations could disrupt attention and response formulation.
              </p>

              <p>
                Psycholinguistic research consistently emphasizes that bilingual language use is shaped by individual proficiency, domain experience, and moment-to-moment task demands. While participants articulated preferences and reasoning, the effectiveness of translation, English-only, and bilingual formats within live conversations has not been systematically tested. Altogether, these motivated a controlled comparison across domain specificity, processing context, and individual differences.
              </p>
            </div>
          </div>

          {/* Section 2: Domain & Context */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-ink flex items-center gap-2">
              <span className="w-2 h-6 bg-primary rounded-full"></span>
              Why Domain & Context Matter
            </h4>
            <div className="prose text-ink-light leading-relaxed text-base md:text-lg space-y-4">
              <p>
                Real-time video conversations (e.g., classes, meetings, telemedicine visits) routinely involve:
              </p>
              <ul className="space-y-3">
                <li className="flex gap-3 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                  <Globe className="w-6 h-6 text-primary shrink-0" />
                  <div>
                    <span className="font-bold text-ink block text-sm uppercase tracking-wide mb-1">Domain Specificity</span>
                    <ul className="space-y-2 text-base md:text-lg text-ink-light list-disc pl-6 marker:text-primary">
                      <li><span className="text-ink font-bold">High-domain language:</span> Technical, specialized terminology requiring domain expertise for full comprehension and application</li>
                      <li><span className="text-ink font-bold">Low-domain language:</span> Descriptive, academic, or everyday vocabulary not requiring specialized domain knowledge</li>
                    </ul>
                  </div>
                </li>
                <li className="flex gap-3 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                  <Brain className="w-6 h-6 text-primary shrink-0" />
                  <div>
                    <span className="font-bold text-ink block text-sm uppercase tracking-wide mb-1">Processing Context</span>
                    <ul className="space-y-2 text-base md:text-lg text-ink-light list-disc pl-6 marker:text-primary">
                      <li><span className="text-ink font-bold">Comprehension:</span> Processing and understanding incoming speech</li>
                      <li><span className="text-ink font-bold">Production:</span> Preparing and delivering responses under time pressure</li>
                    </ul>
                  </div>
                </li>
              </ul>

              <p>
                These dimensions matter as:
              </p>

              <ul className="space-y-2 text-base md:text-lg text-ink-light list-disc pl-6 marker:text-primary">
                <li>Technical concepts may be more strongly represented in one language than another</li>
                <li>Comprehension allows time to integrate information, while Production requires immediate transformation into speech</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Research Question Box */}
        <div className="mt-8 bg-ink text-white p-6 md:p-10 rounded-3xl shadow-card relative overflow-hidden">
          {/* Decorative background element */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary opacity-20 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4 text-primary font-bold uppercase tracking-widest text-xs">
              <Search className="w-4 h-4" /> Research Question
            </div>
            <h3 className="text-lg md:text-2xl font-heading font-bold leading-relaxed">
              How does the effectiveness of language display formats (Translation, English, Bilingual) vary across domain specificity, processing context, and L2 proficiency in real-time conversations?
            </h3>
          </div>
        </div>
      </section>

      {/* 4.2 Experimental Structure */}
      <section className="space-y-10">
        <div className="flex items-center gap-3 border-b-2 border-slate-100 pb-4">
          <div className="p-2 bg-primary-light rounded-lg">
            <Beaker className="w-5 h-5 text-primary-dark" />
          </div>
          <h3 className="text-xl font-heading font-bold text-ink">Experimental Structure</h3>
        </div>

        {/* Vertical Stack: Design -> Rationale -> Constraints -> Clarifications */}
        <div className="flex flex-col gap-12">

          {/* Matrix Design */}
          <div>
            <h4 className="font-bold text-ink text-xl mb-4">Design: 2 × 2 × 3 Within-Subjects Factorial</h4>
            <div className="border-2 border-slate-200 rounded-2xl overflow-hidden shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50 text-slate-500 uppercase text-xs tracking-wider font-bold">
                  <tr>
                    <th className="p-4 border-b border-r border-slate-200">Factor</th>
                    <th className="p-4 border-b border-slate-200">Levels</th>
                  </tr>
                </thead>
                <tbody className="text-base text-ink divide-y divide-slate-100">
                  <tr>
                    <td className="p-4 font-bold border-r border-slate-100 bg-white">Domain Specificity</td>
                    <td className="p-4 bg-white">High vs. Low</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold border-r border-slate-100 bg-white">Processing Context</td>
                    <td className="p-4 bg-white">Comprehension vs. Production</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold border-r border-slate-100 bg-white text-primary-dark">Display Format</td>
                    <td className="p-4 bg-white font-bold text-primary-dark">Translation vs. English vs. Bilingual</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-8 space-y-4">
              <h5 className="font-bold text-ink text-sm tracking-wide">Rationale</h5>
              <p className="text-ink-light text-base md:text-lg leading-relaxed">
                Unlike the personalization study, which evaluated specific proficiency-aware design choices, this study adopts a condition-based factorial design to systematically test how different language display formats function under varying conversational demands. Considering the psycholinguistic literature and the nature of live conversations, explanatory support may benefit from L1 presentation to reduce parsing effort, while producible support may benefit from L2 presentation to support direct lexical access during speech. However, bilingual language use varies widely across individuals, domains, and moments within live conversation, and these assumptions have not been tested under controlled, real-time interaction. Rather than committing to a single strategy, we manipulated display format (Translation, English, Bilingual) across domain specificity and processing context to observe when and for whom each format is most effective.
              </p>
            </div>
          </div>

          {/* Constraints - Unboxed */}
          <div className="space-y-6">
            <h4 className="font-bold text-ink text-base md:text-lg flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" /> Key Constraints
            </h4>
            <ul className="space-y-4 text-base md:text-lg text-ink-light list-disc pl-6 marker:text-primary">
              <li>Participants: Chinese–English bilinguals.</li>
              <li>Conceptual L1/L2 familiarity was excluded due to high subjectivity and individual variability (lexical L2 familiarity was retained, as clarifications are designed to support access to unfamiliar L2 terms).</li>
              <li>12 clarification events per participant (1 per condition).</li>
            </ul>

            <div className="pt-4 space-y-4">
              <h5 className="font-bold text-ink text-sm tracking-wide">Why only clarifications?</h5>
              <p className="text-base md:text-lg text-slate-500 leading-relaxed">
                Given the 1-hour session constraint with a ~30-minute live conversation needed to preserve natural interaction and allow pre- and post-task measures, we focused exclusively on clarification support. Clarifications are the most direct and controllable form of assistance, enabling precise experimental manipulation without altering prescripted conversational flow. Including additional features (i.e., suggestions or summaries) would have added factors, extended session length, and increased participant fatigue, reducing both ecological validity and measurement reliability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4.3 Hypotheses */}
      <section className="space-y-8">
        <div className="flex items-center gap-3 border-b-2 border-slate-100 pb-4">
          <div className="p-2 bg-primary-light rounded-lg">
            <Lightbulb className="w-5 h-5 text-primary-dark" />
          </div>
          <h3 className="text-xl font-heading font-bold text-ink">Hypotheses</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Card H1 */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border-2 border-primary shadow-sm transition-all group">
            <h4 className="text-sm font-black text-primary uppercase tracking-widest mb-3">H1: Domain × Format</h4>
            <p className="text-ink font-bold text-base md:text-lg mb-4 leading-tight">
              High-Domain content will show greater sensitivity to display format than Low-Domain content.
            </p>
            <p className="text-base text-slate-500 leading-relaxed border-l-2 border-slate-200 pl-4">
              <span className="font-bold text-slate-600">Supporting literature:</span> The Complementarity Principle shows that lexical and conceptual knowledge are organized by domains of use rather than uniformly across languages. Access to meaning is more efficient in the language typically used for a given domain, while there is a higher processing cost when concepts are accessed through a weaker language-domain pairing. Thus, technical (High-Domain) content is more likely to exhibit sensitivity to display format, while Low-Domain content relies primarily on general language knowledge and is less format-dependent.
            </p>
          </div>

          {/* Card H2 */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border-2 border-primary shadow-sm transition-all group">
            <h4 className="text-sm font-black text-primary uppercase tracking-widest mb-3">H2: Context × Format</h4>
            <p className="text-ink font-bold text-base md:text-lg mb-4 leading-tight">
              Formats that have translations (L1/Bilingual) will help more in Comprehension than in Production.
            </p>
            <p className="text-base text-slate-500 leading-relaxed border-l-2 border-slate-200 pl-4">
              <span className="font-bold text-slate-600">Supporting literature:</span> Psycholinguistic models of speech production emphasize rapid lexical retrieval, grammatical encoding, and phonological planning under strict time constraints. Subtitle research further shows that translations consume attentional resources, which may reduce attention needed to L2 forms for production. Together, this suggests that translation is more usable when listening (Comprehension) than when preparing to speak (Production), where additional reading (bilingual) or additional internally translating from L1 to L2 (L1-only) may interfere with response planning.
            </p>
          </div>

          {/* Card H3 */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border-2 border-primary shadow-sm transition-all group">
            <h4 className="text-sm font-black text-primary uppercase tracking-widest mb-3">H3: Domain × Context × Format</h4>
            <p className="text-ink font-bold text-base md:text-lg mb-4 leading-tight">
              The Domain × Format interaction will be strongest in Comprehension and attenuated in Production.
            </p>
            <p className="text-base text-slate-500 leading-relaxed border-l-2 border-slate-200 pl-4">
              <span className="font-bold text-slate-600">Supporting literature:</span> While clarifications support conceptual understanding, production remains constrained by downstream processes such as lexical form retrieval and articulation. Under time pressure and direct L2 access needs, these constraints limit how fully format-based advantages can be exploited and limit the extent to which domain-specific advantages can be realized.
            </p>
          </div>

          {/* Card H4 */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border-2 border-primary shadow-sm transition-all group">
            <h4 className="text-sm font-black text-primary uppercase tracking-widest mb-3">H4: Individual Differences</h4>
            <p className="text-ink font-bold text-base md:text-lg mb-4 leading-tight">
              Lower L2 proficiency participants will show larger Translation benefits.
            </p>
            <p className="text-base text-slate-500 leading-relaxed border-l-2 border-slate-200 pl-4">
              <span className="font-bold text-slate-600">Supporting literature:</span> Lower-proficiency bilinguals rely more heavily on L1-mediated conceptual access, while higher-proficiency speakers have more automatized L2 access and production.
            </p>
          </div>
        </div>
      </section>

      {/* 4.4 Conversational Scenario Design */}
      <section className="space-y-12">
        <div className="flex items-center gap-3 border-b-2 border-slate-100 pb-4">
          <div className="p-2 bg-primary-light rounded-lg">
            <MessageSquare className="w-5 h-5 text-primary-dark" />
          </div>
          <h3 className="text-xl font-heading font-bold text-ink">Conversational Scenario Design</h3>
        </div>

        <div>
          <h4 className="font-bold text-ink text-xl mb-4">Topic: Dietitian Visit</h4>
          <p className="text-ink-light leading-relaxed mb-8 max-w-4xl text-base md:text-lg">
            We chose a dietitian visit as  it naturally integrates:
          </p>

          <ul className="space-y-3 text-base md:text-lg text-ink-light list-disc pl-6 marker:text-primary mb-10">
            <li><span className="text-ink font-bold">High-Domain</span> (medical, diet terminology) and <span className="text-ink font-bold">low-domain</span> (non-technical) terms</li>
            <li><span className="text-ink font-bold">Comprehension</span> (listening to explanations) and <span className="text-ink font-bold">Production</span> (responding and describing habits, conditions, etc.)</li>
            <li><span className="text-ink font-bold">Realistic time pressure</span> without requiring specialized prior knowledge.</li>
            <li><span className="text-ink font-bold">Broad relevance and accessibility for college students (participants):</span> diet, eating routines, sleep, and gym habits are familiar and applicable to most participants, allowing them to meaningfully engage, contribute responses, and ask questions, unlike niche medical topics tied to chronic conditions or older populations</li>
          </ul>

          {/* Timeline Diagram */}
          <div className="bg-white p-8 rounded-[2.5rem] border-2 border-slate-100 shadow-sm overflow-x-auto">
            <h5 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-8 text-center">~30 Min Live Zoom Conversation Structure</h5>

            <div className="min-w-[600px] flex items-center justify-between relative px-10">
              {/* Connector Line */}
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-100 -z-10"></div>

              {/* Nodes */}
              {[
                { time: "0-7 min", phase: "Phase 1", items: "4 Clarifications" },
                { time: "8-15 min", phase: "Phase 2", items: "4 Clarifications" },
                { time: "16-23 min", phase: "Phase 3", items: "4 Clarifications" },
                { time: "24+ min", phase: "Wrap-up", items: "Summary & Debrief" },
              ].map((node, i) => (
                <div key={i} className="flex flex-col items-center gap-3 bg-white p-2">
                  <div className="w-4 h-4 rounded-full bg-primary ring-4 ring-primary-light"></div>
                  <div className="text-center">
                    <div className="font-bold text-ink text-sm">{node.phase}</div>
                    <div className="text-xs text-slate-400 font-mono mb-1">{node.time}</div>
                    <div className="text-xs font-bold text-primary bg-primary-light px-2 py-0.5 rounded-full">{node.items}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Counterbalancing Table - Compressed */}
          <div className="mt-8">
            <h5 className="font-bold text-ink text-sm mb-4">Counterbalancing in Order</h5>
            <div className="overflow-hidden border-2 border-slate-100 rounded-2xl bg-white">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-xs tracking-wider">
                  <tr>
                    <th className="p-2 border-b border-r border-slate-200 w-[25%]">Target Term</th>
                    <th className="p-2 border-b border-r border-slate-200 w-[35%]">Condition</th>
                    <th className="p-2 border-b border-slate-200 w-[40%]">Display Format</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    { term: "bloated", cond: "P + High D", fmt: "L1" },
                    { term: "fennel", cond: "C + Low D", fmt: "BOTH but ENG above" },
                    { term: "glycemic index", cond: "C + High D", fmt: "L1" },
                    { term: "Mouth ulcer", cond: "P + High D", fmt: "BOTH but L1 above" },
                    { term: "over-the-counter", cond: "P + Low D", fmt: "ENG" },
                    { term: "watercress", cond: "C + Low D", fmt: "L1" },
                    { term: "Medicine ball", cond: "P + Low D", fmt: "BOTH but ENG above" },
                    { term: "Weight cycling", cond: "C + Low D", fmt: "ENG" },
                    { term: "Spasm", cond: "C + High D", fmt: "BOTH but L1 above" },
                    { term: "Creatine", cond: "P + High D", fmt: "ENG" },
                    { term: "Leaflet", cond: "P + Low D", fmt: "L1" },
                    { term: "migraine", cond: "C + High D", fmt: "ENG" },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-2 border-r border-slate-100 font-bold text-ink capitalize">{row.term}</td>
                      <td className="p-2 border-r border-slate-100 text-ink-light font-mono text-xs">{row.cond}</td>
                      <td className="p-2 text-primary-dark font-mono text-xs font-bold">{row.fmt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-xs text-slate-500 italic leading-relaxed">
              <span className="font-bold">Legend:</span> C = Comprehension, P = Production, High D = High-Domain, Low D = Low-Domain, BOTH = Bilingual Format, above = language situated above in bilingual format.
            </p>
          </div>
        </div>
      </section>

      {/* 4.5 Feature Design */}
      <section className="space-y-12">
        <div className="flex items-center gap-3 border-b-2 border-slate-100 pb-4">
          <div className="p-2 bg-primary-light rounded-lg">
            <Layout className="w-5 h-5 text-primary-dark" />
          </div>
          <h3 className="text-xl font-heading font-bold text-ink">Feature Design</h3>
        </div>

        {/* Vertical Stack: Text -> Images below */}
        <div className="flex flex-col gap-10">
          <div className="space-y-6">
            <p className="text-ink-light leading-relaxed text-base md:text-lg">
              Clarifications appear in <span className="font-bold text-ink">Translation, English, or Bilingual</span> formats depending on the condition. Users can manually switch languages, preserving autonomy and revealing preference behavior.
            </p>

            <div className="bg-primary/10 border-l-4 border-primary/50 p-6 rounded-r-xl">
              <p className="text-ink text-base md:text-lg leading-relaxed">
                <span className="font-bold">UI Change:</span> Script constrained to 1–2 lines per slide to simulate real caption timing and prevent premature clicking.
              </p>
            </div>
          </div>

          {/* Videos */}
          <VideoCarousel items={videoItems} />
        </div>
      </section>

      {/* 4.6 Survey Design */}
      <section className="space-y-12">
        <div className="flex items-center gap-3 border-b-2 border-slate-100 pb-4">
          <div className="p-2 bg-primary-light rounded-lg">
            <ClipboardCheck className="w-5 h-5 text-primary-dark" />
          </div>
          <h3 className="text-xl font-heading font-bold text-ink">Survey Design</h3>
        </div>

        <p className="text-ink-light text-base md:text-lg">I built both surveys in <span className="font-bold text-ink">Qualtrics</span>.</p>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Pre-Study */}
          <div className="bg-white border-2 border-slate-100 rounded-3xl p-6 md:p-8 h-full shadow-sm">
            <h4 className="text-base md:text-lg font-bold text-ink mb-6 flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" /> Pre-Study Survey
            </h4>
            <ul className="space-y-6">
              <li className="space-y-2">
                <div className="font-bold text-ink text-sm uppercase tracking-wide">English Proficiency</div>
                <p className="text-base text-ink-light">LEXTALE & standardized scores to establish an objective baseline for individual-difference analysis.</p>
              </li>
              <li className="space-y-2">
                <div className="font-bold text-ink text-sm uppercase tracking-wide">Health-domain Background</div>
                <p className="text-base text-ink-light">Prior coursework or exposure to health, nutrition, or biology topics to control for prior expertise.</p>
              </li>
              <li className="space-y-2">
                <div className="font-bold text-ink text-sm uppercase tracking-wide">Medical Literacy by Language</div>
                <p className="text-base text-ink-light">Multiple-choice meaning recognition for terms like <i>anemia, biotin</i> (terms not used in the conversation task) to assess medical-domain dominance in each language.</p>
              </li>
              <li className="space-y-2">
                <div className="font-bold text-ink text-sm uppercase tracking-wide">Task-Relevant Medical Communication Ability</div>
                <p className="text-base text-ink-light">Likert-scale ratings (Very difficult → Very easy) in English and Chinese for tasks such as understanding doctors’ explanations, expressing symptoms, following medication instructions, and interpreting health information in media to contextualize participants’ performance during the dietitian-visit conversation, accounting for differences in prior functional language ability.</p>
              </li>
            </ul>
          </div>

          {/* Post-Study */}
          <div className="bg-white border-2 border-slate-100 rounded-3xl p-6 md:p-8 h-full shadow-sm">
            <h4 className="text-base md:text-lg font-bold text-ink mb-6 flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" /> Post-Study Survey
            </h4>
            <ul className="space-y-6">
              <li className="space-y-2">
                <div className="font-bold text-ink text-sm uppercase tracking-wide">Format-Specific Experience</div>
                <p className="text-base text-ink-light">Likert-scale ratings for clarifications during comprehension and production across formats, covering time pressure, mental effort, understanding of technical vs. non-technical terms, integration into ongoing understanding, conversational flow and fluency, confidence, engagement, and perceived support.</p>
              </li>
              <li className="space-y-2">
                <div className="font-bold text-ink text-sm uppercase tracking-wide">Bilingual Communication Profile</div>
                <p className="text-base text-ink-light">Self-reported language experience and behavior (e.g., speaking anxiety, lexical/grammatical difficulty, comfort asking for clarification, typical coping strategies, and language use across contexts) (didn’t put in pre-study survey to avoid priming effects that could influence in-task behavior).</p>
              </li>
              <li className="space-y-2">
                <div className="font-bold text-ink text-sm uppercase tracking-wide">Learning and Retention</div>
                <p className="text-base text-ink-light">Vocabulary recall task for clarified words.</p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 4.7 Protocol */}
      <section className="space-y-10">
        <div className="flex items-center gap-3 border-b-2 border-slate-100 pb-4">
          <div className="p-2 bg-primary-light rounded-lg">
            <Activity className="w-5 h-5 text-primary-dark" />
          </div>
          <h3 className="text-xl font-heading font-bold text-ink">User Study Protocol</h3>
        </div>

        {/* Flowchart Visualization */}
        <div className="bg-white p-8 rounded-[2rem] border-2 border-slate-100 shadow-sm">
          <div className="flex flex-wrap gap-4 justify-center items-center">
            {[
              { icon: Monitor, label: "Multi-Device Setup", sub: "Picture-in-Picture on Zoom, TeamViewer remote control, Figma prototypes" },
              { icon: ClipboardCheck, label: "Consent & Overview" },
              { icon: FileText, label: "Pre-study Survey" },
              { icon: BookOpen, label: "LexTALE Language Assessment", sub: "Assess English proficiency" },
              { icon: Eye, label: "Guided Demo", sub: "Introduce XPLAIN support" },
              { icon: MessageSquare, label: "Live Zoom Conversation with XPLAIN Support", sub: "Dietitian visit Figma flow, Wizard-of-Oz with confederate", highlight: true },
              { icon: FileText, label: "Post-study Survey" },
              { icon: MessageSquare, label: "Post-study Interview", sub: "In-depth probing of survey ratings, format trade-offs, design feedback" },
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

        <p className="text-ink-light text-base md:text-lg">I have run <span className="font-bold text-ink">4 user studies</span> for this assignment.</p>

        {/* Note: Ongoing Data Analysis (Dashed Style) */}
        <div className="mt-8 border-2 border-dashed border-slate-300 bg-slate-50 p-6 md:p-8 rounded-3xl flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
          <div className="p-4 bg-white rounded-full shadow-sm border border-slate-100 shrink-0">
            <Activity className="w-6 h-6 text-slate-400 animate-pulse" />
          </div>
          <div>
            <div className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Project Status</div>
            <p className="text-ink font-bold text-lg md:text-xl leading-relaxed">
              Data collection and analysis for this study is still ongoing. I am currently responsible for the thematic analysis of interview data in ATLAS.ti.
            </p>
          </div>
        </div>

      </section>

    </div>
  );
};

export default XplainTranslationSection;
