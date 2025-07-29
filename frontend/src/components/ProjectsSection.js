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

        <div className="projects-content-3d">
          {/* 3D Background Elements */}
          <div className="projects-3d-background">
            <div className="floating-code-blocks">
              <div className="code-block block-1">
                <div className="code-line"></div>
                <div className="code-line"></div>
                <div className="code-line"></div>
              </div>
              <div className="code-block block-2">
                <div className="code-line"></div>
                <div className="code-line"></div>
              </div>
              <div className="code-block block-3">
                <div className="code-line"></div>
                <div className="code-line"></div>
                <div className="code-line"></div>
                <div className="code-line"></div>
              </div>
            </div>
          </div>

          {/* 3D Project Gallery */}
          <div className="projects-gallery-3d">
            <div className="gallery-3d-container">
              <h3 className="gallery-title">Project Gallery</h3>
              <div className="gallery-grid-3d">
                {projects.map((project, index) => (
                  <div
                    key={project.id}
                    className={`project-thumbnail-3d ${index === selectedProject ? 'active' : ''}`}
                    onClick={() => setSelectedProject(index)}
                  >
                    <div className="thumbnail-3d-wrapper">
                      <div className="thumbnail-image-3d">
                        <img 
                          src={project.image} 
                          alt={project.title}
                          onError={(e) => {
                            e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='250' viewBox='0 0 400 250'%3E%3Crect width='400' height='250' fill='%23121212'/%3E%3Ctext x='200' y='125' font-family='Arial' font-size='16' fill='%2300FFD1' text-anchor='middle' dy='.3em'%3E" + project.title + "%3C/text%3E%3C/svg%3E";
                          }}
                        />
                      </div>
                      <div className="thumbnail-overlay-3d">
                        <h4>{project.title}</h4>
                        <div className="project-status-indicator"></div>
                      </div>
                      <div className="thumbnail-glow"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 3D Project Details */}
          <div className="project-details-3d">
            <div className="project-card-3d">
              <div className="project-card-inner">
                <div className="project-header-3d">
                  <h2 className="project-title-3d">{projects[selectedProject].title}</h2>
                  <div className="project-controls-3d">
                    <button className="control-btn-3d" onClick={prevProject}>
                      <ChevronLeft size={20} />
                    </button>
                    <span className="project-counter-3d">
                      {selectedProject + 1} / {projects.length}
                    </span>
                    <button className="control-btn-3d" onClick={nextProject}>
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>

                <div className="project-body-3d">
                  <p className="project-description-3d">
                    {projects[selectedProject].description}
                  </p>

                  <div className="project-highlights-3d">
                    <h4>Key Features</h4>
                    <ul>
                      {projects[selectedProject].highlights.map((highlight, index) => (
                        <li key={index} className="highlight-item-3d">
                          <div className="highlight-marker"></div>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="project-technologies-3d">
                    <h4>Technologies Used</h4>
                    <div className="tech-stack-3d">
                      {projects[selectedProject].technologies.map((tech, index) => (
                        <span key={index} className="tech-badge-3d">
                          <div className="tech-badge-bg"></div>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="project-links-3d">
                    <button className="project-link-btn-3d">
                      <Github size={16} />
                      <span>View Code</span>
                      <div className="btn-3d-effect"></div>
                    </button>
                    <button className="project-link-btn-3d primary">
                      <ExternalLink size={16} />
                      <span>Live Demo</span>
                      <div className="btn-3d-effect"></div>
                    </button>
                  </div>
                </div>

                {/* 3D Card Background Effects */}
                <div className="card-3d-effects">
                  <div className="card-mesh"></div>
                  <div className="card-gradient"></div>
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