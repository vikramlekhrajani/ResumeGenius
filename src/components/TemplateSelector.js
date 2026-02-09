import React, { useState } from 'react';
import { SAMPLE_ATS_RESUME } from '../utils/resumeFormatter';
import { generateTemplatePreview, getTemplateInfo } from '../utils/templatePreviewGenerator';
import '../styles/TemplateSelector.css';

const templates = [
  {
    id: 'default',
    name: 'Professional',
    description: 'Clean professional template',
    content: SAMPLE_ATS_RESUME
  },
  {
    id: 'technical',
    name: 'Technical',
    description: 'For tech professionals',
    content: `JOHN DOE
john.doe@email.com | (555) 123-4567 | LinkedIn | GitHub

TECHNICAL SKILLS
Languages: JavaScript, Python, Java, C++, SQL
Frontend: React, Vue.js, HTML5, CSS3, TypeScript
Backend: Node.js, Express, Django, Spring Boot
Databases: PostgreSQL, MongoDB, MySQL, Redis
Cloud: AWS, Google Cloud, Docker, Kubernetes
DevOps: CI/CD, Jenkins, GitHub Actions, Terraform
Tools: Git, VS Code, Jira, Webpack, Jest`
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'For designers and creatives',
    content: `JANE SMITH
jane.smith@email.com | (555) 987-6543 | Portfolio | LinkedIn

CREATIVE EXPERTISE
Design: UI/UX Design, Graphic Design, Branding
Tools: Figma, Adobe Creative Suite, Sketch, Webflow
Web: HTML/CSS, Responsive Design, Accessibility
Motion: Animation, After Effects, Prototyping
Strategy: User Research, Design Systems, A/B Testing`
  },
  {
    id: 'executive',
    name: 'Executive',
    description: 'For leadership roles',
    content: `MICHAEL JOHNSON
michael.johnson@email.com | (555) 555-5555 | LinkedIn

EXECUTIVE PROFILE
Operations Director with 15+ years of experience leading teams and driving organizational growth. Proven expertise in strategic planning, team management, and operational excellence.

CORE COMPETENCIES
Leadership, Strategic Planning, Team Management, P&L Responsibility, Process Optimization, Change Management, Stakeholder Relations, Business Development`
  }
];

const TemplateSelector = ({ onTemplateSelect }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [previewTemplate, setPreviewTemplate] = useState(null);

  const handleSelectTemplate = (template) => {
    setSelectedTemplate(template.id);
    onTemplateSelect(template.content, template.name);
  };

  const handleShowPreview = (templateId) => {
    setPreviewTemplate(templateId);
  };

  const handleClosePreview = () => {
    setPreviewTemplate(null);
  };

  return (
    <div className="template-selector">
      <h2>Select a Resume Template</h2>
      <p>Choose a template and customize it with your information</p>

      <div className="templates-grid">
        {templates.map((template) => {
          const info = getTemplateInfo(template.id);
          return (
            <div
              key={template.id}
              className={`template-card ${selectedTemplate === template.id ? 'selected' : ''}`}
              onClick={() => handleSelectTemplate(template)}
            >
              <div className="template-header">
                <div className="template-icon">{info.icon}</div>
                <h3>{info.name}</h3>
                <p>{info.description}</p>
              </div>

              <div className="template-preview">
                <iframe
                  title={`${template.name} preview`}
                  srcDoc={generateTemplatePreview(template.id)}
                  className="preview-iframe"
                  sandbox="allow-same-origin"
                />
              </div>

              <div className="template-features">
                {info.features.map((feature, idx) => (
                  <span key={idx} className="feature-tag">
                    ✓ {feature}
                  </span>
                ))}
              </div>

              <button
                className={`select-btn ${selectedTemplate === template.id ? 'selected' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelectTemplate(template);
                }}
              >
                {selectedTemplate === template.id ? '✓ Selected' : 'Select This'}
              </button>
            </div>
          );
        })}
      </div>

      {previewTemplate && (
        <div className="preview-modal" onClick={handleClosePreview}>
          <div className="preview-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={handleClosePreview}>✕</button>
            <h3>
              {templates.find(t => t.id === previewTemplate)?.name} Template Preview
            </h3>
            <div className="preview-modal-body">
              <iframe
                title={`${previewTemplate} full preview`}
                srcDoc={generateTemplatePreview(previewTemplate)}
                className="preview-iframe-large"
                sandbox="allow-same-origin"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateSelector;
