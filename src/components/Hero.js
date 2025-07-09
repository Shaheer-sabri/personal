import React from 'react';

const Hero = () => {
  const downloadResume = () => {
    const resumeUrl = "Syed Shaheer Sabri (1).pdf";
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = "Syed_Shaheer_Sabri_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="hero">
  <div className="hero-content">
    <img 
      src="shaheer.jpg" 
      alt="Syed Shaheer Sabri" 
      className="profile-image" 
    />
    <h1>Syed Shaheer Sabri</h1>
    <p className="hero-subtitle">
      Data Scientist & AI Engineer crafting intelligent solutions for tomorrow
    </p>
    <div className="hero-cta">
      <a href="#contact" className="btn btn-primary">Let's Connect</a>
      <a href="#projects" className="btn btn-secondary">View Work</a>
    </div>
    <div className="social-links">
      {/* your social links */}
    </div>
    <div className="resume-download">
      <button className="btn btn-primary" onClick={downloadResume}>
        Download Resume
      </button>
    </div>

    {/* Make scroll-indicator part of layout flow */}
    <div className="scroll-indicator">
      <div style={{ color: 'var(--accent)', fontSize: '1.5rem' }}>↓</div>
    </div>
  </div>
</section>

  );
};

export default Hero;