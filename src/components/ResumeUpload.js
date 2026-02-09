import React, { useState, useRef } from 'react';
import { convertToATSFriendly } from '../utils/resumeFormatter';
import '../styles/ResumeUpload.css';

const ResumeUpload = ({ onATSGenerated }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [previewMode, setPreviewMode] = useState(false);
  const [previewPages, setPreviewPages] = useState([]);
  const [extractedText, setExtractedText] = useState('');
  const [atsContent, setAtsContent] = useState('');
  const canvasRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const allowed = ['application/pdf', 'text/plain'];
      if (allowed.includes(selectedFile.type)) {
        setFile(selectedFile);
        setError('');
        setPreviewMode(false);
      } else {
        setError('Please upload a PDF or TXT file');
        setFile(null);
      }
    }
  };

  const renderPDFPreviews = async (arrayBuffer) => {
    try {
      const pdfjsLib = await import('pdfjs-dist/build/pdf');
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
      
      const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
      const pdf = await Promise.race([
        loadingTask.promise,
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('PDF rendering timeout')), 10000)
        )
      ]);
      
      const pages = [];
      // Only render first 3 pages for performance
      const pagesToRender = Math.min(3, pdf.numPages);

      for (let i = 1; i <= pagesToRender; i++) {
        try {
          const page = await pdf.getPage(i);
          const scale = 1.2;
          const viewport = page.getViewport({ scale });
          
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          const renderContext = {
            canvasContext: context,
            viewport: viewport
          };

          await page.render(renderContext).promise;
          pages.push(canvas.toDataURL('image/png'));
        } catch (pageErr) {
          console.warn(`Failed to render page ${i}`, pageErr);
        }
      }

      if (pages.length > 0) {
        setPreviewPages(pages);
      }
    } catch (err) {
      console.warn('PDF preview rendering skipped:', err.message);
      // Don't throw - this is a non-critical feature
    }
  };

  const extractTextFromPDF = async (arrayBuffer) => {
    try {
      const pdfjsLib = await import('pdfjs-dist/build/pdf');
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
      
      const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
      const pdf = await Promise.race([
        loadingTask.promise,
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('PDF text extraction timeout')), 15000)
        )
      ]);

      let fullText = '';
      
      for (let i = 1; i <= pdf.numPages; i++) {
        try {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          const pageText = textContent.items.map((item) => item.str).join(' ');
          fullText += pageText + '\n';
        } catch (pageErr) {
          console.warn(`Failed to extract text from page ${i}`, pageErr);
          // Continue with next page
        }
      }
      
      if (!fullText.trim()) {
        throw new Error('No text could be extracted from PDF');
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
        
        // Extract text first
        const text = await extractTextFromPDF(arrayBuffer);
        setExtractedText(text);
        
        // Convert to ATS format
        const ats = convertToATSFriendly(text);
        setAtsContent(ats);
        
        // Render PDF previews in background (async)
        renderPDFPreviews(arrayBuffer).catch((err) => {
          console.warn('PDF preview rendering failed, proceeding without previews', err);
        });
        
        setPreviewMode(true);
      } else {
        // text/plain
        const text = await file.text();
        setExtractedText(text);
        const ats = convertToATSFriendly(text);
        setAtsContent(ats);
        setPreviewMode(true);
      }
    } catch (err) {
      setError('Error processing file: ' + (err.message || err));
      setPreviewMode(false);
    } finally {
      setUploading(false);
    }
  };

  const handleDownload = () => {
    if (atsContent) {
      onATSGenerated(atsContent, file.name);
      setFile(null);
      setPreviewMode(false);
      setPreviewPages([]);
      setExtractedText('');
      setAtsContent('');
    }
  };

  const handleEdit = () => {
    onATSGenerated(atsContent, file.name);
  };

  const handleBackToUpload = () => {
    setPreviewMode(false);
    setPreviewPages([]);
    setExtractedText('');
    setAtsContent('');
    setFile(null);
  };

  if (previewMode) {
    return (
      <div className="resume-upload">
        <div className="preview-container">
          <h2>Resume Preview</h2>
          <p>Review your resume before converting to ATS format</p>

          {previewPages.length > 0 && (
            <div className="pdf-preview-section">
              <h3>Original Document Preview</h3>
              <div className="pdf-pages-grid">
                {previewPages.map((page, idx) => (
                  <div key={idx} className="pdf-page-container">
                    <img src={page} alt={`Page ${idx + 1}`} className="pdf-page-image" />
                    <span className="page-number">Page {idx + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="ats-preview-section">
            <h3>ATS Converted Content</h3>
            <textarea
              className="ats-preview-text"
              value={atsContent}
              onChange={(e) => setAtsContent(e.target.value)}
              placeholder="ATS formatted resume will appear here"
            />
            <p className="preview-hint">You can edit the content above before downloading</p>
          </div>

          <div className="preview-actions">
            <button
              className="download-btn"
              onClick={handleDownload}
            >
              ✓ Download ATS Resume
            </button>
            <button
              className="edit-btn"
              onClick={handleEdit}
            >
              Edit in Editor
            </button>
            <button
              className="back-btn"
              onClick={handleBackToUpload}
            >
              ← Back to Upload
            </button>
          </div>
        </div>
      </div>
    );
  }

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
