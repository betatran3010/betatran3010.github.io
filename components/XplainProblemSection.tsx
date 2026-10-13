
import React from 'react';
import { Brain, Monitor, Globe, AlertTriangle, Lightbulb, Search } from 'lucide-react';

const XplainProblemSection: React.FC = () => {
  return (
    <div className="space-y-12 animate-[fadeIn_0.5s_ease-out]">

      {/* Header & Subhead */}
      <div>
        <h2 className="text-2xl md:text-3xl font-heading font-black text-ink mb-3 flex items-center gap-3">
          <span className="text-primary">01.</span> Problem & Motivation
        </h2>
        <p className="text-ink-light mb-6 text-base md:text-lg">
          Why computer-mediated real-time conversations are more demanding for non-native speakers, and why reactive support falls short.
        </p>
      </div>

      {/* Conceptual Flow Container */}
      {/* Added ml-12 on mobile to account for the absolute left icons (-left-[43px]) */}
      <div className="relative border-l-2 border-slate-200 pl-8 md:pl-12 space-y-14 ml-12 md:ml-16 py-2">

        {/* 1. Cognitive Baseline */}
        <div className="relative">
          <div className="absolute -left-[48px] md:-left-[65px] top-0 w-8 h-8 md:w-10 md:h-10 bg-white border-2 border-slate-200 rounded-full flex items-center justify-center text-slate-400 shadow-sm z-10">
            <Brain className="w-4 h-4 md:w-5 md:h-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Cognitive Processes of Turn-Taking</h3>

          <div className="bg-slate-50 p-4 md:p-6 rounded-2xl border border-slate-200">
            <div className="flex flex-col sm:flex-row gap-4 items-start justify-between mb-5">
              <div className="flex-1 w-full bg-white p-3 rounded-xl border border-slate-100 shadow-sm text-center h-full">
                <div className="font-bold text-ink">Comprehension</div>
                <div className="text-xs text-slate-500 font-medium">Processing speech</div>
              </div>

              <div className="flex-1 w-full bg-white p-3 rounded-xl border border-slate-100 shadow-sm text-center h-full">
                <div className="font-bold text-ink">Prediction</div>
                <div className="text-xs text-slate-500 font-medium">Anticipating upcoming content, timing, and linguistic elements</div>
              </div>

              <div className="flex-1 w-full bg-white p-3 rounded-xl border border-slate-100 shadow-sm text-center h-full">
                <div className="font-bold text-ink">Production</div>
                <div className="text-xs text-slate-500 font-medium">Formulating and delivering timely, coherent, and contextually appropriate responses</div>
              </div>
            </div>
            <p className="text-ink-light font-medium leading-snug text-sm md:text-base">
              In real-time conversations, these processes must be coordinated within milliseconds.
            </p>
          </div>
        </div>

        {/* 2. CMC Constraints */}
        <div className="relative">
          <div className="absolute -left-[48px] md:-left-[65px] top-0 w-8 h-8 md:w-10 md:h-10 bg-white border-2 border-slate-200 rounded-full flex items-center justify-center text-slate-400 shadow-sm z-10">
            <Monitor className="w-4 h-4 md:w-5 md:h-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">Constraints in Computer-Mediated Communication</h3>
          <p className="text-ink-light text-base md:text-lg font-medium leading-relaxed">
            Video-conferencing, now common in remote and hybrid workplaces, typically provide reduced visual and auditory cues. Combined with rapid turn-taking and topic shifts, these issues place greater demands on <span className="text-ink font-bold">predictive processing</span>.
          </p>
        </div>

        {/* 3. NNS Experience */}
        <div className="relative">
          <div className="absolute -left-[48px] md:-left-[65px] top-0 w-8 h-8 md:w-10 md:h-10 bg-white border-2 border-slate-200 rounded-full flex items-center justify-center text-slate-400 shadow-sm z-10">
            <Globe className="w-4 h-4 md:w-5 md:h-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">Impact on Non-Native Speakers</h3>
          <div className="space-y-4">
            <p className="text-ink-light text-base md:text-lg leading-relaxed">
              Non-native speakers often have less automatic access to linguistic, cultural, and domain-specific knowledge, which can make the aforementioned cognitive processes and contextual cue integration more effortful.
            </p>
            <div className="bg-primary/10 border-l-4 border-primary/50 p-4 rounded-r-xl mb-6">
              <p className="text-ink-light text-base md:text-lg leading-relaxed">,
                <span className="text-ink font-bold">Result: Miscomprehension, disfluencies, awkward pauses, reduced participation, anxiety, and inappropriate responses.</span> They are often misinterpreted as disengagement or lack of competence, rather than effortful cognitive and linguistic processing under technical constraints.
              </p>
            </div>
          </div>
        </div>

        {/* 4. Reactive Limits */}
        <div className="relative">
          <div className="absolute -left-[48px] md:-left-[65px] top-0 w-8 h-8 md:w-10 md:h-10 bg-white border-2 border-slate-200 rounded-full flex items-center justify-center text-slate-400 shadow-sm z-10">
            <AlertTriangle className="w-4 h-4 md:w-5 md:h-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">Limitations of Reactive Support</h3>
          <p className="text-ink-light font-medium leading-relaxed mb-3 text-base md:text-lg">
            Common strategies – asking for clarification, looking up terms, or reviewing transcripts afterward – are reactive. They arrive <span className="text-ink font-bold">after</span> confusion has surfaced and provide limited help when real-time continuity matters.
          </p>
        </div>

        {/* 5. Proactive Relevance */}
        <div className="relative">
          <div className="absolute -left-[48px] md:-left-[65px] top-0 w-8 h-8 md:w-10 md:h-10 bg-primary-light border-2 border-primary rounded-full flex items-center justify-center text-primary-dark shadow-sm z-10">
            <Lightbulb className="w-4 h-4 md:w-5 md:h-5" />
          </div>
          <h3 className="text-sm font-bold text-primary uppercase tracking-widest mb-3">Why Proactive Support?</h3>
          <p className="text-ink-light text-base md:text-lg leading-relaxed">
            Proactive support can offload predictive demands by anticipating potential linguistic, cultural, or domain-related knowledge gaps <span className="text-ink font-bold">as conversations unfold</span>. Timely, context-aware assistance can support comprehension, response planning, and alignment <span className="text-ink font-bold">during interaction</span> rather than after communication breakdowns occur.
          </p>
        </div>

      </div>

      {/* Research Question */}
      <div className="mt-8 bg-ink text-white p-6 md:p-10 rounded-3xl shadow-card relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary opacity-20 rounded-full blur-3xl"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4 text-primary font-bold uppercase tracking-widest text-xs">
            <Search className="w-4 h-4" /> Research Question
          </div>
          <h3 className="text-lg md:text-2xl font-heading font-bold leading-relaxed">
            How might we design a proactive AI system that anticipates and scaffolds prediction during real-time turn-taking to reduce comprehension, production, and participation barriers faced by non-native speakers in live conversations?
          </h3>
        </div>
      </div>

    </div>
  );
};

export default XplainProblemSection;
