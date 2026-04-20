import myImage from "../assets/Pc_me.jpeg";
export default function About() {
  return (
  <section className="about-sec" id="about">
        <div className="sec-inner">
          <div className="about-grid">
            <div className="about-img-wrap reveal">
              <div className="about-img-frame">
                <img src={myImage} alt="Hero Illustration" />
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
               I'm Zanaira Ahsan, a full-stack developer specializing in the MERN stack and Java Spring Boot. I enjoy turning complex problems into clean, scalable solutions  from building responsive React interfaces to developing robust REST APIs.
              </p>
              <p style={{ color: "var(--text2)", fontSize: ".97rem", lineHeight: "1.8", marginBottom: "1.4rem" }}>
                With hands on internship experience and real world projects, I bring both strong technical skills and a practical, product focused approach to development.
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
                  ["Status", "Open to Work "],
                ].map(([l, v]) => (
                  <div key={l} className="info-row">
                    <span className="lbl">{l}</span>
                    <span className="val" style={l === "Status" ? { color: "#16a34a" } : {}}>{v}</span>
                  </div>
                ))}
              </div>
              <a href="https://drive.google.com/file/d/186_Fj1YqpkJBqr_CYDVIP6aLuEHw_JFG/view?usp=drive_link" className="btn-blue" style={{ display: "inline-block" }}>Download CV →</a>
            </div>
          </div>
        </div>
      </section>
  );
}