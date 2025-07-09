import React from 'react';

const Contact = () => {
  const contactLinks = [
    {
      icon: "📧",
      text: "syedshaheersabri@gmail.com",
      href: "mailto:syedshaheersabri@gmail.com"
    },
    {
      icon: "🔗",
      text: "linkedin.com/in/syed-shaheer-sabri",
      href: "https://www.linkedin.com/in/syed-shaheer-sabri",
      target: "_blank"
    },
    {
      icon: "💻",
      text: "github.com/Shaheer-sabri",
      href: "https://github.com/Shaheer-sabri",
      target: "_blank"
    }
  ];

  return (
    <section id="contact" className="section">
      <div className="container">
        <h2 className="section-title">Let's Connect</h2>
        <div className="contact-content">
          <p className="contact-text">
            Whether you're looking to collaborate, hire, or simply say hi — I'm always 
            open to exciting opportunities. Feel free to drop a message!
          </p>
          <div className="contact-links">
            {contactLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target={link.target}
                rel={link.target === "_blank" ? "noopener noreferrer" : undefined}
                className="contact-link"
              >
                <span className="contact-icon">{link.icon}</span>
                {link.text}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;