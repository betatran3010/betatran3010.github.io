import React from 'react';
import SecHead from './SecHead';

// Newest first. The list scrolls once it is taller than the box.
const news: { date: string; text: React.ReactNode }[] = [
  { date: 'Oct 2026', text: 'I was selected as one of 2-4 undergraduates nominated by Cornell’s Department of Information Science for the national Computing Research Association (CRA) Outstanding Undergraduate Researcher Awards!' },
  { date: 'Sep 2026', text: <>My paper with Eunice Yiu (UC Berkeley), <a href="#project/peer-review"><em>Who’s Doing the Reviewing? Tracing AI Delegation in Scientific Peer Review</em></a>, was accepted to two NeurIPS 2026 workshops: AI-Native Academia and AI &amp; Science - Evolution or Extinction?</> },
  { date: 'Sep 2026', text: 'My team won the CMD-IT GenAI Student Hackathon at the Tapia Conference!' },
  { date: 'May 2026', text: 'I was awarded Cornell Psychology Summer Undergraduate Research Funding (SURF) ($1,320) to support my independent psychology honors thesis with Professor Charles Brainerd!' },
  { date: 'May 2026', text: 'I was one of 2 undergraduates selected by Cornell’s Department of Information Science to receive a $1,500 travel award to attend the Tapia Conference on Technology and Computing!' },
  { date: 'Mar 2026', text: 'I was awarded the Cornell Summer Experience Grant ($3,500) to support my summer research internship in the Gopnik Cognitive Development and Learning Lab at UC Berkeley!' },
  { date: 'Feb 2026', text: 'I was elected to Cornell’s chapter of Phi Beta Kappa, an honor awarded to 3% of juniors in the College of Arts and Sciences!' },
];

const News: React.FC = () => (
  <section className="news" aria-labelledby="nh">
    <SecHead id="nh" icon="news">Latest <em>News</em></SecHead>
    <div className="scrollbox">
      <ul tabIndex={0} aria-label="Latest news, scrollable">
        {news.map((n, i) => (
          <li key={n.date + String(i)}><time>{n.date}</time><span>{n.text}</span></li>
        ))}
      </ul>
    </div>
  </section>
);

export default News;
