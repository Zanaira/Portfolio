import {myImage} from "../assets/Pc_me.jpeg";
export default function Hero() {
  return (
    <section className="hero" id="home">
        <div className="hero-grid">
          <div className="hero-content">
            
            <h1 className="hero-name">
              Zanaira<br /><em>Ahsan</em>
            </h1>
            <div className="hero-role">
              <span>MERN Stack Developer</span> · Java Spring Boot Developer
            </div>
            <p className="hero-tag">
              Building scalable and modern web applications
            </p>
            <div className="hero-btns">
              <a href="#projects" className="btn-blue">View Projects →</a>
              <a href="#contact" className="btn-ghost">Contact Me</a>
            </div>
            <div className="hero-stats">
              <div><div className="stat-n">4+</div><div className="stat-l">Projects Built</div></div>
              <div><div className="stat-n">1</div><div className="stat-l">Internships</div></div>
              <div><div className="stat-n">12+</div><div className="stat-l">Technologies</div></div>
            </div>
          </div>

          {/* Illustration */}
          <div className="hero-visual">
            <div className="hero-card-main">
              <img src={myImage} alt="Hero Illustration" />
            </div>
          </div>
        </div>
      </section>
  );
}