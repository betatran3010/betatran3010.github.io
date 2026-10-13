import React from 'react';
import Chibi from './Chibi';

const Hero: React.FC<{ go: (hash: string) => void }> = ({ go }) => (
  <div className="wrap">
    <header className="hero" id="top">
      <div>
        <div className="namerow">
          <h1>Tran Le</h1>
          <Chibi />
        </div>
        <div className="bio">
          <p>Hello! My name is Tran Le. I am a senior double-majoring in Information Science and Psychology at Cornell University. I am an honors student in both programs.</p>
          <p>I am interested in <b>human-AI complementarity</b>: collaboration that combines desirable human and AI capabilities so they can accomplish more together than either could alone. I study how people integrate AI with their own knowledge and judgment, and how systems can expand what they accomplish while supporting their ability to reason, assess, and direct their work.</p>
          <p>At Cornell, I am mentored by Professor Susan Fussell in Information Science and Professor Charles Brainerd in Psychology. I also recently worked with Professor Alison Gopnik at UC Berkeley.</p>
        </div>
        <div className="cta">
          <a className="btn" href="#projects" onClick={e => { e.preventDefault(); go('#projects'); }}>Explore my work ↓</a>
        </div>
      </div>
      <div className="stage">
        <div className="portrait">
          <div className="arch">
            <img src={`${import.meta.env.BASE_URL}images/portrait-square.jpg`} alt="Portrait of Tran Le" />
          </div>
        </div>
      </div>
    </header>
  </div>
);

export default Hero;
