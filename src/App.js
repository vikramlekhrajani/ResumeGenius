import React, { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import ResumeUpload from './components/ResumeUpload';
import TemplateSelector from './components/TemplateSelector';
import ResumeEditor from './components/ResumeEditor';
import ResumePreview from './components/ResumePreview';

function App() {
  const [currentSection, setCurrentSection] = useState('ats-friendly');
  const [currentResume, setCurrentResume] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const handleATSGenerated = (atsContent, filename) => {
    setCurrentResume({
      content: atsContent,
      originalName: filename,
      type: 'uploaded',
      template: 'custom'
    });
    setEditMode(true);
  };

  const handleTemplateSelect = (templateContent, templateName) => {
    setCurrentResume({
      content: templateContent,
      originalName: `${templateName}-resume.txt`,
      type: 'template',
      template: templateName
    });
    setEditMode(true);
  };

  const handleResumeUpdate = (updatedContent) => {
    if (currentResume) {
      setCurrentResume({
        ...currentResume,
        content: updatedContent
      });
    }
  };

  const renderSectionContent = () => {
    switch (currentSection) {
      case 'ats-friendly':
        return (
          <div className="section-content">
            <header className="section-header">
              <h2>📄 ATS Friendly Resume</h2>
              <p>Upload your resume and convert it to ATS-friendly format</p>
            </header>
            <div className="section-body">
              <ResumeUpload onATSGenerated={handleATSGenerated} />
            </div>
          </div>
        );

      case 'new-resume':
        return (
          <div className="section-content">
            <header className="section-header">
              <h2>✨ Create New Resume</h2>
              <p>Select a template and customize it with your information</p>
            </header>
            <div className="section-body">
              {!editMode ? (
                <TemplateSelector onTemplateSelect={handleTemplateSelect} />
              ) : (
                <div className="template-edit-mode">
                  <button
                    className="back-btn"
                    onClick={() => {
                      setEditMode(false);
                      setCurrentResume(null);
                    }}
                  >
                    ← Back to Templates
                  </button>
                  <div className="editor-view">
                    <ResumeEditor
                      initialResume={currentResume.content}
                      onUpdate={handleResumeUpdate}
                    />
                    <ResumePreview
                      resume={currentResume.content}
                      originalName={currentResume.originalName}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 'edit':
        return (
          <div className="section-content">
            <header className="section-header">
              <h2>✏️ Edit Resume</h2>
              <p>Modify your resume and download in preferred format</p>
            </header>
            <div className="section-body">
              {currentResume ? (
                <div className="editor-view">
                  <ResumeEditor
                    initialResume={currentResume.content}
                    onUpdate={handleResumeUpdate}
                  />
                  <ResumePreview
                    resume={currentResume.content}
                    originalName={currentResume.originalName}
                  />
                </div>
              ) : (
                <div className="empty-state">
                  <p>No resume loaded. Please upload or create a resume first.</p>
                  <button className="primary-btn" onClick={() => setCurrentSection('ats-friendly')}>
                    Upload Resume
                  </button>
                  <button className="primary-btn" onClick={() => setCurrentSection('new-resume')}>
                    Create New Resume
                  </button>
                </div>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="App">
      <Sidebar activeSection={currentSection} onSectionChange={setCurrentSection} />
      <main className="main-area">
        {renderSectionContent()}
      </main>
    </div>
  );
}

export default App;
