import React, { useState, useEffect } from "react";
import { personalInfo } from "../data/mock";
import { MapPin, Mail, Linkedin, Github } from "lucide-react";
import Spline from '@splinetool/react-spline';

const AboutSection = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="section-container">
      <div className="section-content">
        <div className={`section-header ${isVisible ? 'fade-in' : ''}`}>
          <h1 className="section-title">About Me</h1>
          <p className="section-subtitle">Get to know the person behind the code</p>
        </div>

        <div className="about-content-3d">
          {/* 3D Background Scene */}
          <div className="about-3d-background">
            <div className="floating-3d-elements">
              <div className="floating-cube cube-1"></div>
              <div className="floating-cube cube-2"></div>
              <div className="floating-cube cube-3"></div>
              <div className="floating-wireframe wireframe-1"></div>
              <div className="floating-wireframe wireframe-2"></div>
            </div>
          </div>

          <div className="about-main-content">
            <div 
              className={`about-card-3d ${isFlipped ? 'flipped' : ''}`}
              onClick={() => setIsFlipped(!isFlipped)}
            >
              <div className="card-front">
                <div className="avatar-container">
                  <div className="avatar-placeholder">
                    <span className="avatar-initials">AT</span>
                  </div>
                  <div className="avatar-glow"></div>
                  <div className="avatar-particles">
                    <div className="particle"></div>
                    <div className="particle"></div>
                    <div className="particle"></div>
                    <div className="particle"></div>
                  </div>
                </div>
                <h2 className="name">{personalInfo.name}</h2>
                <p className="title">{personalInfo.title}</p>
                <div className="location">
                  <MapPin size={16} />
                  <span>{personalInfo.location}</span>
                </div>
                <p className="flip-hint">Click to learn more</p>
              </div>

              <div className="card-back">
                <div className="summary-content">
                  <h3>Professional Summary</h3>
                  <p className="summary-text">{personalInfo.summary}</p>
                  
                  <div className="contact-links">
                    <a href={`mailto:${personalInfo.email}`} className="contact-link">
                      <Mail size={20} />
                      <span>Email</span>
                    </a>
                    <a href={personalInfo.linkedin} className="contact-link" target="_blank" rel="noopener noreferrer">
                      <Linkedin size={20} />
                      <span>LinkedIn</span>
                    </a>
                    <a href={personalInfo.github} className="contact-link" target="_blank" rel="noopener noreferrer">
                      <Github size={20} />
                      <span>GitHub</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="about-details-3d">
              <div className="detail-card-3d">
                <div className="card-3d-icon">
                  <div className="rotating-gear"></div>
                </div>
                <h3>What drives me</h3>
                <p>
                  I'm passionate about creating innovative solutions that make a real impact. 
                  With over 4 years of experience in full-stack development, I've led teams, 
                  mentored developers, and built scalable applications that serve thousands of users.
                </p>
              </div>

              <div className="detail-card-3d">
                <div className="card-3d-icon">
                  <div className="pulsing-circuit"></div>
                </div>
                <h3>My approach</h3>
                <p>
                  I believe in writing clean, maintainable code and following best practices. 
                  I'm always learning new technologies and staying up-to-date with industry trends 
                  to deliver the best possible solutions.
                </p>
              </div>

              <div className="detail-card-3d">
                <div className="card-3d-icon">
                  <div className="orbiting-dots">
                    <div className="center-dot"></div>
                    <div className="orbit-dot orbit-1"></div>
                    <div className="orbit-dot orbit-2"></div>
                    <div className="orbit-dot orbit-3"></div>
                  </div>
                </div>
                <h3>Beyond coding</h3>
                <p>
                  When I'm not coding, I enjoy exploring new technologies, contributing to open-source 
                  projects, and sharing knowledge with the developer community through mentoring and 
                  technical discussions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;