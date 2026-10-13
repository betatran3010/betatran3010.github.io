import React from 'react';

const img = (p: string) => `${import.meta.env.BASE_URL}images/${p}`;

const notes = [
  { label: 'My name', body: 'Tran partly comes from the Vietnamese word for “value,” a principle my parents emphasized and one I’ve grown up living by.' },
  { label: 'Where I started', body: 'I’m from Saigon, Vietnam. With limited exposure to computing and psychology in my early education, I learned to value both my constraints and the opportunities I can find, which pushed me to seek out experiences and fully invest in my interests and growth.' },
  { label: 'People', body: 'I deeply value the relationships and interactions that have shaped my path, from my parents and teachers to mentors, labmates, and the communities I’ve worked with. They’ve strengthened my sense of empathy, responsibility, and care in the work I do.' },
];

const wicc = [
  { file: 'wicc-prof-abe-davis.JPG', alt: 'WICC event with Prof. Abe Davis' },
  { file: 'wicc-prof-andrea-won.JPG', alt: 'WICC event with Prof. Andrea Won' },
  { file: 'wicc-org.JPEG', alt: 'WICC organizers' },
  { file: 'wicc-clubfest.jpg', alt: 'WICC at Club Fest' },
];

const FunFacts: React.FC<{ onBack: () => void }> = ({ onBack }) => (
  <div className="wrap inner ff">
    <a className="back" href="#home" onClick={e => { e.preventDefault(); onBack(); }}>← Back to home</a>
    <div className="ph">
      <h1 style={{ maxWidth: 'none' }}>Fun <em>facts</em></h1>
      <div className="top"><span className="lab">a few things that don’t fit on a CV</span></div>
    </div>

    <div className="ff-notes">
      {notes.map(n => (
        <div className="note" key={n.label}><span className="lab">{n.label}</span><p>{n.body}</p></div>
      ))}
    </div>

    <h2 className="big">Currently on <em>campus</em></h2>

    <section className="org" aria-labelledby="wicc">
      <h3 id="wicc">Women in Computing at Cornell <small>Faculty Relations Director</small></h3>
      <p>Fostering an inclusive community for women and gender minorities in tech. I organize the Lunch Bunch program, facilitating weekly roundtable discussions that connect underclassmen with faculty and encourage early research engagement. I engage with many accomplished HCI researchers and learn about their work through this initiative! I also represent WICC and the student body in faculty board meetings to discuss coursework, advising, workload, and departmental improvements.</p>
      <div className="ph2">
        {wicc.map(w => (
          <figure key={w.file}><img src={img(w.file)} alt={w.alt} loading="lazy" /></figure>
        ))}
      </div>
    </section>

    <section className="org" style={{ marginTop: 64 }} aria-labelledby="cct">
      <h3 id="cct">Communication and Collaborative Technologies Lab <small>Research Assistant</small></h3>
      <p>Working on the XPLAIN project. Here’s a pic of our lab outing!</p>
      <figure className="fig"><img src={img('cct-lab-outing.jpg')} alt="CCT Lab outing" loading="lazy" /></figure>
    </section>
  </div>
);

export default FunFacts;
