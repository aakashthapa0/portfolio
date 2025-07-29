import React, { useState, useEffect } from "react";
import { projects } from "../data/mock";
import { ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react";

const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const nextProject = () => {
    setSelectedProject((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setSelectedProject((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <div className="section-container">
      <div className="section-content">
        <div className={`section-header ${isVisible ? 'fade-in' : ''}`}>
          <h1 className="section-title">Featured Projects</h1>
          <p className="section-subtitle">Showcasing my technical expertise through real-world solutions</p>
        </div>

        <div className="projects-content">
          {/* Project Gallery */}
          <div className="projects-gallery">
            <div className="gallery-grid">
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  className={`project-thumbnail ${index === selectedProject ? 'active' : ''}`}
                  onClick={() => setSelectedProject(index)}
                >
                  <div className="thumbnail-image">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      onError={(e) => {
                        e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='250' viewBox='0 0 400 250'%3E%3Crect width='400' height='250' fill='%23121212'/%3E%3Ctext x='200' y='125' font-family='Arial' font-size='16' fill='%2300FFD1' text-anchor='middle' dy='.3em'%3E" + project.title + "%3C/text%3E%3C/svg%3E";
                      }}
                    />
                  </div>
                  <div className="thumbnail-overlay">
                    <h4>{project.title}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Project Details */}
          <div className="project-details">
            <div className="project-card">
              <div className="project-header">
                <h2 className="project-title">{projects[selectedProject].title}</h2>
                <div className="project-controls">
                  <button className="control-btn" onClick={prevProject}>
                    <ChevronLeft size={20} />
                  </button>
                  <span className="project-counter">
                    {selectedProject + 1} / {projects.length}
                  </span>
                  <button className="control-btn" onClick={nextProject}>
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>

              <div className="project-body">
                <p className="project-description">
                  {projects[selectedProject].description}
                </p>

                <div className="project-highlights">
                  <h4>Key Features</h4>
                  <ul>
                    {projects[selectedProject].highlights.map((highlight, index) => (
                      <li key={index}>{highlight}</li>
                    ))}
                  </ul>
                </div>

                <div className="project-technologies">
                  <h4>Technologies Used</h4>
                  <div className="tech-stack">
                    {projects[selectedProject].technologies.map((tech, index) => (
                      <span key={index} className="tech-badge">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="project-links">
                  <button className="project-link-btn">
                    <Github size={16} />
                    <span>View Code</span>
                  </button>
                  <button className="project-link-btn primary">
                    <ExternalLink size={16} />
                    <span>Live Demo</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsSection;