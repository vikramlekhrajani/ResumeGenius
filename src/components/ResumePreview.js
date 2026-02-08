import React from 'react';
import { downloadResume, downloadResumePDF } from '../utils/downloadHelper';
import '../styles/ResumePreview.css';

const ResumePreview = ({ resume, originalName = 'resume' }) => {
  if (!resume) {
    return (
      <div className="resume-preview empty">
        <p>No resume to preview. Upload a file or generate a sample resume.</p>
      </div>
    );
  }

  const getFilename = (format) => {
    const baseName = originalName.replace(/\.[^/.]+$/, '');
    return format === 'text' 
      ? `${baseName}_ATS-Friendly.txt`
      : `${baseName}_ATS-Friendly.pdf`;
  };

  const handleDownloadText = () => {
    downloadResume(resume, getFilename('text'));
  };

  const handleDownloadPDF = () => {
    downloadResumePDF(resume, getFilename('pdf'));
  };

  return (
    <div className="resume-preview">
      <div className="preview-header">
        <h3>ATS-Friendly Resume Preview</h3>
        <div className="download-buttons">
          <button className="download-btn text-btn" onClick={handleDownloadText} title="Download as TXT">
            📥 TXT
          </button>
          <button className="download-btn pdf-btn" onClick={handleDownloadPDF} title="Download as PDF">
            📄 PDF
          </button>
        </div>
      </div>
      
      <div className="preview-content">
        {resume.split('\n').map((line, idx) => (
          <p key={idx}>{line || <br />}</p>
        ))}
      </div>
    </div>
  );
};

export default ResumePreview;
