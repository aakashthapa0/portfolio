import React, { useState, useEffect } from "react";
import { education, certifications } from "../data/mock";
import { GraduationCap, Award, MapPin, Calendar } from "lucide-react";

const EducationSection = () => {
  const [selectedTab, setSelectedTab] = useState('education');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="section-container">
      <div className="section-content">
        <div className={`section-header ${isVisible ? 'fade-in' : ''}`}>
          <h1 className="section-title">Education & Certifications</h1>
          <p className="section-subtitle">Academic background and professional achievements</p>
        </div>

        <div className="education-content">
          {/* Tab Selector */}
          <div className="tab-selector">
            <button
              className={`tab-btn ${selectedTab === 'education' ? 'active' : ''}`}
              onClick={() => setSelectedTab('education')}
            >
              <GraduationCap size={20} />
              <span>Education</span>
            </button>
            <button
              className={`tab-btn ${selectedTab === 'certifications' ? 'active' : ''}`}
              onClick={() => setSelectedTab('certifications')}
            >
              <Award size={20} />
              <span>Certifications</span>
            </button>
          </div>

          {/* Education Content */}
          {selectedTab === 'education' && (
            <div className="education-grid">
              {education.map((edu, index) => (
                <div key={edu.id} className="education-card">
                  <div className="card-ribbon">
                    <span className="ribbon-text">
                      {edu.type === 'degree' ? 'Degree' : 'Diploma'}
                    </span>
                  </div>
                  
                  <div className="card-header">
                    <div className="institution-icon">
                      <GraduationCap size={32} />
                    </div>
                    <h3 className="degree-title">{edu.degree}</h3>
                  </div>

                  <div className="card-body">
                    <div className="institution-info">
                      <h4 className="institution-name">{edu.institution}</h4>
                      <div className="education-details">
                        <div className="detail-item">
                          <MapPin size={16} />
                          <span>{edu.location}</span>
                        </div>
                        <div className="detail-item">
                          <Calendar size={16} />
                          <span>{edu.duration}</span>
                        </div>
                      </div>
                    </div>

                    <div className="score-section">
                      <div className="score-label">Grade</div>
                      <div className="score-value">{edu.score}</div>
                    </div>
                  </div>

                  <div className="card-decoration">
                    <div className="decoration-line"></div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Certifications Content */}
          {selectedTab === 'certifications' && (
            <div className="certifications-grid">
              {certifications.map((cert, index) => (
                <div key={cert.id} className="certification-card">
                  <div className="cert-header">
                    <div className="cert-icon">
                      <Award size={28} />
                    </div>
                    <div className="cert-badge">
                      <span>Certified</span>
                    </div>
                  </div>

                  <div className="cert-body">
                    <h3 className="cert-title">{cert.title}</h3>
                    <p className="cert-issuer">{cert.issuer}</p>
                    
                    <div className="cert-details">
                      <div className="cert-date">
                        <Calendar size={14} />
                        <span>Issued: {cert.date}</span>
                      </div>
                      <div className="cert-id">
                        <span>ID: {cert.credentialId}</span>
                      </div>
                    </div>
                  </div>

                  <div className="cert-actions">
                    <button className="verify-btn">
                      Verify Certificate
                    </button>
                  </div>
                </div>
              ))}
              
              {/* Add More Certifications Card */}
              <div className="certification-card add-more">
                <div className="add-more-content">
                  <div className="add-icon">+</div>
                  <h3>More Certifications</h3>
                  <p>Continuously learning and growing</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EducationSection;