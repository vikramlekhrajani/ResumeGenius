import React, { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import ResumeUpload from './components/ResumeUpload';
import TemplateSelector from './components/TemplateSelector';
import ResumeEditor from './components/ResumeEditor';
import ResumePreview from './components/ResumePreview';
import LinkedInAuth from './components/LinkedInAuth';
import JobRecommendations from './components/JobRecommendations';

function App() {
  const [currentSection, setCurrentSection] = useState('ats-friendly');
  const [currentResume, setCurrentResume] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [linkedInProfile, setLinkedInProfile] = useState(null);

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

  const handleLinkedInProfile = (profile) => {
    setLinkedInProfile(profile);
    // Auto-import skills and experience into resume
    if (profile.skills && profile.skills.length > 0) {
      const updatedResume = currentResume ? { ...currentResume } : { content: '' };
      updatedResume.linkedInData = {
        name: `${profile.firstName} ${profile.lastName}`,
        headline: profile.headline,
        skills: profile.skills,
        experience: profile.experience
      };
      setCurrentResume(updatedResume);
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

      case 'linkedin':
        return (
          <div className="section-content">
            <header className="section-header">
              <h2>🔗 LinkedIn Integration</h2>
              <p>Connect your LinkedIn account to auto-populate your resume</p>
            </header>
            <div className="section-body">
              <LinkedInAuth onProfileFetch={handleLinkedInProfile} />
              {linkedInProfile && (
                <div className="linkedin-success-message">
                  <p>✅ LinkedIn profile connected! Your data can now be used to populate your resume.</p>
                </div>
              )}
            </div>
          </div>
        );

      case 'jobs':
        return (
          <div className="section-content">
            <header className="section-header">
              <h2>💼 Job Opportunities</h2>
              <p>Find jobs that match your skills and experience</p>
            </header>
            <div className="section-body">
              {linkedInProfile ? (
                <JobRecommendations linkedInProfile={linkedInProfile} />
              ) : (
                <div className="empty-state">
                  <p>Connect your LinkedIn account first to see personalized job recommendations.</p>
                  <button
                    className="primary-btn"
                    onClick={() => setCurrentSection('linkedin')}
                  >
                    Connect LinkedIn
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
