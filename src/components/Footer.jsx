export default function Footer() {
  return (
  
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
  
  );
}