import React, { useState } from 'react';
import { convertToATSFriendly } from '../utils/resumeFormatter';
import '../styles/ResumeUpload.css';

const ResumeUpload = ({ onATSGenerated }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.type === 'application/pdf' || selectedFile.type === 'text/plain') {
        setFile(selectedFile);
        setError('');
      } else {
        setError('Please upload a PDF or TXT file');
        setFile(null);
      }
    }
  };

  const handleUpload = () => {
    if (!file) {
      setError('Please select a file first');
      return;
    }

    setUploading(true);
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const content = e.target.result;
        const atsResume = convertToATSFriendly(content);
        onATSGenerated(atsResume, file.name);
        setUploading(false);
        setFile(null);
      } catch (err) {
        setError('Error processing file: ' + err.message);
        setUploading(false);
      }
    };

    reader.readAsText(file);
  };

  return (
    <div className="resume-upload">
      <h2>Upload Your Resume</h2>
      <p>Upload your existing resume to convert it to ATS-friendly format</p>
      
      <div className="upload-area">
        <input
          type="file"
          id="file-input"
          onChange={handleFileChange}
          accept=".pdf,.txt"
          disabled={uploading}
        />
        <label htmlFor="file-input" className="file-label">
          {file ? file.name : 'Choose PDF or TXT file'}
        </label>
      </div>

      {error && <div className="error-message">{error}</div>}

      <button
        className="upload-btn"
        onClick={handleUpload}
        disabled={!file || uploading}
      >
        {uploading ? 'Processing...' : 'Convert to ATS Format'}
      </button>
    </div>
  );
};

export default ResumeUpload;
