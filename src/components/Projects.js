import React, { useRef, useState, useEffect } from 'react';

const Projects = () => {
  const scrollRef = useRef(null);
  const [visibleIndex, setVisibleIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const touchStartX = useRef(0);
  const isScrolling = useRef(false);
  const [isMobile, setIsMobile] = useState(false);

  const projects = [
    {
      title: "RecruitWise: AI Recruitment System",
      type: "Final Year Project • LLM-Powered",
      description:
        "Revolutionary conversational AI system that conducts technical interviews autonomously. Features automated resume screening, intelligent questioning, and comprehensive candidate scoring using RAG-based architecture.",
      technologies: ["Python", "Llama", "NLP", "GROQ", "LLM", "RAG", "FastAPI", "Docker"],
      githubUrl: "https://github.com/yourusername/recruitwise-ai" // Replace with actual URL
    },
    {
      title: "Real-time E-commerce Pipeline",
      type: "Big Data Architecture • Live Analytics",
      description:
        "Comprehensive data pipeline processing millions of e-commerce transactions in real-time. Built with enterprise-grade tools for scalable data ingestion, processing, and visualization.",
      technologies: ["Hadoop", "Spark", "Kafka", "HBase", "MongoDB"],
      githubUrl: "https://github.com/zetomic/ecommerce_pipeline" // Replace with actual URL
    },
    {
      title: "Medical AI Predictor",
      type: "Healthcare ML • Clinical Impact",
      description:
        "Advanced machine learning system for predicting Acute Kidney Injury risk in hospital patients. Achieved exceptional AUC-ROC scores providing actionable clinical insights for healthcare professionals.",
      technologies: ["Python", "XGBoost", "Random Forest", "SQL", "Healthcare", "Google Big Query"],
      githubUrl: "https://github.com/Shaheer-sabri/Predictive_model_of_acute_-kidney_injury-MIMIC-IV-db" // Replace with actual URL
    },
    {
      title: "Kaggle Competition Models",
      type: "Data Science • Competitive ML",
      description:
        "High-performance machine learning models for patient survival prediction and property valuation. Implemented advanced feature engineering and optimization techniques for superior accuracy.",
      technologies: ["Pandas", "Scikit-learn", "TensorFlow", "Feature Engineering"],
      
    }
  ];

  // Create infinite array by duplicating projects multiple times
  const infiniteProjects = [...projects, ...projects, ...projects];
  const originalLength = projects.length;
  const startIndex = originalLength; // Start at the second copy (middle)

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const getCardWidth = () => {
    if (window.innerWidth < 480) return window.innerWidth - 40; // Small phones
    if (window.innerWidth < 768) return window.innerWidth - 80; // Larger phones
    return 350; // Desktop
  };

  const getGap = () => {
    return window.innerWidth < 768 ? 16 : 32;
  };

  const scrollToCard = (index, smooth = true) => {
    const container = scrollRef.current;
    if (!container) return;
    
    const containerWidth = container.offsetWidth;
    const cardWidth = getCardWidth();
    const gap = getGap();
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
    const cardWidth = getCardWidth();
    const gap = getGap();
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

  const handleProjectClick = (project, index) => {
    setSelectedProject({ ...project, index });
  };

  const handleViewProject = (githubUrl) => {
    window.open(githubUrl, '_blank');
  };

  const closeModal = () => {
    setSelectedProject(null);
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
    <div id="projects" style={{
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
          width: isMobile ? '300px' : '600px',
          height: isMobile ? '300px' : '600px',
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
          width: isMobile ? '300px' : '600px',
          height: isMobile ? '300px' : '600px',
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
          width: isMobile ? '300px' : '600px',
          height: isMobile ? '300px' : '600px',
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

      {/* Modal for Project Details */}
      {selectedProject && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '1rem',
          backdropFilter: 'blur(10px)'
        }}
        onClick={closeModal}
        >
          <div style={{
            backgroundColor: '#1a1a1a',
            borderRadius: '20px',
            padding: isMobile ? '1.5rem' : '2rem',
            maxWidth: isMobile ? '90%' : '500px',
            width: '100%',
            border: '1px solid #333',
            position: 'relative',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}
          onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'none',
                border: 'none',
                color: '#fff',
                fontSize: '1.5rem',
                cursor: 'pointer',
                padding: '0.5rem',
                borderRadius: '50%',
                transition: 'background 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = 'transparent';
              }}
            >
              ×
            </button>
            
            <div style={{
              width: '100%',
              height: '4px',
              background: getActualIndex(selectedProject.index) === 0 
                ? 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
                : getActualIndex(selectedProject.index) === 1
                ? 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
                : getActualIndex(selectedProject.index) === 2
                ? 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
                : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '2px',
              marginBottom: '1.5rem'
            }}></div>
            
            <h3 style={{
              fontSize: isMobile ? '1.3rem' : '1.5rem',
              fontWeight: 600,
              marginBottom: '0.5rem',
              color: '#ffffff',
              lineHeight: 1.2,
              paddingRight: '2rem'
            }}>
              {selectedProject.title}
            </h3>
            
            <p style={{
              color: '#00d4ff',
              fontSize: '0.9rem',
              marginBottom: '1rem',
              fontWeight: 500
            }}>
              {selectedProject.type}
            </p>
            
            <p style={{
              color: '#a0a0a0',
              lineHeight: 1.6,
              marginBottom: '1.5rem',
              fontSize: '1rem'
            }}>
              {selectedProject.description}
            </p>
            
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem',
              marginBottom: selectedProject.githubUrl ? '2rem' : '1rem'
            }}>
              {selectedProject.technologies.map((tech, techIndex) => (
                <span 
                  key={techIndex}
                  style={{
                    background: '#333',
                    color: '#fff',
                    padding: '0.5rem 1rem',
                    borderRadius: '25px',
                    fontSize: '0.85rem',
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
            
            {selectedProject.githubUrl && (
              <button
                onClick={() => handleViewProject(selectedProject.githubUrl)}
                style={{
                  width: '100%',
                  padding: '1rem 2rem',
                  background: 'linear-gradient(135deg, #00d4ff 0%, #0099cc 100%)',
                  color: '#0a0a0a',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '1rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 10px 20px rgba(0, 212, 255, 0.3)';
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                View Project
              </button>
            )}
          </div>
        </div>
      )}

      <section style={{ 
        padding: isMobile ? '4rem 0' : '8rem 0', 
        position: 'relative', 
        zIndex: 10 
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          padding: isMobile ? '0 1rem' : '0 2rem' 
        }}>
          <h2 style={{
            fontSize: isMobile ? '2rem' : 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 700,
            textAlign: 'center',
            marginBottom: isMobile ? '2rem' : '4rem',
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
            gap: isMobile ? '0.5rem' : '1rem',
            marginBottom: '1rem'
          }}>
            {/* Hide navigation buttons on mobile for better UX */}
            {!isMobile && (
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
            )}

            <div style={{
              display: 'flex',
              overflowX: 'auto',
              scrollSnapType: 'x mandatory',
              gap: isMobile ? '1rem' : '2rem',
              padding: '1rem 0',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              width: isMobile ? '100%' : 'auto'
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
                      width: isMobile ? `${getCardWidth()}px` : '350px',
                      scrollSnapAlign: 'center',
                      background: 'rgba(255, 255, 255, 0.05)',
                      backdropFilter: 'blur(20px)',
                      border: isActive 
                        ? '1px solid #00d4ff'
                        : '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: isMobile ? '16px' : '20px',
                      overflow: 'hidden',
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      opacity: isActive ? 1 : (isMobile ? 0.7 : 0.4),
                      transform: isActive ? (isMobile ? 'scale(1.02)' : 'scale(1.05)') : (isMobile ? 'scale(0.95)' : 'scale(0.9)'),
                      zIndex: isActive ? 2 : 1,
                      boxShadow: isActive 
                        ? '0 30px 60px rgba(0, 212, 255, 0.2)'
                        : 'none',
                      cursor: 'pointer'
                    }}
                    onClick={() => handleProjectClick(project, index)}
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
                    
                    <div style={{ padding: isMobile ? '1.5rem' : '2rem' }}>
                      <h3 style={{
                        fontSize: isMobile ? '1.1rem' : '1.3rem',
                        fontWeight: 600,
                        marginBottom: '0.5rem',
                        color: '#ffffff',
                        lineHeight: 1.2
                      }}>
                        {project.title}
                      </h3>
                      
                      <p style={{
                        color: '#666666',
                        fontSize: isMobile ? '0.8rem' : '0.9rem',
                        marginBottom: '1rem'
                      }}>
                        {project.type}
                      </p>
                      
                      <p style={{
                        color: '#a0a0a0',
                        lineHeight: 1.6,
                        marginBottom: '1.5rem',
                        fontSize: isMobile ? '0.9rem' : '1rem'
                      }}>
                        {project.description}
                      </p>
                      
                      <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: isMobile ? '0.5rem' : '0.8rem'
                      }}>
                        {project.technologies.map((tech, techIndex) => (
                          <span 
                            key={techIndex}
                            style={{
                              background: '#111111',
                              color: '#a0a0a0',
                              padding: isMobile ? '0.4rem 0.8rem' : '0.5rem 1rem',
                              borderRadius: '25px',
                              fontSize: isMobile ? '0.8rem' : '0.9rem',
                              border: '1px solid rgba(255, 255, 255, 0.1)',
                              transition: 'all 0.3s ease',
                              cursor: 'pointer'
                            }}
                            onMouseOver={(e) => {
                              if (!isMobile) {
                                e.target.style.background = '#00d4ff';
                                e.target.style.color = '#0a0a0a';
                                e.target.style.transform = 'translateY(-2px)';
                              }
                            }}
                            onMouseOut={(e) => {
                              if (!isMobile) {
                                e.target.style.background = '#111111';
                                e.target.style.color = '#a0a0a0';
                                e.target.style.transform = 'translateY(0)';
                              }
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      
                      {/* Click indicator */}
                      <div style={{
                        position: 'absolute',
                        bottom: '1rem',
                        right: '1rem',
                        background: 'rgba(0, 212, 255, 0.1)',
                        border: '1px solid rgba(0, 212, 255, 0.3)',
                        borderRadius: '50%',
                        width: '30px',
                        height: '30px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.8rem',
                        color: '#00d4ff',
                        transition: 'all 0.3s ease'
                      }}>
                        →
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {!isMobile && (
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
            )}
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
                  width: isMobile ? '8px' : '10px',
                  height: isMobile ? '8px' : '10px',
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

        .project-card:hover .hover-overlay {
          opacity: 1;
        }

        /* Improve touch scrolling on mobile */
        @media (max-width: 768px) {
          * {
            -webkit-overflow-scrolling: touch;
          }
          
          .project-card:hover .hover-overlay {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default Projects;