import React, { useRef, useState, useEffect } from 'react';

const Projects = () => {
  const scrollRef = useRef(null);
  const [visibleIndex, setVisibleIndex] = useState(0);
  const touchStartX = useRef(0);

  const projects = [
    {
      title: "RecruitWise: AI Recruitment System",
      type: "Final Year Project • LLM-Powered",
      description:
        "Revolutionary conversational AI system that conducts technical interviews autonomously. Features automated resume screening, intelligent questioning, and comprehensive candidate scoring using RAG-based architecture.",
      technologies: ["Python", "Llama", "NLP", "GROQ", "LLM", "RAG", "FastAPI", "Docker"]
    },
    {
      title: "Real-time E-commerce Pipeline",
      type: "Big Data Architecture • Live Analytics",
      description:
        "Comprehensive data pipeline processing millions of e-commerce transactions in real-time. Built with enterprise-grade tools for scalable data ingestion, processing, and visualization.",
      technologies: ["Hadoop", "Spark", "Kafka", "HBase", "MongoDB"]
    },
    {
      title: "Medical AI Predictor",
      type: "Healthcare ML • Clinical Impact",
      description:
        "Advanced machine learning system for predicting Acute Kidney Injury risk in hospital patients. Achieved exceptional AUC-ROC scores providing actionable clinical insights for healthcare professionals.",
      technologies: ["Python", "XGBoost", "Random Forest", "SQL", "Healthcare", "Google Big Query"]
    },
    {
      title: "Kaggle Competition Models",
      type: "Data Science • Competitive ML",
      description:
        "High-performance machine learning models for patient survival prediction and property valuation. Implemented advanced feature engineering and optimization techniques for superior accuracy.",
      technologies: ["Pandas", "Scikit-learn", "TensorFlow", "Feature Engineering"]
    }
  ];

  const scrollToCard = (index) => {
    const container = scrollRef.current;
    if (!container) return;
    
    const containerWidth = container.offsetWidth;
    const cardWidth = 300; // Fixed card width
    const gap = 24; // Gap between cards
    const totalCardWidth = cardWidth + gap;
    
    // Calculate scroll position to center the selected card
    const scrollLeft = index * totalCardWidth - (containerWidth - cardWidth) / 2;
    
    container.scrollTo({
      left: scrollLeft,
      behavior: 'smooth'
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
    
    const containerWidth = container.offsetWidth;
    const scrollLeft = container.scrollLeft;
    const cardWidth = 300;
    const gap = 24;
    const totalCardWidth = cardWidth + gap;
    
    // Calculate which card is closest to center
    const centerPosition = scrollLeft + containerWidth / 2;
    const index = Math.round(centerPosition / totalCardWidth);
    
    if (index !== visibleIndex) {
      setVisibleIndex(Math.max(0, Math.min(index, projects.length - 1)));
    }
  };

  // Auto-scroll every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      scroll(1);
    }, 5000);
    return () => clearInterval(interval);
  }, [visibleIndex]);

  // Sync scroll index on manual drag
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
  }, [visibleIndex]);

  // Touch events
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
    <div className="min-h-screen bg-gray-900 text-white">
      <section id="projects" className="py-20">
        <div className="max-w-6xl mx-auto px-8">
          <h2 className="text-4xl font-bold text-center mb-16 relative">
            Featured Projects
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-blue-400 rounded-full -mb-4"></div>
          </h2>

          <div className="projects-wrapper relative flex items-center justify-center gap-4 mb-4">
            <button onClick={() => scroll(-1)} className="z-10 bg-gray-800 bg-opacity-50 text-white border-none text-3xl p-3 cursor-pointer backdrop-blur-sm rounded-full transition-all duration-300 hover:bg-blue-500 hover:text-black">
              ‹
            </button>

            <div className="relative w-full max-w-4xl overflow-hidden">
              <div
                className="flex gap-6 overflow-x-auto scrollbar-hide smooth-scroll"
                ref={scrollRef}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                style={{
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                  WebkitOverflowScrolling: 'touch',
                  scrollBehavior: 'smooth'
                }}
              >
                {projects.map((project, index) => (
                  <div
                    key={index}
                    className={`flex-none w-80 h-96 rounded-2xl overflow-hidden transition-all duration-400 ${
                      index === visibleIndex
                        ? 'opacity-100 scale-105 bg-gray-800 border-2 border-blue-400 shadow-2xl shadow-blue-400/20'
                        : 'opacity-60 scale-95 bg-gray-800 bg-opacity-50 border border-gray-700'
                    }`}
                  >
                    <div className="p-6 h-full relative">
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-purple-500"></div>
                      
                      <h3 className="text-lg font-semibold mb-2 text-white">{project.title}</h3>
                      <p className="text-gray-400 text-sm mb-4">{project.type}</p>
                      <p className="text-gray-300 text-sm leading-relaxed mb-6">{project.description}</p>
                      
                      <div className="flex flex-wrap gap-2 absolute bottom-6 left-6 right-6">
                        {project.technologies.map((tech, techIndex) => (
                          <span 
                            key={techIndex} 
                            className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-xs border border-gray-600"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button onClick={() => scroll(1)} className="z-10 bg-gray-800 bg-opacity-50 text-white border-none text-3xl p-3 cursor-pointer backdrop-blur-sm rounded-full transition-all duration-300 hover:bg-blue-500 hover:text-black">
              ›
            </button>
          </div>

          <div className="flex justify-center gap-2 mt-4">
            {projects.map((_, idx) => (
              <span
                key={idx}
                className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
                  idx === visibleIndex ? 'bg-blue-400' : 'bg-gray-600'
                }`}
                onClick={() => {
                  setVisibleIndex(idx);
                  scrollToCard(idx);
                }}
              ></span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;