import React, { useState } from 'react';
import { SAMPLE_ATS_RESUME } from '../utils/resumeFormatter';
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

  const handleSelectTemplate = (template) => {
    setSelectedTemplate(template.id);
    onTemplateSelect(template.content, template.name);
  };

  return (
    <div className="template-selector">
      <h2>Select a Resume Template</h2>
      <p>Choose a template and customize it with your information</p>

      <div className="templates-grid">
        {templates.map((template) => (
          <div
            key={template.id}
            className={`template-card ${selectedTemplate === template.id ? 'selected' : ''}`}
            onClick={() => handleSelectTemplate(template)}
          >
            <div className="template-header">
              <h3>{template.name}</h3>
              <p>{template.description}</p>
            </div>
            <div className="template-preview">
              <pre>{template.content.split('\n').slice(0, 5).join('\n')}...</pre>
            </div>
            <button className="select-btn">
              {selectedTemplate === template.id ? '✓ Selected' : 'Select'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;
