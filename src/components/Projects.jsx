import {PROJECTS} from '../data/projects';
export default function Projects() {
  return (
    <section className="proj-sec" id="projects">
        <div className="sec-inner">
          <div className="reveal">
            <div className="sec-label">Portfolio</div>
            <h2 className="sec-title">Featured <em>Projects</em></h2>
            <p className="sec-sub">Real-world applications demonstrating my full-stack capabilities across frontend, backend, and database layers.</p>
          </div>
          <div className="projects-grid">
            {PROJECTS.map((p, i) => (
              <div key={p.title} className={`proj-card${p.featured ? " featured" : ""} reveal`} style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="proj-thumb" style={{ background: p.bg }}>
                  {p.featured && <span className="proj-featured-badge">⭐ Featured Project</span>}
                  <span>{p.thumb}</span>
                </div>
                <div className="proj-body">
                  <div className="proj-tags">{p.tags.map(t => <span key={t} className="proj-tag">{t}</span>)}</div>
                  <div className="proj-title">{p.title}</div>
                  <div className="proj-desc">{p.desc}</div>
                  <div className="proj-links">
                    <a href={p.demo} className="pl-btn solid">↗ Live Demo</a>
                    <a href={p.repo} className="pl-btn outline">⌥ GitHub</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
  );
}