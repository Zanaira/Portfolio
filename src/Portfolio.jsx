import { useState, useEffect, useRef } from "react";

const STYLE = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Instrument+Serif:ital@0;1&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; font-size: 16px; }
body { font-family: 'Plus Jakarta Sans', sans-serif; background: #fff; color: #0f172a; overflow-x: hidden; }
a { text-decoration: none; color: inherit; }
img { display: block; max-width: 100%; }

:root {
  --blue: #2563EB;
  --blue-dark: #1d4ed8;
  --blue-light: #eff6ff;
  --blue-mid: #dbeafe;
  --text: #0f172a;
  --text2: #475569;
  --text3: #94a3b8;
  --border: #e2e8f0;
  --bg: #f8fafc;
  --white: #ffffff;
  --shadow: 0 1px 3px rgba(0,0,0,.06), 0 4px 16px rgba(0,0,0,.06);
  --shadow-lg: 0 4px 6px rgba(0,0,0,.04), 0 10px 40px rgba(37,99,235,.1);
  --radius: 12px;
  --radius-lg: 20px;
}

/* ── SCROLLBAR ── */
::-webkit-scrollbar { width: 5px; }
::-webkit-scrollbar-track { background: #f1f5f9; }
::-webkit-scrollbar-thumb { background: var(--blue); border-radius: 3px; }

/* ── NAV ── */
.nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 100;
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 6%; height: 64px;
  background: rgba(255,255,255,0.9);
  backdrop-filter: blur(14px);
  border-bottom: 1px solid var(--border);
  transition: box-shadow .3s;
}
.nav.scrolled { box-shadow: 0 2px 20px rgba(0,0,0,.07); }
.nav-logo {
  font-weight: 800; font-size: 1.2rem; letter-spacing: -.4px;
  background: linear-gradient(135deg, var(--blue), #6366f1);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
}
.nav-links { display: flex; gap: 2rem; list-style: none; }
.nav-links a { font-size: .88rem; font-weight: 500; color: var(--text2); transition: color .2s; }
.nav-links a:hover { color: var(--blue); }
.nav-hire {
  background: var(--blue); color: #fff;
  padding: .44rem 1.1rem; border-radius: 8px;
  font-size: .85rem; font-weight: 600;
  transition: background .2s, transform .15s;
}
.nav-hire:hover { background: var(--blue-dark); transform: translateY(-1px); }
.ham { display: none; background: none; border: none; cursor: pointer; padding: 4px; flex-direction: column; gap: 5px; }
.ham span { width: 22px; height: 2px; background: var(--text); border-radius: 2px; display: block; transition: all .3s; }
.mob-menu { display: none; position: fixed; top: 64px; inset-x: 0; background: #fff; border-bottom: 1px solid var(--border); padding: 1.5rem 6%; z-index: 99; }
.mob-menu.open { display: block; }
.mob-menu ul { list-style: none; display: flex; flex-direction: column; gap: 1.2rem; }
.mob-menu a { font-size: 1rem; font-weight: 500; color: var(--text2); }

/* ── HERO ── */
.hero {
  min-height: 100vh; padding-top: 64px;
  display: flex; align-items: center;
  padding-left: 6%; padding-right: 6%;
  background: linear-gradient(155deg, #fff 55%, #eff6ff 100%);
  position: relative; overflow: hidden;
}
.hero::before {
  content: ''; position: absolute;
  width: 600px; height: 600px; border-radius: 50%;
  background: radial-gradient(circle, rgba(37,99,235,.07) 0%, transparent 70%);
  top: -100px; right: -100px; pointer-events: none;
}
.hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; max-width: 1200px; margin: 0 auto; width: 100%; }
.hero-badge {
  display: inline-flex; align-items: center; gap: .5rem;
  background: var(--blue-light); border: 1px solid var(--blue-mid);
  color: var(--blue); padding: .3rem .85rem; border-radius: 50px;
  font-size: .76rem; font-weight: 700; letter-spacing: .6px; text-transform: uppercase;
  margin-bottom: 1.4rem;
}
.hero-badge-dot { width: 6px; height: 6px; background: var(--blue); border-radius: 50%; animation: pulse 2s ease-in-out infinite; }
@keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(.8)} }
.hero-name {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: clamp(2.6rem, 5vw, 3.8rem);
  font-weight: 800; line-height: 1.08; letter-spacing: -2px;
  margin-bottom: .5rem;
}
.hero-name em { font-family: 'Instrument Serif', serif; font-style: italic; color: var(--blue); letter-spacing: -1px; }
.hero-role {
  font-size: clamp(.95rem, 1.6vw, 1.1rem); font-weight: 500;
  color: var(--text2); margin-bottom: .9rem; letter-spacing: -.1px;
}
.hero-role span { color: var(--blue); font-weight: 600; }
.hero-tag {
  font-size: 1.05rem; font-weight: 300; color: var(--text2);
  margin-bottom: 2.2rem; line-height: 1.65;
  font-family: 'Instrument Serif', serif; font-style: italic;
}
.hero-btns { display: flex; gap: .85rem; flex-wrap: wrap; }
.btn-blue {
  background: var(--blue); color: #fff;
  padding: .7rem 1.6rem; border-radius: var(--radius);
  font-weight: 600; font-size: .92rem;
  transition: background .2s, transform .2s, box-shadow .2s;
  box-shadow: 0 4px 14px rgba(37,99,235,.3);
}
.btn-blue:hover { background: var(--blue-dark); transform: translateY(-2px); box-shadow: 0 6px 20px rgba(37,99,235,.4); }
.btn-ghost {
  border: 1.5px solid var(--border); color: var(--text2);
  padding: .7rem 1.6rem; border-radius: var(--radius);
  font-weight: 600; font-size: .92rem;
  transition: border-color .2s, color .2s, transform .2s;
  background: #fff;
}
.btn-ghost:hover { border-color: var(--blue); color: var(--blue); transform: translateY(-2px); }
.hero-stats { display: flex; gap: 2.5rem; margin-top: 2.8rem; padding-top: 2rem; border-top: 1px solid var(--border); }
.stat-n { font-size: 1.75rem; font-weight: 800; color: var(--blue); font-family: 'Plus Jakarta Sans'; letter-spacing: -1px; }
.stat-l { font-size: .78rem; color: var(--text3); margin-top: 1px; font-weight: 500; }

/* HERO ILLUSTRATION */
.hero-visual { position: relative; display: flex; justify-content: center; align-items: center; }
.hero-card-main {
  background: #fff; border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg); padding: 2rem;
  border: 1px solid var(--border); position: relative;
  width: 100%; max-width: 400px;
}
.code-block {
  background: #0f172a; border-radius: 10px;
  padding: 1.2rem 1.4rem; font-family: 'Courier New', monospace;
  font-size: .78rem; line-height: 1.7; color: #94a3b8; margin-bottom: 1.2rem;
  overflow: hidden;
}
.code-block .kw { color: #818cf8; }
.code-block .fn { color: #38bdf8; }
.code-block .str { color: #4ade80; }
.code-block .cm { color: #475569; }
.tech-chips { display: flex; flex-wrap: wrap; gap: .5rem; }
.chip {
  font-size: .73rem; font-weight: 600; padding: .3rem .75rem;
  border-radius: 50px; background: var(--blue-light);
  color: var(--blue); border: 1px solid var(--blue-mid);
}
.float-card {
  position: absolute; background: #fff;
  border: 1px solid var(--border); border-radius: var(--radius);
  padding: .65rem .9rem; box-shadow: var(--shadow);
  display: flex; align-items: center; gap: .5rem; font-size: .78rem;
  animation: float 3.5s ease-in-out infinite;
}
.float-card.fc1 { top: -16px; right: -20px; animation-delay: 0s; }
.float-card.fc2 { bottom: -16px; left: -20px; animation-delay: 1.8s; }
@keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
.fc-icon { width: 28px; height: 28px; border-radius: 7px; display: flex; align-items: center; justify-content: center; font-size: 1rem; flex-shrink: 0; }

/* ── SECTION COMMONS ── */
section { padding: 5.5rem 6%; }
.sec-inner { max-width: 1200px; margin: 0 auto; }
.sec-label { font-size: .73rem; font-weight: 700; letter-spacing: 1.4px; text-transform: uppercase; color: var(--blue); margin-bottom: .7rem; }
.sec-title { font-size: clamp(1.9rem, 3vw, 2.5rem); font-weight: 800; letter-spacing: -1px; margin-bottom: .7rem; color: var(--text); }
.sec-title em { font-family: 'Instrument Serif', serif; font-style: italic; color: var(--blue); }
.sec-sub { color: var(--text2); font-size: .97rem; line-height: 1.75; max-width: 520px; margin-bottom: 3.2rem; font-weight: 400; }

/* ── ABOUT ── */
.about-sec { background: var(--bg); }
.about-grid { display: grid; grid-template-columns: 1fr 1.5fr; gap: 4.5rem; align-items: center; }
.about-img-wrap { position: relative; }
.about-img-frame {
  width: 100%; aspect-ratio: 3/4; max-width: 320px;
  border-radius: var(--radius-lg); overflow: hidden;
  background: linear-gradient(160deg, var(--blue-light), #e0e7ff);
  display: flex; align-items: center; justify-content: center;
  box-shadow: var(--shadow-lg); border: 1px solid var(--border);
  position: relative;
}
.about-img-frame::after {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(180deg, transparent 50%, rgba(37,99,235,.06));
}
.about-avatar-svg { width: 80%; }
.about-badge-exp {
  position: absolute; bottom: -12px; right: -12px;
  background: var(--blue); color: #fff;
  padding: .9rem 1.1rem; border-radius: 14px; text-align: center;
  box-shadow: 0 4px 16px rgba(37,99,235,.4);
}
.about-badge-exp .n { font-size: 1.8rem; font-weight: 800; display: block; line-height: 1; }
.about-badge-exp .l { font-size: .68rem; font-weight: 600; opacity: .85; }
.strength-cards { display: grid; grid-template-columns: 1fr 1fr; gap: .75rem; margin: 1.6rem 0 2rem; }
.str-card {
  background: #fff; border: 1px solid var(--border);
  border-radius: var(--radius); padding: 1rem;
  display: flex; align-items: flex-start; gap: .75rem;
  transition: box-shadow .2s, transform .2s;
}
.str-card:hover { box-shadow: var(--shadow-lg); transform: translateY(-2px); }
.str-icon { width: 36px; height: 36px; border-radius: 9px; background: var(--blue-light); display: flex; align-items: center; justify-content: center; font-size: 1.05rem; flex-shrink: 0; }
.str-title { font-size: .85rem; font-weight: 700; color: var(--text); }
.str-desc { font-size: .75rem; color: var(--text3); margin-top: 2px; }
.info-rows { display: flex; flex-direction: column; gap: .55rem; }
.info-row { display: flex; gap: .6rem; }
.info-row .lbl { font-size: .82rem; color: var(--text3); min-width: 80px; font-weight: 500; }
.info-row .val { font-size: .82rem; color: var(--text); font-weight: 600; }

/* ── SKILLS ── */
.skills-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 1rem; }
.skill-card {
  background: #fff; border: 1px solid var(--border);
  border-radius: var(--radius); padding: 1.3rem 1rem;
  text-align: center; transition: box-shadow .2s, transform .2s, border-color .2s;
  cursor: default;
}
.skill-card:hover { box-shadow: var(--shadow-lg); transform: translateY(-3px); border-color: var(--blue-mid); }
.sk-icon { font-size: 2rem; margin-bottom: .55rem; }
.sk-name { font-size: .88rem; font-weight: 700; color: var(--text); margin-bottom: .35rem; }
.sk-cat { font-size: .72rem; color: var(--text3); font-weight: 500; margin-bottom: .75rem; }
.sk-bar { height: 4px; background: var(--blue-mid); border-radius: 2px; overflow: hidden; }
.sk-fill { height: 100%; border-radius: 2px; background: linear-gradient(90deg, var(--blue), #6366f1); transition: width 1.2s cubic-bezier(.4,0,.2,1); }
.sk-pct { font-size: .72rem; font-weight: 700; color: var(--blue); margin-top: .3rem; text-align: right; }

/* ── PROJECTS ── */
.proj-sec { background: var(--bg); }
.projects-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 1.4rem; }
.proj-card {
  background: #fff; border: 1px solid var(--border);
  border-radius: var(--radius-lg); overflow: hidden;
  transition: box-shadow .25s, transform .25s;
}
.proj-card:hover { box-shadow: 0 8px 40px rgba(37,99,235,.12); transform: translateY(-5px); }
.proj-card.featured { border: 1.5px solid var(--blue); grid-column: 1 / -1; display: grid; grid-template-columns: 1fr 1fr; }
.proj-thumb {
  height: 200px; display: flex; align-items: center; justify-content: center;
  font-size: 3.2rem; position: relative; overflow: hidden;
}
.proj-card.featured .proj-thumb { height: 100%; min-height: 260px; }
.proj-featured-badge {
  position: absolute; top: 12px; left: 12px;
  background: var(--blue); color: #fff; font-size: .7rem; font-weight: 700;
  padding: .25rem .65rem; border-radius: 50px; letter-spacing: .4px;
}
.proj-body { padding: 1.4rem; }
.proj-card.featured .proj-body { padding: 2rem; display: flex; flex-direction: column; justify-content: center; }
.proj-tags { display: flex; gap: .4rem; flex-wrap: wrap; margin-bottom: .75rem; }
.proj-tag { font-size: .7rem; font-weight: 600; padding: .2rem .6rem; border-radius: 4px; background: var(--blue-light); color: var(--blue); }
.proj-title { font-size: 1.08rem; font-weight: 800; margin-bottom: .4rem; letter-spacing: -.3px; color: var(--text); }
.proj-card.featured .proj-title { font-size: 1.4rem; }
.proj-desc { font-size: .85rem; color: var(--text2); line-height: 1.65; margin-bottom: 1.1rem; font-weight: 400; }
.proj-links { display: flex; gap: .65rem; }
.pl-btn {
  font-size: .8rem; font-weight: 600; padding: .4rem .9rem;
  border-radius: 7px; transition: all .2s;
}
.pl-btn.solid { background: var(--blue); color: #fff; box-shadow: 0 2px 8px rgba(37,99,235,.25); }
.pl-btn.solid:hover { background: var(--blue-dark); }
.pl-btn.outline { border: 1.5px solid var(--border); color: var(--text2); background: #fff; }
.pl-btn.outline:hover { border-color: var(--blue); color: var(--blue); }

/* ── EXPERIENCE ── */
.exp-timeline { position: relative; padding-left: 2rem; }
.exp-timeline::before {
  content: ''; position: absolute; left: 0; top: 8px; bottom: 8px;
  width: 2px; background: linear-gradient(180deg, var(--blue), #e0e7ff);
  border-radius: 1px;
}
.exp-item { position: relative; margin-bottom: 2.5rem; }
.exp-item:last-child { margin-bottom: 0; }
.exp-dot {
  position: absolute; left: -2.45rem; top: 5px;
  width: 14px; height: 14px; border-radius: 50%;
  background: var(--blue); border: 3px solid #fff;
  box-shadow: 0 0 0 2px var(--blue);
}
.exp-card {
  background: #fff; border: 1px solid var(--border);
  border-radius: var(--radius); padding: 1.6rem;
  transition: box-shadow .2s, transform .2s;
}
.exp-card:hover { box-shadow: var(--shadow-lg); transform: translateX(4px); }
.exp-header { display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: .5rem; margin-bottom: .5rem; }
.exp-role { font-size: 1.05rem; font-weight: 800; color: var(--text); letter-spacing: -.3px; }
.exp-dur { font-size: .75rem; font-weight: 600; color: var(--blue); background: var(--blue-light); padding: .2rem .65rem; border-radius: 50px; border: 1px solid var(--blue-mid); white-space: nowrap; }
.exp-company { font-size: .88rem; font-weight: 600; color: var(--blue); margin-bottom: .7rem; }
.exp-bullets { list-style: none; display: flex; flex-direction: column; gap: .4rem; }
.exp-bullets li { font-size: .85rem; color: var(--text2); display: flex; gap: .5rem; align-items: flex-start; line-height: 1.6; }
.exp-bullets li::before { content: '→'; color: var(--blue); font-weight: 700; flex-shrink: 0; margin-top: 1px; }

/* ── CONTACT ── */
.contact-sec { background: var(--bg); }
.contact-grid { display: grid; grid-template-columns: 1fr 1.3fr; gap: 4rem; align-items: start; }
.contact-head h3 { font-size: 1.6rem; font-weight: 800; letter-spacing: -.5px; margin-bottom: .75rem; }
.contact-head p { color: var(--text2); font-size: .95rem; line-height: 1.75; margin-bottom: 2rem; }
.contact-items { display: flex; flex-direction: column; gap: .9rem; margin-bottom: 2rem; }
.ci { display: flex; align-items: center; gap: .9rem; }
.ci-icon { width: 40px; height: 40px; border-radius: 10px; background: var(--blue-light); border: 1px solid var(--blue-mid); display: flex; align-items: center; justify-content: center; font-size: 1rem; flex-shrink: 0; }
.ci-lbl { font-size: .75rem; color: var(--text3); }
.ci-val { font-size: .88rem; font-weight: 600; color: var(--text); }
.social-row { display: flex; gap: .65rem; }
.soc-btn {
  width: 40px; height: 40px; border-radius: 10px;
  background: #fff; border: 1px solid var(--border);
  display: flex; align-items: center; justify-content: center;
  font-size: 1rem; transition: all .2s; cursor: pointer; color: var(--text2);
  font-weight: 600;
}
.soc-btn:hover { background: var(--blue); color: #fff; border-color: var(--blue); transform: translateY(-2px); box-shadow: 0 4px 12px rgba(37,99,235,.3); }

/* FORM */
.form-box { background: #fff; border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 2rem; box-shadow: var(--shadow); }
.form-row2 { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem; }
.fg { display: flex; flex-direction: column; gap: .4rem; margin-bottom: 1rem; }
.fg:last-of-type { margin-bottom: 1.2rem; }
.fg label { font-size: .79rem; font-weight: 600; color: var(--text2); letter-spacing: .2px; }
.fg input, .fg textarea, .fg select {
  background: var(--bg); border: 1.5px solid var(--border);
  border-radius: 9px; padding: .7rem 1rem; color: var(--text);
  font-family: 'Plus Jakarta Sans', sans-serif; font-size: .9rem;
  outline: none; transition: border-color .2s, box-shadow .2s;
  resize: none; width: 100%;
}
.fg input:focus, .fg textarea:focus { border-color: var(--blue); box-shadow: 0 0 0 3px rgba(37,99,235,.08); }
.fg textarea { min-height: 110px; }
.form-submit {
  width: 100%; background: var(--blue); color: #fff;
  border: none; border-radius: var(--radius); padding: .82rem;
  font-family: 'Plus Jakarta Sans', sans-serif; font-size: .95rem;
  font-weight: 700; cursor: pointer; letter-spacing: .2px;
  transition: background .2s, transform .2s, box-shadow .2s;
  box-shadow: 0 4px 14px rgba(37,99,235,.3);
}
.form-submit:hover { background: var(--blue-dark); transform: translateY(-1px); box-shadow: 0 6px 20px rgba(37,99,235,.4); }
.form-submit.sent { background: #16a34a; }

/* ── FOOTER ── */
footer {
  background: #0f172a; color: #fff;
  padding: 2.5rem 6%; text-align: center;
  margin:0;
}
.footer-inner { max-width: 1200px; margin: 0 auto; }
.footer-logo { font-size: 1.3rem; font-weight: 800; letter-spacing: -.4px; margin-bottom: .4rem; background: linear-gradient(135deg,#93c5fd,#818cf8); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.footer-copy { font-size: .82rem; color: #64748b; margin-bottom: 1.2rem; }
.footer-links { display: flex; justify-content: center; gap: 2rem; flex-wrap: wrap; }
.footer-links a { font-size: .82rem; color: #64748b; transition: color .2s; }
.footer-links a:hover { color: #93c5fd; }

/* ── FADE-IN ── */
.reveal { opacity: 0; transform: translateY(22px); transition: opacity .6s ease, transform .6s ease; }
.reveal.visible { opacity: 1; transform: translateY(0); }

/* ── RESPONSIVE ── */
@media(max-width:960px){
  .hero-grid, .about-grid, .contact-grid { grid-template-columns: 1fr; gap: 3rem; }
  .proj-card.featured { grid-template-columns: 1fr; }
  .proj-card.featured .proj-thumb { min-height: 180px; }
  .hero-visual { display: none; }
  .about-img-wrap { display: flex; justify-content: center; }
}
@media(max-width:768px){
  .nav-links, .nav-hire { display: none; }
  .ham { display: flex; }
  .hero-stats { gap: 1.8rem; }
  .projects-grid { grid-template-columns: 1fr; }
  .strength-cards { grid-template-columns: 1fr; }
  .form-row2 { grid-template-columns: 1fr; }
}
@media(max-width:500px){
  section { padding: 4rem 5%; }
  .skills-grid { grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); }
}
`;

// ─── Data ────────────────────────────────────────────────────────────────────
const SKILLS = [
  { icon: "🌐", name: "HTML5", cat: "Markup", pct: 95 },
  { icon: "🎨", name: "CSS3", cat: "Styling", pct: 90 },
  { icon: "🟨", name: "JavaScript", cat: "Language", pct: 88 },
  { icon: "⚛️", name: "React", cat: "Frontend", pct: 85 },
  { icon: "🟢", name: "Node.js", cat: "Backend", pct: 82 },
  { icon: "🚂", name: "Express.js", cat: "Backend", pct: 80 },
  { icon: "🍃", name: "MongoDB", cat: "Database", pct: 78 },
  { icon: "☕", name: "Java", cat: "Language", pct: 83 },
  { icon: "🍃", name: "Spring Boot", cat: "Framework", pct: 76 },
  { icon: "🔷", name: "TypeScript", cat: "Language", pct: 70 },
  { icon: "🐙", name: "Git & GitHub", cat: "DevOps", pct: 88 },
  { icon: "🐘", name: "PostgreSQL", cat: "Database", pct: 72 },
];

const PROJECTS = [
  {
    featured: true,
    thumb: "🏛️",
    bg: "linear-gradient(135deg,#eff6ff,#dbeafe)",
    tags: ["React", "Node.js", "MongoDB", "Express", "JWT"],
    title: "Land Records Management System",
    desc: "A full-stack web application designed to digitize and manage land ownership records. Features role-based access control for admins, officers, and citizens, document upload, search by owner/plot, and audit trails. Built with the MERN stack for seamless performance.",
    demo: "#",
    repo: "#",
  },
  {
    thumb: "🛍️",
    bg: "linear-gradient(135deg,#f0fdf4,#dcfce7)",
    tags: ["React", "Redux", "Node.js", "MongoDB"],
    title: "E-Commerce Platform",
    desc: "Full-featured online store with cart, wishlist, payment integration, admin dashboard, and product search.",
    demo: "#",
    repo: "#",
  },
  {
    thumb: "📋",
    bg: "linear-gradient(135deg,#fefce8,#fef9c3)",
    tags: ["Java", "Spring Boot", "PostgreSQL"],
    title: "Task Manager API",
    desc: "RESTful API for task management with JWT auth, pagination, filtering, and Swagger documentation.",
    demo: "#",
    repo: "#",
  },
  {
    thumb: "💬",
    bg: "linear-gradient(135deg,#fdf4ff,#fae8ff)",
    tags: ["React", "Socket.io", "Node.js"],
    title: "Real-Time Chat App",
    desc: "Live messaging application with room-based chats, typing indicators, and persistent message history.",
    demo: "#",
    repo: "#",
  },
];

const EXPERIENCE = [
  {
    role: "MERN Stack Developer Intern",
    company: "Mentisera Technologies",
    dur: "Jun 2024 – Sep 2024",
    bullets: [
      "Developed and maintained RESTful APIs using Node.js & Express.js",
      "Built reusable React components with Redux state management",
      "Integrated MongoDB for data persistence and optimized query performance",
      "Collaborated in an Agile team, participating in sprints and code reviews",
    ],
  },
  {
    role: "Java Backend Developer Intern",
    company: "CodeSprint Labs",
    dur: "Jan 2024 – Apr 2024",
    bullets: [
      "Designed microservices using Spring Boot and RESTful architecture",
      "Implemented JWT-based authentication and role-based authorization",
      "Wrote unit and integration tests with JUnit and Mockito",
      "Worked on PostgreSQL schema design and migration scripts",
    ],
  },
];

// ─── Components ──────────────────────────────────────────────────────────────
function SkillBar({ pct, animate }) {
  return (
    <div className="sk-bar">
      <div className="sk-fill" style={{ width: animate ? pct + "%" : "0%" }} />
    </div>
  );
}

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [skillsVisible, setSkillsVisible] = useState(false);
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const skillsRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Reveal observer
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // Skills bar observer
  useEffect(() => {
    if (!skillsRef.current) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setSkillsVisible(true); }, { threshold: 0.15 });
    obs.observe(skillsRef.current);
    return () => obs.disconnect();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3500);
    setFormState({ name: "", email: "", message: "" });
  }

  return (
    <>
      <style>{STYLE}</style>

      {/* NAV */}
      <nav className={`nav${scrolled ? " scrolled" : ""}`}>
        <div className="nav-logo">ZA.</div>
        <ul className="nav-links">
          {["About", "Skills", "Projects", "Experience", "Contact"].map((l) => (
            <li key={l}><a href={`#${l.toLowerCase()}`}>{l}</a></li>
          ))}
        </ul>
        <a href="#contact" className="nav-hire">Hire Me</a>
        <button className="ham" onClick={() => setMenuOpen(!menuOpen)} aria-label="menu">
          <span /><span /><span />
        </button>
      </nav>
      <div className={`mob-menu${menuOpen ? " open" : ""}`}>
        <ul>
          {["About", "Skills", "Projects", "Experience", "Contact"].map((l) => (
            <li key={l}><a href={`#${l.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{l}</a></li>
          ))}
        </ul>
      </div>

      {/* HERO */}
      <section className="hero" id="home">
        <div className="hero-grid">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="hero-badge-dot" />
              Open to Opportunities
            </div>
            <h1 className="hero-name">
              Zanaira<br /><em>Ahsan</em>
            </h1>
            <div className="hero-role">
              <span>MERN Stack Developer</span> · Java Spring Boot Developer
            </div>
            <p className="hero-tag">
              "Building scalable and modern web applications"
            </p>
            <div className="hero-btns">
              <a href="#projects" className="btn-blue">View Projects →</a>
              <a href="#contact" className="btn-ghost">Contact Me</a>
            </div>
            <div className="hero-stats">
              <div><div className="stat-n">4+</div><div className="stat-l">Projects Built</div></div>
              <div><div className="stat-n">2</div><div className="stat-l">Internships</div></div>
              <div><div className="stat-n">12+</div><div className="stat-l">Technologies</div></div>
            </div>
          </div>

          {/* Illustration */}
          <div className="hero-visual">
            <div className="hero-card-main">
              <div className="code-block">
                <div><span className="cm">// Zanaira's stack</span></div>
                <div><span className="kw">const</span> <span className="fn">developer</span> = {"{"}</div>
                <div>&nbsp;&nbsp;name: <span className="str">"Zanaira Ahsan"</span>,</div>
                <div>&nbsp;&nbsp;role: <span className="str">"Fullstack Dev"</span>,</div>
                <div>&nbsp;&nbsp;stack: [<span className="str">"MERN"</span>, <span className="str">"Java"</span>],</div>
                <div>&nbsp;&nbsp;available: <span className="kw">true</span></div>
                <div>{"}"}</div>
              </div>
              <div className="tech-chips">
                {["React","Node.js","MongoDB","Spring Boot","Express"].map(t => (
                  <span key={t} className="chip">{t}</span>
                ))}
              </div>
              <div className="float-card fc1">
                <div className="fc-icon" style={{ background: "#eff6ff" }}>⚡</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: ".8rem" }}>Full-Stack</div>
                  <div style={{ fontSize: ".71rem", color: "var(--text3)" }}>MERN + Java</div>
                </div>
              </div>
              <div className="float-card fc2">
                <div className="fc-icon" style={{ background: "#f0fdf4" }}>✅</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: ".8rem" }}>Available</div>
                  <div style={{ fontSize: ".71rem", color: "var(--text3)" }}>For work</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="about-sec" id="about">
        <div className="sec-inner">
          <div className="about-grid">
            <div className="about-img-wrap reveal">
              <div className="about-img-frame">
                <svg className="about-avatar-svg" viewBox="0 0 300 360" fill="none">
                  <ellipse cx="150" cy="110" rx="70" ry="76" fill="rgba(37,99,235,0.12)" />
                  <circle cx="150" cy="100" r="52" fill="#dbeafe" />
                  <ellipse cx="150" cy="92" rx="34" ry="38" fill="#bfdbfe" />
                  <ellipse cx="150" cy="86" rx="26" ry="29" fill="#93c5fd" />
                  <circle cx="138" cy="84" r="5" fill="#1d4ed8" />
                  <circle cx="162" cy="84" r="5" fill="#1d4ed8" />
                  <path d="M140 96 Q150 104 160 96" stroke="#1d4ed8" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  <ellipse cx="150" cy="145" rx="55" ry="26" fill="#dbeafe" />
                  <path d="M95 170 Q150 145 205 170 L215 260 Q150 285 85 260Z" fill="#bfdbfe" />
                  <rect x="122" y="143" width="56" height="34" rx="10" fill="#93c5fd" opacity=".5" />
                  <text x="150" y="320" textAnchor="middle" fontSize="13" fill="#93c5fd" fontFamily="Plus Jakarta Sans,sans-serif" fontWeight="600">zanaira.dev</text>
                </svg>
                <div className="about-badge-exp">
                  <span className="n">1+</span>
                  <span className="l">Yr Exp.</span>
                </div>
              </div>
            </div>

            <div className="reveal" style={{ transitionDelay: ".15s" }}>
              <div className="sec-label">About Me</div>
              <h2 className="sec-title">Passionate About <em>Clean Code</em> & Great UX</h2>
              <p style={{ color: "var(--text2)", fontSize: ".97rem", lineHeight: "1.8", marginBottom: "1.2rem" }}>
                I'm Zanaira Ahsan, a dedicated full-stack developer specializing in the MERN stack and Java Spring Boot. I love turning complex problems into elegant, performant solutions — whether that's a pixel-perfect React interface or a robust REST API.
              </p>
              <p style={{ color: "var(--text2)", fontSize: ".97rem", lineHeight: "1.8", marginBottom: "1.4rem" }}>
                With hands-on internship experience and a portfolio of real-world projects, I bring both technical depth and a product mindset to every engagement.
              </p>

              <div className="strength-cards">
                {[
                  { icon: "🎨", t: "Frontend", d: "React, Redux, responsive UI" },
                  { icon: "⚙️", t: "Backend", d: "Node.js, Spring Boot, REST APIs" },
                  { icon: "🧩", t: "Problem Solving", d: "DSA, system design thinking" },
                  { icon: "🗄️", t: "Databases", d: "MongoDB, PostgreSQL, MySQL" },
                ].map(({ icon, t, d }) => (
                  <div key={t} className="str-card">
                    <div className="str-icon">{icon}</div>
                    <div><div className="str-title">{t}</div><div className="str-desc">{d}</div></div>
                  </div>
                ))}
              </div>

              <div className="info-rows" style={{ marginBottom: "1.8rem" }}>
                {[
                  ["Name", "Zanaira Ahsan"],
                  ["Role", "MERN · Java Spring Boot Dev"],
                  ["Location", "Pakistan"],
                  ["Status", "Open to Work ✅"],
                ].map(([l, v]) => (
                  <div key={l} className="info-row">
                    <span className="lbl">{l}</span>
                    <span className="val" style={l === "Status" ? { color: "#16a34a" } : {}}>{v}</span>
                  </div>
                ))}
              </div>
              <a href="#" className="btn-blue" style={{ display: "inline-block" }}>Download CV →</a>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" ref={skillsRef}>
        <div className="sec-inner">
          <div className="reveal" style={{ textAlign: "center", maxWidth: 580, margin: "0 auto" }}>
            <div className="sec-label">Technical Skills</div>
            <h2 className="sec-title">Tools & <em>Technologies</em></h2>
            <p className="sec-sub" style={{ margin: "0 auto 3rem" }}>A curated set of technologies I use to build fast, scalable, and maintainable web applications.</p>
          </div>
          <div className="skills-grid">
            {SKILLS.map((s, i) => (
              <div key={s.name} className="skill-card reveal" style={{ transitionDelay: `${i * 0.05}s` }}>
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

      {/* PROJECTS */}
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

      {/* EXPERIENCE */}
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

      {/* CONTACT */}
      <section className="contact-sec" id="contact">
        <div className="sec-inner">
          <div className="contact-grid">
            <div className="reveal">
              <div className="sec-label">Get In Touch</div>
              <div className="contact-head">
                <h3>Let's <em style={{ fontFamily: "'Instrument Serif',serif", fontStyle: "italic", color: "var(--blue)" }}>Work Together</em></h3>
                <p>Have a project in mind, looking for a developer, or just want to say hello? I'd love to hear from you — let's build something great.</p>
              </div>
              <div className="contact-items">
                {[
                  { icon: "📧", lbl: "Email", val: "zanaira.ahsan@email.com" },
                  { icon: "📱", lbl: "Phone", val: "+92 300 000 0000" },
                  { icon: "📍", lbl: "Location", val: "Pakistan" },
                ].map(({ icon, lbl, val }) => (
                  <div key={lbl} className="ci">
                    <div className="ci-icon">{icon}</div>
                    <div><div className="ci-lbl">{lbl}</div><div className="ci-val">{val}</div></div>
                  </div>
                ))}
              </div>
              <div className="social-row">
                {[["in","Li"],["🐙","Gh"],["✉","Em"]].map(([icon, lbl]) => (
                  <div key={lbl} className="soc-btn" title={lbl}>{icon}</div>
                ))}
              </div>
            </div>

            <div className="reveal" style={{ transitionDelay: ".15s" }}>
              <form className="form-box" onSubmit={handleSubmit}>
                <h4 style={{ fontWeight: 800, fontSize: "1.1rem", letterSpacing: "-.3px", marginBottom: "1.4rem", color: "var(--text)" }}>Send a Message</h4>
                <div className="form-row2">
                  <div className="fg">
                    <label>First Name</label>
                    <input placeholder="Zanaira" value={formState.name} onChange={e => setFormState(p => ({ ...p, name: e.target.value }))} required />
                  </div>
                  <div className="fg">
                    <label>Last Name</label>
                    <input placeholder="Ahsan" />
                  </div>
                </div>
                <div className="fg">
                  <label>Email Address</label>
                  <input type="email" placeholder="you@example.com" value={formState.email} onChange={e => setFormState(p => ({ ...p, email: e.target.value }))} required />
                </div>
                <div className="fg">
                  <label>Subject</label>
                  <input placeholder="Project inquiry, collaboration..." />
                </div>
                <div className="fg">
                  <label>Message</label>
                  <textarea placeholder="Tell me about your project or opportunity..." value={formState.message} onChange={e => setFormState(p => ({ ...p, message: e.target.value }))} required />
                </div>
                <button type="submit" className={`form-submit${sent ? " sent" : ""}`}>
                  {sent ? "Message Sent! ✓" : "Send Message →"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-inner">
          <div className="footer-logo">Zanaira Ahsan</div>
          <div className="footer-copy">© {new Date().getFullYear()} Zanaira Ahsan · MERN Stack & Java Spring Boot Developer</div>
          <div className="footer-links">
            {["Home","About","Skills","Projects","Experience","Contact"].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`}>{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}
