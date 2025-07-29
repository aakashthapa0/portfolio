import React, { useState, useEffect } from "react";
import { skills } from "../data/mock";
import Spline from '@splinetool/react-spline';

const SkillsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('languages');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const categories = [
    { key: 'languages', name: 'Languages', icon: '💻' },
    { key: 'frameworks', name: 'Frameworks', icon: '🚀' },
    { key: 'tools', name: 'Tools & Platforms', icon: '🛠️' }
  ];

  const getSkillItems = () => {
    return skills[selectedCategory] || [];
  };

  return (
    <div className="section-container">
      <div className="section-content">
        <div className={`section-header ${isVisible ? 'fade-in' : ''}`}>
          <h1 className="section-title">Technical Skills</h1>
          <p className="section-subtitle">My technical expertise and proficiency levels</p>
        </div>

        <div className="skills-content">
          {/* Category Selector */}
          <div className="category-selector">
            {categories.map((category) => (
              <button
                key={category.key}
                className={`category-btn ${selectedCategory === category.key ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.key)}
              >
                <span className="category-icon">{category.icon}</span>
                <span className="category-name">{category.name}</span>
              </button>
            ))}
          </div>

          {/* Skills Orbit Visualization */}
          <div className="skills-orbit">
            <div className="orbit-center">
              <div className="center-content">
                <span className="center-icon">
                  {categories.find(cat => cat.key === selectedCategory)?.icon}
                </span>
                <span className="center-text">
                  {categories.find(cat => cat.key === selectedCategory)?.name}
                </span>
              </div>
            </div>

            <div className="orbit-items">
              {getSkillItems().map((skill, index) => (
                <div
                  key={skill.name}
                  className="skill-orbit-item"
                  style={{
                    '--orbit-angle': `${(index * 360) / getSkillItems().length}deg`,
                    '--orbit-delay': `${index * 0.1}s`
                  }}
                >
                  <div className="skill-icon">
                    {skill.icon}
                  </div>
                  <div className="skill-name">{skill.name}</div>
                  <div className="skill-level">
                    <div 
                      className="skill-bar"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skills Grid */}
          <div className="skills-grid">
            {getSkillItems().map((skill, index) => (
              <div key={skill.name} className="skill-card">
                <div className="skill-header">
                  <span className="skill-emoji">{skill.icon}</span>
                  <h3 className="skill-title">{skill.name}</h3>
                </div>
                <div className="skill-progress">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ 
                        width: `${skill.level}%`,
                        animationDelay: `${index * 0.1}s`
                      }}
                    ></div>
                  </div>
                  <span className="skill-percentage">{skill.level}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Section Spline 3D Asset */}
        <div className="section-spline-container">
          <div className="spline-wrapper-section">
            <Spline 
              scene="https://prod.spline.design/4W0r5_uf3EjdVtN9/scene.splinecode"
              style={{ width: "100%", height: "100%" }}
            />
          </div>
          <div className="spline-overlay-section">
            <div className="overlay-text">
              <h3>Skill Mastery</h3>
              <p>Technologies I excel in</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsSection;