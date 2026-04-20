import { useState, useEffect, useRef } from "react";
import SkillBar from "./SkillBar";
import { SKILLS } from "../data/skills";

export default function Skills() {
  const [skillsVisible, setSkillsVisible] = useState(false);
  const skillsRef = useRef(null);

  useEffect(() => {
    if (!skillsRef.current) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setSkillsVisible(true);
      },
      { threshold: 0.15 }
    );

    obs.observe(skillsRef.current);

    return () => obs.disconnect();
  }, []);

  return (
    <section id="skills" ref={skillsRef}>
      <div className="sec-inner">
        <div className="reveal" style={{ textAlign: "center", maxWidth: 580, margin: "0 auto" }}>
          <div className="sec-label">Technical Skills</div>
          <h2 className="sec-title">Tools & <em>Technologies</em></h2>
          <p className="sec-sub">
            A curated set of technologies I use to build fast, scalable, and maintainable web applications.
          </p>
        </div>

        <div className="skills-grid">
          {SKILLS.map((s, i) => (
            <div
              key={s.name}
              className="skill-card reveal"
              style={{ transitionDelay: `${i * 0.05}s` }}
            >
              <div className="sk-icon">{s.icon}</div>
              <div className="sk-name">{s.name}</div>
              <div className="sk-cat">{s.cat}</div>
              <SkillBar pct={s.pct} animate={skillsVisible} />
              <div className="sk-pct">{s.pct}%</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}