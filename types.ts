
export interface Project {
  id: number;
  /** URL segment, e.g. #project/xplain */
  slug: string;
  /** Kept in the data but not shown on the site. */
  hidden?: boolean;
  title: string;
  context: string; // e.g., "NSF Grant" or "Product Team"
  problem: string; // "How might we..."
  institution?: string; // shown as a chip on the card
  pi?: string; // principal investigator, shown as a chip on the card
  kicker?: string; // bold line shown above the RQ box on the card
  rq?: string[]; // research questions; when set, the card shows "RQ" and one line per question
  image: string;
  tags: string[];
  year: string;
  accentColor?: string;
  // Projects without an in-site case study link out instead
  externalUrl?: string;
  externalLabel?: string;
  // Optional: one line per layer, shown when the "AI layer" switch is on
  humanLine?: string;
  aiLine?: string;
  // Extended details
  description?: string;
  venues?: string[];
  role?: string;
  team?: string; // New field
  duration?: string;
  tools?: string[];
  contextOverview?: string; // New field for the context box
  challenge?: string;
  solution?: string;
  impact?: string;
}

export type View = 'home' | 'funfacts' | { type: 'project'; id: number };

export enum SectionId {
  PROJECTS = 'projects',
  FOOTER = 'footer'
}
