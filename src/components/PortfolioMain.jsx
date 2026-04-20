import Navbar from './Navbar';
import Hero from './Hero';
import About from './Abouts';
import Skills from './Skills';
import Projects from './Projects';
import Experience from './Experience';
import Contact from './Contact';
import Footer from './Footer';
import '../styles/global.css';
import { useEffect, useRef, useState } from 'react';
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

      useEffect(() => {
        if (!skillsRef.current) return;
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setSkillsVisible(true); }, { threshold: 0.15 });
        obs.observe(skillsRef.current);
        return () => obs.disconnect();
      }, []);

        return (
    <>
      <Navbar />
      <Hero/>
      <About/>
      <Skills/>
      <Projects/>
      <Experience/>
      <Contact/>
      <Footer/>
    </>
        );
    }