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
      const allowed = ['application/pdf', 'text/plain'];
      if (allowed.includes(selectedFile.type)) {
        setFile(selectedFile);
        setError('');
      } else {
        setError('Please upload a PDF or TXT file');
        setFile(null);
      }
    }
  };

  const extractTextFromPDF = async (arrayBuffer) => {
    try {
      const pdfjsLib = await import('pdfjs-dist/build/pdf');
      // Set workerSrc to CDN copy to avoid bundling large worker file
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
      const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
      const pdf = await loadingTask.promise;
      let fullText = '';
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map((item) => item.str).join(' ');
        fullText += pageText + '\n';
      }
      return fullText;
    } catch (err) {
      console.error('PDF text extraction failed', err);
      throw err;
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file first');
      return;
    }

    setUploading(true);
    setError('');

    try {
      if (file.type === 'application/pdf') {
        const arrayBuffer = await file.arrayBuffer();
        const text = await extractTextFromPDF(arrayBuffer);
        const atsResume = convertToATSFriendly(text);
        onATSGenerated(atsResume, file.name);
      } else {
        // text/plain
        const text = await file.text();
        const atsResume = convertToATSFriendly(text);
        onATSGenerated(atsResume, file.name);
      }
      setFile(null);
    } catch (err) {
      setError('Error processing file: ' + (err.message || err));
    } finally {
      setUploading(false);
    }
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
