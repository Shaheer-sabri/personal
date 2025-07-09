import React from 'react';

const About = () => {
  return (
    <section id="about" className="section">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <div className="about-grid">
          <div className="about-text">
            <h3>Turning Data into Intelligence</h3>
            <p>
              I'm a passionate Computer Science student at IBA Karachi, specializing in 
              artificial intelligence and big data technologies. My journey spans from 
              building conversational AI systems to developing predictive models that 
              solve real-world challenges.
            </p>
            <p>
              With expertise in machine learning, deep learning, and distributed computing, 
              I transform complex data into actionable insights. My work bridges the gap 
              between cutting-edge technology and practical business solutions.
            </p>
          </div>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">3+</div>
              <div className="stat-label">Years Experience</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">15+</div>
              <div className="stat-label">Projects Built</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">10+</div>
              <div className="stat-label">Technologies</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">2025</div>
              <div className="stat-label">Graduating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;