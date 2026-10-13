
import React, { useState, useRef, useEffect } from 'react';
import {
  Calendar,
  Shirt,
  MessageSquare,
  Camera,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Eye,
  Sparkles,
  Play,
  Layers,
  Lightbulb,
  Clock,
  Map,
  Search,
  PenTool,
  RotateCw,
  LayoutTemplate
} from 'lucide-react';

// --- Components ---

// Container for Mobile-Sized Video (No Frame, click to play)
interface MobileVideoContainerProps {
  src?: string;
  label?: string;
}

const MobileVideoContainer: React.FC<MobileVideoContainerProps> = ({ src, label }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const playPromise = video.play();
            if (playPromise !== undefined) {
              playPromise
                .then(() => setIsPlaying(true))
                .catch((e) => {
                  console.log('Autoplay prevented:', e);
                  setIsPlaying(false);
                });
            }
          } else {
            video.pause();
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.6 } // Play when 60% visible
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [src]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className="w-[280px] md:w-[300px] aspect-[9/16] bg-stone-100 rounded-3xl overflow-hidden relative shrink-0 mx-auto shadow-xl cursor-pointer group border-4 border-white"
      onClick={togglePlay}
    >
      {src ? (
        <>
          <video
            ref={videoRef}
            src={src}
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/5 transition-colors">
              <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm transform transition-transform group-hover:scale-110">
                <Play className="w-8 h-8 text-stone-800 ml-1 fill-stone-800" />
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-stone-200">
          <div className="text-center p-4">
            <div className="w-16 h-16 bg-white/30 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <Play className="w-6 h-6 text-stone-500" />
            </div>
            <p className="text-stone-500 text-xs font-bold uppercase tracking-widest">{label || "Video Demo"}</p>
          </div>
        </div>
      )}
    </div>
  );
};

// Feature Row Component (Side-by-Side)
interface FeatureRowProps {
  number: string;
  icon?: React.ElementType;
  title: string;
  howItWorks?: React.ReactNode;
  rationale?: React.ReactNode;
  videoSrc?: string;
  videoLabel?: string;
  // For comparison features
  hasComparison?: boolean;
  beforeText?: string;
  afterText?: string;
  beforeVideoSrc?: string;
  afterVideoSrc?: string;
  iterationTitle?: string;
  iterationNote?: string;
  // Props for why/how structure if passed directly (from previous version compatibility)
  why?: React.ReactNode;
  note?: React.ReactNode;
  hideWhyHow?: boolean;
}

const FeatureRow: React.FC<FeatureRowProps> = ({
  number,
  title,
  howItWorks,
  rationale,
  why,
  note,
  videoSrc,
  videoLabel,
  hasComparison = false,
  beforeText,
  afterText,
  beforeVideoSrc,
  afterVideoSrc,
  iterationTitle,
  iterationNote,
  hideWhyNote = false
}) => {
  // State for comparison toggle
  const [view, setView] = useState<'before' | 'after'>('before');

  // Normalize content props
  const contentWhy = why || rationale;
  const contentNote = note || howItWorks;

  return (
    <div className="flex flex-col md:flex-row items-start gap-8 md:gap-12 lg:gap-16 animate-[fadeIn_0.5s_ease-out]">

      {/* Content Side (Left) */}
      <div className="flex-1 space-y-6 pt-2 min-w-0">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-orange-400 rounded-full flex items-center justify-center shrink-0 border-[4px] border-white shadow-lg text-white font-black text-xl">
            {number}
          </div>
          <h3 className="text-2xl md:text-2xl font-heading font-black text-amber-900 leading-tight">
            {title}
          </h3>
        </div>

        {/* Independent Iteration Note (for features without comparison) - MOVED ABOVE WHY/NOTE */}
        {!hasComparison && iterationNote && (
          <div className="space-y-3">
            <div className="p-3 border-l-4 border-orange-400 bg-orange-50 rounded-r-xl inline-block">
              <p className="font-bold text-orange-900 text-sm">{iterationNote}</p>
            </div>
          </div>
        )}

        {/* Why & Note Box */}
        {!hideWhyNote && contentWhy && contentNote && (
          <div className="bg-yellow-50 p-6 rounded-[2rem] border-4 border-yellow-100">
            <div className="space-y-4 text-base text-stone-600 leading-relaxed">
              <div>
                <span className="font-heading font-black text-amber-900 text-lg block uppercase tracking-wide">Why</span>
                {typeof contentWhy === 'string' ? <p>{contentWhy}</p> : contentWhy}
              </div>
              <div>
                <span className="font-heading font-black text-amber-900 text-lg block uppercase tracking-wide">Notes</span>
                {typeof contentNote === 'string' ? <p>{contentNote}</p> : contentNote}
              </div>
            </div>
          </div>
        )}

        {/* Comparison Text (If applicable) */}
        {hasComparison && (
          <div className="space-y-4 pt-2">
            {iterationNote && (
              <div className="p-3 border-l-4 border-orange-400 bg-orange-50 rounded-r-xl inline-block w-full">
                <p className="font-bold text-orange-900 text-sm">{iterationNote}</p>
              </div>
            )}
            {iterationTitle && <h4 className="font-heading font-black text-xl text-stone-800">{iterationTitle}</h4>}
            <div className="text-stone-600 text-base font-medium leading-relaxed bg-white p-6 rounded-[2rem] border-4 border-stone-100 shadow-sm relative overflow-hidden transition-all duration-300">
              <div className={`absolute top-0 left-0 px-4 py-2 rounded-br-2xl text-xs font-black uppercase tracking-widest ${view === 'before' ? 'bg-stone-200 text-stone-600' : 'bg-green-100 text-green-700'}`}>
                {view === 'before' ? 'Previous Design' : 'Iterated Design'}
              </div>
              <div className="mt-8">
                {view === 'before' ? beforeText : afterText}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Visual Side (Right) - Sticky on Desktop */}
      <div className="w-full md:w-auto flex flex-col items-center md:sticky md:top-32 self-start">
        {!hasComparison ? (
          <MobileVideoContainer src={videoSrc} label={videoLabel} />
        ) : (
          <div className="relative group flex flex-col items-center gap-6">
            {/* Badge Outside Video */}
            <div className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest shadow-sm transition-colors ${view === 'before' ? 'bg-stone-200 text-stone-600' : 'bg-green-100 text-green-700'}`}>
              {view === 'before' ? 'Before' : 'After'}
            </div>

            <div className="relative">
              {/* Video Container changes based on view */}
              <MobileVideoContainer
                key={view}
                src={view === 'before' ? beforeVideoSrc : afterVideoSrc}
                label={view === 'before' ? 'Before' : 'After'}
              />

              {/* Toggle Arrows Floating on Sides */}
              {view === 'before' && (
                <button
                  onClick={() => setView('after')}
                  className="absolute top-1/2 -right-6 md:-right-12 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-amber-500 hover:scale-110 transition-transform z-20 border-2 border-amber-100"
                  aria-label="View After"
                >
                  <ArrowRight className="w-6 h-6" />
                </button>
              )}
              {view === 'after' && (
                <button
                  onClick={() => setView('before')}
                  className="absolute top-1/2 -left-6 md:-left-12 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-amber-500 hover:scale-110 transition-transform z-20 border-2 border-amber-100"
                  aria-label="View Before"
                >
                  <ArrowLeft className="w-6 h-6" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

// Showcase video with the same large play button used on the XPLAIN videos.
const ShowcaseVideo: React.FC<{ src: string }> = ({ src }) => {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  return (
    <>
      <video
        ref={ref}
        src={`${src}#t=0.1`}
        className="w-full h-full object-cover"
        controls
        preload="metadata"
        playsInline
        aria-label="Reposet project showcase"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
      />
      {!playing && (
        <button type="button" className="xp-play" aria-label="Play: Reposet project showcase" onClick={() => ref.current?.play()}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4.5v15a1 1 0 0 0 1.5.86l12.5-7.5a1 1 0 0 0 0-1.72L8.5 3.64A1 1 0 0 0 7 4.5z" /></svg>
        </button>
      )}
    </>
  );
};

const ReposetDetailSection: React.FC = () => {
  return (
    <div className="space-y-16 animate-[fadeIn_0.5s_ease-out] font-sans">

      {/* --- USER RESEARCH & INSIGHTS --- */}
      <section className="max-w-6xl mx-auto px-4 space-y-10">

        {/* Intro */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <MessageSquare className="w-8 h-8 text-orange-400" />
            <h2 className="text-2xl font-heading font-black text-amber-900">User Research</h2>
          </div>
          <p className="text-base md:text-lg text-stone-600 font-medium leading-relaxed">
            I conducted <span className="text-ink font-bold">contextual interviews</span> with Cornell students in dorm rooms and apartments, combining semi-structured interviews, closet tours, and “show & tell” of tools they currently use for outfit planning and wardrobe management.
          </p>
        </div>

        {/* Affinity Diagramming */}
        <div>
          <h4 className="text-ink font-bold uppercase tracking-widest text-sm mb-4 flex items-center gap-2">
            <Layers className="w-4 h-4" /> Affinity Diagramming
          </h4>

          <p className="text-base md:text-lg text-stone-600 font-medium leading-relaxed mb-4">
            My groupmates and I synthesized and arranged the activity notes we coded from our contextual interviews.
          </p>

          <div className="flex justify-center">
            <div className="inline-block rounded-3xl overflow-hidden shadow-md border-2 border-stone-100">
              <img
                src={`${import.meta.env.BASE_URL}images/affinity-diagram.png`}
                alt="Affinity Diagram Synthesis"
                className="w-full max-h-[500px]"
              />
            </div>
          </div>
        </div>

        {/* Key Insights Pills */}
        <div>
          <h4 className="text-ink font-bold uppercase tracking-widest text-sm mb-4 flex items-center gap-2">
            <Lightbulb className="w-4 h-4" /> Insights
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: Calendar,
                title: "Context-Driven",
                desc: "Students use Google Calendar, Scheduler, and the Weather app to plan outfits around their schedules and Cornell’s unpredictable weather and indoor temps."
              },
              {
                icon: Sparkles,
                title: "Creativity",
                desc: "Students express creativity through their wardrobe through small styling choices rather than large changes."
              },
              {
                icon: Shirt,
                title: "Motivation",
                desc: "Students want to rewear more of their wardrobe but lack the motivation to move beyond convenient, familiar pieces."
              },
              {
                icon: Eye,
                title: "Visibility",
                desc: "Students overlook clothes hidden in piles, corners, and drawers, and searching them in a cluttered closet takes too much time."
              }
            ].map((insight, i) => (
              <div key={i} className="p-6 md:p-8 rounded-[2rem] shadow-md transition-transform relative overflow-hidden group" style={{ background: '#F5B800', color: '#2B1A00' }}>
                <div className="absolute -right-4 -top-4 bg-white/25 w-24 h-24 rounded-full transition-transform"></div>
                <div className="flex items-center gap-3 relative z-10">
                  <div className="bg-[#2B1A00]/10 p-2 rounded-xl">
                    <insight.icon className="w-6 h-6" style={{ color: '#2B1A00' }} />
                  </div>
                  <h4 className="font-black text-lg">{insight.title}</h4>
                </div>
                <p className="text-base font-medium leading-relaxed relative z-10">{insight.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PROBLEM STATEMENT (With Bear) --- */}
      <section className="max-w-5xl mx-auto px-4 flex flex-col-reverse md:flex-row items-center md:items-end gap-6 relative">

        {/* Bear Image Placeholder */}
        <div className="w-36 shrink-0 relative z-10">
          <img src={`${import.meta.env.BASE_URL}images/bear-mascot.png`} alt="Bear Mascot" className="w-full h-auto drop-shadow-lg" />
        </div>

        {/* Speech Bubble */}
        <div className="bg-white border-4 border-yellow-100 p-8 md:p-10 rounded-[3rem] rounded-bl-none shadow-xl relative flex-1 mb-0 md:mb-4 w-full md:w-auto">
          <div className="absolute top-0 left-0 bg-orange-400 text-white text-xs font-black px-4 py-1.5 rounded-br-2xl rounded-tl-[2.5rem] uppercase tracking-widest">
            Problem Statement
          </div>
          <p className="text-base md:text-lg text-stone-700 leading-relaxed">
            Cornell students who care about reusability and personal style <span className="text-ink font-bold">need to</span> express individuality through subtle, low-effort restyling of what they already own, <span className="text-ink font-bold">because</span> limited time, space, and closet visibility make it difficult to dress intentionally without overconsuming.
          </p>
        </div>
      </section>

      {/* --- SOLUTION SPACE EXPLORATION --- */}
      <section className="max-w-6xl mx-auto px-4">
        <h3 className="font-heading font-black text-2xl text-amber-900 mb-6 flex items-center gap-3">
          <Search className="w-8 h-8 text-orange-400" />
          Solution Space Exploration
        </h3>

        <p className="text-base md:text-lg text-stone-600 font-medium mb-6 leading-relaxed">
          My groupmates and I conducted a competitive analysis and identified where existing systems fall short:
        </p>

        <ul className="space-y-4 list-disc pl-6 text-stone-600 marker:text-orange-400">
          <li className="text-base md:text-lg leading-relaxed">
            <span className="text-ink font-bold">Heavy upfront manual setup:</span> Items that are not photographed and cataloged never appear in recommendations.
          </li>
          <li className="text-base md:text-lg leading-relaxed">
            <span className="text-ink font-bold">Little support for wardrobe change over time:</span> Current apps don't occasionally prompt updates.
          </li>
          <li className="text-base md:text-lg leading-relaxed">
            <span className="text-ink font-bold">Weak connection between digital suggestions and physical closets:</span> Users still waste time searching through cluttered drawers or racks to act on recommendations.
          </li>
          <li className="text-base md:text-lg leading-relaxed">
            <span className="text-ink font-bold">Poor adaptation to local micro-contexts:</span> Generic weather checks ignore weather fluctuations, building temperature differences, and schedule transitions common at Cornell.
          </li>
          <li className="text-base md:text-lg leading-relaxed">
            <span className="text-ink font-bold">Little ongoing motivation to reuse clothing:</span> Surfacing underused items alone does not encourage users to choose them over familiar, convenient, or favorite options.
          </li>
        </ul>
      </section>

      {/* --- IDEATION & CONCEPT DEVELOPMENT --- */}
      <section className="max-w-6xl mx-auto px-4">
        <h3 className="font-heading font-black text-2xl text-amber-900 mb-6 flex items-center gap-3">
          <PenTool className="w-8 h-8 text-orange-400" />
          Ideation & Concept Development
        </h3>
        <p className="text-base md:text-lg text-stone-600 font-medium mb-6">
          I explored multiple directions through sketching and collaborative ideation.
        </p>

        {/* Brainstorming Grid */}
        <div className="mb-8">
          <h4 className="text-ink font-bold uppercase tracking-widest text-sm mb-4 flex items-center gap-2">
            <Camera className="w-4 h-4" /> Some of My Design Brainstorming Sketches
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div
                key={i}
                className="aspect-rectangle bg-stone-100 rounded-2xl border-2 border-stone-200 overflow-hidden group"
              >
                <img
                  src={`${import.meta.env.BASE_URL}images/sketch${i}.png`}
                  alt={`Sketch ${i}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>


        {/* Ideation Session */}
        <div>
          <h4 className="text-ink font-bold uppercase tracking-widest text-sm mb-4 flex items-center gap-2">
            <Camera className="w-4 h-4" /> Ideation Session
          </h4>
          <div className="flex justify-center">
            <div className="inline-block rounded-3xl overflow-hidden shadow-md border-2 border-stone-100">
              <img
                src={`${import.meta.env.BASE_URL}images/ideation-session.png`}
                alt="Ideation Session"
                className="w-full max-h-[500px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- EARLY PROTOTYPING --- */}
      <section className="max-w-6xl mx-auto px-4">
        <h3 className="font-heading font-black text-2xl text-amber-900 mb-6 flex items-center gap-3">
          <LayoutTemplate className="w-8 h-8 text-orange-400" />
          Task Flow & Paper Prototypes
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-4">

          <div className="flex flex-col gap-3">
            <p className="text-base md:text-lg text-stone-600 font-medium leading-relaxed min-h-[3rem]">
              <span className="text-ink font-bold">Task 1</span>: Select the day’s outfit from the suggestions
            </p>
            <img
              src={`${import.meta.env.BASE_URL}images/paper-proto-1.png`}
              alt="Paper Prototype Task 1"
              className="w-full h-auto rounded-2xl border-2 border-stone-200 shadow-sm"
            />
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-base md:text-lg text-stone-600 font-medium leading-relaxed min-h-[3rem]">
              <span className="text-ink font-bold">Task 2</span>: Track wardrobe rotation & reusability motivation from the mascot
            </p>
            <img
              src={`${import.meta.env.BASE_URL}images/paper-proto-2.png`}
              alt="Paper Prototype Task 2"
              className="w-full h-auto rounded-2xl border-2 border-stone-200 shadow-sm"
            />
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-base md:text-lg text-stone-600 font-medium leading-relaxed min-h-[3rem]">
              <span className="text-ink font-bold">Task 3</span>: Adjust outfit through adaptive reminders
            </p>
            <img
              src={`${import.meta.env.BASE_URL}images/paper-proto-3.png`}
              alt="Paper Prototype Task 3"
              className="w-full h-auto rounded-2xl border-2 border-stone-200 shadow-sm"
            />
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-base md:text-lg text-stone-600 font-medium leading-relaxed min-h-[3rem]">
              <span className="text-ink font-bold">Task 4</span>: Add underused/overlooked clothes to update the wardrobe
            </p>
            <img
              src={`${import.meta.env.BASE_URL}images/paper-proto-4.png`}
              alt="Paper Prototype Task 4"
              className="w-full h-auto rounded-2xl border-2 border-stone-200 shadow-sm"
            />
          </div>

        </div>
      </section>

      {/* --- SOLUTION & FEATURES --- */}
      <section className="max-w-6xl mx-auto px-4">

        <div className="text-center mb-5">
          <div className="inline-block bg-green-100 text-green-700 font-black px-4 py-1 rounded-full mb-4">Final Solution</div>
          <h2 className="text-3xl md:text-5xl font-heading font-black text-amber-900">Reposet</h2>
        </div>

        <div className="space-y-40">

          {/* Feature 1: Context-Aware */}
          <FeatureRow
            number="1"
            title="Context-Aware Outfit Planning"
            why="Students are often short on time and default to familiar outfits. Also, at places like Cornell, where weather, building temperatures, and schedules can shift dramatically within a single day, usual quick choices can leave students unprepared for later contexts."
            note={
              <ul className="list-disc pl-5 space-y-2">
                <li>Each morning, Reposet generates three outfit options using schedule, location, and day-long weather changes (assumingly integrating Google Calendar, university schedules, and weather data).</li>
                <li>Two options prioritize underused pieces, while another includes a recently worn item to preserve user autonomy for personal, emotional, or comfort-based choices.</li>
              </ul>
            }
            videoSrc={`${import.meta.env.BASE_URL}/videos/context-aware-outfit-planning.mp4`}
            videoLabel="Outfit Planning"
          />

          {/* Feature 2: Digital Closet Map */}
          <FeatureRow
            number="2"
            title="Real-Time Digital Closet Map"
            why="Existing apps can suggest outfits, but users still waste time hunting through cluttered drawers or racks, especially when items tend to be underused as they are out of sight."
            note={
              <ul className="list-disc pl-5 space-y-2">
                <li>Once an outfit is finalized, the app activates cameras embedded along different sides of the closet to update a real-time digital map.</li>
                <li>Suggested items glow or pulse on the map.</li>
                <li>For pieces hidden in piles that can’t be shown directly on a 2D map, small arrows & annotations point them out.</li>
              </ul>
            }
            videoSrc={`${import.meta.env.BASE_URL}/videos/digital-map.mp4`}
            videoLabel="Map Localization"
          />

          {/* Feature 3: Packing List (Comparison) */}
          <FeatureRow
            number="3"
            title="Packing List, Reminders, and Feedback"
            why="Students already check their calendar and the weather, but it’s hard to account for everything a full day brings. Our users said an outfit that works in the morning still often leaves them wishing they’d packed an extra layer or a different item later."
            note={
              <ul className="list-disc pl-5 space-y-2">
                <li>Allow users to check or swipe off items once packed to reduce second-guessing whether they had already packed them.</li>
                <li>Reposet sends reminders before key transitions.</li>
                <li>As packing extras can add weight, bulk, or affect how an outfit looks, a quick feedback form captures these trade-offs. This helps the system learn what actually felt worth bringing and refine future packing lists and reminders.</li>
              </ul>
            }
            hasComparison={true}
            iterationNote="Iteration from heuristic evaluation & usability testing"
            iterationTitle="Packing Checklist & Feedback Flow Redesign"
            beforeText="The packing checklist removed items immediately when tapped, making slips easy to miss and hard to correct. The feedback form then presented many detailed text options at once, forcing users to read extensively, map issues to specific items, and sometimes type custom responses."
            afterText="In the checklist, items can be checked and unchecked and are only confirmed with a clear “Finish packing” action. For feedback, users tap the specific packed item visually, then choose from a short, item-specific issue list, reducing reading and decision load."
            beforeVideoSrc={`${import.meta.env.BASE_URL}/videos/packing1.mp4`}
            afterVideoSrc={`${import.meta.env.BASE_URL}/videos/packing2.mp4`}
          />

          {/* Feature 4: Outfit Photo Check-In, Bear Companion & Rotation Tracking */}
          <FeatureRow
            number="4"
            title="Outfit Photo Check-In, Bear Companion & Rotation Tracking"
            why="Suggestions alone don’t change habits. Without confirming what’s actually worn, students can still default to favorites/conveniences and rotation tracking can become inaccurate and unmotivating."
            note={
              <ul className="list-disc pl-5 space-y-2">
                <li>While it adds a small step, this check-in helps determine which item is already worn today and enables behavioral reinforcement for outfit rotation. </li>
                <li>If the battery drops too low due to repeatedly wearing recently worn clothes, personalized suggestions pause until a not recently worn item is restyled.</li>
              </ul>
            }
            videoSrc={`${import.meta.env.BASE_URL}/videos/checkin-with-bear.mp4`}
            videoLabel="Check-In Flow"
          />

          {/* Feature 5: Wardrobe Updates (Comparison) */}
          <FeatureRow
            number="5"
            title="Quick Wardrobe Updates"
            why="Wardrobes change, and unseen items (new purchases or buried pieces) can never be suggested if the system doesn’t learn them."
            note={
              <ul className="list-disc pl-5 space-y-2">
                <li>Reposet prompts wardrobe updates only when needed (e.g., most known items are on repeat, the wardrobe passes a size threshold, or during a monthly check-in).</li>
                <li>Photos are used as closet cameras can’t reliably capture details like silhouette, texture, and length needed for outfit pairing.</li>
              </ul>
            }
            hasComparison={true}
            iterationNote="Iteration from heuristic evaluation & usability testing"
            iterationTitle="Upload Flow Redesign"
            beforeText="Update prompts forced users into updating without a clear way to postpone. Wardrobe updates relied on a rigid, bulk upload flow. While some users appreciated the efficiency of capturing many items together, others found it quite effortful as it requires space, time, and taking out a portion of their closet. Instructional screens repeated every time, not suitable for advanced users. Example category cards looked clickable but weren’t."
            afterText="Update prompts allow postponement. Supports both single-item quick adds and bulk uploads, with multiple photos in either path. Instructions can be skipped by returning users. Example categories no longer appear clickable."
            beforeVideoSrc={`${import.meta.env.BASE_URL}/videos/update1.mp4`}
            afterVideoSrc={`${import.meta.env.BASE_URL}/videos/update2.mp4`}
          />

          {/* Feature 6: Rotation Points & Reward System */}
          <FeatureRow
            number="6"
            title="Rotation Points & Reward System"
            why="Usability testing revealed that users didn’t clearly understand what rotation points meant, why they mattered, or what accumulating them led to, although it’s a core concept of the app for motivation. Several assumed points should be redeemable as familiar apps with points do that, so users suggested the redemption system could be developed."
            note={
              <ul className="list-disc pl-5 space-y-2">
                <li>Added a help & documentation page explaining that points reward rotating items and linking them to real-world impact (e.g., money saved through reduced purchasing).</li>
                <li>Introduced a “Recently Rotated Items” page to make progress more tangible by showing which clothes have been mixed and matched again.</li>
                <li>Added a clear redemption feature where points can be spent on bear customization (e.g., accessories), leveraging users’ emotional attachment to the mascot for motivation.</li>

              </ul>
            }
            iterationNote="New feature from usability testing"
            videoSrc={`${import.meta.env.BASE_URL}/videos/rotation-reward.mp4`}
            videoLabel="Rotation Points & Reward System"
          />
        </div>
      </section>

      {/* --- SHOWCASE VIDEO (Not Auto-play, Upright) --- */}
      <section className="max-w-6xl mx-auto px-4 ">
        <h3 className="font-heading font-black text-3xl md:text-3xl text-amber-900 mb-6 text-center">Project Showcase</h3>
        <div className="bg-amber-900 rounded-[3rem] p-4 md:p-6 shadow-2xl">
          <div className="bg-black rounded-[2.5rem] overflow-hidden aspect-video relative group">
            <ShowcaseVideo src={`${import.meta.env.BASE_URL}/videos/reposet-showcase.mp4`} />
          </div>
        </div>
      </section>

    </div>
  );
};

export default ReposetDetailSection;
