import React from 'react';

const Skills = () => {
  const skillCategories = [
    {
      title: "Programming & Development",
      skills: ["Python", "Java", "JavaScript", "SQL", "FastAPI", "Git"]
    },
    {
      title: "Big Data & Analytics",
      skills: ["Apache Hadoop", "Apache Spark", "Apache Kafka", "Apache Hive", "NiFi", "HBase"]
    },
    {
      title: "AI & Machine Learning",
      skills: ["TensorFlow", "Scikit-learn", "XGBoost", "Deep Learning", "Neural Networks", "LLMs"]
    },
    {
      title: "Database & Infrastructure",
      skills: ["MongoDB", "Oracle SQL", "Docker", "Streamlit", "Ubuntu", "Cloud"]
    }
  ];

  return (
    <section id="skills" className="section">
      <div className="container">
        <h2 className="section-title">Technical Arsenal</h2>
        <div className="skills-grid">
          {skillCategories.map((category, index) => (
            <div key={index} className="skill-card">
              <h3>{category.title}</h3>
              <div className="skill-tags">
                {category.skills.map((skill, skillIndex) => (
                  <span key={skillIndex} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;