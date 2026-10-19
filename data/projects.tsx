import React from 'react';
import { Project } from '../types';

export const projects: Project[] = [
  {
    id: 5,
    slug: "peer-review",
    title: "Who’s Doing the Reviewing? Tracing AI Delegation in Scientific Peer Review",
    context: "Cognitive Development and Learning Lab",
    institution: "UC Berkeley",
    pi: "Dr. Alison Gopnik",
    problem: "How do researchers use AI while reviewing a scientific paper, and what distinguishes reviewers who incorporate AI-generated content from those who do not?",
    rq: [
      "How do researchers use AI while reviewing a scientific paper?",
      "When AI generates evaluative content, what distinguishes reviewers who incorporate that content into their submitted review from those who do not?",
    ],
    image: `${import.meta.env.BASE_URL}images/whos-reviewing/cover.png`,
    tags: ["AI-assisted peer review", "Human–AI interaction", "AI delegation", "Process tracing", "Human oversight"],
    year: "Jun–Sep 2026",
    venues: [
      "Accepted at AI-Native Academia and AI & Science - Evolution or Extinction? @ NeurIPS 2026",
      "Submitted to CHI 2027",
    ],
    description: "A process-tracing study of 104 researchers reviewing a paper with optional AI assistance.",
  },
  {
    id: 1,
    slug: "xplain",
    title: "XPLAIN - Proactive Meeting AI",
    context: "Communication and Collaborative Technologies Lab",
    institution: "Cornell University",
    pi: "Dr. Susan Fussell",
    problem: "How can we support non-native speakers’ comprehension and expression in live conversations while accommodating individual processing needs and preserving control over their contributions?",
    image: `${import.meta.env.BASE_URL}images/xplain-cover.png`,
    tags: ["CSCW", "AI-Mediated Communication", "Inclusive Design", "Wizard-of-Oz", "Psycholinguistics", "Mixed-Methods Data Analysis"],
    year: "Feb 2025–present",
    description: "A proactive AI assistant that scaffolds comprehension, idea formation, and alignment for non-native speakers in computer-mediated live conversations.",
    role: "Research Assistant",
    team: "1 Professor, 1 PhD student, 5 undergraduate students",
    duration: "Feb 2025–present",
    tools: ["Figma", "ATLAS.ti", "R", "Qualtrics"],
    contextOverview: (
      <>
        <p>
          XPLAIN is a long-running HCI research project with Professor Susan Fussell examining how proactive AI content prediction and generation can support non-native speakers in real-time video meetings. I contributed to the design, prototyping, and evaluation of XPLAIN across multiple Wizard-of-Oz studies, spanning literature review, conversational scenario design, interface design and prototyping, survey development, user studies, and data analysis.
        </p>

        <p className="mt-4">
          <span className="text-ink font-bold">
            This project is mentioned in this paper:
          </span>{" "}
          <a
            href="https://dl.acm.org/doi/10.1145/3715070.3749273"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline hover:text-primary-dark"
          >
            https://dl.acm.org/doi/10.1145/3715070.3749273
          </a>{" "}
          <span className="text-ink font-bold">(CSCW Companion ’25)</span>
        </p>
      </>
    ),
  },
  {
    id: 6,
    slug: "cognitive-offloading",
    title: "Cognitive Offloading and Deep Distortions in Episodic and Semantic Memory",
    context: "Memory and Neuroscience Lab",
    kicker: "Honors Thesis",
    institution: "Cornell University",
    pi: "Dr. Charles Brainerd",
    problem: "When people expect technology to store or retrieve information for them, does that expectation change the precision of their own memory and the consistency of their memory-based judgments?",
    rq: [
      "When people expect technology to store or retrieve information for them, does that expectation change the precision of their own memory and the consistency of their memory-based judgments?",
      "Do any effects differ across episodic and semantic memory?",
    ],
    image: `${import.meta.env.BASE_URL}images/memory/cover.jpg`,
    tags: ["Cognitive offloading", "Fuzzy-Trace Theory", "Conjoint recognition", "Multinomial processing trees", "False memory"],
    year: "2025–2026",
    description: "Two experiments testing whether expecting external storage and search changes verbatim and gist memory.",
  },
  {
    id: 2,
    slug: "healthcare-international-students",
    hidden: true,
    title: "Designing for the Communication Needs of International Students in U.S. Healthcare Settings",
    context: "Computing & Global Development Course",
    institution: "Cornell University",
    problem: "How do international students experience communication challenges in U.S. healthcare, how effective are existing tools and strategies, and what unmet needs and design opportunities emerge across students, interpreters, and providers?",
    image: `${import.meta.env.BASE_URL}images/health-international-students.png`,
    tags: ["Social Computing", "ICTD", "Inclusive Design", "Health Communication"],
    year: "Aug–Dec 2025",
    externalUrl: `${import.meta.env.BASE_URL}documents/healthcare-international-students.pdf`,
    externalLabel: "Read the report (PDF)",
  },
  {
    id: 3,
    slug: "reposet",
    title: "Reposet",
    context: "Human-Computer Interaction Course",
    institution: "Cornell University",
    problem: "How might we help students reuse and restyle what they already own by reducing outfit decision effort while adapting to daily context and motivating sustainable wardrobe rotation?",
    image: `${import.meta.env.BASE_URL}images/reposet-cover.png`,
    tags: ["UX/UI Design", "Product Design", "Mobile App"],
    year: "Aug–Dec 2025",
    description: "A context-aware wardrobe system that supports outfit planning, clothing rotation, and sustainable reuse in everyday student life.",
    role: "UX/UI Designer",
    team: "4 designers",
    duration: "Aug–Dec 2025",
    tools: ["Figma"],
    contextOverview: <>
      Many college students own many clothes but repeatedly wear only a small subset due to rushed mornings, cluttered closets, and decision fatigue. Reposet is a wardrobe companion designed to help students dress more intentionally using what they already own, while staying prepared for changing weather, especially in places like Cornell with highly variable conditions, alongside shifting schedules and social contexts typical of student life. I worked with 3 other teammates and contributed across the full HCI cycle, including user research, design, prototyping, and evaluation. <span className="text-ink font-bold">The project received an A.</span>
    </>,
  },
  {
    id: 4,
    slug: "duolingo-note-taking",
    title: "Duolingo’s Note-Taking Feature Case Study",
    context: "Digital Product Design Course",
    institution: "Cornell University",
    problem: "How might we design for long-term memory and meaningful language recall, not just daily engagement, in Duolingo's fast-paced learning environment?",
    image: `${import.meta.env.BASE_URL}images/duolingo-cover.png`,
    tags: ["UX/UI Design", "Product Design", "Mobile App", "EdTech"],
    year: "Feb–May 2025",
    externalUrl: "https://medium.com/@trannble/write-it-down-remember-it-later-designing-duolingos-note-taking-experience-9f8f5ce9a174",
    externalLabel: "Read on Medium",
  },
];

