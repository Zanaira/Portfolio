import {EXPERIENCE} from '../data/experience';
export default function Experience() {
  return (
    <section id="experience">
        <div className="sec-inner">
          <div className="reveal">
            <div className="sec-label">Experience</div>
            <h2 className="sec-title">Internship <em>Timeline</em></h2>
            <p className="sec-sub">Hands-on experience working in professional development teams on real products.</p>
          </div>
          <div className="exp-timeline">
            {EXPERIENCE.map((ex, i) => (
              <div key={ex.role} className={`exp-item reveal`} style={{ transitionDelay: `${i * 0.15}s` }}>
                <div className="exp-dot" />
                <div className="exp-card">
                  <div className="exp-header">
                    <div className="exp-role">{ex.role}</div>
                    <div className="exp-dur">{ex.dur}</div>
                  </div>
                  <div className="exp-company">@ {ex.company}</div>
                  <ul className="exp-bullets">
                    {ex.bullets.map((b) => <li key={b}>{b}</li>)}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
  );
}