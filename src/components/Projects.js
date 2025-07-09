import React, { useRef, useState, useEffect } from 'react';

const Projects = () => {
  const scrollRef = useRef(null);
  const [visibleIndex, setVisibleIndex] = useState(0);
  const touchStartX = useRef(0);

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

  const scrollToCard = (index) => {
    const container = scrollRef.current;
    const cardWidth = container?.children[0]?.offsetWidth || 0;
    container.scrollTo({
      left: index * (cardWidth + 32), // 32px is the gap
      behavior: 'smooth',
    });
  };

  const scroll = (direction) => {
    const newIndex = (visibleIndex + direction + projects.length) % projects.length;
    setVisibleIndex(newIndex);
    scrollToCard(newIndex);
  };

  const updateIndexOnScroll = () => {
    const container = scrollRef.current;
    if (!container) return;
    const scrollLeft = container.scrollLeft;
    const cardWidth = container.children[0]?.offsetWidth || 0;
    const index = Math.round(scrollLeft / (cardWidth + 32));
    setVisibleIndex(index);
  };

  // Auto-advance every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      scroll(1);
    }, 5000);
    return () => clearInterval(interval);
  }, [visibleIndex]); // Only reset if index changes

  // Scroll event listener
  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.addEventListener('scroll', updateIndexOnScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', updateIndexOnScroll);
      }
    };
  }, []);

  // Touch-drag functionality
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 50) {
      scroll(diff > 0 ? 1 : -1);
    }
  };

  return (
    <section id="projects" className="section">
      <div className="container">
        <h2 className="section-title">Featured Projects</h2>

        <div className="projects-wrapper">
          <button onClick={() => scroll(-1)} className="scroll-btn left">‹</button>

          <div
            className="projects-grid"
            ref={scrollRef}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
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

        <div className="scroll-indicators">
          {projects.map((_, idx) => (
            <span
              key={idx}
              className={`indicator-dot ${idx === visibleIndex ? 'active' : ''}`}
              onClick={() => {
                setVisibleIndex(idx);
                scrollToCard(idx);
              }}
            ></span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
