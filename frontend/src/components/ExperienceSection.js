import React, { useState, useEffect } from "react";
import { experience } from "../data/mock";
import { ChevronLeft, ChevronRight, MapPin, Calendar, Briefcase } from "lucide-react";

const ExperienceSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const nextExperience = () => {
    setCurrentIndex((prev) => (prev + 1) % experience.length);
  };

  const prevExperience = () => {
    setCurrentIndex((prev) => (prev - 1 + experience.length) % experience.length);
  };

  const currentExp = experience[currentIndex];

  return (
    <div className="section-container">
      <div className="section-content">
        <div className={`section-header ${isVisible ? 'fade-in' : ''}`}>
          <h1 className="section-title">Professional Experience</h1>
          <p className="section-subtitle">My journey through the tech industry</p>
        </div>

        <div className="experience-content-3d">
          {/* 3D Timeline Background */}
          <div className="timeline-3d-background">
            <div className="floating-timeline-elements">
              <div className="timeline-particle particle-1"></div>
              <div className="timeline-particle particle-2"></div>
              <div className="timeline-particle particle-3"></div>
              <div className="timeline-particle particle-4"></div>
            </div>
          </div>

          {/* Interactive 3D Timeline */}
          <div className="timeline-container-3d">
            <div className="timeline-line-3d"></div>
            {experience.map((exp, index) => (
              <div 
                key={exp.id}
                className={`timeline-node-3d ${index === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(index)}
              >
                <div className="node-content-3d">
                  <div className="node-dot-3d">
                    <div className="dot-inner"></div>
                    <div className="dot-ring ring-1"></div>
                    <div className="dot-ring ring-2"></div>
                  </div>
                  <div className="node-info-3d">
                    <span className="company-name">{exp.company}</span>
                    <span className="duration">{exp.duration}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 3D Experience Showcase */}
          <div className="experience-showcase-3d">
            <div className="experience-card-3d">
              <div className="card-3d-effect">
                <div className="card-header">
                  <div className="job-info">
                    <h2 className="job-title">{currentExp.title}</h2>
                    <div className="company-details">
                      <div className="company-name">
                        <Briefcase size={16} />
                        <span>{currentExp.company}</span>
                      </div>
                      <div className="location">
                        <MapPin size={16} />
                        <span>{currentExp.location}</span>
                      </div>
                      <div className="duration">
                        <Calendar size={16} />
                        <span>{currentExp.duration}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="navigation-controls-3d">
                    <button 
                      className="nav-button-3d"
                      onClick={prevExperience}
                      disabled={experience.length <= 1}
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <span className="current-indicator">
                      {currentIndex + 1} / {experience.length}
                    </span>
                    <button 
                      className="nav-button-3d"
                      onClick={nextExperience}
                      disabled={experience.length <= 1}
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>

                <div className="card-body-3d">
                  <h3>Key Achievements & Responsibilities</h3>
                  <ul className="achievements-list-3d">
                    {currentExp.achievements.map((achievement, index) => (
                      <li key={index} className="achievement-item-3d">
                        <div className="achievement-bullet"></div>
                        {achievement}
                      </li>
                    ))}
                  </ul>

                  <div className="technologies-used-3d">
                    <h4>Technologies Used</h4>
                    <div className="tech-tags-3d">
                      {currentExp.technologies.map((tech, index) => (
                        <span key={index} className="tech-tag-3d">
                          <div className="tech-tag-glow"></div>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 3D Background elements for the card */}
                <div className="card-3d-bg">
                  <div className="bg-element element-1"></div>
                  <div className="bg-element element-2"></div>
                  <div className="bg-element element-3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceSection;