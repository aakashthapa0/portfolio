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

        <div className="experience-content">
          {/* Timeline Visualization */}
          <div className="timeline-container">
            <div className="timeline-line"></div>
            {experience.map((exp, index) => (
              <div 
                key={exp.id}
                className={`timeline-node ${index === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(index)}
              >
                <div className="node-content">
                  <div className="node-dot"></div>
                  <div className="node-info">
                    <span className="company-name">{exp.company}</span>
                    <span className="duration">{exp.duration}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Experience Card */}
          <div className="experience-showcase">
            <div className="experience-card">
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
                
                <div className="navigation-controls">
                  <button 
                    className="nav-button"
                    onClick={prevExperience}
                    disabled={experience.length <= 1}
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <span className="current-indicator">
                    {currentIndex + 1} / {experience.length}
                  </span>
                  <button 
                    className="nav-button"
                    onClick={nextExperience}
                    disabled={experience.length <= 1}
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>

              <div className="card-body">
                <h3>Key Achievements & Responsibilities</h3>
                <ul className="achievements-list">
                  {currentExp.achievements.map((achievement, index) => (
                    <li key={index} className="achievement-item">
                      {achievement}
                    </li>
                  ))}
                </ul>

                <div className="technologies-used">
                  <h4>Technologies Used</h4>
                  <div className="tech-tags">
                    {currentExp.technologies.map((tech, index) => (
                      <span key={index} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
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