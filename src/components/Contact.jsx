import { useState } from 'react';
import { useForm, ValidationError } from '@formspree/react';

export default function Contact() {
  // 👇 Replace "YOUR_FORM_ID" with your actual Formspree form ID (e.g. "xyzabcde")
  const [state, handleSubmit] = useForm("xjgjebjl");

  return (
    <section className="contact-sec" id="contact">
      <div className="sec-inner">
        <div className="contact-grid">
          <div className="reveal">
            <div className="sec-label">Get In Touch</div>
            <div className="contact-head">
              <h3>Let's <em style={{ fontFamily: "'Instrument Serif',serif", fontStyle: "italic", color: "var(--blue)" }}>Work Together</em></h3>
              <p>Have an idea in mind, looking for a developer, or just want to say hello? I'd love to hear from you. Let's build something together.</p>
            </div>
            <div className="contact-items">
              {[
                { icon: "📧", lbl: "Email", val: "zanaira.ahsan34@gmail.com" },
                { icon: "📱", lbl: "Phone", val: "+92 3278503536" },
                { icon: "📍", lbl: "Location", val: "Pakistan" },
              ].map(({ icon, lbl, val }) => (
                <div key={lbl} className="ci">
                  <div className="ci-icon">{icon}</div>
                  <div><div className="ci-lbl">{lbl}</div><div className="ci-val">{val}</div></div>
                </div>
              ))}
            </div>
           <div className="social-row">
  {[
    { icon: "in", label: "LinkedIn", url: "https://www.linkedin.com/in/zanaira-ahsan" },
    { icon: "⌥", label: "GitHub",   url: "https://github.com/Zanaira" },
    { icon: "✉",  label: "Gmail",   url: "mailto:zanaira.ahsan34@gmail.com" },
  ].map(({ icon, label, url }) => (
    <a
      key={label}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="soc-btn"
      title={label}
    >
      {icon}
    </a>
  ))}
</div>
          </div>

          <div className="reveal" style={{ transitionDelay: ".15s" }}>
            <form className="form-box" onSubmit={handleSubmit}>
              <h4 style={{ fontWeight: 800, fontSize: "1.1rem", letterSpacing: "-.3px", marginBottom: "1.4rem", color: "var(--text)" }}>
                Send a Message
              </h4>

              {/* ✅ Success state */}
              {state.succeeded ? (
                <div style={{
                  textAlign: "center", padding: "2.5rem 1rem",
                  background: "#f0fdf4", borderRadius: "12px",
                  border: "1px solid #bbf7d0"
                }}>
                  <div style={{ fontSize: "2.5rem", marginBottom: ".75rem" }}>✅</div>
                  <div style={{ fontWeight: 700, color: "#15803d", fontSize: "1rem", marginBottom: ".35rem" }}>
                    Message Sent!
                  </div>
                  <div style={{ color: "#4ade80", fontSize: ".85rem" }}>
                    I'll get back to you at your email soon.
                  </div>
                </div>
              ) : (
                <>
                  <div className="form-row2">
                    <div className="fg">
                      <label htmlFor="firstName">First Name</label>
                      <input id="firstName" name="firstName" placeholder="Zanaira" required />
                    </div>
                    <div className="fg">
                      <label htmlFor="lastName">Last Name</label>
                      <input id="lastName" name="lastName" placeholder="Ahsan" />
                    </div>
                  </div>

                  <div className="fg">
                    <label htmlFor="email">Email Address</label>
                    <input id="email" type="email" name="email" placeholder="you@example.com" required />
                    <ValidationError prefix="Email" field="email" errors={state.errors} style={{ color: "red", fontSize: ".78rem", marginTop: "4px" }} />
                  </div>

                  <div className="fg">
                    <label htmlFor="subject">Subject</label>
                    <input id="subject" name="subject" placeholder="Project inquiry, collaboration..." />
                  </div>

                  <div className="fg">
                    <label htmlFor="message">Message</label>
                    <textarea id="message" name="message" placeholder="Tell me about your project or opportunity..." required />
                    <ValidationError prefix="Message" field="message" errors={state.errors} style={{ color: "red", fontSize: ".78rem", marginTop: "4px" }} />
                  </div>

                  <button
                    type="submit"
                    disabled={state.submitting}
                    className="form-submit"
                    style={state.submitting ? { opacity: .7, cursor: "not-allowed" } : {}}
                  >
                    {state.submitting ? "Sending..." : "Send Message →"}
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}