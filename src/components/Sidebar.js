import React from 'react';
import '../styles/Sidebar.css';

const Sidebar = ({ activeSection, onSectionChange }) => {
  const sections = [
    {
      id: 'ats-friendly',
      label: 'ATS Friendly',
      icon: '📄',
      description: 'Upload & convert resume'
    },
    {
      id: 'new-resume',
      label: 'New Resume',
      icon: '✨',
      description: 'From template'
    },
    {
      id: 'edit',
      label: 'Edit Resume',
      icon: '✏️',
      description: 'Modify & download'
    }
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>ResumeGenius</h2>
        <p>ATS Resume Builder</p>
      </div>

      <nav className="sidebar-nav">
        {sections.map((section) => (
          <button
            key={section.id}
            className={`nav-item ${activeSection === section.id ? 'active' : ''}`}
            onClick={() => onSectionChange(section.id)}
            title={section.description}
          >
            <span className="nav-icon">{section.icon}</span>
            <span className="nav-label">{section.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <p className="version">v1.0.0</p>
      </div>
    </aside>
  );
};

export default Sidebar;
