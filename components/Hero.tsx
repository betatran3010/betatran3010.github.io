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
          <p>I am interested in <b>human-AI complementarity</b>: collaboration that combines desirable human and AI capabilities so they can accomplish more together than either could alone. I study two interconnected questions:</p>
          <ol className="bio-q">
            <li>How do people draw on and learn from AI while bringing their own knowledge and judgment to the interaction?</li>
            <li>How can AI systems expand what people accomplish while supporting their ability to reason, learn, assess, and direct their work?</li>
          </ol>
          <p>At Cornell, I am very fortunate to be mentored by Professor <a className="bio-a" href="https://bowers.cornell.edu/people/susan-fussell" target="_blank" rel="noopener noreferrer">Susan Fussell</a> in Information Science and Professor <a className="bio-a" href="https://psychology.cornell.edu/charles-brainerd" target="_blank" rel="noopener noreferrer">Charles Brainerd</a> in Psychology. I also recently worked with Professor <a className="bio-a" href="https://www.gopniklab.berkeley.edu/" target="_blank" rel="noopener noreferrer">Alison Gopnik</a> at UC Berkeley.</p>
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
