import React, { useRef, useState, useEffect } from 'react';

const Projects = () => {
  const scrollRef = useRef(null);
  const [visibleIndex, setVisibleIndex] = useState(0);
  const touchStartX = useRef(0);
  const isScrolling = useRef(false);

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

  // Create infinite array by duplicating projects multiple times
  const infiniteProjects = [...projects, ...projects, ...projects];
  const originalLength = projects.length;
  const startIndex = originalLength; // Start at the second copy (middle)

  const scrollToCard = (index, smooth = true) => {
    const container = scrollRef.current;
    if (!container) return;
    
    const containerWidth = container.offsetWidth;
    const cardWidth = 350;
    const gap = 32;
    const totalCardWidth = cardWidth + gap;
    
    const scrollLeft = index * totalCardWidth - (containerWidth - cardWidth) / 2;
    
    container.scrollTo({
      left: Math.max(0, scrollLeft),
      behavior: smooth ? 'smooth' : 'auto'
    });
  };

  const scroll = (direction) => {
    const newIndex = visibleIndex + direction;
    setVisibleIndex(newIndex);
    scrollToCard(newIndex);
  };

  const updateIndexOnScroll = () => {
    if (isScrolling.current) return;
    
    const container = scrollRef.current;
    if (!container) return;
    
    const containerWidth = container.offsetWidth;
    const scrollLeft = container.scrollLeft;
    const cardWidth = 350;
    const gap = 32;
    const totalCardWidth = cardWidth + gap;
    
    const centerPosition = scrollLeft + containerWidth / 2;
    const index = Math.round(centerPosition / totalCardWidth);
    
    const clampedIndex = Math.max(0, Math.min(index, infiniteProjects.length - 1));
    
    // Handle infinite loop reset - only reset when we're in the first or last copy
    if (clampedIndex < originalLength) {
      // If we're in the first copy, jump to the equivalent position in the second copy
      const newIndex = clampedIndex + originalLength;
      isScrolling.current = true;
      setVisibleIndex(newIndex);
      scrollToCard(newIndex, false);
      setTimeout(() => {
        isScrolling.current = false;
      }, 50);
    } else if (clampedIndex >= originalLength * 2) {
      // If we're in the third copy, jump to the equivalent position in the second copy
      const newIndex = clampedIndex - originalLength;
      isScrolling.current = true;
      setVisibleIndex(newIndex);
      scrollToCard(newIndex, false);
      setTimeout(() => {
        isScrolling.current = false;
      }, 50);
    } else if (clampedIndex !== visibleIndex) {
      setVisibleIndex(clampedIndex);
    }
  };

  const getActualIndex = (index) => {
    return index % originalLength;
  };

  // Initialize carousel at the center (RecruitWise)
  useEffect(() => {
    setVisibleIndex(startIndex);
    setTimeout(() => {
      scrollToCard(startIndex, false);
    }, 100);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      scroll(1);
    }, 5000);
    return () => clearInterval(interval);
  }, [visibleIndex]);

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.addEventListener('scroll', updateIndexOnScroll);
      return () => container.removeEventListener('scroll', updateIndexOnScroll);
    }
  }, [visibleIndex]);

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

  const handleDotClick = (dotIndex) => {
    // Find the closest instance of the desired project in the infinite array
    const currentActualIndex = getActualIndex(visibleIndex);
    const targetIndex = startIndex + (dotIndex - currentActualIndex);
    setVisibleIndex(targetIndex);
    scrollToCard(targetIndex);
  };

  return (
    <div style={{
      backgroundColor: '#0a0a0a',
      color: '#ffffff',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: 'Inter, sans-serif'
    }}>
      {/* Dynamic Background Effects */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: -1,
        transition: 'all 1s ease-in-out'
      }}>
        {/* Base animated orbs */}
        <div style={{
          position: 'absolute',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          filter: 'blur(100px)',
          opacity: 0.2,
          background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
          top: '10%',
          left: '10%',
          animation: 'float 20s ease-in-out infinite'
        }}></div>
        <div style={{
          position: 'absolute',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          filter: 'blur(100px)',
          opacity: 0.2,
          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          top: '60%',
          right: '10%',
          animation: 'float 20s ease-in-out infinite',
          animationDelay: '-10s'
        }}></div>
        <div style={{
          position: 'absolute',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          filter: 'blur(100px)',
          opacity: 0.2,
          background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
          bottom: '10%',
          left: '50%',
          animation: 'float 20s ease-in-out infinite',
          animationDelay: '-5s'
        }}></div>
        
        {/* Dynamic project-specific background overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: 0.15,
          transition: 'all 1.5s ease-in-out',
          background: getActualIndex(visibleIndex) === 0 
            ? 'radial-gradient(circle at 50% 50%, rgba(79, 172, 254, 0.3) 0%, rgba(0, 242, 254, 0.2) 30%, rgba(10, 10, 10, 0.8) 70%)'
            : getActualIndex(visibleIndex) === 1
            ? 'radial-gradient(circle at 50% 50%, rgba(240, 147, 251, 0.3) 0%, rgba(245, 87, 108, 0.2) 30%, rgba(10, 10, 10, 0.8) 70%)'
            : getActualIndex(visibleIndex) === 2
            ? 'radial-gradient(circle at 50% 50%, rgba(67, 233, 123, 0.3) 0%, rgba(56, 249, 215, 0.2) 30%, rgba(10, 10, 10, 0.8) 70%)'
            : 'radial-gradient(circle at 50% 50%, rgba(102, 126, 234, 0.3) 0%, rgba(118, 75, 162, 0.2) 30%, rgba(10, 10, 10, 0.8) 70%)'
        }}></div>
        
        {/* Subtle gradient overlay for smooth transitions */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, rgba(10, 10, 10, 0.7) 0%, rgba(10, 10, 10, 0.9) 100%)',
          mixBlendMode: 'multiply'
        }}></div>
      </div>

      <section style={{ padding: '8rem 0', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 700,
            textAlign: 'center',
            marginBottom: '4rem',
            position: 'relative'
          }}>
            Featured Projects
            <div style={{
              content: '""',
              position: 'absolute',
              bottom: '-1rem',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '100px',
              height: '4px',
              background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
              borderRadius: '2px'
            }}></div>
          </h2>

          <div style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            marginBottom: '1rem'
          }}>
            <button 
              onClick={() => scroll(-1)}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                color: '#ffffff',
                border: 'none',
                fontSize: '2rem',
                padding: '0.5rem 1rem',
                cursor: 'pointer',
                zIndex: 2,
                backdropFilter: 'blur(10px)',
                borderRadius: '50%',
                transition: 'all 0.3s ease',
                width: '50px',
                height: '50px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onMouseOver={(e) => {
                e.target.style.background = '#00d4ff';
                e.target.style.color = '#0a0a0a';
              }}
              onMouseOut={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                e.target.style.color = '#ffffff';
              }}
            >
              ‹
            </button>

            <div style={{
              display: 'flex',
              overflowX: 'auto',
              scrollSnapType: 'x mandatory',
              gap: '2rem',
              padding: '1rem 0',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
            ref={scrollRef}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            >
              {infiniteProjects.map((project, index) => {
                const actualIndex = getActualIndex(index);
                const isActive = index === visibleIndex;
                
                return (
                  <div
                    key={index}
                    style={{
                      flex: '0 0 auto',
                      width: '350px',
                      scrollSnapAlign: 'center',
                      background: 'rgba(255, 255, 255, 0.05)',
                      backdropFilter: 'blur(20px)',
                      border: isActive 
                        ? '1px solid #00d4ff'
                        : '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '20px',
                      overflow: 'hidden',
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      opacity: isActive ? 1 : 0.4,
                      transform: isActive ? 'scale(1.05)' : 'scale(0.9)',
                      zIndex: isActive ? 2 : 1,
                      boxShadow: isActive 
                        ? '0 30px 60px rgba(0, 212, 255, 0.2)'
                        : 'none'
                    }}
                  >
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '4px',
                      background: actualIndex === 0 
                        ? 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
                        : actualIndex === 1
                        ? 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
                        : actualIndex === 2
                        ? 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
                        : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                    }}></div>
                    
                    <div style={{ padding: '2rem' }}>
                      <h3 style={{
                        fontSize: '1.3rem',
                        fontWeight: 600,
                        marginBottom: '0.5rem',
                        color: '#ffffff'
                      }}>
                        {project.title}
                      </h3>
                      
                      <p style={{
                        color: '#666666',
                        fontSize: '0.9rem',
                        marginBottom: '1rem'
                      }}>
                        {project.type}
                      </p>
                      
                      <p style={{
                        color: '#a0a0a0',
                        lineHeight: 1.6,
                        marginBottom: '1.5rem'
                      }}>
                        {project.description}
                      </p>
                      
                      <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '0.8rem'
                      }}>
                        {project.technologies.map((tech, techIndex) => (
                          <span 
                            key={techIndex}
                            style={{
                              background: '#111111',
                              color: '#a0a0a0',
                              padding: '0.5rem 1rem',
                              borderRadius: '25px',
                              fontSize: '0.9rem',
                              border: '1px solid rgba(255, 255, 255, 0.1)',
                              transition: 'all 0.3s ease',
                              cursor: 'pointer'
                            }}
                            onMouseOver={(e) => {
                              e.target.style.background = '#00d4ff';
                              e.target.style.color = '#0a0a0a';
                              e.target.style.transform = 'translateY(-2px)';
                            }}
                            onMouseOut={(e) => {
                              e.target.style.background = '#111111';
                              e.target.style.color = '#a0a0a0';
                              e.target.style.transform = 'translateY(0)';
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <button 
              onClick={() => scroll(1)}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                color: '#ffffff',
                border: 'none',
                fontSize: '2rem',
                padding: '0.5rem 1rem',
                cursor: 'pointer',
                zIndex: 2,
                backdropFilter: 'blur(10px)',
                borderRadius: '50%',
                transition: 'all 0.3s ease',
                width: '50px',
                height: '50px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onMouseOver={(e) => {
                e.target.style.background = '#00d4ff';
                e.target.style.color = '#0a0a0a';
              }}
              onMouseOut={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                e.target.style.color = '#ffffff';
              }}
            >
              ›
            </button>
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.5rem',
            marginTop: '1rem'
          }}>
            {projects.map((_, idx) => (
              <button
                key={idx}
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  transition: 'background 0.3s ease',
                  background: idx === getActualIndex(visibleIndex) ? '#00d4ff' : 'rgba(255, 255, 255, 0.1)',
                  border: 'none'
                }}
                onClick={() => handleDotClick(idx)}
              />
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-30px) rotate(120deg); }
          66% { transform: translateY(30px) rotate(240deg); }
        }

        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default Projects;