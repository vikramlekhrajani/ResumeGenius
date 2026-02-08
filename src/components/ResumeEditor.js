import React, { useState, useEffect } from 'react';
import '../styles/ResumeEditor.css';

const ResumeEditor = ({ initialResume, onUpdate }) => {
  const [resume, setResume] = useState(initialResume || '');
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setResume(initialResume || '');
    setHasChanges(false);
  }, [initialResume]);

  const handleChange = (e) => {
    const newResume = e.target.value;
    setResume(newResume);
    setHasChanges(true);
    onUpdate(newResume);
  };

  const handleSave = () => {
    setHasChanges(false);
    onUpdate(resume);
  };

  return (
    <div className="resume-editor">
      <div className="editor-header">
        <h3>Resume Editor</h3>
        {hasChanges && <span className="unsaved-badge">Unsaved Changes</span>}
      </div>
      
      <textarea
        value={resume}
        onChange={handleChange}
        placeholder="Edit your resume here..."
        className="editor-textarea"
      />

      <div className="editor-actions">
        {hasChanges && (
          <button className="save-btn" onClick={handleSave}>
            Save Changes
          </button>
        )}
      </div>
    </div>
  );
};

export default ResumeEditor;
