import React from 'react';

const Experience = () => {
  const experiences = [
    {
      title: "Data Science Intern",
      company: "Systems Limited",
      period: "Jul 2024 - Sep 2024",
      responsibilities: [
        "Developed Gen AI-powered system for automated banking RFP proposal generation",
        "Created comprehensive data quality assessment tool for dataset integrity validation",
        "Collaborated with K-Electric on power distribution analysis and energy optimization"
      ]
    },
    {
      title: "Research Extern",
      company: "HP Tech Ventures",
      period: "Jul 2024 - Aug 2024",
      responsibilities: [
        "Identified promising startups using industry research tools and databases",
        "Performed market and financial assessment of emerging technologies",
        "Created investment memoranda with actionable recommendations"
      ]
    },
    {
      title: "Freelance Web Development Tutor",
      company: "Edmento",
      period: "Apr 2023 - Present",
      responsibilities: [
        "Delivered project-based learning in web development and computer science",
        "Designed curriculum and hands-on coding activities to enhance engagement"
      ]
    }
  ];

  return (
    <section id="experience" className="section">
      <div className="container">
        <h2 className="section-title">Professional Journey</h2>
        <div className="experience-timeline">
          {experiences.map((exp, index) => (
            <div key={index} className="experience-item">
              <div className="experience-header">
                <div>
                  <h3 className="experience-title">{exp.title}</h3>
                  <p className="experience-company">{exp.company}</p>
                </div>
                <div className="experience-period">{exp.period}</div>
              </div>
              <ul className="experience-description">
                {exp.responsibilities.map((responsibility, respIndex) => (
                  <li key={respIndex}>{responsibility}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;