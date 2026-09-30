import React, { useState } from 'react';
import { Mail, FileText, Check, Copy, Send } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { personalInfo } from '../data/portfolioData';

export default function Contact({ onOpenResume }) {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.contacts.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section className="contact-section" id="contact" aria-label="Contact and Connect">
      <div className="content-wrapper">
        <div className="contact-card">
          <div className="section-label" style={{ justifyContent: 'center' }}>
            <Mail size={15} />
            <span>Get in Touch</span>
          </div>

          <h2 className="contact-headline">
            Let's build something exceptional.
          </h2>

          <p className="contact-sub">
            Whether you're exploring full-stack engineering talent, discussing distributed systems architectures, or reviewing MacPulse, I'd love to connect.
          </p>

          <div className="contact-actions-grid">
            <a 
              href={`mailto:${personalInfo.contacts.email}`} 
              className="contact-btn contact-email-btn"
              aria-label="Send direct email to Aakash Thapa"
            >
              <Send size={18} />
              <span>{personalInfo.contacts.email}</span>
            </a>

            <button
              type="button"
              className="contact-btn contact-social-btn"
              onClick={handleCopyEmail}
              aria-label="Copy email address to clipboard"
            >
              {copied ? <Check size={18} color="#10B981" /> : <Copy size={18} />}
              <span>{copied ? "Email Copied!" : "Copy Email"}</span>
            </button>

            <a 
              href={personalInfo.contacts.linkedin} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="contact-btn contact-social-btn"
              aria-label="View Aakash Thapa on LinkedIn"
            >
              <LinkedinIcon size={18} />
              <span>LinkedIn</span>
            </a>

            <a 
              href={personalInfo.contacts.github} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="contact-btn contact-social-btn"
              aria-label="View Aakash Thapa GitHub profile"
            >
              <GithubIcon size={18} />
              <span>GitHub</span>
            </a>

            <button 
              type="button" 
              className="contact-btn contact-social-btn"
              onClick={onOpenResume}
              aria-label="View and Download Resume"
            >
              <FileText size={18} />
              <span>View Resume</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
