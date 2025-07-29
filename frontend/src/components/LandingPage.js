import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Code, Briefcase, User, GraduationCap, Layers } from "lucide-react";
import { personalInfo } from "../data/mock";

const LandingPage = () => {
  const [currentText, setCurrentText] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const rotatingTexts = [
    "Senior Software Engineer",
    "Full-Stack Developer", 
    "Team Lead",
    "Problem Solver"
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % rotatingTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const quickNavItems = [
    { name: "About", path: "/about", icon: User, description: "Learn about my journey" },
    { name: "Experience", path: "/experience", icon: Briefcase, description: "Professional background" },
    { name: "Projects", path: "/projects", icon: Code, description: "Featured works" },
    { name: "Skills", path: "/skills", icon: Layers, description: "Technical expertise" },
    { name: "Education", path: "/education", icon: GraduationCap, description: "Academic achievements" }
  ];

  return (
    <div className="landing-container">
      <div className="landing-content">
        {/* Hero Section */}
        <div className={`hero-section ${isVisible ? 'fade-in' : ''}`}>
          <div className="hero-text">
            <h1 className="hero-greeting">
              Hi, I'm <span className="name-highlight">{personalInfo.name}</span>
            </h1>
            <div className="rotating-title">
              <span className="rotating-text">
                {rotatingTexts[currentText]}
              </span>
            </div>
            <p className="hero-description">
              {personalInfo.summary}
            </p>
            <div className="hero-location">
              📍 {personalInfo.location}
            </div>
          </div>
        </div>

        {/* Floating Navigation Cards */}
        <div className="floating-nav-grid">
          {quickNavItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`floating-nav-card card-${index + 1}`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="card-icon">
                  <IconComponent size={24} />
                </div>
                <h3 className="card-title">{item.name}</h3>
                <p className="card-description">{item.description}</p>
                <div className="card-arrow">
                  <ArrowRight size={16} />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Interactive Background Elements */}
        <div className="background-elements">
          <div className="floating-shape shape-1"></div>
          <div className="floating-shape shape-2"></div>
          <div className="floating-shape shape-3"></div>
          <div className="grid-overlay"></div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;