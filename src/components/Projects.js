import React, { useRef } from 'react';

const Projects = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const container = scrollRef.current;
    const scrollAmount = 400; // adjust as needed
    if (container) {
      container.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const projects = [
    {
      title: "RecruitWise: AI Recruitment System",
      type: "Final Year Project • LLM-Powered",
      description: "Revolutionary conversational AI system that conducts technical interviews autonomously. Features automated resume screening, intelligent questioning, and comprehensive candidate scoring using RAG-based architecture.",
      technologies: ["Python", "Llama", "NLP", "GROQ", "LLM", "RAG", "FastAPI", "Docker"]
    },
    {
      title: "Real-time E-commerce Pipeline",
      type: "Big Data Architecture • Live Analytics",
      description: "Comprehensive data pipeline processing millions of e-commerce transactions in real-time. Built with enterprise-grade tools for scalable data ingestion, processing, and visualization.",
      technologies: ["Hadoop", "Spark", "Kafka", "HBase", "MongoDB"]
    },
    {
      title: "Medical AI Predictor",
      type: "Healthcare ML • Clinical Impact",
      description: "Advanced machine learning system for predicting Acute Kidney Injury risk in hospital patients. Achieved exceptional AUC-ROC scores providing actionable clinical insights for healthcare professionals.",
      technologies: ["Python", "XGBoost", "Random Forest", "SQL", "Healthcare", "Google Big Query"]
    },
    {
      title: "Kaggle Competition Models",
      type: "Data Science • Competitive ML",
      description: "High-performance machine learning models for patient survival prediction and property valuation. Implemented advanced feature engineering and optimization techniques for superior accuracy.",
      technologies: ["Pandas", "Scikit-learn", "TensorFlow", "Feature Engineering"]
    }
  ];

  return (
    <section id="projects" className="section">
      <div className="container">
        <h2 className="section-title">Featured Projects</h2>

        <div className="projects-wrapper">
          <button onClick={() => scroll(-1)} className="scroll-btn left">‹</button>

          <div className="projects-grid" ref={scrollRef}>
            {projects.map((project, index) => (
              <div key={index} className="project-card">
                <div className="project-header">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-type">{project.type}</p>
                  <p className="project-description">{project.description}</p>
                  <div className="project-tech">
                    {project.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button onClick={() => scroll(1)} className="scroll-btn right">›</button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
